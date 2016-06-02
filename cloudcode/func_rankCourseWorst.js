var allCourses = [];
var i, j;
var M = 1;

function getAllCourses(queryIteration) {
  var queryLimit = 1000;
  var raw_data = AV.Object.extend("Courses");
  var query = new AV.Query(raw_data);
  query.limit(queryLimit);
  query.skip(queryLimit * queryIteration);
  query.find().then(
    function(results) {
      if (results.length > 0) {
        //store subquery result
        for (i = 0; i < results.length; i++) {
          var object = results[i];
          allCourses.push({
            "objectId": object.id,
            "prof": object.get('prof'),
            "name": object.get('name'),
            "rateOverall": object.get('rateOverall'),
            "reviewCount": object.get('reviewCount')
          });
        }
        //recursive call
        queryIteration++;
        getAllCourses(queryIteration);
      } else {
        console.log("Course Table Length:" + allCourses.length);

        //calculate global mean
        var total_value = 0;
        var total_vote = 0;
        for (j = 0; j < allCourses.length; j++) {
          var course = allCourses[j];
          var R = course.rateOverall;
          var V = course.reviewCount;
          total_vote += V;
          total_value += R;
        }
        var C = total_value / total_vote;
        console.log("rating global mean is: " + C);

        //compute rank score
        for (var j = 0; j < allCourses.length; j++) {
          var course = allCourses[j];
          var R = course.rateOverall;
          var V = course.reviewCount;
          course.score = (V / (V + M)) * R + (M / (V + M)) * (C);
        }
        allCourses.sort(function(a, b) {
          return parseFloat(a.score) - parseFloat(b.score);
        });
        console.log("last place: " + allCourses[0].name + ":" + allCourses[0]
          .prof);


        //save top courses to database
        var topCourses = allCourses.slice(0, 100);
        var Rank = AV.Object.extend('RankCourseWorst');

        for (var j = 0; j < topCourses.length; j++) {
          var j_prime = j + 1;
          var rank = new Rank();
          rank.set('rank', j_prime);
          rank.set('score', topCourses[j].score);
          rank.set('name', topCourses[j].name);
          rank.set('prof', topCourses[j].prof);
          rank.set('courseId', {
            "__type": "Pointer",
            "className": "Courses",
            "objectId": topCourses[j].objectId
          });
          rank.save();
        }

      }
    },
    function(error) {
      //alert("Error: " + error.code + " " + error.message);
      //showDownloadFailure();
    }
  );
}
getAllCourses(0);
