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
          allCourses.push(object);
        }
        //recursive call
        queryIteration++;
        getAllCourses(queryIteration);
      } else {
        console.log("Course Table Length:" + allCourses.length);

      }
    },
    function(error) {
      //alert("Error: " + error.code + " " + error.message);
      //showDownloadFailure();
    }
  );
}
getAllCourses(0);
