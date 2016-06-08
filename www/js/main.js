angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("login/login.html","<ion-view hide-nav-bar=\"true\" >\n	<ion-content  class=\"scroll-bg-1\" has-bouncing=\"false\">\n	\n\n		<div class=\"container-tagline\">\n            <ks-swiper-container  override-parameters=\"{\'autoplay\':\'5000\',\n                                                       \'effect\':\'slide\',\n                                                       \'paginationHide\':\'true\',\n                                                       \'paginationClickable\': \'false\',\n                                                       }\"\n                                 initial-slide=\"0\" \n                                 loop=\"true\" \n                                 show-nav-buttons=\"false\" \n                                 slides-per-view=\"1\" \n                                 space-between=\"0\" \n                                 pagination-clickable=\"false\"  \n                                 on-ready=\"onReadySwiper(swiper)\">\n                <ks-swiper-slide class=\"swiper-slide s1\" ng-repeat=\"headline in headlines\" ng-click=\"alert()\">\n                    <div id=\"login-tagline\" class=\"text-tagline animated  fadeIn \">\n                        <div class=\"comment-to\">\n                            <p>评 {{headline.to}}:</p>\n                        </div>\n                        <div class=\"comment-detail\">\n                            <p>&nbsp;&nbsp;&nbsp;&nbsp;\n                                “{{headline.content}}”</p>\n                        </div>\n                        <div class=\"comment-from\">\n                            <p>--- {{headline.from}}</p>\n                        </div>\n                    </div>\n                </ks-swiper-slide>						\n\n            </ks-swiper-container>    		        \n		</div>   \n        \n\n\n		<div class=\"container-login-form\">\n            <div>\n                <form class=\"padding login-form\" name=\"loginForm\">\n                    <label class=\"\">\n                        <input type=\"email\" placeholder=\"邮箱\" ng-model=\"user.email\" name=\"email\" required style=\"margin-bottom:10px\">\n                    </label>\n\n                    <label class=\"\">\n                        <input type=\"password\" placeholder=\"密码\" ng-model=\"user.password\" name=\"password\" required>\n                    </label>\n                </form>     \n\n                <button ng-click=\"login()\" \n                        class=\"button button-block button-positive button-login\">\n                    登录\n                </button>\n                <p style=\"margin:auto;text-align:center;font-size:14px\">\n                    <span ng-click=\"guestLogin()\">游客登录</span> ｜ <span ng-click=\"gotoSignup()\">快捷注册</span>\n                </p>\n            </div>\n		</div>\n		\n\n	</ion-content>\n</ion-view>\n");
$templateCache.put("tab-discover/discover-list.html","<ion-view view-title=\"列表\" >\n\n    <ion-nav-buttons side=\"secondary\">\n        <button class=\"button button-clear\" ng-click=\"showFilterBar()\">\n            <i class=\"fa fa-search fa-lg\"></i>\n        </button>\n    </ion-nav-buttons>\n\n	<ion-header-bar class=\"bar bar-subheader item-input-inset\" >\n\n        <div class=\"button-bar button-bar-sort\">\n            <a class=\"button button-clear\"\n               ng-click=\"setFilterOption(\'rate1\')\"\n                ng-class=\"isActive(\'rate1\') ? \'button-light\' : \'button-stable\'\" >\n                专业&nbsp;<i class=\"fa fa-arrow-circle-down\"></i>\n            </a>\n            <a class=\"button button-clear\"\n               ng-click=\"setFilterOption(\'rate2\')\"\n                ng-class=\"isActive(\'rate2\') ? \'button-light\' : \'button-stable\'\" >\n                表达&nbsp;<i class=\"fa fa-arrow-circle-down\"></i>\n            </a>\n            <a class=\"button button-clear\"\n               ng-click=\"setFilterOption(\'rate3\')\"\n                ng-class=\"isActive(\'rate3\') ? \'button-light\' : \'button-stable\'\" >\n                友好&nbsp;<i class=\"fa fa-arrow-circle-down\"></i>\n            </a>\n        </div>\n    </ion-header-bar>\n\n\n\n  <ion-content scroll=\"true\" class=\"scroll-bg-1\">\n\n\n\n        <div class=\"page-loading-spinner\" ng-show=\"showSpinner\">\n        	<ion-spinner class=\"spinner-positive\" icon=\"ripple\"></ion-spinner>\n        </div>\n\n\n\n        <div class=\"list\" >\n            <a class=\"item item-avatar \"\n			   ng-repeat=\"course in displayCourses track by $index\"\n			   ui-sref=\"tab.listing-detail-4({ listingId: course.prof, deptId: course.dept})\">\n                <span class=\"conditional-images\">\n                    <img src=\"{{course.deptImg}}\">\n                </span>\n              <h2>{{course.prof}}</h2>\n              <p>{{course.name}}</p>\n							<div style=\"position: absolute; top: 5px; right: 15px;\">\n								<p>\n                  专业：{{course.rate1 | number: 1}}\n                </p>\n                <p>\n                  表达：{{course.rate2 | number: 1}}\n                </p>\n                <p>\n                  友好：{{course.rate3 | number: 1}}\n                </p>\n							</div>\n            </a>\n        </div>\n\n\n		<ion-infinite-scroll on-infinite=\"loadMore()\"\n                             distance=\"1%\"\n                             ng-if=\"!noMorePost\"\n                             class=\"ispinner\"\n                             spinner=\"ripple\">\n		</ion-infinite-scroll>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-discover/discover.html","<ion-view view-title=\"逛逛\" hide-nav-bar=\"false\">\n\n	<ion-header-bar class=\"bar bar-subheader item-input-inset\">\n	  <label class=\"item-input-wrapper\">\n		<i class=\"icon ion-ios-search placeholder-icon\"></i>\n		<input type=\"search\"\n			   placeholder=\"教师姓名，课程或任何关联词\"\n               style=\"color: white\"\n			   ng-model=\"searchText.text\"\n			   ng-change=\"startSearch()\">\n	  </label>\n	  <button class=\"button button-clear\" ng-click=\"cancelSearch()\">\n		<span style=\"font-size:15px\">取消</span>\n	  </button>\n	</ion-header-bar>\n\n\n\n    <ion-content class=\"scroll-bg-1\">\n\n\n\n    <div class=\"row\" ng-repeat=\"deptGroup in deptList | chunkBy:4\"\n         style=\"padding-left:0px;padding-right:0px;padding-top:0px; margin-top:21px\"\n         ng-if=\"showPromoContent\">\n        <div class=\"\" ng-repeat=\"dept in deptGroup\"\n             style=\"display:block;float: left; width: 25%;\n                    padding: 5px 0px 5px 0px;\"  >\n                <img ng-click=\"gotoDiscoverList(dept.value)\"\n                     ng-src=\"{{dept.img}}\"\n                     width=\"55%\" style=\"margin:auto; display:block\">\n                <p style=\"text-align:center; font-size: 12px; margin-bottom:0px; margin-top:3px;\">{{dept.name}}</p>\n        </div>\n    </div>\n\n    <div class=\"list\" ng-if=\"!showPromoContent\">\n        <a class=\"item item-avatar item-icon-right\"\n            ng-repeat=\"course in displayCourses track by $index\"\n            ui-sref=\"tab.listing-detail-4({ listingId: course.prof, deptId: course.dept})\">\n            <span class=\"conditional-images\" ng-switch on=\"course.dept\">\n                <img src=\'{{course.deptImg}}\'>\n            </span>\n            <h2>{{course.prof}}</h2>\n            <p>{{course.name}}</p>\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n        </a>\n    </div>\n    <div class=\"user-add-course-prompt\"  ng-if=\"showUserAddCoursePrompt && !showPromoContent\">\n        <p>没找到目标？换个关键字试试呢。（如果还是没找到，你可以选择主动添加该课程）</p>\n        <button class=\"button button-positive\"\n                ng-click=\"showUserAddCourseForm();\"\n                >\n          添加课程\n        </button>\n    </div>\n\n    <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"\n                         ng-if=\"!noMorePost && !showPromoContent\" class=\"ispinner\" spinner=\"ripple\">\n    </ion-infinite-scroll>\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tab-discover/listing-detail-discover.html","<ion-view view-title=\"课程评价\" cache-view=\"false\" can-swipe-back=\"true\">      \n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"gotoDetailReview(\'discover\')\">\n                    <i class=\"icon ion-compose\"></i>\n      </button>\n  </ion-nav-buttons>   \n     <ion-content class=\"padding scroll-bg-1\" style=\"padding:0\" >\n\n    <!--\n    <ion-refresher pulling-text=\"刷新请下拉...\" on-refresh=\"doRefresh()\"  class=\"ispinner\" spinner=\"ios\">\n    </ion-refresher> \n    -->\n                  \n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; padding-left:15px;\">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:80%; display:block;\">\n                            <img style=\"width:100%; max-height: 100px\" src=\"img/default-profile.png\" >\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n                        <div class=\"row\" style=\"padding:0px\">\n                            <p><span style=\"font-size:18px; color: white;\">{{profCourses[0].prof}}\n                                </span>&nbsp;&nbsp;{{profCourses[0].position}}（{{profCourses[0].dept}}）</p>\n                        </div>\n                        <hr style=\"font-size: 5px;background-color:white; \n                                   color: white;border-style:solid;\n                                   margin-top:5px;margin-bottom:5px; margin-right:20px\">\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水分：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n                        \n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;padding-right:10px\">\n                  <p>授课：<span ng-repeat=\"course in profCourses\">{{course.name}}{{$last ? \'\' : \'，\'}}</span></p>\n                </div>\n                <div class=\"item-text-wrap\" style=\"padding-right:10px;float:right;margin-top:10px\">\n                    <p>\n                        <span ng-click=\"addToCollection()\">\n                            <i class=\"fa fa-plus-square\" ></i> 关注\n                        </span>&nbsp;\n                        <span ng-click=\"gotoDetailReview(\'discover\')\">\n                            <i class=\"fa fa-dot-circle-o\">\n                            </i> 点评\n                        </span>\n                    </p>\n                </div>                \n            </div>\n        </div>    \n         \n         \n         \n         <!--\n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; \">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:75%;margin-left:auto; margin-right:auto; display:block;\">\n                        <img style=\"width:100%; max-height: 80px\" src=\"img/default-profile.png\" >\n						<p style=\"color: #E54D42; background-color: white; text-align: center;\n								  border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;\"\n						   ng-click=\"addToCollection()\">+关注</p>\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>姓名：{{profCourses[0].prof}}</p>\n									<p>教职：{{profCourses[0].position}}</p> \n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>院系：{{profCourses[0].dept}}</p>\n									<p>校区：{{profCourses[0].campus}}</p>    \n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水份：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n\n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;\">\n                  <p><span ng-repeat=\"course in profCourses\"> 《{{course.name}}》 </span></p>\n                </div>\n            </div>\n        </div>            \n    -->\n\n        <div class=\"card card-review\"  >\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"padding:0px; text-align:center;\">\n                    <div class=\"col-50\">\n                        <p>好评率（{{reviewStats.ratingCount}}人参与）</p>\n                    </div>\n                    <div class=\"col-50\">\n                        <p>综合评分（{{reviewStats.ratingOverall  | number: 1}}分）</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row \">\n                <div class=\"col-50\" style=\"border-right: rgba(128, 128, 128, 0.23) thin solid;\">\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"pieOption\" data=\"pieData\"></nvd3>\n                        </div>\n                </div>            \n\n                <div class=\"col-50\">\n                    <!--\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"barOption\" data=\"barData\"></nvd3>\n                        </div>                    \n                    -->\n\n                        <div class=\"\" style=\"padding:5px\">\n                            <canvas \n                                id=\"bar\" \n                                class=\"chart chart-bar\" \n                                width=\"100%\"\n                                height=\"80px\"\n                                data=\"barData\" \n                                labels=\"barLabels\" \n                                legend=\"false\" \n                                series=\"barSeries\" \n                                options=\"{\n                                            scaleOverride: true,\n                                            scaleSteps: 5,\n                                            scaleStepWidth: 1,\n                                            barValueSpacing : 12,\n                                            scaleStartValue: 0\n                                         }\">\n                            </canvas>\n                        </div>\n                </div>\n            </div>\n        </div>\n        \n		 \n        <div ng-repeat=\"review in allReviews\">\n            <div class=\"card card-review\" >\n				<div class=\"heading\">\n					<div class=\"row\">\n						<div class=\"col-20\">\n                            <span ng-switch on=\"review.grade\">\n                               <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                               <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                               <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                               <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                            </span>\n						</div>\n						<div class=\"col-80\">\n							<p>{{review.courseName}}\n								<span style=\"float:right\">\n									{{review.rating.rate1}} / {{review.rating.rate2}} / {{review.rating.rate3}}分\n								</span>\n							</p>\n							<p>{{review.authorName}}，{{review.authorDept}}－{{review.authorYear % 100  | appendZero}}级\n								<span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\">\n								</span>\n							</p>\n							\n						</div>\n					</div>\n				</div>\n				<div class=\"body\">\n					<div class=\"\">\n						<p> {{review.comment}}</p>\n					</div>\n					<div class=\"tags\">\n						<p style=\"margin:0px;\" ng-if=\"review.showTags\"> 标签：\n							<span ng-repeat=\"tag in review.tags\">{{tag.value}}{{$last ? \'\' : \'， \'}}</span>\n						</p>					\n						<!--\n							<ul class=\"tags\">\n							  <li ng-repeat=\"tag in review.tags\">\n								  <a class=\"tag\">{{tag.value}}</a>\n							  </li>\n							</ul>\n						-->\n					</div>				\n					<div class=\"dig\" style=\"float:right\">\n						  <p class=\"\">\n							  <span ng-click=\"upVoteIncrement(review, true)\" \n									ng-disabled=\"review.voted\"> \n								  <i class=\"fa fa-thumbs-o-up fa\"></i>&nbsp;{{review.upVote}}&nbsp;</span>&nbsp;&nbsp;\n							  <span ng-click=\"upVoteIncrement(review, false)\" \n									ng-disabled=\"review.voted\">\n								  <i class=\"fa fa-thumbs-o-down fa\"></i>&nbsp;{{review.downVote}}&nbsp;</span>\n						  </p>\n					</div>\n				</div>\n            </div>                \n        </div>		 \n		 \n        <!-- no post placeholder -->\n        <div class=\"placeholder-no-post\" ng-if=\"showNoPostPlaceholder\">\n            <div class=\"card card-review\" \n                 style=\"height: 150px\">\n                <p style=\" font-size: 14px;\n                        text-align: center;\n                        margin-top: 45px;       \n                          \">\n                    该老师目前没啥人气...\n                </p>\n         \n            </div>\n        </div> \n   \n         \n         \n        \n    <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" class=\"ispinner\" spinner=\"ripple\">\n    </ion-infinite-scroll>      \n         \n    </ion-content>\n</ion-view>");
$templateCache.put("tab-discover/listing-detail-review-discover.html","<ion-view view-title=\"你说了算\">\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"submitEntry()\">发送</button>\n  </ion-nav-buttons>\n\n    <ion-content class=\"padding \" style=\"padding:0px\" has-bouncing=\"false\">\n\n        <!--\n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item\" style=\"padding: 5px 5px 5px 15px; font-size: 15px\">\n\n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\"\n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label>\n            </div>\n        </div>\n        -->\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_target.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>评价对象</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\"\n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label>\n            </div>\n        </div>\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>总体评价</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 15px;\">\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">专业水平：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate1\" ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">表达能力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate2\" ng-change=\"updateOverallRating()\"  max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">亲和力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate3\"  ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n\n                <span class=\"review-grade-text\" style=\"top:135px\">\n                    <p style=\"margin-bottom: 0px\">\n                        <span style=\"color: #E54D42\">{{reviewRating.overall / 3 | number: 1}}</span> / <span style=\"color: #E54D42\">5.0分</span></p>\n                    <p><span style=\"color: #E54D42\">（{{reviewGrade}}）</span></p>\n                </span>\n\n                <!--\n                <span class=\"review-grade-icon\" ng-switch on=\"grade\">\n                   <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                   <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                   <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                   <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                </span>\n                -->\n            </div>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>短评（最多300字）</p>\n                </div>\n            </div>\n\n          <label class=\"item item-input\">\n            <textarea placeholder=\"你对课程和老师的看法：\"  maxlength=\"300\" style=\"height:135px;\" ng-model=\"reviewComment.text\"></textarea>\n          </label>\n        </div>\n\n        <div class=\"item item-divider\" style=\"padding-top:20px; padding-bottom:20px\">\n			<p style=\"text-align:center; color: #E54D42; font-weight:bold\">以下内容为选填</p>\n            <p style=\"text-align:center; color: #E54D42; font-weight:bold\">\n                <i class=\"fa fa-angle-double-down fa-2x\"></i>\n            </p>\n		</div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_tag.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>标签 (选填：限三个）</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <ul class=\"tags\">\n                  <li ng-if=\"reviewTags.length == 0\"><a class=\"tag\">（未选择）</a></li>\n                  <li ng-repeat=\"tag in tagOptions\" ng-if=\"tag.checked\"><a class=\"tag\">{{tag.value}}</a></li>\n\n                </ul>\n            </div>\n        </div>\n\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>课程体验（选填）</p>\n                </div>\n            </div>\n              <label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  水课鉴定：\n                </div>\n                <select name=\"birdSelect\"\n                        id=\"birdSelect\"\n                        ng-model=\"birdInfo.selectedOption\"\n                        ng-options=\"option.name for option in birdInfo.allOptions track by option.id\">\n                </select>\n              </label>\n			<label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  点名情况：\n                </div>\n                <select name=\"attendanceSelect\"\n                        id=\"attendanceSelect\"\n                        ng-model=\"attendanceInfo.selectedOption\"\n                        ng-options=\"option.name for option in attendanceInfo.allOptions track by option.id\">\n                </select>\n              </label>\n              <label class=\"item item-input item-select\" style=\"margin-bottom:10px;\">\n                <div class=\"input-label\">\n                  作业量：\n                </div>\n                <select name=\"homeworkSelect\"\n                        id=\"homeworkSelect\"\n                        ng-model=\"homeworkInfo.selectedOption\"\n                        ng-options=\"option.name for option in homeworkInfo.allOptions track by option.id\">\n                </select>\n              </label>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>考试体验（选填）</p>\n                </div>\n            </div>\n            <div class=\"card-content\">\n				<form name=\"examForm\">\n					<ion-toggle ng-model=\"examInfo.touched\"\n								ion-toggle-text=\"是;否\"\n								name=\"examToggle\"\n								ng-change=\"examReset(examInfo.touched)\"\n								toggle-class=\"toggle-positive\">\n						已参加试卷考（点击展开更多）\n					</ion-toggle>\n                <div ng-show=\"examInfo.touched\">\n					<ion-toggle ng-model=\"examInfo.openbook.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examB\"\n								ng-change=\"examSetTouched(\'B\')\"\n								toggle-class=\"toggle-positive\">\n						开卷\n					</ion-toggle>\n                    <ion-toggle ng-model=\"examInfo.examprep.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examA\"\n								ng-change=\"examSetTouched(\'A\')\"\n								toggle-class=\"toggle-positive\">\n						划重点\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.oldquestion.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examC\"\n								ng-change=\"examSetTouched(\'C\')\"\n								toggle-class=\"toggle-positive\">\n						做过的原题较多\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.easiness.checked\"\n								ion-toggle-text=\"松;严\"\n								name=\"examD\"\n								ng-change=\"examSetTouched(\'D\')\"\n								toggle-class=\"toggle-positive\">\n						给分比较宽松\n					</ion-toggle>\n                </div>\n				</form>\n            </div>\n        </div>\n\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tab-listing/listing-detail-review.html","<ion-view view-title=\"你说了算\">\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"submitEntry()\">发送</button>\n  </ion-nav-buttons>\n\n    <ion-content class=\"padding \" style=\"padding:0px\" has-bouncing=\"false\">\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_target.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>评价对象</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\"\n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label>\n            </div>\n        </div>\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>总体评价</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 15px;\">\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">专业水平：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate1\" ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">表达能力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate2\" ng-change=\"updateOverallRating()\"  max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">亲和力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate3\"  ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n\n                <span class=\"review-grade-text\" style=\"top:135px\">\n                    <p style=\"margin-bottom: 0px\">\n                        <span style=\"color: #E54D42\">{{reviewRating.overall / 3 | number: 1}}</span> / <span style=\"color: #E54D42\">5.0分</span></p>\n                    <p><span style=\"color: #E54D42\">（{{reviewGrade}}）</span></p>\n                </span>\n\n                <!--\n                <span class=\"review-grade-icon\" ng-switch on=\"grade\">\n                   <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                   <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                   <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                   <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                </span>\n                -->\n            </div>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>短评（最多300字）</p>\n                </div>\n            </div>\n\n          <label class=\"item item-input\">\n            <textarea placeholder=\"你对课程和老师的看法：\"  maxlength=\"300\" style=\"height:135px;\" ng-model=\"reviewComment.text\"></textarea>\n          </label>\n        </div>\n\n        <div class=\"item item-divider\" style=\"padding-top:20px; padding-bottom:20px\">\n			<p style=\"text-align:center; color: #E54D42; font-weight:bold\">以下内容为选填</p>\n            <p style=\"text-align:center; color: #E54D42; font-weight:bold\">\n                <i class=\"fa fa-angle-double-down fa-2x\"></i>\n            </p>\n		</div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_tag.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>标签 (选填：限三个）</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <ul class=\"tags\">\n                  <li ng-if=\"reviewTags.length == 0\"><a class=\"tag\">（未选择）</a></li>\n                  <li ng-repeat=\"tag in tagOptions\" ng-if=\"tag.checked\"><a class=\"tag\">{{tag.value}}</a></li>\n\n                </ul>\n            </div>\n        </div>\n\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>课程体验（选填）</p>\n                </div>\n            </div>\n              <label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  水课鉴定：\n                </div>\n                <select name=\"birdSelect\"\n                        id=\"birdSelect\"\n                        ng-model=\"birdInfo.selectedOption\"\n                        ng-options=\"option.name for option in birdInfo.allOptions track by option.id\">\n                </select>\n              </label>\n			<label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  点名情况：\n                </div>\n                <select name=\"attendanceSelect\"\n                        id=\"attendanceSelect\"\n                        ng-model=\"attendanceInfo.selectedOption\"\n                        ng-options=\"option.name for option in attendanceInfo.allOptions track by option.id\">\n                </select>\n              </label>\n              <label class=\"item item-input item-select\" style=\"margin-bottom:10px;\">\n                <div class=\"input-label\">\n                  作业量：\n                </div>\n                <select name=\"homeworkSelect\"\n                        id=\"homeworkSelect\"\n                        ng-model=\"homeworkInfo.selectedOption\"\n                        ng-options=\"option.name for option in homeworkInfo.allOptions track by option.id\">\n                </select>\n              </label>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>考试体验（选填）</p>\n                </div>\n            </div>\n            <div class=\"card-content\">\n				<form name=\"examForm\">\n					<ion-toggle ng-model=\"examInfo.touched\"\n								ion-toggle-text=\"是;否\"\n								name=\"examToggle\"\n								ng-change=\"examReset(examInfo.touched)\"\n								toggle-class=\"toggle-positive\">\n						已参加试卷考（点击展开更多）\n					</ion-toggle>\n                <div ng-show=\"examInfo.touched\">\n					<ion-toggle ng-model=\"examInfo.openbook.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examB\"\n								ng-change=\"examSetTouched(\'B\')\"\n								toggle-class=\"toggle-positive\">\n						开卷\n					</ion-toggle>\n                    <ion-toggle ng-model=\"examInfo.examprep.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examA\"\n								ng-change=\"examSetTouched(\'A\')\"\n								toggle-class=\"toggle-positive\">\n						划重点\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.oldquestion.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examC\"\n								ng-change=\"examSetTouched(\'C\')\"\n								toggle-class=\"toggle-positive\">\n						做过的原题较多\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.easiness.checked\"\n								ion-toggle-text=\"松;严\"\n								name=\"examD\"\n								ng-change=\"examSetTouched(\'D\')\"\n								toggle-class=\"toggle-positive\">\n						给分比较宽松\n					</ion-toggle>\n                </div>\n				</form>\n            </div>\n        </div>\n\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tab-listing/listing-detail.html","<ion-view view-title=\"课程评价\" cache-view=\"false\" can-swipe-back=\"true\">      \n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"gotoDetailReview(\'listing\')\">\n                    <i class=\"icon ion-compose\"></i>\n      </button>\n  </ion-nav-buttons>   \n     <ion-content class=\"padding scroll-bg-1\" style=\"padding:0\" >\n\n    <!--\n    <ion-refresher pulling-text=\"刷新请下拉...\" on-refresh=\"doRefresh()\"  class=\"ispinner\" spinner=\"ios\">\n    </ion-refresher> \n    -->\n                  \n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; padding-left:15px;\">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:80%; display:block;\">\n                            <img style=\"width:100%; max-height: 100px\" src=\"img/default-profile.png\" >\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n                        <div class=\"row\" style=\"padding:0px\">\n                            <p><span style=\"font-size:18px; color: white;\">{{profCourses[0].prof}}\n                                </span>&nbsp;&nbsp;{{profCourses[0].position}}（{{profCourses[0].dept}}）</p>\n                        </div>\n                        <hr style=\"font-size: 5px;background-color:white; \n                                   color: white;border-style:solid;\n                                   margin-top:5px;margin-bottom:5px; margin-right:20px\">\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水分：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n                        \n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;padding-right:10px\">\n                  <p>授课：<span ng-repeat=\"course in profCourses\">{{course.name}}{{$last ? \'\' : \'，\'}}</span></p>\n                </div>\n                <div class=\"item-text-wrap\" style=\"padding-right:10px;float:right;margin-top:10px\">\n                    <p>\n                        <!--      \n                        <span ng-click=\"showSharingOptions()\">\n                            <i class=\"fa fa-share-alt-square \" ></i> 分享\n                        </span>&nbsp;                \n                        -->\n                        <span ng-click=\"addToCollection()\">\n                            <i class=\"fa fa-plus-square\" ></i> 关注\n                        </span>&nbsp;\n                        <span ng-click=\"gotoDetailReview(\'listing\')\">\n                            <i class=\"fa fa-dot-circle-o\">\n                            </i> 点评\n                        </span>\n                    </p>\n                </div>  \n                                \n            </div>\n        </div>    \n\n         \n         \n\n        <div class=\"card card-review\"  >\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"padding:0px; text-align:center;\">\n                    <div class=\"col-50\">\n                        <p>好评率（{{reviewStats.ratingCount}}人参与）</p>\n                    </div>\n                    <div class=\"col-50\">\n                        <p>综合评分（{{reviewStats.ratingOverall  | number: 1}}分）</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row \">\n                <div class=\"col-50\" style=\"border-right: rgba(128, 128, 128, 0.23) thin solid;\">\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"pieOption\" data=\"pieData\"></nvd3>\n                        </div>\n                </div>            \n\n                <div class=\"col-50\">\n                        <div class=\"\" style=\"padding:5px\">\n                            <canvas \n                                id=\"bar\" \n                                class=\"chart chart-bar\" \n                                width=\"100%\"\n                                height=\"80px\"\n                                data=\"barData\" \n                                labels=\"barLabels\" \n                                legend=\"false\" \n                                series=\"barSeries\" \n                                options=\"{\n                                            scaleOverride: true,\n                                            scaleSteps: 5,\n                                            scaleStepWidth: 1,\n                                            barValueSpacing : 12,\n                                            scaleStartValue: 0\n                                         }\">\n                            </canvas>\n                        </div>\n                </div>\n            </div>\n        </div>\n        \n		 \n        <div ng-repeat=\"review in allReviews\">\n            <div class=\"card card-review\" >\n				<div class=\"heading\">\n					<div class=\"row\">\n						<div class=\"col-20\">\n                            <span ng-switch on=\"review.grade\">\n                               <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                               <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                               <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                               <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                            </span>\n						</div>\n						<div class=\"col-80\">\n							<p>{{review.courseName}}\n								<span style=\"float:right\">\n									{{review.rating.rate1}} / {{review.rating.rate2}} / {{review.rating.rate3}}分\n								</span>\n							</p>\n							<p>{{review.authorName}}，{{review.authorDept}}－{{review.authorYear % 100  | appendZero}}级\n								<span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\">\n								</span>\n							</p>\n							\n						</div>\n					</div>\n				</div>\n				<div class=\"body\">\n					<div class=\"\">\n						<p> {{review.comment}}</p>\n					</div>\n					<div class=\"tags\">\n						<p style=\"margin:0px;\" ng-if=\"review.showTags\"> 标签：\n							<span ng-repeat=\"tag in review.tags\">{{tag.value}}{{$last ? \'\' : \'， \'}}</span>\n						</p>					\n\n					</div>				\n					<div class=\"dig\" style=\"float:right\">\n						  <p class=\"\">\n							  <span ng-click=\"upVoteIncrement(review, true)\" \n									ng-disabled=\"review.voted\"> \n								  <i class=\"fa fa-thumbs-o-up fa\"></i>&nbsp;{{review.upVote}}&nbsp;</span>&nbsp;&nbsp;\n							  <span ng-click=\"upVoteIncrement(review, false)\" \n									ng-disabled=\"review.voted\">\n								  <i class=\"fa fa-thumbs-o-down fa\"></i>&nbsp;{{review.downVote}}&nbsp;</span>\n						  </p>\n					</div>\n				</div>\n            </div>                \n        </div>		 \n		 \n        <!-- no post placeholder -->\n        <div class=\"placeholder-no-post\" ng-if=\"showNoPostPlaceholder\">\n            <div class=\"card card-review\" \n                 style=\"height: 150px\">\n                <p style=\" font-size: 14px;\n                        text-align: center;\n                        margin-top: 45px;       \n                          \">\n                    该老师目前没啥人气...\n                </p>\n         \n            </div>\n        </div> \n  \n         \n        \n    <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" class=\"ispinner\" spinner=\"ripple\">\n    </ion-infinite-scroll>      \n         \n    </ion-content>\n</ion-view>\n");
$templateCache.put("tab-listing/listing.html","<ion-view view-title=\"活水\" hide-nav-bar=\"true\">\n\n\n	<ion-header-bar class=\"bar bar-header item-input-inset\">\n        <span ng-click=\"cancelSearch()\">\n          <p style=\"font-size:20px; font-weight: bold;margin: 0px 15px 0px 9px\" >活水</p>\n        </span>\n\n	  <label class=\"item-input-wrapper\">\n		<i class=\"icon ion-ios-search placeholder-icon\"></i>\n		<input type=\"search\"\n			   placeholder=\"教师姓名，课程或任何关联词\"\n               style=\"color: white\"\n			   ng-model=\"searchText.text\"\n			   ng-change=\"startSearch()\">\n	  </label>\n\n	</ion-header-bar>\n\n\n  <ion-content scroll=\"true\" class=\"scroll-bg-1\" has-bouncing=\"false\" on-scroll=\"getScrollPosition()\">\n\n	  	<div ng-if=\"showPromoContent\">\n            <div class=\"item showcase-head\">\n                <div class=\"button-tabbed\">\n									<a class=\"button\"\n										 style=\"margin-right:5px\"\n										 ng-class=\"{\'button-energized\': isActive(\'newPost\'),\'button-balanced\': !isActive(\'newPost\')}\"\n										 ng-click=\"setFetchOption(\'newPost\')\">最新评价</a>\n                  <a class=\"button\"\n                       style=\"margin-left:5px\"\n                       ng-class=\"{\'button-energized\': isActive(\'goodPost\'),\'button-balanced\': !isActive(\'goodPost\') }\"\n                       ng-click=\"setFetchOption(\'goodPost\')\">热门评价</a>\n                </div>\n            </div>\n\n            <div class=\"card card-review-showcase \"\n                 ng-if=\"active === \'goodPost\'\"\n                 ng-click=\"gotoProfReview(review)\"\n                 ng-repeat=\"review in goodPost\">\n                <div class=\"item showcase-meta\">\n                    <div class=\"item-avatar\">\n                        <img src=\"{{review.deptImg}}\">\n                        <h2>\n                            评<span class=\"text-positive\">{{review.profName}}</span>的\n                            <span class=\"text-positive\">{{review.courseName}}</span>\n                        </h2>\n                        <p>{{review.authorName}}&nbsp;\n                            {{review.rating.overall/3 | number: 1}}分\n                            <span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\"></span>\n                        </p>\n                        <div ng-show=\"active==\'deptRank\' && showDept == true\">\n                            <span  class=\"rank-filter-label\"><p>{{deptOption}}</p></span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"item item-text-wrap showcase-content\">\n                    <p>{{review.comment}}<br></p>\n                </div>\n            </div>\n\n            <div class=\"card card-review-showcase \"\n                 ng-if=\"active === \'newPost\'\"\n                 ng-click=\"gotoProfReview(review)\"\n                 ng-repeat=\"review in newPost\">\n                <div class=\"item showcase-meta\">\n                    <div class=\"item-avatar\">\n                        <img src=\"{{review.deptImg}}\">\n                        <h2>\n                            评<span class=\"text-positive\">{{review.profName}}</span>的\n                            <span class=\"text-positive\">{{review.courseName}}</span>\n                        </h2>\n                        <p>{{review.authorName}}&nbsp;\n                            {{review.rating.overall/3 | number: 1}}分\n                            <span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\"></span>\n                        </p>\n                        <div ng-show=\"active==\'deptRank\' && showDept == true\">\n                            <span  class=\"rank-filter-label\"><p>{{deptOption}}</p></span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"item item-text-wrap showcase-content\">\n                    <p>{{review.comment}}<br></p>\n                </div>\n            </div>\n\n		</div>\n\n\n        <div class=\"list\" ng-if=\"!showPromoContent\">\n            <a class=\"item item-avatar item-icon-right\"\n                ng-repeat=\"course in displayCourses track by $index\"\n                ui-sref=\"tab.listing-detail({ listingId: course.prof, deptId: course.dept })\">\n                <span class=\"conditional-images\">\n                    <img src=\"{{course.deptImg}}\">\n                </span>\n\n                <h2>{{course.prof}}</h2>\n                <p>{{course.name}}</p>\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </a>\n\n            <div class=\"user-add-course-prompt\"  ng-if=\"showUserAddCoursePrompt\">\n                <p>没找到目标？换个关键字试试呢。（如果还是没找到，你可以选择主动添加该课程）</p>\n                <button class=\"button button-positive\"\n                        ng-click=\"showUserAddCourseForm();\"\n                        >\n                  添加课程\n                </button>\n            </div>\n\n\n\n            <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"\n                                 ng-if=\"!noMorePost && !showPromoContent\" class=\"ispinner\" spinner=\"ripple\">\n            </ion-infinite-scroll>\n        </div>\n\n\n\n\n\n\n        <ion-infinite-scroll on-infinite=\"fetechMoreGoodPost()\" distance=\"1%\"\n                             ng-if=\"!fetchStatus.noMoreGoodPost && active === \'goodPost\' && showPromoContent\"\n                             class=\"ispinner\" spinner=\"ripple\">\n        </ion-infinite-scroll>\n\n        <ion-infinite-scroll on-infinite=\"fetechMoreNewPost()\" distance=\"1%\"\n                             ng-if=\"!fetchStatus.noMoreNewPost && active === \'newPost\' && showPromoContent\"\n                             class=\"ispinner\" spinner=\"ripple\">\n        </ion-infinite-scroll>\n\n  </ion-content>\n    <div class=\"float-button\" ng-if=\"showPromoContent && active === \'newPost\'\"\n    		 ng-show=\"refreshButton\" ng-click=\"refreshNewPost()\">\n     <span class=\"height-fix\">\n    		<a class=\"content\">\n    			<i class=\"ion-android-sync\"> </i>\n    		</a>\n    	 </span>\n    </div>\n\n\n    <div class=\"float-button\" ng-if=\"showPromoContent\"\n         ng-show=\"sttButton\" ng-click=\"scrollToTop()\">\n     <span class=\"height-fix\">\n        <a class=\"content\">\n          <i class=\"ion-ios-arrow-up\"> </i>\n        </a>\n       </span>\n    </div>\n\n</ion-view>\n");
$templateCache.put("tab-listing/modal_tag.html","  <ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        \n      <h1 class=\"title\">选择标签（限3个）</h1>\n      <button class=\"button button-clear button-primary\" ng-click=\"modalTagComplete()\">完成</button>\n    </ion-header-bar>\n      \n    <ion-content class=\"\">\n        \n        <ion-checkbox ng-repeat=\"tag in tagOptions track by tag.id\"\n                      ng-model=\"tag.checked\" \n                      ng-checked=\"tag.checked\"\n                      ng-change=\"checkChanged(tag)\" \n                      ng-disabled=\"checked==limit && !tag.checked\">\n          {{ tag.value }}\n        </ion-checkbox>         \n        \n        \n    </ion-content>\n  </ion-modal-view>");
$templateCache.put("signup/modal_dept.html","  <ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        \n      <h1 class=\"title\">选择学院</h1>\n      <button class=\"button button-clear button-primary\" ng-click=\"modalDeptComplete()\">完成</button>\n    </ion-header-bar>\n      \n    <ion-content class=\"\">\n        \n        <ion-checkbox ng-repeat=\"dept in deptOptions track by dept.id\"\n                      ng-model=\"dept.checked\" \n                      ng-checked=\"dept.checked\"\n                      ng-change=\"deptCheckChanged(dept)\" \n                      ng-disabled=\"deptChecked==deptLimit && !dept.checked\">\n          {{ dept.value }}\n        </ion-checkbox>         \n        \n        \n    </ion-content>\n  </ion-modal-view>");
$templateCache.put("signup/modal_year.html","  <ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        \n      <h1 class=\"title\">选择入学年份</h1>\n      <button class=\"button button-clear button-primary\" ng-click=\"modalYearComplete()\">完成</button>\n    </ion-header-bar>\n      \n    <ion-content class=\"\">\n        \n        <ion-checkbox ng-repeat=\"year in yearOptions track by year.id\"\n                      ng-model=\"year.checked\" \n                      ng-checked=\"year.checked\"\n                      ng-change=\"yearCheckChanged(year)\" \n                      ng-disabled=\"yearChecked==yearLimit && !year.checked\">\n          {{ year.name }}\n        </ion-checkbox>         \n        \n        \n    </ion-content>\n  </ion-modal-view>");
$templateCache.put("signup/signup.html","<ion-view hide-nav-bar=\"true\" title=\"注册\">\n	<ion-content has-header=\"false\" class=\"scroll-bg-2\" scroll=\"true\" has-bouncing=\"false\">\n\n		<div class=\"container-content\">\n\n			<div class=\"signup-tagline\">\n				<p style=\"\">除了<b>自由</b>和<b>真实</b>，</p>\n				<p style=\"float:right\">我们不需要更多。</p>\n			</div>\n\n			<form class=\"signup-form\" name=\"signUp\">\n				<div class=\"input-and-error\">\n					<label class=\"\">\n						<input type=\"text\" placeholder=\"昵称\" ng-model=\"user.username\" name=\"username\" id=\"username\" required  ng-minlength=\"2\" maxlength=\"12\">\n					</label>\n					<div class=\"signup-error\">\n						<span ng-show=\"!signUp.username.$error.required && signUp.username.$dirty\n									   && signUp.username.$error.minlength\">\n							昵称需在2至12个字以内</span>\n					</div>\n				</div>\n\n				<div class=\"input-and-error\">\n					<label class=\"\">\n						<input type=\"email\" placeholder=\"电子邮箱\" ng-model=\"user.email\" name=\"email\" id=\"email\"\n							   ng-pattern=\"/.{1,}@[_a-z0-9A-Z]+(\\.[a-z0-9A-Z]+)+/\" required>\n					</label>\n					<div class=\"signup-error\">\n						<span ng-show=\"!signUp.email.$error.required && signUp.email.$dirty\n									   && (signUp.email.$error.email ||  signUp.email.$error.pattern)\">\n							电子邮箱格式不正确</span>\n					</div>\n				</div>\n\n				<div class=\"input-and-error\">\n					<label class=\"\">\n						<input type=\"password\" placeholder=\"密码\" equals={{user.password_c}}\n							   ng-model=\"user.password\" name=\"password\" id=\"password\" required ng-minlength=\"6\" maxlength=\"12\" >\n					</label>\n					<div class=\"signup-error\">\n						<span ng-show=\"!signUp.password.$error.required && signUp.password.$dirty\n									   && signUp.password.$error.minlength\">\n							密码需在6至12个字以内</span>\n					</div>\n				</div>\n\n				<div class=\"input-and-error\">\n					<label class=\"\">\n						<input type=\"password\" placeholder=\"确认密码\" equals={{user.password}}\n							   ng-model=\"user.password_c\" name=\"password_c\"  id=\"password_c\" required>\n					</label>\n					<div class=\"signup-error\">\n						<span ng-show=\"!signUp.password.$error.required && !signUp.password_c.$error.required\n									   && signUp.password.$dirty\n									   && signUp.password_c.$error.equals\">\n							密码不匹配</span>\n					</div>\n				</div>\n\n			</form>\n\n\n			<div class=\"select-groups\">\n				<div class=\"select-group\">\n					<div class=\"select-label\">年级</div><div class=\"select-value\" ng-click=\"modal_year.show()\">\n						{{user.year || \'请选择\'}}\n					</div>\n				</div>\n\n				<div class=\"select-group\" >\n					<div class=\"select-label\">学院</div><div class=\"select-value\" ng-click=\"modal_dept.show()\">\n						{{user.dept || \'请选择\'}}\n					</div>\n				</div>\n			</div>\n			<button ng-click=\"signup()\"\n					ng-disabled=\"!signUp.$valid || user.year == \'\' || user.dept == \'\'  \"\n					class=\"button button-signup button-block button-positive\" style=\"    background-color: #A23128;\">\n					<b>注册</b>\n			</button>\n			<br>\n			<p style=\"margin:auto;text-align:center;font-size:14px\">\n				<span ng-click=\"gotoLogin()\">回到登录</span>\n			</p>\n		</div>\n\n\n\n	</ion-content>\n</ion-view>\n");
$templateCache.put("tab-rank/listing-detail-rank.html","<ion-view view-title=\"课程评价\" cache-view=\"false\" can-swipe-back=\"true\">      \n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"gotoDetailReview(\'rank\')\">\n                    <i class=\"icon ion-compose\"></i>\n      </button>\n  </ion-nav-buttons>   \n     <ion-content class=\"padding scroll-bg-1\" style=\"padding:0\" >\n\n    <!--\n    <ion-refresher pulling-text=\"刷新请下拉...\" on-refresh=\"doRefresh()\"  class=\"ispinner\" spinner=\"ios\">\n    </ion-refresher> \n    -->\n                  \n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; padding-left:15px;\">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:80%; display:block;\">\n                            <img style=\"width:100%; max-height: 100px\" src=\"img/default-profile.png\" >\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n                        <div class=\"row\" style=\"padding:0px\">\n                            <p><span style=\"font-size:18px; color: white;\">{{profCourses[0].prof}}\n                                </span>&nbsp;&nbsp;{{profCourses[0].position}}（{{profCourses[0].dept}}）</p>\n                        </div>\n                        <hr style=\"font-size: 5px;background-color:white; \n                                   color: white;border-style:solid;\n                                   margin-top:5px;margin-bottom:5px; margin-right:20px\">\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水分：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n                        \n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;padding-right:10px\">\n                  <p>授课：<span ng-repeat=\"course in profCourses\">{{course.name}}{{$last ? \'\' : \'，\'}}</span></p>\n                </div>\n                <div class=\"item-text-wrap\" style=\"padding-right:10px;float:right;margin-top:10px\">\n                    <p>\n                        <!--      \n                        <span ng-click=\"showSharingOptions()\">\n                            <i class=\"fa fa-share-alt-square \" ></i> 分享\n                        </span>&nbsp;                \n                        -->\n                        <span ng-click=\"addToCollection()\">\n                            <i class=\"fa fa-plus-square\" ></i> 关注\n                        </span>&nbsp;\n                        <span ng-click=\"gotoDetailReview(\'rank\')\">\n                            <i class=\"fa fa-dot-circle-o\">\n                            </i> 点评\n                        </span>\n                    </p>\n                </div>                \n            </div>\n        </div>    \n         \n         \n         \n         <!--\n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; \">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:75%;margin-left:auto; margin-right:auto; display:block;\">\n                        <img style=\"width:100%; max-height: 80px\" src=\"img/default-profile.png\" >\n						<p style=\"color: #E54D42; background-color: white; text-align: center;\n								  border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;\"\n						   ng-click=\"addToCollection()\">+关注</p>\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>姓名：{{profCourses[0].prof}}</p>\n									<p>教职：{{profCourses[0].position}}</p> \n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>院系：{{profCourses[0].dept}}</p>\n									<p>校区：{{profCourses[0].campus}}</p>    \n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水份：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n\n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;\">\n                  <p><span ng-repeat=\"course in profCourses\"> 《{{course.name}}》 </span></p>\n                </div>\n            </div>\n        </div>            \n    -->\n\n        <div class=\"card card-review\"  >\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"padding:0px; text-align:center;\">\n                    <div class=\"col-50\">\n                        <p>好评率（{{reviewStats.ratingCount}}人参与）</p>\n                    </div>\n                    <div class=\"col-50\">\n                        <p>综合评分（{{reviewStats.ratingOverall  | number: 1}}分）</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row \">\n                <div class=\"col-50\" style=\"border-right: rgba(128, 128, 128, 0.23) thin solid;\">\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"pieOption\" data=\"pieData\"></nvd3>\n                        </div>\n                </div>            \n\n                <div class=\"col-50\">\n                    <!--\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"barOption\" data=\"barData\"></nvd3>\n                        </div>                    \n                    -->\n\n                        <div class=\"\" style=\"padding:5px\">\n                            <canvas \n                                id=\"bar\" \n                                class=\"chart chart-bar\" \n                                width=\"100%\"\n                                height=\"80px\"\n                                data=\"barData\" \n                                labels=\"barLabels\" \n                                legend=\"false\" \n                                series=\"barSeries\" \n                                options=\"{\n                                            scaleOverride: true,\n                                            scaleSteps: 5,\n                                            scaleStepWidth: 1,\n                                            barValueSpacing : 12,\n                                            scaleStartValue: 0\n                                         }\">\n                            </canvas>\n                        </div>\n                </div>\n            </div>\n        </div>\n        \n		 \n        <div ng-repeat=\"review in allReviews\">\n            <div class=\"card card-review\" >\n				<div class=\"heading\">\n					<div class=\"row\">\n						<div class=\"col-20\">\n                            <span ng-switch on=\"review.grade\">\n                               <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                               <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                               <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                               <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                            </span>\n						</div>\n						<div class=\"col-80\">\n							<p>{{review.courseName}}\n								<span style=\"float:right\">\n									{{review.rating.rate1}} / {{review.rating.rate2}} / {{review.rating.rate3}}分\n								</span>\n							</p>\n							<p>{{review.authorName}}，{{review.authorDept}}－{{review.authorYear % 100  | appendZero}}级\n								<span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\">\n								</span>\n							</p>\n							\n						</div>\n					</div>\n				</div>\n				<div class=\"body\">\n					<div class=\"\">\n						<p> {{review.comment}}</p>\n					</div>\n					<div class=\"tags\">\n						<p style=\"margin:0px;\" ng-if=\"review.showTags\"> 标签：\n							<span ng-repeat=\"tag in review.tags\">{{tag.value}}{{$last ? \'\' : \'， \'}}</span>\n						</p>					\n						<!--\n							<ul class=\"tags\">\n							  <li ng-repeat=\"tag in review.tags\">\n								  <a class=\"tag\">{{tag.value}}</a>\n							  </li>\n							</ul>\n						-->\n					</div>				\n					<div class=\"dig\" style=\"float:right\">\n						  <p class=\"\">\n							  <span ng-click=\"upVoteIncrement(review, true)\" \n									ng-disabled=\"review.voted\"> \n								  <i class=\"fa fa-thumbs-o-up fa\"></i>&nbsp;{{review.upVote}}&nbsp;</span>&nbsp;&nbsp;\n							  <span ng-click=\"upVoteIncrement(review, false)\" \n									ng-disabled=\"review.voted\">\n								  <i class=\"fa fa-thumbs-o-down fa\"></i>&nbsp;{{review.downVote}}&nbsp;</span>\n						  </p>\n					</div>\n				</div>\n            </div>                \n        </div>		 \n		 \n        <!-- no post placeholder -->\n        <div class=\"placeholder-no-post\" ng-if=\"showNoPostPlaceholder\">\n            <div class=\"card card-review\" \n                 style=\"height: 150px\">\n                <p style=\" font-size: 14px;\n                        text-align: center;\n                        margin-top: 45px;       \n                          \">\n                    该老师目前没啥人气...\n                </p>\n         \n            </div>\n        </div> \n         \n        \n    <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" class=\"ispinner\" spinner=\"ripple\">\n    </ion-infinite-scroll>      \n         \n    </ion-content>\n</ion-view>");
$templateCache.put("tab-rank/listing-detail-review-rank.html","<ion-view view-title=\"你说了算\">\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"submitEntry()\">发送</button>\n  </ion-nav-buttons>\n\n    <ion-content class=\"padding \" style=\"padding:0px\" has-bouncing=\"false\">\n\n        <!--\n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item\" style=\"padding: 5px 5px 5px 15px; font-size: 15px\">\n\n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\"\n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label>\n            </div>\n        </div>\n        -->\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_target.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>评价对象</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\"\n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label>\n            </div>\n        </div>\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>总体评价</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 15px;\">\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">专业水平：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate1\" ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">表达能力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate2\" ng-change=\"updateOverallRating()\"  max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">亲和力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate3\"  ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n\n                <span class=\"review-grade-text\" style=\"top:135px\">\n                    <p style=\"margin-bottom: 0px\">\n                        <span style=\"color: #E54D42\">{{reviewRating.overall / 3 | number: 1}}</span> / <span style=\"color: #E54D42\">5.0分</span></p>\n                    <p><span style=\"color: #E54D42\">（{{reviewGrade}}）</span></p>\n                </span>\n\n                <!--\n                <span class=\"review-grade-icon\" ng-switch on=\"grade\">\n                   <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                   <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                   <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                   <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                </span>\n                -->\n            </div>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>短评（最多300字）</p>\n                </div>\n            </div>\n\n          <label class=\"item item-input\">\n            <textarea placeholder=\"你对课程和老师的看法：\"  maxlength=\"300\" style=\"height:135px;\" ng-model=\"reviewComment.text\"></textarea>\n          </label>\n        </div>\n\n        <div class=\"item item-divider\" style=\"padding-top:20px; padding-bottom:20px\">\n			<p style=\"text-align:center; color: #E54D42; font-weight:bold\">以下内容为选填</p>\n            <p style=\"text-align:center; color: #E54D42; font-weight:bold\">\n                <i class=\"fa fa-angle-double-down fa-2x\"></i>\n            </p>\n		</div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_tag.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>标签 (选填：限三个）</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <ul class=\"tags\">\n                  <li ng-if=\"reviewTags.length == 0\"><a class=\"tag\">（未选择）</a></li>\n                  <li ng-repeat=\"tag in tagOptions\" ng-if=\"tag.checked\"><a class=\"tag\">{{tag.value}}</a></li>\n\n                </ul>\n            </div>\n        </div>\n\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>课程体验（选填）</p>\n                </div>\n            </div>\n              <label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  水课鉴定：\n                </div>\n                <select name=\"birdSelect\"\n                        id=\"birdSelect\"\n                        ng-model=\"birdInfo.selectedOption\"\n                        ng-options=\"option.name for option in birdInfo.allOptions track by option.id\">\n                </select>\n              </label>\n			<label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  点名情况：\n                </div>\n                <select name=\"attendanceSelect\"\n                        id=\"attendanceSelect\"\n                        ng-model=\"attendanceInfo.selectedOption\"\n                        ng-options=\"option.name for option in attendanceInfo.allOptions track by option.id\">\n                </select>\n              </label>\n              <label class=\"item item-input item-select\" style=\"margin-bottom:10px;\">\n                <div class=\"input-label\">\n                  作业量：\n                </div>\n                <select name=\"homeworkSelect\"\n                        id=\"homeworkSelect\"\n                        ng-model=\"homeworkInfo.selectedOption\"\n                        ng-options=\"option.name for option in homeworkInfo.allOptions track by option.id\">\n                </select>\n              </label>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>考试体验（选填）</p>\n                </div>\n            </div>\n            <div class=\"card-content\">\n				<form name=\"examForm\">\n					<ion-toggle ng-model=\"examInfo.touched\"\n								ion-toggle-text=\"是;否\"\n								name=\"examToggle\"\n								ng-change=\"examReset(examInfo.touched)\"\n								toggle-class=\"toggle-positive\">\n						已参加试卷考（点击展开更多）\n					</ion-toggle>\n                <div ng-show=\"examInfo.touched\">\n					<ion-toggle ng-model=\"examInfo.openbook.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examB\"\n								ng-change=\"examSetTouched(\'B\')\"\n								toggle-class=\"toggle-positive\">\n						开卷\n					</ion-toggle>\n                    <ion-toggle ng-model=\"examInfo.examprep.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examA\"\n								ng-change=\"examSetTouched(\'A\')\"\n								toggle-class=\"toggle-positive\">\n						划重点\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.oldquestion.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examC\"\n								ng-change=\"examSetTouched(\'C\')\"\n								toggle-class=\"toggle-positive\">\n						做过的原题较多\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.easiness.checked\"\n								ion-toggle-text=\"松;严\"\n								name=\"examD\"\n								ng-change=\"examSetTouched(\'D\')\"\n								toggle-class=\"toggle-positive\">\n						给分比较宽松\n					</ion-toggle>\n                </div>\n				</form>\n            </div>\n        </div>\n\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tab-rank/popup_dept.html","        <ion-checkbox ng-repeat=\"dept in deptOptions track by dept.id\"\n                      ng-model=\"dept.checked\" \n                      ng-checked=\"dept.checked\"\n                      ng-change=\"deptCheckChanged(dept)\" \n                     >\n          {{ dept.value }}\n        </ion-checkbox>  ");
$templateCache.put("tab-rank/rank-detail.html","<ion-view view-title=\"{{title}}\">\n	<ion-content class=\"scroll-bg-1\">\n\n		<div class=\"list\">\n\n			<a class=\"item \" ng-click=\"gotoProfReview(course)\"  ng-repeat=\"course in displayCourses\" >\n\n				<div class=\"row\">\n					<div class=\"col-20\">\n						<div style=\"padding-right: 25px;text-align:center\">\n							<h2 ng-class=\"{\'text-positive\': ($index==0 || $index==1 || $index==2),\n                                            \'text-grey\': ($index!=0 && $index!=1 && $index!=2),\n                                          }\" >\n                                {{$index + 1}}\n                            </h2>\n							<p style=\"    color: #E54D42;\n                                font-size: 12px;\n                                border-radius: 2px;\n                                border-color: #E54D42;\n                                border-style: solid;\n                                border-width: 1px;\"\n                               ng-click=\"addToCollection(course.objectId); $event.stopPropagation();\">关注</p>\n						</div>\n					</div>\n					<div class=\"col-80\">\n						<h2 style=\"font-size: 15px\">{{course.name}}</h2>\n						<p>{{course.prof}}</p>\n					</div>\n					<span style=\"float:right; right: 8%; position: absolute;\">\n						<h2 style=\"font-size:15px\">{{course.rateOverall  | number: 1}}分</h2>\n					</span>\n				</div>\n			</a>\n\n		</div>\n\n		<p ng-show=\"showNotFoundMsg\" style=\"text-align: center\">暂时没有符合条件的评价,<br>现在分享你的体验正是时候!</p>\n\n\n	</ion-content>\n</ion-view>\n");
$templateCache.put("tab-rank/rank.html","\n\n\n<ion-view view-title=\"榜单\">\n\n<!--\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear\" ng-click=\"\"><i class=\" icon ion-android-add\"></i></button>\n  </ion-nav-buttons>\n    -->\n  <ion-content has-bouncing=\"false\">\n\n      <!--\n    <ion-refresher pulling-text=\"刷新请下拉...\" on-refresh=\"doRefresh()\" spinner=\"ios\">\n    </ion-refresher>\n		-->\n\n	 <div class=\"item rank-head\">\n\n            <div class=\"button-bar\" >\n                <a class=\"button\"\n                   ng-class=\"{\'button-positive\': isActive(\'deptRank\')}\"\n                    style=\"border-width: 0px;border-radius: 0px;\"\n                   ng-click=\"setFilterOption(\'schoolRank\')\">全校总览</a>\n                <a class=\"button\"\n                   ng-class=\"{\'button-positive\': isActive(\'schoolRank\')}\"\n                    style=\"border-width: 0px;border-radius: 0px;\"\n                   ng-click=\"setFilterOption(\'deptRank\')\">筛选院系</a>\n            </div>\n	 </div>\n\n\n	<div class=\"list\">\n\n		<div class=\"item item-avatar\"\n		ng-click=\"gotoRankDetail(rank.id)\"\n		ng-repeat=\"rank in rankList\">\n            <div class=\"item-avatar-content\" style=\"padding: 5px 5px 5px 0px\">\n                <img src=\"{{rank.img}}\"\n								style=\"    position: absolute;\n							    left: 16px;\n							    max-width: 40px;\n							    max-height: 40px;\n							    width: 100%;\n							    height: 100%;\n							    border-radius: 50%;\">\n                <h2>{{rank.title}}</h2>\n                <p>{{rank.tagline}}</p>\n                <div ng-show=\"active==\'deptRank\' && showDept == true\">\n                    <span  class=\"rank-filter-label\"><p>{{deptOption}}</p></span>\n                </div>\n            </div>\n		</div>\n\n	</div>\n\n	<!--\n    <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" spinner=\"ripple\">\n    </ion-infinite-scroll>\n-->\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-me/course.html","<ion-view view-title=\"我的课程\">\n	<ion-content class=\"scroll-bg-1\">\n\n        <div class=\"list\">\n            <a class=\"item item-avatar item-icon-right\"\n                ng-repeat=\"course in courses\"\n			    ng-click=\"gotoProfReview(course)\">\n                <span class=\"conditional-images\">\n                    <img src=\'{{course.deptImg}}\'>\n                </span>\n\n                <h2>{{course.prof}}</h2>\n                <p>{{course.name}}</p>\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </a>\n        </div>\n\n		<ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" class=\"ispinner\" spinner=\"ripple\">\n		</ion-infinite-scroll>\n\n	</ion-content>\n</ion-view>\n");
$templateCache.put("tab-me/editProfile.html","<div class=\"list\">\n  <label class=\"item item-input\">\n    <input type=\"text\" \n           ng-model=\"user.username\"\n           minlength=\"2\" maxlength=\"12\" placeholder=\"昵称\">\n  </label>\n    \n    <label class=\"item item-input item-select\">\n        <div class=\"input-label\">\n          <p>年级：</p>\n        </div>\n        <select name=\"yearSelect\"\n                id=\"yearSelect\" \n                ng-model=\"yearInfo.selectedOption\"\n                ng-options=\"option.name for option in yearInfo.allOptions track by option.id\">\n        </select>\n    </label>\n    <label class=\"item item-input item-select\">\n        <div class=\"input-label\">\n          <p>学院：</p>\n        </div>\n        <select name=\"deptSelect\"\n                id=\"deptSelect\" \n                ng-model=\"deptInfo.selectedOption\"\n                ng-options=\"option.name for option in deptInfo.allOptions track by option.id\">\n        </select>\n    </label>\n</div>");
$templateCache.put("tab-me/feedback.html","<ion-view view-title=\"问题反馈 （有问必答）\">\n    <ion-content >       \n        \n        <div class=\"list list-inset\">\n          <label class=\"item item-input\">\n            <input type=\"text\" placeholder=\"称呼（选填）：昵称即可\" ng-model=\"feedback.name\">\n          </label>\n          <label class=\"item item-input\">\n            <input type=\"text\" placeholder=\"联系（选填）：邮箱, 手机, QQ, 微信\" ng-model=\"feedback.phone\">\n          </label>\n          <label class=\"item item-input\">\n              <textarea placeholder=\"反馈（必填）：有问必答，绝对保密\" style=\"height:200px;\" ng-model=\"feedback.comment\"></textarea>\n          </label>\n          <button class=\"button button-full button-positive\" ng-click=\"submitFeedback()\">发送</button>\n\n        </div>\n\n    </ion-content>\n</ion-view>");
$templateCache.put("tab-me/listing-detail-me.html","<ion-view view-title=\"课程评价\" cache-view=\"false\" can-swipe-back=\"true\">      \n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ui-sref=\"tab.listing-detail-review-2({ listingId: listingId })\">\n                    <i class=\"icon ion-compose\"></i>\n      </button>\n  </ion-nav-buttons>   \n     <ion-content class=\"padding scroll-bg-1\" style=\"padding:0\" >\n\n    <!--\n    <ion-refresher pulling-text=\"刷新请下拉...\" on-refresh=\"doRefresh()\"  class=\"ispinner\" spinner=\"ios\">\n    </ion-refresher> \n    -->\n                  \n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; padding-left:15px;\">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:80%; display:block;\">\n                            <img style=\"width:100%; max-height: 100px\" src=\"img/default-profile.png\" >\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n                        <div class=\"row\" style=\"padding:0px\">\n                            <p><span style=\"font-size:18px; color: white;\">{{profCourses[0].prof}}\n                                </span>&nbsp;&nbsp;{{profCourses[0].position}}（{{profCourses[0].dept}}）</p>\n                        </div>\n                        <hr style=\"font-size: 5px;background-color:white; \n                                   color: white;border-style:solid;\n                                   margin-top:5px;margin-bottom:5px; margin-right:20px\">\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水分：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n                        \n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;padding-right:10px\">\n                  <p>授课：<span ng-repeat=\"course in profCourses\">{{course.name}}{{$last ? \'\' : \'，\'}}</span></p>\n                </div>\n                <div class=\"item-text-wrap\" style=\"padding-right:10px;float:right;margin-top:10px\">\n                    <p>\n                        <!--      \n                        <span ng-click=\"showSharingOptions()\">\n                            <i class=\"fa fa-share-alt-square \" ></i> 分享\n                        </span>&nbsp;                \n                        -->\n                        <span ng-click=\"addToCollection()\">\n                            <i class=\"fa fa-plus-square\" ></i> 关注\n                        </span>&nbsp;\n                        <span \n                              ui-sref=\"tab.listing-detail-review-2({ listingId: listingId })\">\n                            <i class=\"fa fa-dot-circle-o\">\n                            </i> 点评\n                        </span>\n                    </p>\n                </div>                \n            </div>\n        </div>    \n         \n         \n         \n         <!--\n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item \" style=\"padding:10px; \">\n\n                <div class=\"row\">\n                    <div class=\"col-33\" >\n						<div style=\"width:75%;margin-left:auto; margin-right:auto; display:block;\">\n                        <img style=\"width:100%; max-height: 80px\" src=\"img/default-profile.png\" >\n						<p style=\"color: #E54D42; background-color: white; text-align: center;\n								  border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;\"\n						   ng-click=\"addToCollection()\">+关注</p>\n						</div>\n                    </div>\n\n					<div class=\"col-67\" >\n						<div class=\"row\" style=\"padding:0\">\n							<div class=\"col-50\" >\n									<p>姓名：{{profCourses[0].prof}}</p>\n									<p>教职：{{profCourses[0].position}}</p> \n									<p>点名：{{reviewStats.attendanceOverall}}</p> \n									<p>考试：{{reviewStats.examOverall}}</p>                  \n							</div>\n\n							<div class=\"col-50\" style=\"margin-left:5px\">\n									<p>院系：{{profCourses[0].dept}}</p>\n									<p>校区：{{profCourses[0].campus}}</p>    \n									<p>作业：{{reviewStats.homeworkOverall}}</p>   \n									<p>水份：{{reviewStats.birdOverall}}</p>                 \n							</div>\n						</div>\n\n					</div> \n\n                </div>\n				\n                <div class=\"item-text-wrap\" style=\"padding-top: 5px;\">\n                  <p><span ng-repeat=\"course in profCourses\"> 《{{course.name}}》 </span></p>\n                </div>\n            </div>\n        </div>            \n    -->\n\n        <div class=\"card card-review\"  >\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"padding:0px; text-align:center;\">\n                    <div class=\"col-50\">\n                        <p>好评率（{{reviewStats.ratingCount}}人参与）</p>\n                    </div>\n                    <div class=\"col-50\">\n                        <p>综合评分（{{reviewStats.ratingOverall  | number: 1}}分）</p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row \">\n                <div class=\"col-50\" style=\"border-right: rgba(128, 128, 128, 0.23) thin solid;\">\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"pieOption\" data=\"pieData\"></nvd3>\n                        </div>\n                </div>            \n\n                <div class=\"col-50\">\n                    <!--\n                        <div class=\"\" style=\"padding:5px\">\n                            <nvd3 options=\"barOption\" data=\"barData\"></nvd3>\n                        </div>                    \n                    -->\n\n                        <div class=\"\" style=\"padding:5px\">\n                            <canvas \n                                id=\"bar\" \n                                class=\"chart chart-bar\" \n                                width=\"100%\"\n                                height=\"80px\"\n                                data=\"barData\" \n                                labels=\"barLabels\" \n                                legend=\"false\" \n                                series=\"barSeries\" \n                                options=\"{\n                                            scaleOverride: true,\n                                            scaleSteps: 5,\n                                            scaleStepWidth: 1,\n                                            barValueSpacing : 12,\n                                            scaleStartValue: 0\n                                         }\">\n                            </canvas>\n                        </div>\n                </div>\n            </div>\n        </div>\n        \n		 \n        <div ng-repeat=\"review in allReviews\">\n            <div class=\"card card-review\" >\n				<div class=\"heading\">\n					<div class=\"row\">\n						<div class=\"col-20\">\n                            <span ng-switch on=\"review.grade\">\n                               <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                               <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                               <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                               <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                            </span>\n						</div>\n						<div class=\"col-80\">\n							<p>{{review.courseName}}\n								<span style=\"float:right\">\n									{{review.rating.rate1}} / {{review.rating.rate2}} / {{review.rating.rate3}}分\n								</span>\n							</p>\n							<p>{{review.authorName}}，{{review.authorDept}}－{{review.authorYear % 100  | appendZero}}级\n								<span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\">\n								</span>\n							</p>\n							\n						</div>\n					</div>\n				</div>\n				<div class=\"body\">\n					<div class=\"\">\n						<p> {{review.comment}}</p>\n					</div>\n					<div class=\"tags\">\n						<p style=\"margin:0px;\" ng-if=\"review.showTags\"> 标签：\n							<span ng-repeat=\"tag in review.tags\">{{tag.value}}{{$last ? \'\' : \'， \'}}</span>\n						</p>					\n						<!--\n							<ul class=\"tags\">\n							  <li ng-repeat=\"tag in review.tags\">\n								  <a class=\"tag\">{{tag.value}}</a>\n							  </li>\n							</ul>\n						-->\n					</div>				\n					<div class=\"dig\" style=\"float:right\">\n						  <p class=\"\">\n							  <span ng-click=\"upVoteIncrement(review, true)\" \n									ng-disabled=\"review.voted\"> \n								  <i class=\"fa fa-thumbs-o-up fa\"></i>&nbsp;{{review.upVote}}&nbsp;</span>&nbsp;&nbsp;\n							  <span ng-click=\"upVoteIncrement(review, false)\" \n									ng-disabled=\"review.voted\">\n								  <i class=\"fa fa-thumbs-o-down fa\"></i>&nbsp;{{review.downVote}}&nbsp;</span>\n						  </p>\n					</div>\n				</div>\n            </div>                \n        </div>		 \n		 \n        <!-- no post placeholder -->\n        <div class=\"placeholder-no-post\" ng-if=\"showNoPostPlaceholder\">\n            <div class=\"card card-review\" \n                 style=\"height: 150px\">\n                <p style=\" font-size: 14px;\n                        text-align: center;\n                        margin-top: 45px;       \n                          \">\n                    该老师目前没啥人气...\n                </p>\n         \n            </div>\n        </div> \n   \n         \n         \n        \n    <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" class=\"ispinner\" spinner=\"ripple\">\n    </ion-infinite-scroll>      \n         \n    </ion-content>\n</ion-view>");
$templateCache.put("tab-me/listing-detail-review-me.html","<ion-view view-title=\"你说了算\">\n    \n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"submitEntry()\">发送</button>\n  </ion-nav-buttons>       \n    \n    <ion-content class=\"padding \" style=\"padding:0px\" has-bouncing=\"false\">\n      \n        <!--\n        <div class=\"card card-head\" style=\"margin:0;\">\n            <div class=\"item\" style=\"padding: 5px 5px 5px 15px; font-size: 15px\">\n                \n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\" \n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label>     \n            </div>\n        </div>   \n        -->\n        \n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_target.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>评价对象</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <label class=\"item item-input item-select\">\n                    <p>选择课程：</p>\n                    <select ng-model=\"courseInfo.selectedOption\" \n                            ng-options=\"option.name for option in courseInfo.allOptions track by option.objectId\">\n                    </select>\n                </label> \n            </div>\n        </div>  \n                    \n        \n        \n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>总体评价</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 15px;\">\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">专业水平：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate1\" ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">表达能力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate2\" ng-change=\"updateOverallRating()\"  max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">亲和力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate3\"  ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div> \n                \n                <span class=\"review-grade-text\" style=\"top:135px\">\n                    <p style=\"margin-bottom: 0px\">\n                        <span style=\"color: #E54D42\">{{reviewRating.overall / 3 | number: 1}}</span> / <span style=\"color: #E54D42\">5.0分</span></p>\n                    <p><span style=\"color: #E54D42\">（{{reviewGrade}}）</span></p>\n                </span>\n                \n                <!--\n                <span class=\"review-grade-icon\" ng-switch on=\"grade\">\n                   <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                   <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                   <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                   <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                </span>    \n                -->\n            </div>\n        </div>         \n               \n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>短评（最多300字）</p>\n                </div>\n            </div>\n\n          <label class=\"item item-input\">\n            <textarea placeholder=\"你对课程和老师的看法：\"  maxlength=\"300\" style=\"height:135px;\" ng-model=\"reviewComment.text\"></textarea>\n          </label> \n        </div>           \n        \n        <div class=\"item item-divider\" style=\"padding-top:20px; padding-bottom:20px\">\n			<p style=\"text-align:center; color: #E54D42; font-weight:bold\">以下内容为选填</p>\n            <p style=\"text-align:center; color: #E54D42; font-weight:bold\">\n                <i class=\"fa fa-angle-double-down fa-2x\"></i>\n            </p>\n		</div>	\n        \n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_tag.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>标签 (选填：限三个）</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <ul class=\"tags\">\n                  <li ng-if=\"reviewTags.length == 0\"><a class=\"tag\">（未选择）</a></li>\n                  <li ng-repeat=\"tag in tagOptions\" ng-if=\"tag.checked\"><a class=\"tag\">{{tag.value}}</a></li>\n\n                </ul>\n            </div>\n        </div>     \n        \n\n        \n        \n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>课程体验（选填）</p>\n                </div>\n            </div>\n              <label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  水课鉴定：\n                </div>\n                <select name=\"birdSelect\"\n                        id=\"birdSelect\" \n                        ng-model=\"birdInfo.selectedOption\"\n                        ng-options=\"option.name for option in birdInfo.allOptions track by option.id\">\n                </select>\n              </label>\n			<label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  点名情况：\n                </div>\n                <select name=\"attendanceSelect\"\n                        id=\"attendanceSelect\" \n                        ng-model=\"attendanceInfo.selectedOption\"\n                        ng-options=\"option.name for option in attendanceInfo.allOptions track by option.id\">\n                </select>\n              </label>\n              <label class=\"item item-input item-select\" style=\"margin-bottom:10px;\">\n                <div class=\"input-label\">\n                  作业量：\n                </div>\n                <select name=\"homeworkSelect\" \n                        id=\"homeworkSelect\" \n                        ng-model=\"homeworkInfo.selectedOption\" \n                        ng-options=\"option.name for option in homeworkInfo.allOptions track by option.id\">\n                </select>\n              </label>        \n        </div>\n         \n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>考试体验（选填）</p>\n                </div>\n            </div>\n            <div class=\"card-content\">\n				<form name=\"examForm\">\n					<ion-toggle ng-model=\"examInfo.touched\" \n								ion-toggle-text=\"是;否\" \n								name=\"examToggle\" \n								ng-change=\"examReset(examInfo.touched)\" \n								toggle-class=\"toggle-positive\">\n						试卷考（如已参加请点开）\n					</ion-toggle>\n                <div ng-show=\"examInfo.touched\">\n					<ion-toggle ng-model=\"examInfo.openbook.checked\" \n								ion-toggle-text=\"是;否\" \n								name=\"examB\" \n								ng-change=\"examSetTouched(\'B\')\" \n								toggle-class=\"toggle-positive\">\n						开卷\n					</ion-toggle>\n                    <ion-toggle ng-model=\"examInfo.examprep.checked\" \n								ion-toggle-text=\"是;否\" \n								name=\"examA\"\n								ng-change=\"examSetTouched(\'A\')\" \n								toggle-class=\"toggle-positive\">\n						划重点\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.oldquestion.checked\" \n								ion-toggle-text=\"是;否\" \n								name=\"examC\" \n								ng-change=\"examSetTouched(\'C\')\" \n								toggle-class=\"toggle-positive\">\n						做过的原题较多\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.easiness.checked\" \n								ion-toggle-text=\"松;严\" \n								name=\"examD\" \n								ng-change=\"examSetTouched(\'D\')\" \n								toggle-class=\"toggle-positive\">\n						给分比较宽松\n					</ion-toggle>\n                </div>\n				</form>\n            </div>\n        </div>                \n        \n        \n    </ion-content>\n</ion-view>");
$templateCache.put("tab-me/me.html","<ion-view view-title=\"设置\" cache-view=\"false\">\n  <ion-content>\n\n		<a class=\"item item-head item-avatar item-icon-right\"\n		   ng-click=\"gotoProfile()\">\n			<img src=\"img/dept/profile.png\">\n			<h2 style=\"font-size:15px\">{{user.username}}</h2>\n			<p>西南交通大学：{{user.dept}}－{{user.year % 100 | appendZero }}级</p>\n			<i class=\"icon ion-chevron-right icon-accessory\"></i>\n		</a>\n\n		<div class=\"item item-divider\">\n			我的足迹\n		</div>\n		<a class=\"item item-icon-right\" ng-click=\"gotoReview()\">\n			我发表的评论\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n	    </a>\n\n		<a class=\"item item-icon-right\" ng-click=\"gotoLikedCourses()\">\n			我关注的课程\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n		</a>\n		<div class=\"item item-divider\">\n			我的设置\n		</div>\n		<a class=\"item item-icon-right\" ng-click=\"gotoFeedback()\">\n			问题反馈\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n		</a>\n\n        <!--\n		<a class=\"item item-icon-right\" ng-click=\"gotoChatList()\">\n			实时校园\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n		</a>\n        -->\n        <!--\n		<a class=\"item item-icon-right \" ui-sref=\"tab.secret\">\n			神秘礼物\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n		</a>\n        -->\n\n		<a class=\"item item-icon-right\" ng-click=\"logout()\" >\n			注销登录\n            <i class=\"icon ion-chevron-right icon-accessory\"></i>\n		</a>\n\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tab-me/profile.html","<ion-view view-title=\"\">\n    \n    <ion-nav-buttons side=\"right\">\n        <button class=\"button button-clear\" ng-click=\"showEditProfile()\" ng-disabled=\"user.username == \'游客\'\">编辑</button>\n    </ion-nav-buttons>   \n    \n    <ion-content class=\"scroll-bg-1\">\n\n		<div class=\"profile-head\">\n			<div class=\"head-content\">\n				<img src=\"img/dept/profile.png\">\n				<h5>{{user.username}}</h5>	\n			</div>\n		</div>\n		\n		<!--\n		<div class=\"item\" >\n			<div class=\"row\">\n				<div class=\"col-33\">\n					<p>签名</p>\n				</div>\n				<div class=\"col-67\">\n					<p><b>{{user.motto || \"输入签名...\"}}</b></p>\n				</div>\n			</div>		\n		</div>\n        -->\n\n		<div class=\"item\" >\n			<div class=\"row\">\n				<div class=\"col-33\">\n					<p>邮箱</p>\n				</div>\n				<div class=\"col-67\">\n					<p><b>{{user.email }}</b></p>\n				</div>\n                <span><p></p></span>\n                \n			</div>		\n		</div>\n        <div class=\"item\" >\n			<div class=\"row\">\n				<div class=\"col-33\">\n					<p>年级</p>\n				</div>\n				<div class=\"col-67\">\n					<p><b>{{user.year}}级</b></p>\n				</div>\n                <span><p></p></span>\n                \n			</div>		\n		</div>\n		<div class=\"item\" >\n			<div class=\"row\">\n				<div class=\"col-33\">\n					<p>学院</p>\n				</div>\n				<div class=\"col-67\">\n					<p><b>{{user.dept}}</b></p>\n				</div>\n			</div>		\n		</div>		\n		<div class=\"item\" >\n			<div class=\"row\">\n				<div class=\"col-33\">\n					<p>学校</p>\n				</div>\n				<div class=\"col-67\">\n					<p><b>西南交通大学</b></p>\n				</div>\n			</div>		\n		</div>		\n		\n		\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tab-me/review.html","<ion-view view-title=\"我的评论\">\n	<ion-content class=\"scroll-bg-1\">\n\n\n        <div ng-repeat=\"review in allReviews\">\n            <div class=\"card card-review\" ng-click=\"gotoProfReview(review)\">\n				<div class=\"heading\">\n					<div class=\"row\">\n						<div class=\"col-20\">\n                            <span ng-switch on=\"review.grade\">\n                               <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                               <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                               <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                               <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                            </span>\n						</div>\n						<div class=\"col-80\">\n							<p>{{review.courseName}}<span style=\"float:right\">{{review.rating.rate1}} / {{review.rating.rate3}} / {{review.rating.rate3}}分</span></p>\n							<p>{{review.profName}}<span class=\"date\" style=\"float:right\" am-time-ago=\"review.createdTime\"></span></p>\n\n						</div>\n					</div>\n				</div>\n				<div class=\"body\">\n					<div class=\"\">\n						<p> {{review.comment}}</p>\n					</div>\n					<div class=\"tags\">\n						<p style=\"margin:0px;\" ng-if=\"review.showTags\"> 标签：\n							<span ng-repeat=\"tag in review.tags\">{{tag.value}}{{$last ? \'\' : \', \'}}</span>\n						</p>\n					</div>\n					<div class=\"dig\" style=\"float:right\">\n						  <p class=\"\">\n							  <span>\n								  <i class=\"fa fa-thumbs-o-up fa\"></i>&nbsp;{{review.upVote}}&nbsp;</span>&nbsp;&nbsp;\n							  <span>\n								  <i class=\"fa fa-thumbs-o-down fa\"></i>&nbsp;{{review.downVote}}&nbsp;</span>\n						  </p>\n					</div>\n				</div>\n            </div>\n        </div>\n\n		<ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  ng-if=\"!noOldPosts\" class=\"ispinner\" spinner=\"ripple\">\n		</ion-infinite-scroll>\n\n	</ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs  class=\"tabs-icon-top tabs-color-active-positive {{$root.hideTabs}}\" >\n\n  <!-- Dashboard Tab -->\n	<!--\n  <ion-tab title=\"民意\" icon-off=\"ion-speakerphone\" icon-on=\"ion-speakerphone\" ui-sref=\"tab.square\">\n    <ion-nav-view name=\"tab-square\"></ion-nav-view>\n  </ion-tab>\n-->\n    \n  <ion-tab title=\"活水\" icon-off=\"ion-ios-flame-outline\" icon-on=\"ion-ios-flame\" ui-sref=\"tab.listing\">\n    <ion-nav-view name=\"tab-listing\"></ion-nav-view>\n  </ion-tab>\n    \n  <ion-tab title=\"逛逛\" icon-off=\"ion-ios-navigate-outline\" icon-on=\"ion-ios-navigate\" ui-sref=\"tab.discover\">\n    <ion-nav-view name=\"tab-discover\"></ion-nav-view>\n  </ion-tab>    \n\n  <ion-tab title=\"点评\" icon-off=\"ion-plus-circled\" icon-on=\"ion-plus-circled\" ui-sref=\"tab.review\">\n    <ion-nav-view name=\"tab-review\"></ion-nav-view>\n  </ion-tab>\n    \n  <ion-tab title=\"榜单\" icon-off=\"ion-ios-pie-outline\" icon-on=\"ion-ios-pie\" ui-sref=\"tab.rank\">\n    <ion-nav-view name=\"tab-rank\"></ion-nav-view>\n  </ion-tab>\n    \n  <ion-tab title=\"设置\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" ui-sref=\"tab.me\">\n    <ion-nav-view name=\"tab-me\"></ion-nav-view>\n  </ion-tab>\n\n</ion-tabs>\n");
$templateCache.put("tab-review/modal_tag.html","  <ion-modal-view>\n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        \n      <h1 class=\"title\">选择三个标签</h1>\n      <button class=\"button button-clear button-primary\" ng-click=\"modal_tag.hide()\">取消</button>\n    </ion-header-bar>\n      \n    <ion-content class=\"\">\n        \n        <ion-checkbox ng-repeat=\"tag in tagList\"\n                      ng-model=\"tag.checked\" \n                      ng-checked=\"tag.checked\"\n                      ng-change=\"checkChanged(tag)\" \n                      ng-disabled=\"checked==limit && !tag.checked\">\n          {{ tag.name }}\n        </ion-checkbox>         \n        \n        \n    </ion-content>\n  </ion-modal-view>");
$templateCache.put("tab-review/modal_target.html","  <ion-modal-view  >\n      \n      <!--\n	<ion-header-bar class=\"bar bar-header bar-positive item-input-inset\">\n	  <label class=\"item-input-wrapper\">\n		<i class=\"icon ion-ios-search placeholder-icon\"></i>\n		<input type=\"search\" \n			   placeholder=\"教师姓名，课程或任何关联词\" \n               style=\"color: white\"\n			   ng-model=\"searchText.text\"\n			   ng-change=\"startSearch()\">\n	  </label>\n	  <button class=\"button button-clear\" ng-click=\"modal_target.hide()\">\n		<span style=\"font-size:15px\">取消</span>\n	  </button>\n	</ion-header-bar>	\n    -->\n      \n    <ion-header-bar class=\"bar bar-header bar-positive\">\n        \n      <h1 class=\"title\">选择点评对象</h1>\n      <button class=\"button button-clear button-primary\" ng-click=\"modal_target.hide()\">取消</button>\n    </ion-header-bar>      \n      \n    <ion-content class=\"scroll-bg-1\" has-bouncing=\"false\">\n        \n        <div class=\"bar bar-header bar-positive item-input-inset\">\n          <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" \n                   placeholder=\"教师姓名，课程或任何关联词\" \n                   style=\"color: black;\"\n                   ng-model=\"searchText.text\"\n                   ng-change=\"startSearch()\">\n          </label>\n        </div>             \n\n        <div class=\"list\">\n            <a class=\"item item-avatar\" \n                ng-repeat=\"course in displayCourses track by $index\"\n                ng-click=\"setReviewTarget(course)\">\n                <span class=\"conditional-images\">\n                    <img src=\'{{course.deptImg}}\'>\n                </span>\n\n                <h2>{{course.prof}}</h2>\n                <p>{{course.name}}</p>\n            </a>           \n        </div>   \n\n        <div class=\"user-add-course-prompt\"  ng-if=\"showUserAddCoursePrompt\">\n            <p>没找到目标？换个关键字试试呢。（如果还是没找到，你可以选择主动添加该课程）</p>\n            <button class=\"button button-positive\" \n                    ng-click=\"showUserAddCourseForm();\"\n                    >\n              添加课程\n            </button>\n        </div>\n        \n        <ion-infinite-scroll on-infinite=\"loadMore()\" distance=\"1%\"  \n                             ng-if=\"!noMorePost && !showPromoContent\" class=\"ispinner\" spinner=\"ripple\">\n        </ion-infinite-scroll>      \n\n    </ion-content>\n  </ion-modal-view>");
$templateCache.put("tab-review/review.html","<ion-view view-title=\"你说了算\">\n\n  <ion-nav-buttons side=\"right\">\n    <button class=\"button button-clear \" ng-click=\"submitEntry()\" ng-disabled=\"AV.User.current().get(\'username\') === \'游客\'\">发送</button>\n  </ion-nav-buttons>\n\n    <ion-content class=\"padding \" style=\"padding:0px\" has-bouncing=\"false\" >\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_target.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>评价对象</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <p>教师：{{reviewTarget.prof || \"（点击选择）\"}}</p>\n                <p>课程：{{reviewTarget.name || \"（点击选择）\"}}</p>\n            </div>\n        </div>\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>总体评价</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 15px;\">\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">专业水平：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate1\" ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">表达能力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate2\" ng-change=\"updateOverallRating()\"  max=\"5\"></rating>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-25\" >\n                        <p style=\"height:15px; line-height:30px;\">亲和力：</p>\n                    </div>\n                    <div class=\"col-75 positive\">\n                        <rating ng-model=\"reviewRating.rate3\"  ng-change=\"updateOverallRating()\" max=\"5\"></rating>\n                    </div>\n                </div>\n\n                <span class=\"review-grade-text\">\n                    <p style=\"margin-bottom: 0px\">\n                        <span style=\"color: #E54D42\">{{reviewRating.overall / 3 | number: 1}}</span> / <span style=\"color: #E54D42\">5.0分</span></p>\n                    <p><span style=\"color: #E54D42\">（{{reviewGrade}}）</span></p>\n                </span>\n\n                <!--\n                <span class=\"review-grade-icon\" ng-switch on=\"grade\">\n                   <img ng-switch-when=\"0\" src=\'img/bad.png\' width=\"80%\">\n                   <img ng-switch-when=\"1\" src=\'img/okay.png\' width=\"80%\">\n                   <img ng-switch-when=\"2\" src=\'img/good.png\' width=\"80%\">\n                   <img ng-switch-default   src=\'img/bad.png\' width=\"80%\">\n                </span>\n                -->\n            </div>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>短评（最多300字）</p>\n                </div>\n            </div>\n\n          <label class=\"item item-input\">\n            <textarea placeholder=\"你对课程和老师的看法：\"  maxlength=\"300\" style=\"height:135px;\" ng-model=\"reviewComment.text\"></textarea>\n          </label>\n        </div>\n\n        <div class=\"item item-divider\" style=\"padding-top:20px; padding-bottom:20px\">\n			<p style=\"text-align:center; color: #E54D42; font-weight:bold\">以下内容为选填</p>\n            <p style=\"text-align:center; color: #E54D42; font-weight:bold\">\n                <i class=\"fa fa-angle-double-down fa-2x\"></i>\n            </p>\n		</div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\" ng-click=\"modal_tag.show()\">\n            <div class=\"card-heading\">\n                <div class=\"row\" style=\"margin-bottom: 10px\" >\n                    <p>标签 (选填：限三个）</p>\n                </div>\n            </div>\n\n            <div class=\"card-content\" style=\"margin-bottom: 10px\" >\n                <ul class=\"tags\">\n                  <li ng-if=\"reviewTags.length == 0\"><a class=\"tag\">（未选择）</a></li>\n                  <li ng-repeat=\"tag in tagOptions\" ng-if=\"tag.checked\"><a class=\"tag\">{{tag.value}}</a></li>\n\n                </ul>\n            </div>\n        </div>\n\n\n\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>课程体验（选填）</p>\n                </div>\n            </div>\n              <label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  水课鉴定：\n                </div>\n                <select name=\"birdSelect\"\n                        id=\"birdSelect\"\n                        ng-model=\"birdInfo.selectedOption\"\n                        ng-options=\"option.name for option in birdInfo.allOptions track by option.id\">\n                </select>\n              </label>\n			<label class=\"item item-input item-select\">\n                <div class=\"input-label\">\n                  点名情况：\n                </div>\n                <select name=\"attendanceSelect\"\n                        id=\"attendanceSelect\"\n                        ng-model=\"attendanceInfo.selectedOption\"\n                        ng-options=\"option.name for option in attendanceInfo.allOptions track by option.id\">\n                </select>\n              </label>\n              <label class=\"item item-input item-select\" style=\"margin-bottom:10px;\">\n                <div class=\"input-label\">\n                  作业量：\n                </div>\n                <select name=\"homeworkSelect\"\n                        id=\"homeworkSelect\"\n                        ng-model=\"homeworkInfo.selectedOption\"\n                        ng-options=\"option.name for option in homeworkInfo.allOptions track by option.id\">\n                </select>\n              </label>\n        </div>\n\n        <div class=\"card card-review-input\" style=\"margin:0;\">\n            <div class=\"card-heading\">\n                <div class=\"row\" >\n                    <p>考试体验（选填）</p>\n                </div>\n            </div>\n            <div class=\"card-content\">\n				<form name=\"examForm\">\n					<ion-toggle ng-model=\"examInfo.touched\"\n								ion-toggle-text=\"是;否\"\n								name=\"examToggle\"\n								ng-change=\"examReset(examInfo.touched)\"\n								toggle-class=\"toggle-positive\">\n						已参加试卷考（点击展开更多）\n					</ion-toggle>\n                <div ng-show=\"examInfo.touched\">\n					<ion-toggle ng-model=\"examInfo.openbook.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examB\"\n								ng-change=\"examSetTouched(\'B\')\"\n								toggle-class=\"toggle-positive\">\n						开卷\n					</ion-toggle>\n                    <ion-toggle ng-model=\"examInfo.examprep.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examA\"\n								ng-change=\"examSetTouched(\'A\')\"\n								toggle-class=\"toggle-positive\">\n						划重点\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.oldquestion.checked\"\n								ion-toggle-text=\"是;否\"\n								name=\"examC\"\n								ng-change=\"examSetTouched(\'C\')\"\n								toggle-class=\"toggle-positive\">\n						做过的原题较多\n					</ion-toggle>\n					<ion-toggle ng-model=\"examInfo.easiness.checked\"\n								ion-toggle-text=\"松;严\"\n								name=\"examD\"\n								ng-change=\"examSetTouched(\'D\')\"\n								toggle-class=\"toggle-positive\">\n						给分比较宽松\n					</ion-toggle>\n                </div>\n				</form>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>\n");}]);
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'login.controllers',
  'signup.controllers',
  'listing.controllers',
  'discover.controllers',
  'rank.controllers',
  'review.controllers',
  'me.controllers',
  'templates',
  'ngStorage',
  'customDirectives',
  'starter.services',
  'chart.js',
  'ksSwiper',
  'ionic.rating',
  'angular.filter',
  'nvd3',
  'angularMoment',
  'jett.ionic.filter.bar'
])


.constant('yearList', [{
  id: '0',
  name: "2000",
  value: 2000
}, {
  id: '1',
  name: "2001",
  value: 2001
}, {
  id: '2',
  name: "2002",
  value: 2002
}, {
  id: '3',
  name: "2003",
  value: 2003
}, {
  id: '4',
  name: "2004",
  value: 2004
}, {
  id: '5',
  name: "2005",
  value: 2005
}, {
  id: '6',
  name: "2006",
  value: 2006
}, {
  id: '7',
  name: "2007",
  value: 2007
}, {
  id: '8',
  name: "2008",
  value: 2008
}, {
  id: '9',
  name: "2009",
  value: 2009
}, {
  id: '10',
  name: "2010",
  value: 2010
}, {
  id: '11',
  name: "2011",
  value: 2011
}, {
  id: '12',
  name: "2012",
  value: 2012
}, {
  id: '13',
  name: "2013",
  value: 2013
}, {
  id: '14',
  name: "2014",
  value: 2014
}, {
  id: '15',
  name: "2015",
  value: 2015
}])



.constant('tagList', [{
  id: '0',
  positive: false,
  value: "照本宣科"
}, {
  id: '1',
  positive: false,
  value: "枯燥无味"
}, {
  id: '2',
  positive: true,
  value: "引人入胜"
}, {
  id: '3',
  positive: true,
  value: "富有创新"
}, {
  id: '4',
  positive: true,
  value: "氛围轻松"
}, {
  id: '5',
  positive: false,
  value: "水课一门"
}, {
  id: '6',
  positive: true,
  value: "治学严谨"
}, {
  id: '7',
  positive: true,
  value: "耐心"
}, {
  id: '8',
  positive: true,
  value: "幽默"
}, {
  id: '9',
  positive: false,
  value: "僵化刻板"
}, {
  id: '10',
  positive: true,
  value: "低调"
}, {
  id: '11',
  positive: true,
  value: "仁慈"
}, {
  id: '12',
  positive: true,
  value: "认真负责"
}, {
  id: '13',
  positive: false,
  value: "冷酷无情"
}, {
  id: '14',
  positive: true,
  value: "热情"
}, {
  id: '15',
  positive: true,
  value: "和蔼"
}, {
  id: '16',
  positive: false,
  value: "冷淡"
}, {
  id: '17',
  positive: true,
  value: "博学"
}, {
  id: '18',
  positive: true,
  value: "健谈"
}, {
  id: '19',
  positive: false,
  value: "浮夸"
}, {
  id: '20',
  positive: true,
  value: "深邃"
}, {
  id: '21',
  positive: false,
  value: "张扬"
}, ])



.run(function($ionicPlatform, $ionicPopup, $localStorage, $rootScope, $state,
  courseService) {

  var showNoConnection = function() {
    var alertPopup = $ionicPopup.alert({
      title: '无网络连接',
      template: '请确认网络连接正常后再试',
      okText: '明白了',
    });
    alertPopup.then(function(res) {
      ionic.Platform.exitApp();
    });
  };


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins
      .Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    //hide tabs on keyboard popup
    window.addEventListener('native.keyboardshow', function() {
      document.querySelector('div.tabs').style.display = 'none';
      angular.element(document.querySelector('ion-content.has-tabs'))
        .css('bottom', 0);
    });
    window.addEventListener('native.keyboardhide', function() {
      var tabs = document.querySelectorAll('div.tabs');
      angular.element(tabs[0]).css('display', '');
    });

    if (window.Connection && navigator.connection.type == Connection.NONE) {
      showNoConnection();
    } else {
      // Initailze Leancloud MBaSS
      AV.initialize('zwjjm3MbxDYRKny9f31amkXq',
        'PczcQb9HEBCLtLj4ohJ7ePj5');

      var currentUser = AV.User.current();
      if (currentUser) {
        console.log("user info available in cache");
        $state.go("tab.listing");
      } else {
        console.log("no existing user info, go to signin/signup");
        $state.go("login");
      }

      //fetch all courses
      courseService.updateAllCourse();
    }

  });
})



