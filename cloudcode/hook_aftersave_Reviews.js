/*----------------------------------------------------------------
Extract this review instance
-----------------------------------------------------------------*/
var srcData = {
	courseId: request.object.get('courseId').id,
	courseName: request.object.get('courseName'),
	profName: request.object.get('profName'),
	rate1: request.object.get('rating').rate1,
	rate2: request.object.get('rating').rate2,
	rate3: request.object.get('rating').rate3,
	rateOverall: request.object.get('rating').overall,

	bird: request.object.get('bird'),
	attendance: request.object.get('attendance'),
	homework: request.object.get('homework'),
	exam: request.object.get('exam'),

	tags: request.object.get('tags'),
	upVote: request.object.get('upVote'),
	downVote: request.object.get('downVote'),
};


/*----------------------------------------------------------------
Update corresponding course stats
-----------------------------------------------------------------*/

query = new AV.Query("Courses");
query.get(srcData.courseId, {
	success: function(course) {

		//get existing data for the course
		var tgtData = {
			reviewCount: course.get('reviewCount'),
			reviewGoodCount: course.get('reviewGoodCount'),

			rateOverall: course.get('rateOverall'),
			rate1: course.get('rate1'),
			rate2: course.get('rate2'),
			rate3: course.get('rate3'),

			birdOverall: course.get('birdOverall'),
			birdCount: course.get('birdCount'),

			attendanceOverall: course.get('attendanceOverall'),
			attendanceCount: course.get('attendanceCount'),

			homeworkOverall: course.get('homeworkOverall'),
			homeworkCount: course.get('homeworkCount'),

			examOverall: course.get('examOverall'),
			examCount: course.get('examCount'),

			tags: course.get('tags')
		};

		//rating
		var rateOverall = (tgtData.rateOverall * tgtData.reviewCount + srcData.rateOverall /
			3) / (tgtData.reviewCount + 1);
		var rate1 = (tgtData.rate1 * tgtData.reviewCount + srcData.rate1) / (
			tgtData.reviewCount + 1);
		var rate2 = (tgtData.rate2 * tgtData.reviewCount + srcData.rate2) / (
			tgtData.reviewCount + 1);
		var rate3 = (tgtData.rate3 * tgtData.reviewCount + srcData.rate3) / (
			tgtData.reviewCount + 1);

		course.increment("reviewCount");
		if (srcData.rateOverall > 11) {
			course.increment("reviewGoodCount");
		}
		course.set('rateOverall', rateOverall);
		course.set('rate1', rate1);
		course.set('rate2', rate2);
		course.set('rate3', rate3);

		//bird
		if (srcData.bird.value !== 0) {
			var birdOverall = (tgtData.birdOverall * tgtData.birdCount + srcData.bird
				.value) / (tgtData.birdCount + 1);
			course.increment("birdCount");
			course.set('birdOverall', birdOverall);
		}

		//attendance
		if (srcData.attendance.value !== 0) {
			var attendanceOverall = (tgtData.attendanceOverall * tgtData.attendanceCount +
				srcData.attendance.value) / (tgtData.attendanceCount + 1);
			course.increment("attendanceCount");
			course.set('attendanceOverall', attendanceOverall);
		}

		//homework
		if (srcData.homework.value !== 0) {
			var homeworkOverall = (tgtData.homeworkOverall * tgtData.homeworkCount +
				srcData.homework.value) / (tgtData.homeworkCount + 1);
			course.increment("homeworkCount");
			course.set('homeworkOverall', homeworkOverall);
		}

		//exam
		if (srcData.exam.touched) {
			var examValue = 0;
			if (srcData.exam.examprep.checked) {
				examValue++;
			}
			if (srcData.exam.openbook.checked) {
				examValue++;
			}
			if (srcData.exam.oldquestion.checked) {
				examValue++;
			}
			if (srcData.exam.easiness.checked) {
				examValue++;
			}

			var examOverall = (tgtData.examOverall * tgtData.examCount + examValue) /
				(tgtData.examCount + 1);
			course.increment("examCount");
			course.set('examOverall', examOverall);
		}

		//tags
		var srcTagIds = [];
		for (var i = 0; i < srcData.tags.length; ++i) {
			srcTagId = parseInt(srcData.tags[i].id);
			srcTagIds.push(srcTagId);
			tgtData.tags[srcTagId]++;

		}
		course.set('tags', tgtData.tags);



		course.save();
	},
	error: function(error) {
		throw error.code + " : " + error.message;
	}
});
