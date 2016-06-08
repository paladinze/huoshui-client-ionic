angular.module('starter.services')

.service('reviewService', function($filter, $rootScope, deptService) {

  var deptImgHash = deptService.getDeptImageHash();
  var fetchStatus = {
    noMoreGoodPost: false,
    noMoreNewPost: false,
    isFetching: false
  };
  var goodPost = [];
  var newPost = [];
  var loadLength = 50;


  this.getGoodPost = function() {
    return goodPost;
  };

  this.getNewPost = function() {
    return newPost;
  };

  this.getFetchStatus = function() {
    return fetchStatus;
  };

  this.clearNewPost = function() {
    newPost.length = 0;
    fetchStatus.noMoreNewPost = false;
  };

  this.fetechMoreNewPost = function() {
    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.descending("createdAt");
    query.include("authorId");
    query.include("courseId");
    query.skip(newPost.length);
    query.limit(loadLength);
    query.find({
      success: function(results) {
        console.log("# of new reviews: " + newPost.length);
        if (results.length === 0) {
          fetchStatus.noMoreNewPost = true;
        }

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var overallRating = object.get('rating').overall;
          var grade = 1;
          if (overallRating <= 7) {
            grade = 0;
          } else if (overallRating >= 11) {
            grade = 2;
          }

          //determine if tags field should be displayed
          var showTags = true;
          if (object.get('tags').length > 0) {
            showTags = true;
          } else {
            showTags = false;
          }

          if (newPost.length !== 0) {
            //console.log("last time: " + newPost[newPost.length-1].createdTime);
            //console.log("now time: " + object.createdAt);
          }


          if (newPost.length === 0 || newPost[newPost.length - 1].createdTime >
            object.createdAt) {

            //console.log(newPost.length);
            newPost.push({
              id: object.id,
              authorName: object.get('authorId').get("username"),
              authorDept: object.get('authorId').get("dept"),
              authorYear: object.get('authorId').get("year"),
              dept: object.get('courseId').get("dept"),
              deptImg: deptImgHash[object.get('courseId').get(
                "dept")],
              profName: object.get('profName'),
              courseName: object.get('courseName'),
              comment: object.get('comment'),
              rating: object.get('rating'),
              grade: grade,
              tags: object.get('tags'),
              showTags: showTags,
              attendance: object.get('attendance'),
              homework: object.get('homework'),
              exam: object.get('exam'),
              upVote: object.get('upVote'),
              downVote: object.get('downVote'),
              voted: false,
              createdTime: object.createdAt
            });

          }



        }
        $rootScope.$apply();
        $rootScope.$broadcast('scroll.infiniteScrollComplete');

      },
      error: function(course, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };



  this.fetechMoreGoodPost = function() {
    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.descending("upVote");
    query.include("authorId");
    query.include("courseId");
    query.limit(loadLength);
    query.skip(goodPost.length);
    query.find({
      success: function(results) {
        console.log("# of good reviews: " + goodPost.length);
        if (results.length === 0) {
          fetchStatus.noMoreGoodPost = true;
        }

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var overallRating = object.get('rating').overall;
          var grade = 1;
          if (overallRating <= 7) {
            grade = 0;
          } else if (overallRating >= 11) {
            grade = 2;
          }

          //determine if tags field should be displayed
          var showTags = true;
          if (object.get('tags').length > 0) {
            showTags = true;
          } else {
            showTags = false;
          }

          goodPost.push({
            id: object.id,
            authorName: object.get('authorId').get("username"),
            authorDept: object.get('authorId').get("dept"),
            authorYear: object.get('authorId').get("year"),
            dept: object.get('courseId').get("dept"),
            deptImg: deptImgHash[object.get('courseId').get(
              "dept")],
            profName: object.get('profName'),
            courseName: object.get('courseName'),
            comment: object.get('comment'),
            rating: object.get('rating'),
            grade: grade,
            tags: object.get('tags'),
            showTags: showTags,
            attendance: object.get('attendance'),
            homework: object.get('homework'),
            exam: object.get('exam'),
            upVote: object.get('upVote'),
            downVote: object.get('downVote'),
            voted: false,
            createdTime: object.createdAt
          });
        }
        $rootScope.$apply();
        $rootScope.$broadcast('scroll.infiniteScrollComplete');
      },
      error: function(course, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };



  this.updateNewPost = function() {
    fetchStatus.isFetching = true;

    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.descending("createdAt");
    query.include("authorId");
    query.include("courseId");
    query.limit(loadLength);
    query.find({
      success: function(results) {

        newPost.length = 0;
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var overallRating = object.get('rating').overall;
          var grade = 1;
          if (overallRating <= 7) {
            grade = 0;
          } else if (overallRating >= 11) {
            grade = 2;
          }

          //determine if tags field should be displayed
          var showTags = true;
          if (object.get('tags').length > 0) {
            showTags = true;
          } else {
            showTags = false;
          }

          newPost.push({
            id: object.id,
            authorName: object.get('authorId').get("username"),
            authorDept: object.get('authorId').get("dept"),
            authorYear: object.get('authorId').get("year"),
            dept: object.get('courseId').get("dept"),
            deptImg: deptImgHash[object.get('courseId').get(
              "dept")],
            profName: object.get('profName'),
            courseName: object.get('courseName'),
            comment: object.get('comment'),
            rating: object.get('rating'),
            grade: grade,
            tags: object.get('tags'),
            showTags: showTags,
            attendance: object.get('attendance'),
            homework: object.get('homework'),
            exam: object.get('exam'),
            upVote: object.get('upVote'),
            downVote: object.get('downVote'),
            voted: false,
            createdTime: object.createdAt
          });
        }

        fetchStatus.isFetching = false;
        $rootScope.$apply();

      },
      error: function(course, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };


  this.updateGoodPost = function() {
    fetchStatus.isFetching = true;

    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.descending("upVote");
    query.include("authorId");
    query.include("courseId");
    query.limit(loadLength);
    query.find({
      success: function(results) {

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var overallRating = object.get('rating').overall;
          var grade = 1;
          if (overallRating <= 7) {
            grade = 0;
          } else if (overallRating >= 11) {
            grade = 2;
          }

          //determine if tags field should be displayed
          var showTags = true;
          if (object.get('tags').length > 0) {
            showTags = true;
          } else {
            showTags = false;
          }

          goodPost.push({
            id: object.id,
            authorName: object.get('authorId').get("username"),
            authorDept: object.get('authorId').get("dept"),
            authorYear: object.get('authorId').get("year"),
            dept: object.get('courseId').get("dept"),
            deptImg: deptImgHash[object.get('courseId').get(
              "dept")],
            profName: object.get('profName'),
            courseName: object.get('courseName'),
            comment: object.get('comment'),
            rating: object.get('rating'),
            grade: grade,
            tags: object.get('tags'),
            showTags: showTags,
            attendance: object.get('attendance'),
            homework: object.get('homework'),
            exam: object.get('exam'),
            upVote: object.get('upVote'),
            downVote: object.get('downVote'),
            voted: false,
            createdTime: object.createdAt
          });
        }
        fetchStatus.isFetching = false;
        $rootScope.$apply();
      },
      error: function(course, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };



});