.run(function(amMoment) {
  amMoment.changeLocale('zh-cn');
})


.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.style('standard');
  var jsScrolling = (ionic.Platform.isAndroid()) ? false : true;
  $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.form.toggle('large');
  $ionicConfigProvider.views.transition('ios');
  $ionicConfigProvider.backButton.text('');
})

.config(function($ionicFilterBarConfigProvider) {
  $ionicFilterBarConfigProvider.transition('vertical');
  $ionicFilterBarConfigProvider.theme('positive');
  $ionicFilterBarConfigProvider.placeholder("请输入过滤用的关键词");
})



.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })

  .state("signup", {
    url: '/signup',
    templateUrl: "signup/signup.html",
    controller: "SignupCtrl"
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tabs/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.listing', {
      url: '/listing',
      views: {
        'tab-listing': {
          templateUrl: 'tab-listing/listing.html',
          controller: 'ListingCtrl'
        }
      }
    })
    .state('tab.listing-detail', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-listing': {
          templateUrl: 'tab-listing/listing-detail.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-listing': {
          templateUrl: 'tab-listing/listing-detail-review.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })

  //a copy for the account tab (needed to due to ionic bug of state switching)
  .state('tab.listing-detail-2', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-me': {
          templateUrl: 'tab-me/listing-detail-me.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review-2', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-me': {
          templateUrl: 'tab-me/listing-detail-review-me.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })

  //a copy for the rank tab (needed to due to ionic bug of state switching)
  .state('tab.listing-detail-3', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-rank': {
          templateUrl: 'tab-rank/listing-detail-rank.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review-3', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-rank': {
          templateUrl: 'tab-rank/listing-detail-review-rank.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })


  //a copy for the discover tab (needed to due to ionic bug of state switching)
  .state('tab.listing-detail-4', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-discover': {
          templateUrl: 'tab-discover/listing-detail-discover.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review-4', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-discover': {
          templateUrl: 'tab-discover/listing-detail-review-discover.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })



  .state('tab.discover', {
    url: '/discover',
    views: {
      'tab-discover': {
        templateUrl: 'tab-discover/discover.html',
        controller: 'DiscoverCtrl'
      }
    }
  })

  .state('tab.discover-list', {
    url: '/discover/{deptId}',
    views: {
      'tab-discover': {
        templateUrl: 'tab-discover/discover-list.html',
        controller: 'DiscoverListCtrl'
      }
    }
  })


  .state('tab.rank', {
    url: '/rank',
    views: {
      'tab-rank': {
        templateUrl: 'tab-rank/rank.html',
        controller: 'RankCtrl'
      }
    }
  })

  .state('tab.rank-detail', {
    url: '/rank-detail/{rankId}?deptId',
    views: {
      'tab-rank': {
        templateUrl: 'tab-rank/rank-detail.html',
        controller: 'RankDetailCtrl'
      }
    }
  })



  .state('tab.review', {
    url: '/review',
    views: {
      'tab-review': {
        templateUrl: 'tab-review/review.html',
        controller: 'ReviewCtrl'
      }
    }
  })



  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/me.html',
        controller: 'MeCtrl'
      }
    }
  })

  .state('tab.me-profile', {
    url: '/me-profile',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/profile.html',
        controller: 'MeProfileCtrl'
      }
    }
  })

  .state('tab.me-review', {
    url: '/me-review',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/review.html',
        controller: 'MeReviewCtrl'
      }
    }
  })

  .state('tab.me-course', {
    url: '/me-course',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/course.html',
        controller: 'MeCourseCtrl'
      }
    }
  })


  .state('tab.feedback', {
    url: '/feedback',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/feedback.html',
        controller: 'MeFeedbackCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/login.html');

});

