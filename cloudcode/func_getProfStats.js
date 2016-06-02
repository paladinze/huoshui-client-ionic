var profName = request.params.profName;
var dept = request.params.dept;

var query = new AV.Query('Reviews');
query.equalTo('profName', profName);
query.include("courseId");
query.find({
  success: function(results) {

    var reviewStats = {
      "bird": {
        "overall": 0,
      },
      "attendance": {
        "overall": 0,
      },
      "homework": {
        "overall": 0,
      },
      "exam": {
        "overall": 0,
      },
      "rating": {
        "rateOverall": 0,
        "rateCount": 0,
        "rateGoodCount": 0,
        "rateMidCount": 0,
        "rateBadCount": 0,
        "rate1Avg": 0,
        "rate2Avg": 0,
        "rate3Avg": 0,
      },
    };

    var ratingCount = 0;
    var ratingSum = 0;
    var rate1Sum = 0;
    var rate2Sum = 0;
    var rate3Sum = 0;
    var rateGoodCount = 0;
    var rateMidCount = 0;
    var rateBadCount = 0;

    var birdSum = 0;
    var birdCount = 0;
    var birdAvg = 0;
    var attendanceSum = 0;
    var attendanceCount = 0;
    var attendanceAvg = 0;
    var homeworkSum = 0;
    var homeworkCount = 0;
    var homeworkAvg = 0;

    var examSum = 0;
    var examCount = 0;
    var examAvg = 0;

    for (var i = 0; i < results.length; ++i) {
      var object = results[i];
      var rawData = {
        dept: object.get('courseId').get("dept"),
        courseName: object.get('courseName'),
        rating: object.get('rating'),
        bird: object.get('bird'),
        attendance: object.get('attendance'),
        homework: object.get('homework'),
        exam: object.get('exam'),
        upVote: object.get('upVote'),
        downVote: object.get('downVote'),
      };

      if (dept) {
        if (dept === rawData.dept) {
          //rating
          ratingCount++;
          ratingSum += rawData.rating.overall;
          rate1Sum += rawData.rating.rate1;
          rate2Sum += rawData.rating.rate2;
          rate3Sum += rawData.rating.rate3;

          if (rawData.rating.overall >= 11) {
            reviewStats.rating.rateGoodCount++;
          } else if (rawData.rating.overall <= 7) {
            reviewStats.rating.rateBadCount++;
          } else {
            reviewStats.rating.rateMidCount++;
          }

          //bird and attendance and homework
          if (rawData.bird.value !== 0) {
            birdCount++;
            birdSum += rawData.bird.value;
          }
          if (rawData.attendance.value !== 0) {
            attendanceCount++;
            attendanceSum += rawData.attendance.value;
          }
          if (rawData.homework.value !== 0) {
            homeworkCount++;
            homeworkSum += rawData.homework.value;
          }

          //exam
          if (rawData.exam.touched) {
            examCount++;
            if (rawData.exam.examprep.checked) {
              examSum++;
            }
            if (rawData.exam.openbook.checked) {
              examSum++;
            }
            if (rawData.exam.oldquestion.checked) {
              examSum++;
            }
            if (rawData.exam.easiness.checked) {
              examSum++;
            }
          }
        }
      } else {
        //rating
        ratingCount++;
        ratingSum += rawData.rating.overall;
        rate1Sum += rawData.rating.rate1;
        rate2Sum += rawData.rating.rate2;
        rate3Sum += rawData.rating.rate3;

        if (rawData.rating.overall >= 11) {
          reviewStats.rating.rateGoodCount++;
        } else if (rawData.rating.overall <= 7) {
          reviewStats.rating.rateBadCount++;
        } else {
          reviewStats.rating.rateMidCount++;
        }

        //bird and attendance and homework
        if (rawData.bird.value !== 0) {
          birdCount++;
          birdSum += rawData.bird.value;
        }
        if (rawData.attendance.value !== 0) {
          attendanceCount++;
          attendanceSum += rawData.attendance.value;
        }
        if (rawData.homework.value !== 0) {
          homeworkCount++;
          homeworkSum += rawData.homework.value;
        }

        //exam
        if (rawData.exam.touched) {
          examCount++;
          if (rawData.exam.examprep.checked) {
            examSum++;
          }
          if (rawData.exam.openbook.checked) {
            examSum++;
          }
          if (rawData.exam.oldquestion.checked) {
            examSum++;
          }
          if (rawData.exam.easiness.checked) {
            examSum++;
          }
        }
      }


      //rating
      reviewStats.rating.rateCount = ratingCount;
      reviewStats.rating.rateOverall = ratingSum / (3 * ratingCount);
      reviewStats.rating.rate1Avg = rate1Sum / (ratingCount);
      reviewStats.rating.rate2Avg = rate2Sum / (ratingCount);
      reviewStats.rating.rate3Avg = rate3Sum / (ratingCount);

      //bird and attendance and homework
      birdAvg = birdSum / birdCount;
      reviewStats.bird.overall = birdAvg;

      attendanceAvg = attendanceSum / attendanceCount;
      reviewStats.attendance.overall = attendanceAvg;

      homeworkAvg = homeworkSum / homeworkCount;
      reviewStats.homework.overall = homeworkAvg;

      //exam
      examAvg = examSum / examCount;
      reviewStats.exam.overall = examAvg;
    }

    response.success(reviewStats);
  },
  error: function() {
    response.error('review stats lookup failed');
  }
});
