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
        /*-----------------------------------------------------
        Iterate through courses and update stats
        ------------------------------------------------------*/
        for (var i = 0; i < allCourses.length; ++i) {
          var course = allCourses[i];

          //get all related reviews
          var query = new AV.Query('Reviews');
          query.include('courseId');
          query.equalTo('courseId', course);

          (function(course) {
            query.find().then(function(results) {
              var reviews = results;
              //console.log(course.get('name') + " : " + course.get(
              //'prof') + " : " + reviews.length + ' reviews');

              var cmodel = {
                "tags": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0,
                  0, 0, 0, 0,
                  0, 0
                ],
                "reviewCount": 0,
                "reviewGoodCount": 0,
                "rate1": 0,
                "rate2": 0,
                "rate3": 0,
                "rateOverall": 0,
                "attendanceCount": 0,
                "attendanceOverall": 0,
                "homeworkCount": 0,
                "homeworkOverall": 0,
                "birdCount": 0,
                "birdOverall": 0,
                "examCount": 0,
                "examOverall": 0
              };

              //iterate through reviews and populate course model
              for (var j = 0; j < reviews.length; ++j) {
                var review = reviews[j];
                var rData = {
                  rate1: review.get('rating').rate1,
                  rate2: review.get('rating').rate2,
                  rate3: review.get('rating').rate3,
                  rateOverall: review.get('rating').overall,
                  bird: review.get('bird'),
                  attendance: review.get('attendance'),
                  homework: review.get('homework'),
                  exam: review.get('exam'),
                  tags: review.get('tags')
                };
                /*          console.log(rData.rate1 + ":" + rData.rate2 + ":" + rData.rate3 +
                            ":" + rData.rateOverall
                          );*/

                //review count
                cmodel.reviewCount++;
                if (rData.rateOverall > 11) {
                  cmodel.reviewGoodCount++;
                }

                //rating
                cmodel.rateOverall += rData.rateOverall / 3;
                cmodel.rate1 += rData.rate1;
                cmodel.rate2 += rData.rate2;
                cmodel.rate3 += rData.rate3;

                //bird
                if (rData.bird.value !== 0) {
                  cmodel.birdCount++;
                  cmodel.birdOverall += rData.bird.value;
                }

                //attendance
                if (rData.attendance.value !== 0) {
                  cmodel.attendanceCount++;
                  cmodel.attendanceOverall += rData.attendance.value;
                }

                //homework
                if (rData.homework.value !== 0) {
                  cmodel.homeworkCount++;
                  cmodel.homeworkOverall += rData.homework.value;
                }

                //exam
                if (rData.exam.touched) {
                  var examValue = 0;
                  if (rData.exam.examprep.checked) {
                    examValue++;
                  }
                  if (rData.exam.openbook.checked) {
                    examValue++;
                  }
                  if (rData.exam.oldquestion.checked) {
                    examValue++;
                  }
                  if (rData.exam.easiness.checked) {
                    examValue++;
                  }
                  cmodel.examCount++;
                  cmodel.examOverall += examValue;
                }

                //tags
                var srcTagIds = [];
                for (var i = 0; i < rData.tags.length; ++i) {
                  srcTagId = parseInt(rData.tags[i].id);
                  srcTagIds.push(srcTagId);
                  cmodel.tags[srcTagId]++;
                }
              } // end of review loop

              //normalize the stats
              if (cmodel.reviewCount > 0) {
                cmodel.rateOverall /= cmodel.reviewCount;
                cmodel.rate1 /= cmodel.reviewCount;
                cmodel.rate2 /= cmodel.reviewCount;
                cmodel.rate3 /= cmodel.reviewCount;
              }

              if (cmodel.birdCount)
                cmodel.birdOverall /= cmodel.birdCount;
              if (cmodel.attendanceCount)
                cmodel.attendanceOverall /= cmodel.attendanceCount;
              if (cmodel.homeworkCount)
                cmodel.homeworkOverall /= cmodel.homeworkCount;
              if (cmodel.examCount)
                cmodel.examOverall /= cmodel.examCount;

              //save the course stats to database
              course.set('tags', cmodel.tags);
              course.set('reviewCount', cmodel.reviewCount);
              course.set('reviewGoodCount', cmodel.reviewGoodCount);
              course.set('rate1', cmodel.rate1);
              course.set('rate2', cmodel.rate2);
              course.set('rate3', cmodel.rate3);
              course.set('rateOverall', cmodel.rateOverall);
              course.set('attendanceCount', cmodel.attendanceCount);
              course.set('attendanceOverall', cmodel.attendanceOverall);
              course.set('homeworkCount', cmodel.homeworkCount);
              course.set('homeworkOverall', cmodel.homeworkOverall);
              course.set('birdCount', cmodel.birdCount);
              course.set('birdOverall', cmodel.birdOverall);
              course.set('examCount', cmodel.examCount);
              course.set('examOverall', cmodel.examOverall);
              course.save();

            });
          })(course);
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