/*
//needs server-side modification, otherwise refresh will not work
.config(['$locationProvider', function($locationProvider) {
  if(window.history && window.history.pushState){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
}])*/

angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, $http, $localStorage, $filter,
	$ionicPopup, $ionicHistory, $ionicActionSheet, $ionicLoading) {

	/*----------------------------------------------------------------
	Popoup : login failure
	-----------------------------------------------------------------*/
	//popup (submission failure)
	var showLoginFailure = function() {
		var alertPopup = $ionicPopup.alert({
			title: '登录失败',
			//cssClass: 'login-popup',
			template: '请确认用户名和密码输入正确',
			okText: '明白了',
		});
		alertPopup.then(function(res) {
			//
		});
	};

	var showNoConnection = function() {
		var alertPopup = $ionicPopup.alert({
			title: '无网络连接',
			template: '请确认网络连接正常后再试',
			okText: '明白了',
		});
		alertPopup.then(function(res) {
			//
		});
	};


	/*----------------------------------------------------------------
	Login control
	-----------------------------------------------------------------*/
	$scope.user = {
		email: '',
		password: ''
	};

	$scope.headlines = [{
		to: "许义文－思想道德修养与法律基础",
		from: "哈哈～",
		content: "无法适应他那南通口音的普通话，印象最深刻的就是他把“狗”念成“gěi”。还有秒杀一切的犀利眼神。"
	}, {
		to: "陈晓红－英语I",
		from: "能量女王",
		content: "老师非常好，很漂亮，上课很轻松，没有一次犯困过！"
	}, {
		to: "张国琳－通用学术英语",
		from: "风の钢琴师",
		content: "张国琳老师是一个典型的文艺女青年，上她的英语课时就像在听一场唯美的故事会。她用她的文艺，以及她流利的英语征服了我"
	}, {
		to: "曹中清－机械工程中的仿真",
		from: "怪咖先生",
		content: "几乎每一个周五的晚上，我都要听他吹自己当年如何厉害，其他人如何一般，自己做过某公司亚洲老总，随便一个项目上千万如何……"
	}, {
		to: "王金栋－金属切削理论与刀具设计",
		from: "杨西米",
		content: "大四专业课讲的最细最清楚的，西安交大来的新老师。"
	}, {
		to: "范美坤－能源与环境",
		from: "我是小公举",
		content: "超热情，除了期末论文防抄袭之外，一切完美！见过的第一个用Google查重的老师"
	}, {
		to: "师明星－工程力学C",
		from: "abcd",
		content: "师老师极其负责任，为学生着想，尽自己所能为学生解决学习之外的后顾之忧。"
	}, {
		to: "董洁－大学生心理健康",
		from: "劼帅",
		content: "董洁老师说实话并不像是一个老师，而更像是一个学姐的身份来上课。课程本身十分轻松，想要了解些心理学知识或水过的同学可以选择"
	}, {
		to: "何洪涛－思想道德修养与法律基础",
		from: "249301961",
		content: "口头禅：“老师刚从England回来”“老师下学期要去England”。上课不用中文喜欢说英文装B"
	}];



	var shuffleArray = function(array) {
		var m = array.length,
			t, i;

		// While there remain elements to shuffle
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	};

	shuffleArray($scope.headlines);

	var showLoading = function() {
		$ionicLoading.show({
			content: 'Sending',
			//templateUrl: 'loading-indicators/global.html',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	};

	var hideLoading = function() {
		$ionicLoading.hide();
	};


	$scope.login = function() {
		showLoading();

		if (window.Connection && navigator.connection.type == Connection.NONE) {
			hideLoading();
			showNoConnection();
		} else {
			AV.User.logIn($scope.user.email, $scope.user.password, {
				success: function(user) {
					console.log("login success!");
					hideLoading();

					//forget this view after logged in
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});

					//default first page
					$state.go("tab.listing");

				},
				error: function(user, error) {
					hideLoading();
					console.log("login failed!");
					//alert("Error: " + error.code + " " + error.message);
					showLoginFailure();

				}
			});
		}

	};

	$scope.guestLogin = function() {
		showLoading();
		AV.User.logIn("guest@huoshui.com", "123", {
			success: function(user) {
				console.log("login success!");
				hideLoading();

				//forget this view after logged in
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				//default first page
				$state.go("tab.listing");

			},
			error: function(user, error) {
				hideLoading();
				console.log("login failed!");
				//alert("Error: " + error.code + " " + error.message);
				showLoginFailure();

			}
		});
	};


	$scope.gotoSignup = function() {
		console.log("go to signup page now!");
		$state.go("signup");

	};



});

