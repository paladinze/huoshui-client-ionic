var allCourses = [];
var i, j;

function saveAllCourses(saveIteration) {
  console.log(saveIteration + " : " + "iteration");
  var partCourses = [];
  if (saveIteration * 1000 < allCourses.length) {
    partCourses = allCourses.slice(saveIteration * 1000, (saveIteration + 1) *
      1000);
  } else if (saveIteration * 1000 - allCourses.length < 1000) {
    partCourses = allCourses.slice(saveIteration * 1000, allCourses.length);
  } else {
    partCourses.length = 0;
  }

  AV.Object.saveAll(partCourses).then(
    function(results) {
      if (partCourses.length > 0) {
        setTimeout(function() {
          saveAllCourses(saveIteration + 1);
        }, 5000);
      } else {
        console.log("save course completed");
      }
    },
    function(error) {
      //alert("Error: " + error.code + " " + error.message);
      //showDownloadFailure();
    }
  );
}

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
          allCourses.push(object);
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
          var R = course.get('rateOverall');
          var V = course.get('reviewCount');
          total_vote += V;
          total_value += R;
        }
        var C = total_value / total_vote;
        console.log("rating global mean is: " + C);

        //compute rank score
        for (var j = 0; j < allCourses.length; j++) {
          var course = allCourses[j];
          var R = course.get('rateOverall');
          var V = course.get('reviewCount');
          var M = 1;
          var score = (V / (V + M)) * R + (M / (V + M)) * (C);
          course.set("rankScore", score);
        }
        allCourses.sort(function(a, b) {
          return parseFloat(b.get('rankScore')) - parseFloat(a.get(
            'rankScore'));
        });

        //save courses to database
        for (var j = 0; j < allCourses.length; j++) {
          var course = allCourses[j];
          var index_best = j + 1;
          var index_worst = allCourses.length - j;
          course.set('rankBest', index_best);
          course.set('rankWorst', index_worst);
        }
        saveAllCourses(0);


      }
    },
    function(error) {
      //alert("Error: " + error.code + " " + error.message);
      //showDownloadFailure();
    }
  );
}
getAllCourses(0);
