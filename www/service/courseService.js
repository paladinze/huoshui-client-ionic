angular.module('starter.services')

.service('courseService', function($filter, $rootScope, $localStorage,
  deptService) {

  var $storage = $localStorage;
  var deptImgHash = deptService.getDeptImageHash();

  var addCourseToCache = function(object) {
    $storage.courses.push({
      objectId: object.id,
      prof: object.get('prof'),
      name: object.get('name'),
      position: object.get('position'),
      campus: object.get('campus'),
      school: object.get('school'),
      dept: object.get('dept'),
      deptImg: deptImgHash[object.get('dept')],

      reviewCount: object.get('reviewCount'),
      reviewGoodCount: object.get('reviewGoodCount'),

      rateOverall: object.get('rateOverall'),
      rate1: object.get('rate1'),
      rate2: object.get('rate2'),
      rate3: object.get('rate3'),

      birdOverall: object.get('birdOverall'),
      birdCount: object.get('birdCount'),

      attendanceOverall: object.get('attendanceOverall'),
      attendanceCount: object.get('attendanceCount'),

      homeworkOverall: object.get('homeworkOverall'),
      homeworkCount: object.get('homeworkCount'),

      examOverall: object.get('examOverall'),
      examCount: object.get('examCount'),

      tags: object.get('tags'),


      createdAt: object.createdAt,
      updatedAt: object.updatedAt
    });
  };


  this.addCourse = function(courseInfo) {

    var Course = AV.Object.extend("Courses");
    var query = new AV.Query(Course);
    query.equalTo("prof", courseInfo.prof);
    query.find({
      success: function(results) {
        if (results.length !== 0) {

          var courseExist = false;
          for (var i = 0; i < results.length; i++) {
            var course = results[i];
            if (course.name == courseInfo.course) {
              courseExist = true;
            }
          }
          if (courseExist) {
            $rootScope.$broadcast("course-add-fail-duplicate");
          } else {
            console.log("course not exist yet, adding course");
            var course = new Course();
            course.save({
              prof: courseInfo.prof,
              name: courseInfo.course,
              dept: courseInfo.dept,
              position: courseInfo.position,
              school: "西南交通大学",
              campus: "犀浦"
            }, {
              success: function(res) {
                console.log("course added");
                console.log(res);
                addCourseToCache(res);
                console.log($storage.courses.length);
                $rootScope.$broadcast("course-add-success");
              },
              error: function(res, error) {
                console.log("add course failed: " + error.message +
                  error.code);
                $rootScope.$broadcast(
                  "course-add-fail-generic");
              }
            });
          }

        } else if (results.length === 0) {
          console.log("prof not exist");
          $rootScope.$broadcast("course-add-fail-prof-not-exist");

        }
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });


  };

  // fetch course table and store in localStorage
  this.updateAllCourse = function() {

    var tempCourse = [];

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
            for (var i = 0; i < results.length; i++) {
              var object = results[i];

              tempCourse.push({
                objectId: object.id,
                prof: object.get('prof'),
                name: object.get('name'),
                position: object.get('position'),
                campus: object.get('campus'),
                school: object.get('school'),
                dept: object.get('dept'),
                deptImg: deptImgHash[object.get('dept')],

                reviewCount: object.get('reviewCount'),
                reviewGoodCount: object.get('reviewGoodCount'),

                rateOverall: object.get('rateOverall'),
                rate1: object.get('rate1'),
                rate2: object.get('rate2'),
                rate3: object.get('rate3'),

                birdOverall: object.get('birdOverall'),
                birdCount: object.get('birdCount'),

                attendanceOverall: object.get('attendanceOverall'),
                attendanceCount: object.get('attendanceCount'),

                homeworkOverall: object.get('homeworkOverall'),
                homeworkCount: object.get('homeworkCount'),

                examOverall: object.get('examOverall'),
                examCount: object.get('examCount'),

                tags: object.get('tags'),


                createdAt: object.createdAt,
                updatedAt: object.updatedAt
              });
            }
            //recursive call
            queryIteration++;
            getAllCourses(queryIteration);
          } else {
            $storage.courses = tempCourse;
            $rootScope.$broadcast("courseTableUpdated");
            console.log("loading completed! Course Table Length:" +
              $storage.courses.length);
          }
        },
        function(error) {
          //alert("Error: " + error.code + " " + error.message);
          //showDownloadFailure();
        }
      );
    }
    getAllCourses(0);
  };
});