angular.module('signup.controllers', [])

.controller('SignupCtrl', function($scope, $state, $http, $localStorage,
  $filter,
  yearList, deptService,
  $ionicModal, $ionicPopup, $ionicHistory, $ionicActionSheet, $ionicLoading
) {

  /*----------------------------------------------------------------
  Loading indicator
  -----------------------------------------------------------------*/
  var showLoading = function() {
    $ionicLoading.show({
      content: 'Sending',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  };

  var hideLoading = function() {
    $ionicLoading.hide();
  };


  /*----------------------------------------------------------------
  Modal Control (year selection)
  -----------------------------------------------------------------*/
  $scope.yearOptions = yearList;
  $scope.yearLimit = 1;
  $scope.yearChecked = 0;
  $scope.yearCheckChanged = function(year) {
    if (year.checked) {
      $scope.yearChecked++;
      $scope.user.year = year.value;
    } else {
      $scope.yearChecked--;
      $scope.user.year = '';
    }
  };

  $ionicModal.fromTemplateUrl('signup/modal_year.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_year = modal;
  });

  $scope.modalYearComplete = function() {
    $scope.modal_year.hide();
  };

  /*----------------------------------------------------------------
  Modal Control (dept selection)
  -----------------------------------------------------------------*/
  $scope.deptOptions = deptService.getDeptList();
  $scope.deptLimit = 1;
  $scope.deptChecked = 0;
  $scope.deptCheckChanged = function(dept) {
    if (dept.checked) {
      $scope.deptChecked++;
      $scope.user.dept = dept.value;
    } else {
      $scope.deptChecked--;
      $scope.user.dept = '';
    }
  };


  $ionicModal.fromTemplateUrl('signup/modal_dept.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_dept = modal;
  });

  $scope.modalDeptComplete = function() {
    $scope.modal_dept.hide();
  };



  /*----------------------------------------------------------------
  navigation
  -----------------------------------------------------------------*/

  $scope.gotoLogin = function() {
    $state.go("login");
  };



  /*----------------------------------------------------------------
  signup control
  -----------------------------------------------------------------*/
  $scope.user = {
    dept: '',
    year: '',

  };

  $scope.signup = function() {
    console.log("signup!");
    showLoading();

    var user = new AV.User();
    user.set("username", $scope.user.username);
    user.set("email", $scope.user.email);
    user.set("password", $scope.user.password);
    user.set("dept", $scope.user.dept);
    user.set("year", $scope.user.year);

    user.signUp(null, {
      success: function(user) {
        hideLoading();

        //forget this view after logged in
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go("tab.listing");

      },
      error: function(user, error) {
        hideLoading();

        console.log("Error: " + error.code + " " + error.message);
        if (error.code === 202) {
          showDuplicateEmailFailure();
          console.log("202");
        } else if (error.code === 203) {
          showDuplicateUsernameFailure();
          console.log("203");
        } else {
          showSignupFailure();
        }
      }
    });

  };

  /*----------------------------------------------------------------
  Popoup : duplicate username failure (error: 202)
  -----------------------------------------------------------------*/
  var showDuplicateEmailFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: '注册失败',
      template: '该昵称已被占用',
      okText: '明白了',
    });
    alertPopup.then(function(res) {});
  };
  /*----------------------------------------------------------------
    Popoup : duplicate email failure (error: 203)
    -----------------------------------------------------------------*/
  var showDuplicateUsernameFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: '注册失败',
      template: '该邮箱已被占用',
      okText: '明白了',
    });
    alertPopup.then(function(res) {});
  };
  /*----------------------------------------------------------------
    Popoup : signup failure (general)
    -----------------------------------------------------------------*/
  var showSignupFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: '注册失败',
      template: '请确认注册信息输入无误',
      okText: '明白了',
    });
    alertPopup.then(function(res) {});
  };


});

angular.module('listing.controllers', [])


.controller('ListingCtrl', function($scope, $rootScope, $state, $timeout,
  $localStorage, $filter,
  reviewService, popupService, $ionicScrollDelegate) {


  $scope.$storage = $localStorage;


  /*----------------------------------------------------------------
  refresh floating button
  -----------------------------------------------------------------*/
  $scope.refreshButton = false;
  $scope.refreshNewPost = function() { //ng-click for back to top button
    reviewService.clearNewPost();
    reviewService.fetechMoreNewPost();


  };


  /*----------------------------------------------------------------
  Scroll to top floating button
  -----------------------------------------------------------------*/
  $scope.sttButton = false;
  $scope.scrollToTop = function() { //ng-click for back to top button
    $ionicScrollDelegate.scrollTop(true);
    $scope.sttButton = false; //hide the button when reached top
  };

  $scope.getScrollPosition = function() {
    //monitor the scroll
    var moveData = $ionicScrollDelegate.getScrollPosition().top;
    // console.log(moveData);
    $scope.$apply(function() {
      if (moveData < 100) {
        $scope.refreshButton = true;
        $scope.sttButton = false;
      } else if (moveData > 250) {
        $scope.refreshButton = false;
        $scope.sttButton = true;
      } else {
        $scope.refreshButton = false;
        $scope.sttButton = false;
      }
    }); //apply
  };


  /*----------------------------------------------------------------
  Fetch Data for Preview
  -----------------------------------------------------------------*/
  $scope.newPost = reviewService.getNewPost();
  $scope.goodPost = reviewService.getGoodPost();

  $scope.fetchStatus = reviewService.getFetchStatus();

  $scope.active = 'newPost';
  $scope.isActive = function(type) {
    return type === $scope.active;
  };

  $scope.setFetchOption = function(type) {
    $scope.active = type;
    if (type === 'newPost') {
      $scope.fetechMoreNewPost();
    } else if (type === 'goodPost') {
      $scope.fetechMoreGoodPost();
    }
  };

  $scope.fetechMoreGoodPost = function() {
    console.log("super Good fetch");
    reviewService.fetechMoreGoodPost();
  };

  $scope.fetechMoreNewPost = function() {
    console.log("super New fetch");
    reviewService.fetechMoreNewPost();
  };

  $scope.gotoProfReview = function(review) {
    $state.go('tab.listing-detail', {
      'listingId': review.profName,
      'deptId': review.dept
    });
  };

  /*----------------------------------------------------------------
  search control
  -----------------------------------------------------------------*/
  $scope.showUserAddCoursePrompt = false;
  $scope.searchText = {};
  var filterdCourses = [];
  $scope.displayCourses = [];
  $scope.noMorePost = false;
  $scope.showPromoContent = true;
  var loadLength = 15;

  $scope.cancelSearch = function() {
    console.log("cancel search");
    $scope.searchText.text = '';
    $scope.showPromoContent = true;
    $scope.noMorePost = true;
  };

  $scope.startSearch = function() {
    filterdCourses = $filter('filter')($scope.$storage.courses, $scope.searchText
      .text);
    $scope.displayCourses = filterdCourses.slice(0, loadLength);
    $scope.noMorePost = false;
    if ($scope.searchText.text.length !== 0) {
      $scope.showPromoContent = false;
    } else {
      $scope.showPromoContent = true;
      $scope.noMorePost = true;
    }
    console.log("attempt searching, course length:" + filterdCourses.length);

  };

  $scope.loadMore = function() {
    var resultLength = filterdCourses.length;
    var displayLength = $scope.displayCourses.length;
    console.log("result length:" + filterdCourses.length);
    console.log("display length:" + $scope.displayCourses.length);

    if (displayLength == resultLength) {
      $scope.noMorePost = true;
      $scope.showUserAddCoursePrompt = true;
      console.log("no more to add");
    } else {
      $scope.showUserAddCoursePrompt = false;
      var newData = filterdCourses.slice(displayLength, displayLength +
        loadLength);
      for (var i = 0; i < newData.length; ++i) {
        $scope.displayCourses.push(newData[i]);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("add more, new length is: " + $scope.displayCourses.length);
      //$scope.noMorePost = false;
    }

  };

  $scope.$on('course-add-success', function(event, args) {
    $scope.startSearch();
  });
  $scope.showUserAddCourseForm = function() {

    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControl();
    } else {
      popupService.showUserAddCourseForm();
    }
  };


})



.controller('ListingDetailCtrl', function($scope, $rootScope, $state,
  $stateParams, $localStorage, $ionicPopup, $filter, popupService,
  $location) {

  /*----------------------------------------------------------------
  parse stateParams
  -----------------------------------------------------------------*/



  /*----------------------------------------------------------------
  no post placeholder
  -----------------------------------------------------------------*/
  $scope.showNoPostPlaceholder = false;



  /*----------------------------------------------------------------
  show sharing options
  -----------------------------------------------------------------*/
  $scope.sharingOptions = {
    img: 'http://localhost:8100/img/logo.png',
    prof: $stateParams.listingId
  };


  /*----------------------------------------------------------------
  Add course to personal collection
  -----------------------------------------------------------------*/

  $scope.addToCollection = function() {

    //access control
    var username = AV.User.current().get('username');
    if (username === '游客') {
      popupService.showAccessControl();
    } else {
      console.log("try adding course to collection");
      var currCourse = $filter('filterBy')($storage.courses, ['prof'],
        $scope.listingId)[0];
      console.log(currCourse.objectId);


      var user = AV.User.current();
      var relation = user.relation("likedCourses");

      var Courses = AV.Object.extend("Courses");
      var query = new AV.Query(Courses);
      query.equalTo("objectId", currCourse.objectId);
      query.find({
        success: function(course) {
          relation.add(course);
          user.save();
          showAddedToCollection();
        },
        error: function(course, error) {
          showAddToCollectionFailure();
          //alert("Error: " + error.code + " " + error.message);
        }
      });
    }

  };
  //popup (submission sucess)
  var showAddedToCollection = function() {
    var successPopup = $ionicPopup.alert({
      title: '关注成功！',
      template: '您可以在“设置”页面查看关注内容',
      okText: '知道了',

    });
    successPopup.then(function(res) {});
  };
  var showAddToCollectionFailure = function() {
    var successPopup = $ionicPopup.alert({
      title: '喔喔，关注失败',
      template: '请稍后再试',
      okText: '知道了',

    });
    successPopup.then(function(res) {});
  };



  /*----------------------------------------------------------------
  Like and dislike control
  -----------------------------------------------------------------*/

  $scope.upVoteIncrement = function(review, isLike) {

    var username = AV.User.current().get('username');
    if (username === '游客') {
      popupService.showAccessControl();
    } else {
      var reviewId = review.id;
      var Post = AV.Object.extend("Reviews");
      var query = new AV.Query(Post);

      query.get(reviewId, {
        success: function(post) {

          if (isLike && !review.voted) {
            //optimistically update local view
            review.upVote++;
            review.voted = true;
            $scope.$apply();


            //check if already liked
            var user = AV.User.current();
            var relation = user.relation("likedReviews");
            var query = relation.query();
            query.equalTo("objectId", reviewId);
            query.find({
              success: function(list) {
                if (list.length === 0) {
                  //alert("upvote successful");
                  //increment like counter
                  post.increment("upVote");
                  post.save();

                  //add post to user relation
                  relation.add(post);
                  user.save();
                } else {
                  //alert("already upvoted");
                  showAlreadyLikedDisliked();
                  review.upVote--;
                  $scope.$apply();
                }
              }
            });


          } else if (!isLike && !review.voted) {

            review.downVote++;
            review.voted = true;
            $scope.$apply();

            //check if already disliked
            var user = AV.User.current();
            var relation = user.relation("dislikedReviews");
            var query = relation.query();
            query.equalTo("objectId", reviewId);
            query.find({
              success: function(list) {
                if (list.length === 0) {
                  //alert("downvote successful");
                  //increment like counter
                  post.increment("downVote");
                  post.save();

                  //add post to user relation
                  relation.add(post);
                  user.save();
                } else {
                  //alert("already downvoted");
                  showAlreadyLikedDisliked();
                  review.downVote--;
                  $scope.$apply();
                }
              }
            });
          }
        },
        error: function(object, error) {
          console.log(object);
        }
      });
    }
  };

  //popup (submission sucess)
  var showAlreadyLikedDisliked = function() {
    var successPopup = $ionicPopup.alert({
      title: '抱歉，您已经赞或踩过一次了！',
      //template: '请填写短评选项！',
      okText: '知道了',

    });
    successPopup.then(function(res) {});
  };


  /*----------------------------------------------------------------
  Initialization and Navigation
  -----------------------------------------------------------------*/
  $storage = $localStorage;
  var postStartPoint = 0;
  var postEndPoint = 0;
  $scope.listingId = $stateParams.listingId;
  $scope.deptId = $stateParams.deptId;
  console.log($stateParams);


  $scope.gotoDetailReview = function(currTab) {
    //access control
    var username = AV.User.current().get('username');
    if (username === '游客') {
      popupService.showAccessControl();
    } else {
      if (currTab === 'listing') {
        $state.go('tab.listing-detail-review', {
          'listingId': $scope.listingId,
          'deptId': $scope.deptId
        });
      } else if (currTab === 'discover') {
        $state.go('tab.listing-detail-review-4', {
          'listingId': $scope.listingId,
          'deptId': $scope.deptId
        });
      } else if (currTab === 'rank') {
        $state.go('tab.listing-detail-review-3', {
          'listingId': $scope.listingId,
          'deptId': $scope.deptId
        });
      }
    }

  };



  // $scope.profCourses = $filter('filterBy')($storage.courses,['prof'],$scope.listingId);

  $scope.profCourses = $filter('where')($storage.courses, {
    'prof': $scope.listingId
  });
  if ($scope.deptId) {
    $scope.profCourses = $filter('where')($scope.profCourses, {
      'dept': $scope.deptId
    });
  }



  $scope.noOldPosts = false;

  $scope.reviewStats = {
    "ratingOverall": 0,
    "ratingCount": 0,
    "rate1Avg": 0,
    "rate2Avg": 0,
    "rate3Avg": 0,
    "rateGoodCount": 0,
    "rateMidCount": 0,
    "rateBadCount": 0,
    "birdOverall": "未知",
    "attendanceOverall": "未知",
    "homeworkOverall": "未知",
    "examOverall": "未知"
  };

  var updateReviewStats = function() {
    AV.Cloud.run('getProfStats', {
      "profName": $scope.listingId,
      "dept": $scope.deptId
    }, {
      success: function(res) {
        $scope.reviewStats.ratingOverall = res.rating.rateOverall;
        $scope.reviewStats.ratingCount = res.rating.rateCount;
        $scope.reviewStats.rate1Avg = $filter('number')(res.rating.rate1Avg,
          1);
        $scope.reviewStats.rate2Avg = $filter('number')(res.rating.rate2Avg,
          1);
        $scope.reviewStats.rate3Avg = $filter('number')(res.rating.rate3Avg,
          1);

        $scope.reviewStats.rateGoodCount = res.rating.rateGoodCount;
        $scope.reviewStats.rateMidCount = res.rating.rateMidCount;
        $scope.reviewStats.rateBadCount = res.rating.rateBadCount;
        var goodRatio = $scope.reviewStats.rateGoodCount / $scope.reviewStats
          .ratingCount;
        goodRatio = $filter('number')(goodRatio, 2);

        var birdOverall = Math.round(res.bird.overall);
        if (birdOverall == 4) {
          $scope.reviewStats.birdOverall = "超级水";
        } else if (birdOverall == 3) {
          $scope.reviewStats.birdOverall = "较高";
        } else if (birdOverall == 2) {
          $scope.reviewStats.birdOverall = "正常";
        } else if (birdOverall == 1) {
          $scope.reviewStats.birdOverall = "不水";
        }

        var attendanceOverall = Math.round(res.attendance.overall);
        if (attendanceOverall == 4) {
          $scope.reviewStats.attendanceOverall = "点名狂";
        } else if (attendanceOverall == 3) {
          $scope.reviewStats.attendanceOverall = "时常";
        } else if (attendanceOverall == 2) {
          $scope.reviewStats.attendanceOverall = "偶尔";
        } else if (attendanceOverall == 1) {
          $scope.reviewStats.attendanceOverall = "不点";
        }

        var homeworkOverall = Math.round(res.homework.overall);
        if (homeworkOverall == 4) {
          $scope.reviewStats.homeworkOverall = "没有";
        } else if (homeworkOverall == 3) {
          $scope.reviewStats.homeworkOverall = "较少";
        } else if (homeworkOverall == 2) {
          $scope.reviewStats.homeworkOverall = "较多";
        } else if (homeworkOverall == 1) {
          $scope.reviewStats.homeworkOverall = "堆成山";
        }

        var examOverall = Math.round(res.exam.overall);
        if (examOverall == 4) {
          $scope.reviewStats.examOverall = "容易";
        } else if (examOverall == 3) {
          $scope.reviewStats.examOverall = "正常";
        } else if (examOverall == 2) {
          $scope.reviewStats.examOverall = "较难";
        } else if (examOverall == 1) {
          $scope.reviewStats.examOverall = "费劲";
        }

        $scope.barData = [
          [$scope.reviewStats.rate1Avg, $scope.reviewStats.rate2Avg,
            $scope.reviewStats.rate3Avg
          ]
        ];

        $scope.pieData = [{
          key: "好评数",
          y: $scope.reviewStats.rateGoodCount
        }, {
          key: "中评数",
          y: $scope.reviewStats.rateMidCount
        }, {
          key: "差评数",
          y: $scope.reviewStats.rateBadCount
        }];

        $scope.pieOption = {
          chart: {
            type: 'pieChart',
            title: goodRatio * 100 + '%',
            donut: true,
            width: 95,
            height: 80,
            x: function(d) {
              return d.key;
            },
            y: function(d) {
              return d.y;
            },
            showLabels: false,
            showLegend: false,
            transitionDuration: 500,
            labelThreshold: 0.01,
            margin: {
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            },
            color: ['rgba(248,66,67, 1.0)',
              'rgba(143,181,200, 1.0)',
              'rgba(216,216,216, 1.0)'
            ]
          }
        };
        console.log("stats updated!");

        $scope.$apply();
      },
      error: function(err) {
        //alert("Error: " + error.code + " " + error.message);
      }
    });
  };
  //updateReviewStats();



  //on entering view
  $scope.$on('$ionicView.enter', function() {
    //fix to chart disappearing issue
    var event = document.createEvent('Event');
    event.initEvent('resize', true, true);
    window.dispatchEvent(event);

    updateReviewStats();
  });



  /*----------------------------------------------------------------
  Pull to refresh
  -----------------------------------------------------------------*/
  $scope.doRefresh = function() {
    updateReviewStats();

    var refreshLimit = 3;
    var newData = [];
    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.equalTo("profName", $scope.listingId);
    query.limit(refreshLimit);
    query.include("authorId");
    query.descending("createdAt");
    if (postStartPoint !== 0) {
      query.greaterThan("createdAt", postStartPoint);
    }
    query.find().then(
      function(results) {

        if (results.length !== 0)
          postStartPoint = results[0].createdAt;

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

          newData.push({
            id: object.id,
            authorName: object.get('authorId').get("username"),
            authorDept: object.get('authorId').get("dept"),
            authorYear: object.get('authorId').get("year"),
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
      },
      function(error) {
        //alert("Error: " + error.code + " " + error.message);
      }
    ).then(
      function() {
        $scope.allReviews = newData.concat($scope.allReviews);
        $scope.$broadcast('scroll.refreshComplete');
      }
    );
  };

  /*----------------------------------------------------------------
  Infinite Scrolling
  -----------------------------------------------------------------*/
  $scope.allReviews = [];
  $scope.loadMore = function() {
    var loadLimit = 30;
    var newData = [];
    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.equalTo("profName", $scope.listingId);
    query.limit(loadLimit);
    query.include("authorId");
    query.include("courseId");
    query.descending("createdAt");
    if (postEndPoint !== 0) {
      query.lessThan("createdAt", postEndPoint);
    }
    query.find().then(
      function(results) {
        //console.log("finding prof: " + $scope.listingId);
        //console.log("review length: " + results.length);

        for (var i = 0; i < results.length; i++) {
          var object = results[i];

          //give an overall grade based on individual rates
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
          if ($scope.deptId && $scope.deptId === object.get('courseId')
            .get("dept")) {
            newData.push({
              id: object.id,
              authorName: object.get('authorId').get("username"),
              authorDept: object.get('authorId').get("dept"),
              authorYear: object.get('authorId').get("year"),
              dept: object.get('courseId').get("dept"),
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
        $scope.allReviews = $scope.allReviews.concat(newData);
        if ($scope.allReviews.length > 0) {
          postStartPoint = $scope.allReviews[0].createdTime;
          postEndPoint = $scope.allReviews[$scope.allReviews.length - 1]
            .createdTime;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');

        if (results.length < loadLimit) {
          $scope.noOldPosts = true;
          //console.log('stop loading signal sent');
          if ($scope.allReviews.length === 0) {
            $scope.showNoPostPlaceholder = true;
          }
        }

      },
      function(error) {
        //alert("Error: " + error.code + " " + error.message);
        $scope.$broadcast('scroll.infiniteScrollComplete');

      }
    );
  };

  /*----------------------------------------------------------------
  Default chart data
  -----------------------------------------------------------------*/
  $scope.pieOption = {
    chart: {
      type: 'pieChart',
      title: '0%',
      donut: true,
      width: 95,
      height: 80,
      x: function(d) {
        return d.key;
      },
      y: function(d) {
        return d.y;
      },
      showLabels: false,
      showLegend: false,
      transitionDuration: 500,
      labelThreshold: 0.01,
      margin: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      color: ['rgba(248,66,67, 1.0)', 'rgba(143,181,200, 1.0)',
        'rgba(216,216,216, 1.0)'
      ]
    }
  };

  $scope.pieData = [{
    key: "好评率",
    y: 0
  }, {
    key: "中评率",
    y: 0
  }, {
    key: "差评率",
    y: 0
  }];

  $scope.barOption = {
    chart: {
      type: 'discreteBarChart',
      height: 120,
      showLabels: false,
      showXAxis: true,
      showYAxis: false,
      x: function(d) {
        return d.label;
      },
      y: function(d) {
        return d.value;
      },
      showValues: true,
      valueFormat: function(d) {
        return d3.format(',.1f')(d);
      },
      transitionDuration: 500,
      margin: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      color: ['rgba(143,181,200, 1.0)', 'rgba(143,181,200, 1.0)',
        'rgba(143,181,200, 1.0)'
      ]
    }
  };



  $scope.barLabels = ["专业", "表达", "友好"];
  $scope.barSeries = ['打分'];
  $scope.barData = [
    // [3, 3, 3]
  ];


})



.controller('ListingDetailReviewCtrl', function($ionicModal, $localStorage,
  $ionicPopup, $ionicHistory, tagList,
  $scope, $rootScope, $state, $stateParams, $filter, $ionicScrollDelegate) {


  /*----------------------------------------------------------------
  Initialization
  -----------------------------------------------------------------*/

  //get localStorage
  $storage = $localStorage;

  //get URL state params
  $scope.listingId = $stateParams.listingId;
  $scope.deptId = $stateParams.deptId;

  //enumerate options
  $scope.tagOptions = [];
  angular.copy(tagList, $scope.tagOptions);


  /*----------------------------------------------------------------
  Model Data
  -----------------------------------------------------------------*/
  $scope.courseOptions = $filter('where')($storage.courses, {
    'prof': $scope.listingId
  });
  if ($scope.deptId) {
    $scope.courseOptions = $filter('where')($scope.courseOptions, {
      'dept': $scope.deptId
    });
  }


  //$scope.courseOptions = $filter('filterBy')($storage.courses,['prof'],$scope.listingId);
  $scope.courseInfo = {
    allOptions: $scope.courseOptions,
    selectedOption: $scope.courseOptions[0]
  };

  $scope.birdInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "绝非水课",
      value: 1
    }, {
      id: '2',
      name: "正常水平",
      value: 2
    }, {
      id: '3',
      name: "水分较多",
      value: 3
    }, {
      id: '4',
      name: "水得不行",
      value: 4
    }, ],
    selectedOption: {
      id: '0',
      name: "未填",
      value: 0
    }
  };


  $scope.attendanceInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "无",
      value: 1
    }, {
      id: '2',
      name: "少",
      value: 2
    }, {
      id: '3',
      name: "中",
      value: 3
    }, {
      id: '4',
      name: "多",
      value: 4
    }, ],
    selectedOption: {
      id: '0',
      name: "未填",
      value: 0
    }
  };

  $scope.homeworkInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "无",
      value: 1
    }, {
      id: '2',
      name: "少",
      value: 2
    }, {
      id: '3',
      name: "中",
      value: 3
    }, {
      id: '4',
      name: "多",
      value: 4
    }, ],
    selectedOption: {
      id: 0,
      name: "未填",
      value: 0
    }
  };

  $scope.examInfo = {
    touched: false,
    examprep: {
      id: '0',
      name: '划重点',
      checked: false,
      touched: false
    },
    openbook: {
      id: '1',
      name: '开卷',
      checked: false,
      touched: false
    },
    oldquestion: {
      id: '2',
      name: '原题',
      checked: false,
      touched: false
    },
    easiness: {
      id: '3',
      name: '给分',
      checked: false,
      touched: false
    }
  };
  $scope.examSetTouched = function(inputId) {
    console.log("exam modified");
    $scope.examInfo.touched = true;
    if (inputId == 'A') {
      $scope.examInfo.examprep.touched = true;
    }
    if (inputId == 'B') {
      $scope.examInfo.openbook.touched = true;
    }
    if (inputId == 'C') {
      $scope.examInfo.oldquestion.touched = true;
    }
    if (inputId == 'D') {
      $scope.examInfo.easiness.touched = true;
    }
  };
  $scope.examReset = function(examEnabled) {
    $ionicScrollDelegate.scrollBottom(true);
    console.log(examEnabled);
    if (!examEnabled) {
      $scope.examInfo.examprep.checked = false;
      $scope.examInfo.openbook.checked = false;
      $scope.examInfo.oldquestion.checked = false;
      $scope.examInfo.easiness.checked = false;
    }
  };


  $scope.reviewRating = {
    rate1: 3,
    rate2: 3,
    rate3: 3,
    overall: 9
  };

  $scope.grade = 1;
  $scope.reviewGrade = '中评';
  $scope.updateOverallRating = function() {
    $scope.reviewRating.overall = ($scope.reviewRating.rate1 + $scope.reviewRating
      .rate2 + $scope.reviewRating.rate3);

    if ($scope.reviewRating.overall <= 7) {
      $scope.grade = 0;
      $scope.reviewGrade = '差评';
    } else if ($scope.reviewRating.overall >= 11) {
      $scope.grade = 2;
      $scope.reviewGrade = '好评';
    } else {
      $scope.grade = 1;
      $scope.reviewGrade = '中评';
    }


  };



  $scope.reviewComment = {
    text: '',
  };
  $scope.reviewTags = [];


  /*----------------------------------------------------------------
  View Control
  -----------------------------------------------------------------*/

  //modal:tags selection
  $scope.limit = 3;
  $scope.checked = 0;
  $scope.checkChanged = function(tag) {
    if (tag.checked) {
      $scope.checked++;
      $scope.reviewTags.push(tag);
    } else {
      $scope.checked--;
      var index = $scope.reviewTags.indexOf(tag);
      if (index > -1) {
        $scope.reviewTags.splice(index, 1);
      }
    }
    console.log($scope.reviewTags);
  };
  $ionicModal.fromTemplateUrl('tab-listing/modal_tag.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_tag = modal;
  });

  $scope.modalTagComplete = function() {
    $scope.modal_tag.hide();
  };


  /*----------------------------------------------------------------
  submission
  -----------------------------------------------------------------*/
  //popup (submission confirmation)
  var showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '发送评价',
      template: '一位老师的课只能评一次，你的发言将成为大家的参考，请认真对待噢！',
      okText: '确定',
      cancelText: '取消'
    });
    confirmPopup.then(function(res) {
      if (res) {


        //check if courseId exist in users' past reviews
        var user = AV.User.current();
        var relation = user.relation("myReviews");
        var query = relation.query();
        query.equalTo("courseId", {
          "__type": "Pointer",
          "className": "Courses",
          "objectId": $scope.courseInfo.selectedOption.objectId
        });
        query.find({
          success: function(list) {
            if (list.length === 0) {
              //submit the review
              var Review = AV.Object.extend("Reviews");
              var review = new Review();
              review.set('authorId', {
                "__type": "Pointer",
                "className": "_User",
                "objectId": AV.User.current().id
              });
              review.set('courseId', {
                "__type": "Pointer",
                "className": "Courses",
                "objectId": $scope.courseInfo.selectedOption
                  .objectId
              });
              review.set("profName", $scope.courseInfo.selectedOption
                .prof);
              review.set("courseName", $scope.courseInfo.selectedOption
                .name);
              review.set('rating', $scope.reviewRating);
              review.set('tags', angular.fromJson(angular.toJson(
                $scope.reviewTags)));
              review.set('bird', $scope.birdInfo.selectedOption);
              review.set('attendance', $scope.attendanceInfo.selectedOption);
              review.set('homework', $scope.homeworkInfo.selectedOption);
              review.set('comment', $scope.reviewComment.text);
              review.set('exam', $scope.examInfo);
              review.set('upVote', 0);
              review.set('downVote', 0);

              review.save(null, {
                success: function(review) {
                  showSuccess();
                  //add review to user relation
                  relation.add(review);
                  user.save();

                  //reset input
                  resetInputs();
                },
                error: function(review, error) {
                  showFailure();
                  //alert("Error: " + error.code + " " + error.message);
                }
              });


            } else {
              //show failure
              showPostDuplicate();
            }
          }
        });

      } else {
        console.log('You are not sure');
      }
    });
  };

  /*----------------------------------------------------------------
  reset input
  -----------------------------------------------------------------*/
  function resetInputs() {
    $scope.grade = 1;
    $scope.reviewGrade = '中评';
    $scope.reviewRating = {
      rate1: 3,
      rate2: 3,
      rate3: 3,
      overall: 9
    };
    $scope.reviewComment.text = '';
    $scope.reviewTags = [];

    $scope.tagOptions = [];
    angular.copy(tagList, $scope.tagOptions);


    $scope.attendanceInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };
    $scope.homeworkInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };
    $scope.birdInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };

    $scope.examInfo.touched = false;
    $scope.examInfo.examprep.touched = false;
    $scope.examInfo.openbook.touched = false;
    $scope.examInfo.oldquestion.touched = false;
    $scope.examInfo.easiness.touched = false;

    $scope.examInfo.examprep.checked = false;
    $scope.examInfo.openbook.checked = false;
    $scope.examInfo.oldquestion.checked = false;
    $scope.examInfo.easiness.checked = false;

  }



  //popup (validation failure alert)
  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: '信息不全',
      template: '请填写短评选项！',
      okText: '知道了',

    });
    alertPopup.then(function(res) {});
  };

  //popup (submission failure)
  var showFailure = function() {
    var failurePopup = $ionicPopup.alert({
      title: '提交失败，请稍后再试',
      //template: '请填写短评选项！',
      okText: '确定',

    });
    successPopup.then(function(res) {

    });
  };

  //popup (submission failure)
  var showPostDuplicate = function() {
    var failurePopup = $ionicPopup.alert({
      title: '提交失败，每节课只能点评一次',
      //template: '请填写短评选项！',
      okText: '确定',

    });
    successPopup.then(function(res) {

    });
  };


  //popup (submission sucess)
  var showSuccess = function() {
    var successPopup = $ionicPopup.alert({
      title: '评价已收到！',
      template: '感谢你为民主事业添砖加瓦！',
      okText: '确定',

    });
    successPopup.then(function(res) {
      $ionicHistory.goBack();
    });
  };


  //submission button
  $scope.submitEntry = function() {
    if ($scope.reviewComment.text === '') {
      showAlert();
    } else {
      showConfirm();
    }

  };



})


.filter('appendZero', function() {
  return function(input) {
    if (input < 10) {
      input = '0' + input;
    }

    return input;
  };
});

angular.module('discover.controllers', [])

.controller("DiscoverCtrl", function($scope, $state, $filter, $localStorage, deptService,popupService) {
    
    /*----------------------------------------------------------------
    Access Control
    -----------------------------------------------------------------*/   		    
    $scope.$on('$ionicView.enter', function() {
        if (AV.User.current().get('username') === '游客'){
            popupService.showAccessControlAndExit();
        }            
    });
            
    
    
    $scope.deptList =  deptService.getDeptList();
    
    $scope.gotoDiscoverList = function(deptName) {
      $state.go("tab.discover-list", {deptId: deptName});
    };

    /*----------------------------------------------------------------
    search control
    -----------------------------------------------------------------*/  
    $scope.showUserAddCoursePrompt = false;
    $scope.$storage = $localStorage;
    $scope.searchText = {};
	var filterdCourses = [];
	$scope.displayCourses = [];
	$scope.noMorePost = false;
	$scope.showPromoContent = true;
	var loadLength = 15;
	
    $scope.cancelSearch = function() {
        console.log("cancel search");
        $scope.searchText.text = '';
		$scope.showPromoContent = true;
		$scope.noMorePost = true;
    };	
	
	$scope.startSearch = function() {
		filterdCourses = $filter('filter')($scope.$storage.courses, $scope.searchText.text);
		$scope.displayCourses = filterdCourses.slice(0,loadLength);
		$scope.noMorePost = false;
		if ($scope.searchText.text.length != 0 ) {
			$scope.showPromoContent = false;
		} else {
			$scope.showPromoContent = true;
			$scope.noMorePost = true;
		}
		console.log("attempt searching, course length:" + filterdCourses.length );
		
	};
	
	$scope.loadMore = function() {
		var resultLength = filterdCourses.length;
		var displayLength = $scope.displayCourses.length;
				console.log("result length:" + filterdCourses.length);
				console.log("display length:" + $scope.displayCourses.length);
		
		if (displayLength == resultLength) {
			$scope.noMorePost = true;
            $scope.showUserAddCoursePrompt = true;
            console.log("no more to add");
		} else {
            $scope.showUserAddCoursePrompt = false;
			var newData = filterdCourses.slice(displayLength,displayLength+loadLength);
			for (var i=0; i < newData.length; ++i) {
				$scope.displayCourses.push(newData[i]);
			}
            $scope.$broadcast('scroll.infiniteScrollComplete');
			console.log("add more, new length is: " + $scope.displayCourses.length);
			//$scope.noMorePost = false;
		}
		
	};
    
    $scope.$on('course-add-success', function(event, args) {
        $scope.startSearch();
    }); 
    $scope.showUserAddCourseForm = function() {
        
        if (AV.User.current().get('username') === '游客'){
            popupService.showAccessControl();
        } else {
            popupService.showUserAddCourseForm();
        }
    };
    	    
    
})


.controller("DiscoverListCtrl", function($scope, $state, $stateParams, 
                                          $localStorage, $filter, $ionicFilterBar) {
    

    
    /*----------------------------------------------------------------
    Initialization
    -----------------------------------------------------------------*/       
    $scope.$storage = $localStorage;
	var deptId = $stateParams.deptId;
    
	var filterdCourses = [];
	$scope.displayCourses = [];
	$scope.noMorePost = false;
	var loadLength = 15;    
    
    
	$scope.startSearch = function() {
		filterdCourses = $filter('where')($scope.$storage.courses,{'dept': deptId}  );  
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate1',true);
        $scope.displayCourses = filterdCourses.slice(0,loadLength);
		$scope.noMorePost = false;
		console.log("attempt searching, course length:" + filterdCourses.length );
	}    
    $scope.startSearch();
    
	$scope.loadMore = function() {
		var resultLength = filterdCourses.length;
		var displayLength = $scope.displayCourses.length;
				console.log("result length:" + filterdCourses.length);
				console.log("display length:" + $scope.displayCourses.length);
		
		if (displayLength == resultLength) {
			$scope.noMorePost = true;
				console.log("no more to add");
		} else {
			var newData = filterdCourses.slice(displayLength,displayLength+loadLength);
			for (var i=0; i < newData.length; ++i) {
				$scope.displayCourses.push(newData[i]);
			}
            $scope.$broadcast('scroll.infiniteScrollComplete');
			console.log("add more, new length is: " + $scope.displayCourses.length);
			//$scope.noMorePost = false;
		}
		
	}    
    
    
    /*----------------------------------------------------------------
    set filter options
    -----------------------------------------------------------------*/     
    $scope.filterOption = 'rate1';
    $scope.isActive = function(option) {
        return $scope.filterOption === option;
    };    
    $scope.setFilterOption = function(option) {
        $scope.filterOption = option;
        var orderDesc = true;
        
        
        filterdCourses = $filter('where')($scope.$storage.courses,{'dept': deptId}  );  
        
        if (option === "rate1") {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate1',true);
        } else if (option === "rate2") {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate2',true);
        } else if (option === "rate3") {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate3',true);
        } else {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate1',true);
        }
        
        
        $scope.displayCourses = filterdCourses.slice(0,loadLength);
        $scope.noMorePost = false;
        console.log("attempt searching, course length:" + filterdCourses.length );
        
        
    };

    
    
        
    /*----------------------------------------------------------------
    filter bar control
    -----------------------------------------------------------------*/   	  
    $scope.showFilterBar = function () {
        
        
      var filterBarInstance = $ionicFilterBar.show({
        items: filterdCourses,
        cancelText: '取消',
        cancel: function(){
            //$scope.displayCourses = [];
        },
        update: function (filteredItems, filterText) {
            //the filter approach
            $scope.displayCourses = filteredItems;
        }
      });
    };    
    
    
    
});
angular.module('rank.controllers', [])


.controller('RankCtrl', function($scope, $rootScope, $state, $ionicPopup,
	popupService, deptService) {

	/*----------------------------------------------------------------
	Access Control
	-----------------------------------------------------------------*/
	$scope.$on('$ionicView.enter', function() {
		if (AV.User.current().get('username') === '游客') {
			popupService.showAccessControlAndExit();
		}
	});



	/*----------------------------------------------------------------
	Rank Filtering Options
	-----------------------------------------------------------------*/
	$scope.showDept = false;
	$scope.deptOption = AV.User.current().get('dept');
	$scope.active = 'schoolRank';
	$scope.setFilterOption = function(type) {
		$scope.active = type;
		if (type === 'deptRank') {
			showDeptOptions();
		}
	};
	$scope.isActive = function(type) {
		return type === $scope.active;
	};

	/*----------------------------------------------------------------
	Popup
	-----------------------------------------------------------------*/
	var showDeptOptions = function() {
		var alertPopup = $ionicPopup.alert({
			title: '请选择学院',
			scope: $scope,
			templateUrl: 'tab-rank/popup_dept.html',
			okText: '选完了',
		});
		alertPopup.then(function(res) {
			$scope.showDept = true;
		});
	};

	$scope.deptOptions = deptService.getDeptList();

	var defaultDept = $scope.deptOptions.filter(function(obj) {
		return obj.value == AV.User.current().get('dept');
	});
	defaultDept[0].checked = true;

	$scope.deptCheckChanged = function(dept) {
		if (dept.checked) {
			$scope.deptOption = dept.value;

			var result = $scope.deptOptions.filter(function(obj) {
				return obj.checked === true;
			});
			for (var i = 0; i < result.length; i++) {
				if (result[i].id != dept.id) {
					result[i].checked = false;
				}
			}
		}
	};

	/*----------------------------------------------------------------
	Navigation
	-----------------------------------------------------------------*/
	$scope.gotoRankDetail = function(rankId) {
		if ($scope.active == 'schoolRank') {
			$state.go("tab.rank-detail", {
				'rankId': rankId
			});
		} else {
			$state.go("tab.rank-detail", {
				'rankId': rankId,
				'deptId': $scope.deptOption
			});
		}
	};


	/*----------------------------------------------------------------
	Rank List
	-----------------------------------------------------------------*/
	$scope.rankList = [{
			id: 1,
			title: "综合榜",
			tagline: "按分数和好评率排",
			img: "img/dept/Medal-2.svg"
		}, {
			id: 2,
			title: "热度榜",
			tagline: "按参与评价人数排",
			img: "img/dept/flame.png"
		}, {
			id: 3,
			title: "口碑榜",
			tagline: "按正面标签数量排",
			img: "img/dept/Party-Poppers.svg"
		}, {
			id: 4,
			title: "水课榜",
			tagline: "按水课相关标签数量和数据",
			img: "img/dept/Spongebob.svg"
		}, {
			id: 7,
			title: "差评榜",
			tagline: "那些不想再上第二次的课",
			img: "img/dept/x.png"
		}, {
			id: 5,
			title: "考试榜",
			tagline: "按考试难度排",
			img: "img/dept/caution.png"
		}, {
			id: 6,
			title: "作业榜",
			tagline: "按作业多少排",
			img: "img/dept/compose.png"
		}

	];



})


.controller('RankDetailCtrl', function($scope, $rootScope, $state, $stateParams,
	tagList,
	$filter, $ionicPopup, $localStorage, popupService) {

	$scope.alert = function() {
		alert("Hello");
	};

	//----------------------------------------------------------------
	//Navigation
	//----------------------------------------------------------------

	var rankId = $stateParams.rankId;
	var deptId = $stateParams.deptId;

	$scope.gotoProfReview = function(course) {
		$state.go('tab.listing-detail-3', {
			'listingId': course.prof,
			'deptId': course.dept
		});

	};

	$scope.title = "排行榜";
	switch (rankId) {
		case "1":
			$scope.title = "综合榜";
			break;
		case "2":
			$scope.title = "热度榜";
			break;
		case "3":
			$scope.title = "口碑榜";
			break;
		case "4":
			$scope.title = "水课榜";
			break;
		case "5":
			$scope.title = "考试榜";
			break;
		case "6":
			$scope.title = "作业榜";
			break;
		case "7":
			$scope.title = "差评榜";
			break;
		default:
			$scope.title = "排行榜";
	}



	/*----------------------------------------------------------------
	Add course to personal collection
	-----------------------------------------------------------------*/

	$scope.addToCollection = function(courseId) {
		//access control
		var username = AV.User.current().get('username');
		if (username === '游客') {
			popupService.showAccessControl();
		} else {
			var user = AV.User.current();
			var relation = user.relation("likedCourses");

			var Courses = AV.Object.extend("Courses");
			var query = new AV.Query(Courses);
			query.equalTo("objectId", courseId);
			query.find({
				success: function(course) {
					relation.add(course);
					user.save();
					showAddedToCollection();
				},
				error: function(course, error) {
					showAddToCollectionFailure();
					//alert("Error: " + error.code + " " + error.message);
				}
			});
		}
	};
	//popup (submission sucess)
	var showAddedToCollection = function() {
		var successPopup = $ionicPopup.alert({
			title: '关注成功！',
			template: '您可以在“设置”页面查看关注内容',
			okText: '知道了',

		});
		successPopup.then(function(res) {});
	};
	var showAddToCollectionFailure = function() {
		var successPopup = $ionicPopup.alert({
			title: '喔喔，关注失败',
			template: '请稍后再试',
			okText: '知道了',

		});
		successPopup.then(function(res) {});
	};

	//----------------------------------------------------------------
	//Infinite Scrolling
	//----------------------------------------------------------------

	var filterdCourses = [];
	$scope.displayCourses = [];
	var displayLength = 25;
	$scope.showNotFoundMsg = false;


	//filter by dept name
	if (deptId) {
		filterdCourses = $filter('filter')($localStorage.courses, deptId);
	} else {
		filterdCourses = $localStorage.courses;
	}
	//filter by rank type
	if (rankId == 1) {

		for (var i = 0; i < filterdCourses.length; ++i) {
			filterdCourses[i].rankOverall = filterdCourses[i].rateOverall +
				filterdCourses[i].reviewCount * 0.5;
		}
		filterdCourses = $filter('orderBy')(filterdCourses, ['rankOverall',
			'rateOverall'
		], true);

		/*
        var tempArr = [];
        for (var i=0; i < filterdCourses.length; ++i) {
            if (filterdCourses[i].reviewCount >= 1 && filterdCourses[i].rateOverall > 3 ) {
                tempArr.push(filterdCourses[i]);
            }
        }
        filterdCourses = tempArr;
		filterdCourses = $filter('orderBy')(filterdCourses, ['rateOverall','reviewCount'],true);
        */
	} else if (rankId == 2) {
		filterdCourses = $filter('orderBy')(filterdCourses, 'reviewCount', true);
	} else if (rankId == 3) {
		for (var i = 0; i < filterdCourses.length; i++) {
			var course = filterdCourses[i];
			var tags = course.tags;
			var positiveTagCount = 0;
			for (var j = 0; j < tags.length; j++) {
				if (tagList[j].positive)
					positiveTagCount += tags[j];
			}
			course.positiveTagCount = positiveTagCount;
		}

		filterdCourses = $filter('orderBy')(filterdCourses, 'positiveTagCount',
			true); // tag number
	} else if (rankId == 4) {
		filterdCourses = $filter('orderBy')(filterdCourses, ['birdOverall',
			'reviewCount'
		], true);
	} else if (rankId == 5) {
		filterdCourses = $filter('orderBy')(filterdCourses, ['examOverall',
			'reviewCount'
		], true);
	} else if (rankId == 6) {
		filterdCourses = $filter('orderBy')(filterdCourses, ['homeworkOverall',
			'reviewCount'
		], true);
	} else if (rankId == 7) {
		var tempArr = [];
		for (var i = 0; i < filterdCourses.length; ++i) {
			if (filterdCourses[i].rateOverall <= 3 && filterdCourses[i].rateOverall >
				0.01) {
				tempArr.push(filterdCourses[i]);
			}
		}
		filterdCourses = tempArr;
		filterdCourses = $filter('orderBy')(filterdCourses, 'rateOverall', false);
	} else {
		filterdCourses = $filter('orderBy')(filterdCourses, 'rateOverall', true);
	}



	//trim the result
	filterdCourses = filterdCourses.slice(0, displayLength);
	for (var i = 0; i < filterdCourses.length; ++i) {
		if (rankId != 7) {
			if (filterdCourses[i].rateOverall > 1) {
				$scope.displayCourses.push(filterdCourses[i]);
			}
		} else {
			$scope.displayCourses.push(filterdCourses[i]);
		}
		$scope.noOldPost = true;
	}

	//handle if no result
	if ($scope.displayCourses.length === 0) {
		$scope.showNotFoundMsg = true;
	}

});

angular.module('review.controllers', [])



.controller('ReviewCtrl', function($ionicModal, $localStorage, $ionicPopup,
  $ionicHistory, $ionicScrollDelegate, tagList,
  $scope, $rootScope, $state, $stateParams, $filter, popupService) {

  $scope.$on('course-add-success', function(event, args) {
    $scope.startSearch();
  });
  $scope.showUserAddCourseForm = function() {

    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControl();
    } else {
      popupService.showUserAddCourseForm();
    }
  };

  /*----------------------------------------------------------------
  Access Control
  -----------------------------------------------------------------*/
  $scope.$on('$ionicView.enter', function() {
    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControlAndExit();
    }
  });



  /*----------------------------------------------------------------
  Initialization
  -----------------------------------------------------------------*/

  //get localStorage
  $storage = $localStorage;

  //get URL state params
  $scope.reviewTarget = {};

  //enumerate options
  $scope.tagOptions = [];
  angular.copy(tagList, $scope.tagOptions);


  /*----------------------------------------------------------------
  search control
  -----------------------------------------------------------------*/
  $scope.showUserAddCoursePrompt = false;
  $scope.$storage = $localStorage;
  $scope.searchText = {};
  var filterdCourses = [];
  $scope.displayCourses = [];
  $scope.noMorePost = false;
  $scope.showPromoContent = true;
  var loadLength = 15;

  $scope.cancelSearch = function() {
    console.log("cancel search");
    $scope.searchText.text = '';
    $scope.showPromoContent = true;
    $scope.noMorePost = true;
  };

  $scope.startSearch = function() {
    filterdCourses = $filter('filter')($scope.$storage.courses, $scope.searchText
      .text);
    $scope.displayCourses = filterdCourses.slice(0, loadLength);
    $scope.noMorePost = false;
    if ($scope.searchText.text.length !== 0) {
      $scope.showPromoContent = false;
    } else {
      $scope.showPromoContent = true;
      $scope.noMorePost = true;
    }
    console.log("attempt searching, course length:" + filterdCourses.length);

  };

  $scope.loadMore = function() {
    var resultLength = filterdCourses.length;
    var displayLength = $scope.displayCourses.length;
    console.log("result length:" + filterdCourses.length);
    console.log("display length:" + $scope.displayCourses.length);

    if (displayLength == resultLength) {
      $scope.noMorePost = true;
      $scope.showUserAddCoursePrompt = true;
      console.log("no more to add");
    } else {
      $scope.showUserAddCoursePrompt = false;
      var newData = filterdCourses.slice(displayLength, displayLength +
        loadLength);
      for (var i = 0; i < newData.length; ++i) {
        $scope.displayCourses.push(newData[i]);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("add more, new length is: " + $scope.displayCourses.length);
      //$scope.noMorePost = false;
    }

  };



  /*----------------------------------------------------------------
  Model Data
  -----------------------------------------------------------------*/

  $scope.birdInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "绝非水课",
      value: 1
    }, {
      id: '2',
      name: "正常水平",
      value: 2
    }, {
      id: '3',
      name: "有点水分",
      value: 3
    }, {
      id: '4',
      name: "水得不行",
      value: 4
    }, ],
    selectedOption: {
      id: '0',
      name: "未填",
      value: 0
    }
  };


  $scope.attendanceInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "无",
      value: 1
    }, {
      id: '2',
      name: "少",
      value: 2
    }, {
      id: '3',
      name: "中",
      value: 3
    }, {
      id: '4',
      name: "多",
      value: 4
    }, ],
    selectedOption: {
      id: '0',
      name: "未填",
      value: 0
    }
  };

  $scope.homeworkInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "无",
      value: 1
    }, {
      id: '2',
      name: "少",
      value: 2
    }, {
      id: '3',
      name: "中",
      value: 3
    }, {
      id: '4',
      name: "多",
      value: 4
    }, ],
    selectedOption: {
      id: 0,
      name: "未填",
      value: 0
    }
  };

  $scope.examInfo = {
    touched: false,
    examprep: {
      id: '0',
      name: '划重点',
      checked: false,
      touched: false
    },
    openbook: {
      id: '1',
      name: '开卷',
      checked: false,
      touched: false
    },
    oldquestion: {
      id: '2',
      name: '原题',
      checked: false,
      touched: false
    },
    easiness: {
      id: '3',
      name: '给分',
      checked: false,
      touched: false
    }
  };
  $scope.examSetTouched = function(inputId) {
    console.log("exam modified");
    $scope.examInfo.touched = true;
    if (inputId == 'A') {
      $scope.examInfo.examprep.touched = true;
    }
    if (inputId == 'B') {
      $scope.examInfo.openbook.touched = true;
    }
    if (inputId == 'C') {
      $scope.examInfo.oldquestion.touched = true;
    }
    if (inputId == 'D') {
      $scope.examInfo.easiness.touched = true;
    }
  };
  $scope.examReset = function(examEnabled) {
    $ionicScrollDelegate.scrollBottom(true);
    console.log(examEnabled);
    if (!examEnabled) {
      $scope.examInfo.examprep.checked = false;
      $scope.examInfo.openbook.checked = false;
      $scope.examInfo.oldquestion.checked = false;
      $scope.examInfo.easiness.checked = false;
    } else {}
  };



  $scope.grade = 1;
  $scope.reviewRating = {
    rate1: 3,
    rate2: 3,
    rate3: 3,
    overall: 9
  };
  $scope.reviewGrade = '中评';
  $scope.updateOverallRating = function() {
    $scope.reviewRating.overall = ($scope.reviewRating.rate1 + $scope.reviewRating
      .rate2 + $scope.reviewRating.rate3);

    if ($scope.reviewRating.overall <= 7) {
      $scope.grade = 0;
      $scope.reviewGrade = '差评';
    } else if ($scope.reviewRating.overall >= 11) {
      $scope.grade = 2;
      $scope.reviewGrade = '好评';
    } else {
      $scope.grade = 1;
      $scope.reviewGrade = '中评';
    }


  };



  $scope.reviewComment = {
    text: '',
  };
  $scope.reviewTags = [];


  /*----------------------------------------------------------------
  Modal Target Selection
  -----------------------------------------------------------------*/
  $ionicModal.fromTemplateUrl('tab-review/modal_target.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_target = modal;
  });

  $scope.modalTargetComplete = function() {
    $scope.modal_target.hide();
  };
  $scope.setReviewTarget = function(course) {
    $scope.reviewTarget = course;
    $scope.modal_target.hide();
  };


  /*----------------------------------------------------------------
  Modal Tags
  -----------------------------------------------------------------*/

  //modal:tags selection
  $scope.limit = 3;
  $scope.checked = 0;
  $scope.checkChanged = function(tag) {
    if (tag.checked) {
      $scope.checked++;
      $scope.reviewTags.push(tag);
    } else {
      $scope.checked--;
      var index = $scope.reviewTags.indexOf(tag);
      if (index > -1) {
        $scope.reviewTags.splice(index, 1);
      }
    }
    console.log($scope.reviewTags);
  };
  $ionicModal.fromTemplateUrl('tab-listing/modal_tag.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_tag = modal;
  });

  $scope.modalTagComplete = function() {
    $scope.modal_tag.hide();
  };


  /*----------------------------------------------------------------
  submission
  -----------------------------------------------------------------*/
  //popup (submission confirmation)
  var showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '发送评价',
      template: '一位老师的课只能评一次，你的发言将成为大家的参考，请认真对待噢！',
      okText: '确定',
      cancelText: '取消'
    });
    confirmPopup.then(function(res) {
      if (res) {

        //check if courseId exist in users' past reviews
        var user = AV.User.current();
        var relation = user.relation("myReviews");
        var query = relation.query();
        query.equalTo("courseId", {
          "__type": "Pointer",
          "className": "Courses",
          "objectId": $scope.reviewTarget.objectId
        });
        query.find({
          success: function(list) {
            if (list.length === 0) {
              //submit the review
              var Review = AV.Object.extend("Reviews");
              var review = new Review();
              review.set('authorId', {
                "__type": "Pointer",
                "className": "_User",
                "objectId": AV.User.current().id
              });
              review.set('courseId', {
                "__type": "Pointer",
                "className": "Courses",
                "objectId": $scope.reviewTarget.objectId
              });
              review.set("profName", $scope.reviewTarget.prof);
              review.set("courseName", $scope.reviewTarget.name);
              review.set('rating', $scope.reviewRating);
              review.set('tags', angular.fromJson(angular.toJson(
                $scope.reviewTags)));
              review.set('bird', $scope.birdInfo.selectedOption);
              review.set('attendance', $scope.attendanceInfo.selectedOption);
              review.set('homework', $scope.homeworkInfo.selectedOption);
              review.set('comment', $scope.reviewComment.text);
              review.set('exam', $scope.examInfo);
              review.set('upVote', 0);
              review.set('downVote', 0);

              review.save(null, {
                success: function(review) {
                  showSuccess();
                  //add review to user relation
                  relation.add(review);
                  user.save();

                  //reset input
                  resetInputs();

                },
                error: function(review, error) {
                  showFailure();
                  //alert("Error: " + error.code + " " + error.message);
                }
              });


            } else {
              //show failure
              showPostDuplicate();
            }
          }
        });

      } else {
        console.log('You are not sure');
      }
    });
  };


  /*----------------------------------------------------------------
  reset input
  -----------------------------------------------------------------*/
  function resetInputs() {
    $scope.reviewTarget = {};
    $scope.grade = 1;
    $scope.reviewGrade = '中评';
    $scope.reviewRating = {
      rate1: 3,
      rate2: 3,
      rate3: 3,
      overall: 9
    };
    $scope.reviewComment.text = '';
    $scope.reviewTags = [];

    $scope.tagOptions = [];
    angular.copy(tagList, $scope.tagOptions);


    $scope.attendanceInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };
    $scope.homeworkInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };
    $scope.birdInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };

    $scope.examInfo.touched = false;
    $scope.examInfo.examprep.touched = false;
    $scope.examInfo.openbook.touched = false;
    $scope.examInfo.oldquestion.touched = false;
    $scope.examInfo.easiness.touched = false;

    $scope.examInfo.examprep.checked = false;
    $scope.examInfo.openbook.checked = false;
    $scope.examInfo.oldquestion.checked = false;
    $scope.examInfo.easiness.checked = false;

  }


  //popup (validation failure alert)
  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: '信息不全',
      template: '请填写短评选项！',
      okText: '知道了',

    });
    alertPopup.then(function(res) {});
  };

  //popup (submission failure)
  var showFailure = function() {
    var failurePopup = $ionicPopup.alert({
      title: '提交失败，请稍后再试',
      //template: '请填写短评选项！',
      okText: '确定',

    });
    successPopup.then(function(res) {

    });
  };

  //popup (submission failure)
  var showPostDuplicate = function() {
    var failurePopup = $ionicPopup.alert({
      title: '提交失败，每节课只能点评一次',
      //template: '请填写短评选项！',
      okText: '确定',

    });
    successPopup.then(function(res) {

    });
  };


  //popup (submission sucess)
  var showSuccess = function() {
    var successPopup = $ionicPopup.alert({
      title: '评价已收到，谢谢你的参与！',
      template: '感谢你为民主事业添砖加瓦！',
      okText: '确定',

    });
    successPopup.then(function(res) {
      $ionicHistory.goBack();
    });
  };


  //submission button
  $scope.submitEntry = function() {
    if ($scope.reviewComment.text === '') {
      showAlert();
    } else {
      showConfirm();
    }

  };



});

angular.module('me.controllers', []);
angular.module('me.controllers')


.controller('MeCtrl', function($scope, $state, $localStorage, $ionicHistory,
  popupService, $timeout) {

  /*----------------------------------------------------------------
  Access Control
  -----------------------------------------------------------------*/
  $scope.$on('$ionicView.enter', function() {
    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControlAndExit();
    }
  });



  /*----------------------------------------------------------------
  Navigation
  -----------------------------------------------------------------*/
  $scope.gotoProfile = function() {
    $state.go("tab.me-profile");
  };
  $scope.gotoReview = function() {
    $state.go("tab.me-review");
  };
  $scope.gotoLikedCourses = function() {
    $state.go("tab.me-course");
  };
  $scope.gotoVote = function() {
    $state.go("tab.me-vote");
  };
  $scope.gotoFeedback = function() {
    $state.go("tab.feedback");
  };
  $scope.gotoChatList = function() {
    $state.go("tab.me-chat-list");
  };
  /*----------------------------------------------------------------
  Initialization
  -----------------------------------------------------------------*/
  $scope.user = {
    username: AV.User.current().get('username'),
    dept: AV.User.current().get('dept'),
    year: AV.User.current().get('year'),
    email: AV.User.current().get('email'),
  };


  /*----------------------------------------------------------------
  Logout control
  -----------------------------------------------------------------*/
  $scope.logout = function() {
    console.log("logout!");

    AV.User.logOut();

    //forget this view after logged out
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    $timeout(function() {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    }, 300);


    //$ionicHistory.clearHistory();
    //$ionicHistory.clearCache();
    $state.go("login");
  };

});

angular.module('me.controllers')


.controller('MeProfileCtrl', function($scope, $state, $localStorage,
	$ionicHistory, $ionicPopup, deptService) {

	$scope.user = {
		username: AV.User.current().get('username'),
		dept: AV.User.current().get('dept'),
		year: AV.User.current().get('year'),
		email: AV.User.current().get('email'),
	};


	/*----------------------------------------------------------------
	Popup
	-----------------------------------------------------------------*/
	$scope.showEditProfile = function() {
		var alertPopup = $ionicPopup.alert({
			title: '修改我的信息',
			scope: $scope,
			templateUrl: 'tab-me/editProfile.html',
			buttons: [{
				text: '<b>取消</b>'
			}, {
				text: '<b>保存</b>',
				type: 'button-positive',
				onTap: function(e) {
					//submit the change
					if ($scope.user.username.length < 2) {
						showFailure();
					} else {
						var user = AV.User.current();
						user.set("username", $scope.user.username);
						user.set("dept", $scope.deptInfo.selectedOption.value);
						user.set("year", $scope.yearInfo.selectedOption.value);
						user.save(null, {
							success: function(res) {
								showSuccess();
								$scope.user.dept = $scope.deptInfo.selectedOption.value;
								$scope.user.year = $scope.yearInfo.selectedOption.value;
							},
							error: function(res, error) {
								showFailure();
								//alert("Error: " + error.code + " " + error.message);
							}
						});
					}
				}
			}, ]
		});
	};

	var showFailure = function() {
		var alertPopup = $ionicPopup.alert({
			title: '保存失败',
			template: '请确认填写信息无误',
			okText: '明白了',
		});
		alertPopup.then(function(res) {});
	};

	var showSuccess = function() {
		var alertPopup = $ionicPopup.alert({
			title: '保存成功',
			okText: '明白了',
		});
		alertPopup.then(function(res) {});
	};



	$scope.yearInfo = {
		allOptions: [{
			id: '0',
			name: "2000",
			value: 2000
		}, {
			id: '1',
			name: "2001",
			value: 2001
		}, {
			id: '2',
			name: "2002",
			value: 2002
		}, {
			id: '3',
			name: "2003",
			value: 2003
		}, {
			id: '4',
			name: "2004",
			value: 2004
		}, {
			id: '5',
			name: "2005",
			value: 2005
		}, {
			id: '6',
			name: "2006",
			value: 2006
		}, {
			id: '7',
			name: "2007",
			value: 2007
		}, {
			id: '8',
			name: "2008",
			value: 2008
		}, {
			id: '9',
			name: "2009",
			value: 2009
		}, {
			id: '10',
			name: "2010",
			value: 2010
		}, {
			id: '11',
			name: "2011",
			value: 2011
		}, {
			id: '12',
			name: "2012",
			value: 2012
		}, {
			id: '13',
			name: "2013",
			value: 2013
		}, {
			id: '14',
			name: "2014",
			value: 2014
		}, {
			id: '15',
			name: "2015",
			value: 2015
		}, ],
		selectedOption: {
			id: $scope.user.year % 100,
			name: $scope.user.year,
			value: $scope.user.year
		}
	};

	$scope.deptInfo = {
		allOptions: deptService.getDeptList(),
		selectedOption: {
			id: '0',
			name: "土木",
			value: "土木"
		}
	};


})


.controller('MeReviewCtrl', function($scope, $state, $localStorage,
	$ionicHistory) {



	$scope.gotoProfReview = function(review) {
		console.log(review);
		$state.go('tab.listing-detail-2', {
			'listingId': review.profName,
			'deptId': review.dept
		});
	};

	/*----------------------------------------------------------------
	Infinite Scrolling
	-----------------------------------------------------------------*/
	var postStartPoint = 0;
	var postEndPoint = 0;


	$scope.allReviews = [];
	$scope.loadMore = function() {
		var loadLimit = 8;
		var newData = [];
		var Reviews = AV.Object.extend("Reviews");
		var query = new AV.Query(Reviews);
		query.equalTo("authorId", {
			__type: "Pointer",
			className: "_User",
			objectId: AV.User.current().id
		});
		query.limit(loadLimit);
		query.include("authorId");
		query.include("courseId");
		query.descending("createdAt");
		if (postEndPoint !== 0) {
			query.lessThan("createdAt", postEndPoint);
		}
		query.find().then(
			function(results) {
				//console.log("finding prof: " + $scope.listingId);
				console.log("review length: " + results.length);

				for (var i = 0; i < results.length; i++) {
					var object = results[i];

					//give an overall grade based on individual rates
					var overallRating = object.get('rating').overall;
					var grade = 1;
					if (overallRating <= 5) {
						grade = 0;
					} else if (overallRating >= 10) {
						grade = 2;
					}

					//determine if tags field should be displayed
					var showTags = true;
					if (object.get('tags').length > 0) {
						showTags = true;
					} else {
						showTags = false;
					}
					newData.push({
						authorName: object.get('authorId').get("username"),
						authorDept: object.get('authorId').get("dept"),
						authorYear: object.get('authorId').get("year"),
						dept: object.get('courseId').get("dept"),
						courseName: object.get('courseName'),
						profName: object.get('profName'),
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
						createdTime: object.createdAt
					});
				}
				$scope.allReviews = $scope.allReviews.concat(newData);
				if ($scope.allReviews.length > 0) {
					postStartPoint = $scope.allReviews[0].createdTime;
					postEndPoint = $scope.allReviews[$scope.allReviews.length - 1].createdTime;
				}

				$scope.$broadcast('scroll.infiniteScrollComplete');

				if (results.length < loadLimit) {
					$scope.noOldPosts = true;
					//console.log('stop loading signal sent');
				}

			},
			function(error) {
				alert("Error: " + error.code + " " + error.message);
				$scope.$broadcast('scroll.infiniteScrollComplete');

			}
		);
	};
})


.controller('MeCourseCtrl', function($scope, $state, $localStorage,
	$ionicHistory, deptService) {

	$scope.courses = [];
	var deptImgHash = deptService.getDeptImageHash();

	$scope.gotoProfReview = function(course) {
		$state.go('tab.listing-detail-2', {
			'listingId': course.prof,
			'deptId': course.dept
		});
	};

	$scope.loadMore = function() {
		//check if already liked
		var user = AV.User.current();
		var relation = user.relation("likedCourses");
		var query = relation.query();
		query.find({
			success: function(results) {
				console.log(results.length);
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					$scope.courses.push({
						objectId: object.id,
						prof: object.get('prof'),
						name: object.get('name'),
						position: object.get('position'),
						deptImg: deptImgHash[object.get('dept')],
						campus: object.get('campus'),
						school: object.get('school'),
						dept: object.get('dept'),
						icon: 'img/science.png', //object.get('icon').thumbnailURL(100, 100),
						createdAt: object.createdAt,
						updatedAt: object.updatedAt
					});
				}
				console.log($scope.courses.length);
				$scope.noOldPosts = true;

				$scope.$apply();
			}
		});
	};



})

.controller('MeVoteCtrl', function($scope, $state, $localStorage, $ionicHistory) {



})


.controller('MeFeedbackCtrl', function($scope, $state, $localStorage,
	$ionicPopup, $ionicHistory) {

	$scope.feedback = {
		name: '',
		phone: '',
		comment: ''
	};

	/*----------------------------------------------------------------
	submission
	-----------------------------------------------------------------*/
	var showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: '发送反馈',
			template: '准备好提交反馈了吗？',
			okText: '确定',
			cancelText: '取消'
		});
		confirmPopup.then(function(res) {
			if (res) {
				var Feedback = AV.Object.extend("Feedback");
				var feedback = new Feedback();

				feedback.set("name", $scope.feedback.name);
				feedback.set("phone", $scope.feedback.phone);
				feedback.set('comment', $scope.feedback.comment);

				feedback.save(null, {
					success: function(res) {
						showSuccess();
					},
					error: function(res, error) {
						showFailure();
					}
				});
			}
		});
	};

	//popup (validation failure alert)
	var showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: '信息不全',
			template: '请填写反馈意见！',
			okText: '知道了',

		});
		alertPopup.then(function(res) {});
	};

	//popup (submission failure)
	var showFailure = function() {
		var failurePopup = $ionicPopup.alert({
			title: '提交失败，请稍后再试',
			okText: '确定',
		});
		failurePopup.then(function(res) {

		});
	};

	//popup (submission sucess)
	var showSuccess = function() {
		var successPopup = $ionicPopup.alert({
			title: '反馈已收到，谢谢你的参与！',
			okText: '确定',

		});
		successPopup.then(function(res) {
			$ionicHistory.goBack();
		});
	};


	//submission button
	$scope.submitFeedback = function() {
		if ($scope.feedback.comment === '') {
			showAlert();
		} else {
			showConfirm();
		}

	};


});

angular.module('starter.services', []);
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

angular.module('starter.services')


.service('deptService', function($filter, $rootScope, $localStorage){
    

    var deptList = [ 
            {id: '0', name: "土木" , value: "土木", img: "img/dept/Tower.png"},
            {id: '1', name: "机械" , value: "机械", img: "img/dept/gear.png"},
            {id: '4', name: "力学" , value: "力学", img: "img/dept/momentum.png"},
            {id: '2', name: "运输" , value: "运输", img: "img/dept/train.png"},
        
            {id: '6', name: "地学" , value: "地学", img: "img/dept/globe.png"},
            {id: '7', name: "物理" , value: "物理", img: "img/dept/genius.png"},
            {id: '3', name: "建筑" , value: "建筑", img: "img/dept/circlecompass.png"},
            {id: '5', name: "材料" , value: "材料", img: "img/dept/recycle.png"},

            {id: '8', name: "信息" , value: "信息", img: "img/dept/computer.png"},
            {id: '9', name: "电气" , value: "电气", img: "img/dept/Microchip.png"},
            {id: '20', name: "数学" , value: "数学", img: "img/dept/calculator.png"},	
            {id: '15', name: "图书馆" , value: "图书馆", img: "img/dept/bookshelf.png"},
        
        
            {id: '12', name: "经管" , value: "经管", img: "img/dept/Money-Graph.png"},
            {id: '14', name: "公共" , value: "公共", img: "img/dept/Graph-Magnifier.png"},
            {id: '11', name: "人文" , value: "人文", img: "img/dept/lightbulb.png"}, 
            {id: '16', name: "外语" , value: "外语", img: "img/dept/typography.png"},

            {id: '17', name: "工业" , value: "工业", img: "img/dept/factory.png"},
            {id: '13', name: "体育" , value: "体育", img: "img/dept/biker.png"},
            {id: '18', name: "心理" , value: "心理", img: "img/dept/Heart-Watch.png"},
            {id: '19', name: "思政" , value: "思政", img: "img/dept/megaphone2.png"},
        
            {id: '21', name: "生命" , value: "生命", img: "img/dept/Dna.png"},	
            {id: '22', name: "艺术" , value: "艺术", img: "img/dept/art.png"},
            {id: '23', name: "马院" , value: "马院", img: "img/dept/flag.png"},
            {id: '24', name: "武装部" , value: "武装部", img: "img/dept/rocket.png"}
    ];

    this.getDeptList = function() {
        return deptList;
    };
    
    this.getDeptImageHash = function() {
        var deptImageHash = {};
        for (var i=0; i<deptList.length; i++) {
            deptImageHash[deptList[i].value] = deptList[i].img;
        }
        return deptImageHash;
    };    
    
    
})
angular.module('starter.services')

.service('popupService', function($filter, $rootScope, $localStorage,$ionicPopup, $state, 
                                   deptService, positionService, courseService){
    
    /*----------------------------------------------------------------
    Add course
    -----------------------------------------------------------------*/      
    
    $rootScope.deptInfo = {
        allOptions: deptService.getDeptList(),
        selectedOption: {id: '0', name: "土木" , value: "土木"}
    };     
    
    $rootScope.positionInfo = {
        allOptions: positionService.getPositionList(),
        selectedOption: {id: '0', name: "教授" , value: "教授"}
    };        
    
    $rootScope.userAddCourse = {
        prof: '',
        course: '',
        dept: '',
        position: ''
    };
    
    //User add course form
    this.showUserAddCourseForm = function() {
        
        var confirmPopup = $ionicPopup.confirm({
            title: '添加课程',
            subTitle: '请慎重填写，您的参与会给其他同学带来巨大帮助！',
            templateUrl: 'common/user-add-course-form.html',
            scope: $rootScope,
            okText: '提交',
            cancelText: '取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('attempt add course to database');
                $rootScope.userAddCourse.position = $rootScope.positionInfo.selectedOption.value;
                $rootScope.userAddCourse.dept = $rootScope.deptInfo.selectedOption.value;
                
                if ($rootScope.userAddCourse.prof.length <= 1 
                    || $rootScope.userAddCourse.dept.length <= 1 ) {
                    showAddCourseFailInputShort();
                } else {
                    courseService.addCourse($rootScope.userAddCourse);           
                }

            } else {
                console.log('You are not sure');
            }
        });        
    };
    
    
    $rootScope.$on('course-add-success', function(event, args) {
        showAddCourseSuccess();
    });        
    $rootScope.$on('course-add-fail-duplicate', function(event, args) {
        showAddCourseFailDuplicate();
    });    
    $rootScope.$on('course-add-fail-generic', function(event, args) {
        showAddCourseFailGeneric();
    });
    $rootScope.$on('course-add-fail-prof-not-exist', function(event, args) {
        showAddCourseFailProfNotExist();
    });    
    
    
    //Course added
    var showAddCourseSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加成功！',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	     
    var showAddCourseFailDuplicate = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '该课程和老师已经存在',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	
    var showAddCourseFailGeneric = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '请稍候再试',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	
    var showAddCourseFailProfNotExist = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '很抱歉，数据库中没有找到匹配的老师，因而无法添加。检查一下是不是输错字了？（也可以在设置中反馈问题）',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	    
    var showAddCourseFailInputShort = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '课程和老师名字需不少于两个字',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	    
    
    
    /*----------------------------------------------------------------
    Access Control
    -----------------------------------------------------------------*/   
    this.showAccessControl = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '游客模式',
            template: '您目前处于游客模式，如果希望发表评论或关注，请先注册。每个声音都有力量！',
            okText: '快捷注册',
            cancelText: '继续游览'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('go to signup');
				$state.go('signup');

            } else {
                console.log('You are not sure');
            }
        });
    };    
    //Access control for the review tab
    this.showAccessControlAndExit = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '游客模式',
            template: '您目前处于游客模式，如果希望发表评论或关注，请先注册。每个声音都有力量！',
            okText: '快捷注册',
            cancelText: '继续游览'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('go to signup');
				$state.go('signup');
            } else {
				$state.go('tab.listing');
                console.log('You are not sure');
            }
        });
    };    
    
    
    
    
    
})
angular.module('starter.services')


.service('positionService', function($filter, $rootScope, $localStorage){
    

    var positionList = [ 
            {id: '0', name: "教授" , value: "教授"},
            {id: '1', name: "副教授" , value: "副教授"},
            {id: '2', name: "讲师" , value: "讲师"},
            {id: '3', name: "助教" , value: "助教"},
            {id: '4', name: "不详" , value: "不详"}
    ];

    this.getPositionList = function() {
        return positionList;
    };
    
    
})
angular.module('customDirectives', [])



//key press detection
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})


//alternative solution to password confirmation validation
.directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function(val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
      };
    }
  };
});
