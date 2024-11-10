/********************************************************
파일명 : main.js
설 명 : main.jsp의 script
수정일 수정자 Version Function 명
------- -------- ---------- --------------
*********************************************************/

/* ********************************************************
* Global site tag
******************************************************** */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-180714767-1');

/* *********
* ready
********* */
$(document).ready(function () {
	
	/* ********************************************************
	* 헤더
	******************************************************** */
	
	/*** 헤더 변수 start ***/
	
	//상단 script공통 변수
	var header = $('#header');

	//상단 nav
    var navUl = $('#nav > ul > li > ul');
    var navBg = $('.nav_bg');
    var isHovered = false;

	//마이페이지
	var mypageOpenStatus = 'close';
    var mypageOpenBtn = $('.mypage_open');
    var mypageLinks = $('.mypage_links');
	
	//상단검색
	var searchOpenStatus = 'close';
    var searchOpenBtn = $('.search_open');
    var searchCloseBtn = $('.search_close');
    var searchBg = $('.search_bg');
    var searchForm = $('.search_form');

	//전체메뉴
	var allnavOpenStatus = 'close';
    var allnavOpenBtn = $('.nav_all_open');
    var allnavCloseBtn = $('.nav_all_close');
    var mobileAllnavCloseBtn = $('.nav_all_innner .btn_close');
    var allnavForm = $('.nav_all_innner');
    var navMenu = $('.nav_form');

    /*** 헤더/팝업 변수 end ***/
    
    
    /*** 상단 nav 이벤트 start ***/    
    
	//상단 nav 출력 이벤트
    $('#nav, .nav_bg').on('mouseenter focusin', function (event) {
		if (event.relatedTarget && (event.relatedTarget.closest('#nav') || event.relatedTarget.className === 'nav_bg')) {
            return false;
        }
        var maxHeight = 0;

        navUl.each(function () {
            var height = $(this).outerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        navBg.stop().css('height', maxHeight);
		navBg.stop().slideDown(300);
		navUl.stop().slideDown(300);
		isHovered = true;
    });

    //상단 nav 숨김 이벤트
    $('#nav, .nav_bg').on('mouseleave focusout', function (event) {
		if (event.relatedTarget && (event.relatedTarget.closest('#nav') || event.relatedTarget.className === 'nav_bg')) {
            return false;
        }
        if (isHovered) {
			navUl.stop().slideUp(300, function () {
			});
			navBg.stop().slideUp(300, function () {
				navBg.hide();
			});

            isHovered = false;
        }
    });

    /*** 상단 nav 이벤트 end ***/
    
    
    /*** 상단 마이페이지 아이콘 이벤트 start ***/
    
    //상단 마이페이지 아이콘 하위메뉴 출력 이벤트
    //mypageOpenBtn.on('mousedown focusin', function () {
    mypageOpenBtn.on('click', function () {
		if(mypageOpenStatus == 'open'){
			mypageClose();
		}else{
			mypageOpen();
			searchClose();
			allnavClose();
		}
		
		return false;
    });
    
    //상단 마이페이지 아이콘 하위메뉴 숨김 이벤트(focus out)
    /*$('.mypage_links a:last-child').on('focusout', function () {
		mypageClose();
    });*/
    
    //상단 마이페이지 아이콘 하위메뉴 숨김 이벤트(외부영역 클릭/focus in)
    $(document).on('mousedown focusin', function (event) {
            if (!mypageOpenBtn.is(event.target) && !mypageLinks.is(event.target) && mypageLinks.has(event.target).length === 0) {
            	mypageClose();
            }
    }); 
    
    //상단 마이페이지 아이콘 하위메뉴 출력
	function mypageOpen(){
		mypageLinks.fadeIn(300);
		mypageOpenStatus = 'open'
		return false;
	}
	
	//상단 마이페이지 아이콘 하위메뉴 숨김
	function mypageClose(){
		mypageLinks.fadeOut(300);
		mypageOpenStatus = 'close'
		return false;
	}
	
	/*** 상단 마이페이지 아이콘 이벤트 end ***/

	
	/*** 상단 통합검색 아이콘 이벤트 start ***/	

	//상단 통합검색 아이콘 하위 검색창 출력 이벤트
	//searchOpenBtn.on('mousedown focusin', function () {
    searchOpenBtn.on('mousedown click', function () {
		searchOpen();
		mypageClose();
		allnavClose();
		return false;
    });
	
	//상단 통합검색 아이콘 하위 검색창 숨김 이벤트(외부영역 클릭/focus in)
    $(document).on('mousedown focusin', function (event) {
		if(searchOpenStatus == 'open'){
			if (!searchOpenBtn.is(event.target) && !searchCloseBtn.is(event.target) && !searchForm.is(event.target) && searchForm.has(event.target).length === 0) {
				searchClose();
				return false;
			}
		}
    });
    
    //상단 통합검색 아이콘 하위 검색창 숨김 이벤트(닫기버튼 클릭)
    searchCloseBtn.on('mousedown click', function () {
    	searchClose();
    });
    
    //상단 통합검색 아이콘 하위 검색창 출력
	function searchOpen(){
		searchForm.fadeIn(300);
		searchCloseBtn.fadeIn(300);
		searchBg.fadeIn(300);
		header.addClass('active');
		searchOpenStatus = 'open';
		return false;
	}
	
	//상단 통합검색 아이콘 하위 검색창 숨김
	function searchClose(){
		searchForm.fadeOut(300);
		searchCloseBtn.fadeOut(300);
		searchBg.fadeOut(300);
		header.removeClass('active');
		searchOpenStatus = 'close';
		return false;
	}
	
	//검색
	$("#hSearchBtn").click(function() {
		$("#allSearchForm").removeClass("onsubmit");
		document.allSearchForm.action = "/job/allFind.do";
		document.allSearchForm.submit();
	});
	
	/*** 상단 통합검색 아이콘 이벤트 end ***/	

	
	/*** 상단 전체메뉴 아이콘 이벤트 start ***/	
	
	//전체메뉴 닫기 이벤트(외부영역 클릭/focus in)
	$(document).on('mousedown focusin', function (event) {
		if(allnavOpenStatus == 'open'){
			if (!allnavCloseBtn.is(event.target) && !allnavForm.is(event.target) && allnavForm.has(event.target).length === 0) {
				allnavClose();
				return false;
			}
		}
    });
    
    //전체메뉴 닫기 이벤트(닫기버튼 클릭)
    //allnavCloseBtn.on('mousedown focusout', function () {
    allnavCloseBtn.on('mousedown click', function () {
    	allnavClose();
    });
    
    //전체메뉴 닫기 이벤트(모바일 닫기버튼 클릭)
    //mobileAllnavCloseBtn.on('mousedown focusout', function () {
    mobileAllnavCloseBtn.on('mousedown click', function () {
    	allnavClose();
    });

    
    //전체메뉴 열기 이벤트
    //allnavOpenBtn.on('mousedown focusin', function () {
    allnavOpenBtn.on('mousedown click', function () {
        allnavOpen();
		mypageClose();
		searchClose();
		return false;
    });
    
    //전체메뉴 열기
	function allnavOpen(){
		allnavForm.fadeIn(300);
		allnavCloseBtn.fadeIn(300);
		allnavOpenBtn.fadeOut(300);
		navMenu.fadeOut(300);
		header.addClass('nav_active');
		if($('#navBannerSlideCnt').text() != "0"){
			sliderRe();
		}
		allnavOpenStatus = 'open';
		return false;
	}
	
	//전체메뉴 닫기
	function allnavClose(){
		allnavForm.fadeOut(300);
		allnavCloseBtn.hide();
		allnavOpenBtn.fadeIn(300);
		navMenu.fadeIn(300);
		header.removeClass('nav_active');
		allnavOpenStatus = 'close';
		return false;
	}

	//전체메뉴 하위 항목 클릭 이벤트
	$('.all_nav_ul > li > a').click(function (event) {
		if($(this).next('ul').length == 0){ //하위 메뉴가 없으면 그대로 링크 이동
			return false;
		}
		if (window.innerWidth <= 1249) { //모바일에서만 토글 작동
			event.preventDefault();
			if($(this).closest('li').hasClass('active')){
				$('.all_nav_ul > li').removeClass('active');
				$('.all_nav_ul > li > ul').slideUp();
			}else{
				$('.all_nav_ul > li').removeClass('active');
				$('.all_nav_ul > li > ul').slideUp();
				$(this).closest('li').addClass('active');
				$(this).next('ul').slideDown();
			}
		}
	});
	
	/*** 상단 전체메뉴 아이콘 이벤트 end ***/	
	
	/* ********************************************************
	* 팝업&헤더 슬라이드 내용 호출
	******************************************************** */
	fn_getNavBannerList();
	
	/* ********************************************************
	* 모집강좌 슬라이드 이벤트
	******************************************************** */
	var lecture_slider = $('.lecture_slider').slick({
		dots: false,
		arrows: false,
		adaptiveHeight: true
	});
	
	// 이전 슬라이드 버튼 클릭
	$('.lecture_slide_ctrl .nav_banner_prev').click(function () {
		lecture_slider.slick('slickPrev');
		var currentSlider = $('.lecture_slide_ctrl .slide_count strong').text();
		$('.lecture_slide_ctrl .slide_prev button').text("이전 슬라이드 이동 현재는 "+currentSlider+"번째 슬라이드 입니다.");
		$('.lecture_slide_ctrl .slide_next button').text("다음 슬라이드 이동 현재는 "+currentSlider+"번째 슬라이드 입니다.");
	});

	// 다음 슬라이드 버튼 클릭
	$('.lecture_slide_ctrl .nav_banner_next').click(function () {
		lecture_slider.slick('slickNext');
		var currentSlider = $('.lecture_slide_ctrl .slide_count strong').text();
		$('.lecture_slide_ctrl .slide_prev button').text("이전 슬라이드 이동 현재는 "+currentSlider+"번째 슬라이드 입니다.");
		$('.lecture_slide_ctrl .slide_next button').text("다음 슬라이드 이동 현재는 "+currentSlider+"번째 슬라이드 입니다.");
	});

	// 슬라이드 변경 이벤트 감지
	lecture_slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.lecture_slide_ctrl .slide_count strong').text(nextSlide + 1);
	});
	
	
	/* ********************************************************
	* 본문
	******************************************************** */
	
	$(".rc_lst_slider").show(); //모집강좌 - 화면 로딩시 아래쪽에 목록이 표시됐다가 사라지는 현상 때문에 처음부터 감췄다가 보여줌
	fn_getMainNotice(5); //공지사항
	fn_searchEduCourseList(""); //교육강좌
	fn_updateVisitCountAjax(); //방문횟수
	//fn_getCourseList();	//교육과정 목록
	
  	fn_comm_codeList('COM119'); //메뉴링크 가져오기
	
	//2021.11.23 - 교육과정 변경
	fn_getCourseAllList();	//교육과정 전체 목록
	
	//교육강좌 더보기
	$("#examFind-cnt").click(function(){
        let initialLength = $('#eduList li').length;//클릭전 아이템 개수 저장
		if(Number($("#classCnt").val()) <= Number($("#examNum").val())){
			return;
		}
        fn_getEduCourseList($("#searchCode").val(), $("#examNum").val(), function() {
            if(initialLength.length > 0){
                $('#eduList li').eq(initialLength + 1).find('a').focus();
            }
        });
	});
	
	var filter = "win16|win32|win64|mac|macintel";
	if( navigator.platform  ){
		if( filter.indexOf(navigator.platform.toLowerCase()) > 0 ){
			/*
	        var head = document.getElementsByTagName("head")[0];
	        var script = document.createElement("script");
	        script.type = "text/javascript";
	        script.src = "/astx2/astx2.min.js?r=191230";
	        head.appendChild(script);
	        */
// 	    	checkInstallASTX2(
//     			function onSuccess() {
//     				$ASTX2.initNonE2E(); //NonE2E방식일때 키보드보안 실행하는 스크립트문		
//     			}
// 		    );
        }
	}
	
	$('.rc_lst_slider').slick({
		dots: true,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000
	});

	$(document).on('click', '.rc_lst_ctrl .rc_pause', function(){
	    $('.rc_lst_slider').slick('slickPause');
		$(this).hide();
		$('.rc_lst_ctrl .rc_play').show();
	});

	$(document).on('click', '.rc_lst_ctrl .rc_play', function(){
	    $('.rc_lst_slider').slick('slickPlay');
		$(this).hide();
		$('.rc_lst_ctrl .rc_pause').show();
	});
	
	$(document).on("click", ".tabs_btn button", function(){
		$('button[name=procTab]').attr("aria-selected","false");
		$(this).attr("aria-selected","true");
	});
	
	$('button[name=procTab]').on("focus", function(){
		$('button[name=procTab]').attr("aria-selected","false");
		$(this).attr("aria-selected","true");
		var selectTabNm = $(this).text();
		$("#selectTabInfo").text("선택된 분야 카테고리는 "+ selectTabNm+" 입니다.");
		$("#selectTabInfo2").text(selectTabNm+" 분야의 교육과정 정보를 확인하세요.");
	});
	
	$('button[name=procTab]').on("click", function(){
        $('button[name=procTab]').removeClass('active');
        $(this).addClass('active');
		$('button[name=procTab]').attr("aria-selected","false");
		$(this).attr("aria-selected","true");
		
		$(this).children().eq(0).text("선택됨");
		var pVal = $(this).attr("aria-controls").split("_")[1];
		if (Object.is(pVal,"0")){
			fn_getCourseAllList();
		}else{
			fn_getCourseList(pVal);
		}
		
	});
	
	$('button[name=procTab]').on("blur", function(){
		$(this).children().eq(0).text("");
	});
	
	$('button[name=procTab]').attr("tabindex","0");
	
	//focus 이동 시 focus ring 효과
	$(document).on('focus', '#mainCont2 a', function(){
		$(this).closest(".main_lecture").css('outline', '2px solid black');
	})
	//focus 이동 시 focus ring 효과 삭제
	$(document).on('blur', '#mainCont2 a', function(){
		$(this).closest(".main_lecture").css('outline', 'none');
	})
	
	// 2023 웹접근성 조치
	// 바로가기 포커스 
	$('#skip_to_container a').on("focus", function(){
		$(this).css('border','3px solid yellow');
	});
	$('#skip_to_container a').on("blur", function(){
		$(this).css('border','none');
	});
});


/* *********
* fucntion
********* */

//검색
function allSearchEnterkey(){
	if (window.event.keyCode == 13) {
		$("#allSearchForm").removeClass("onsubmit");
		document.allSearchForm.action = "/job/allFind.do";
		document.allSearchForm.submit();
	}
}

//팝업&헤더 슬라이드 내용 호출
function fn_getNavBannerList(){
	trionsoft.ajaxCall("/comm/getOpenPopupListAjax.do",
			null,
			null,
			"json",
			false,
			null,
			null,
			getNavBannerList);
}

var getNavBannerList = function(response, statusText) {
	
	$("#navBannerSlideCnt").text(response.data.length);
	
	if(response.data.length > 0){
		
		/**
		 * 헤더 베너 설정
		 **/
		$("#navBanner").show();
		
		var str1 = "";
		for(var i=0; i<response.data.length; i++){
			var data = response.data[i];
			
			if(data.fileUrl) {
				str1 += "<div class=\"item\"><a href=\"" + data.fileUrl + "\">" + data.popupCn + "</a></div>"
			} else {
				str1 += "<div class=\"item\">" + data.popupCn + "</div>"
			}
		}
		
		$("#navBannerSlider").html(str1);
		
		//전체메뉴 슬라이드
		var slider_nav_banner = $('.nav_banner_slider').slick({
			dots: false,
			arrows: false,
			autoplay: true,
			adaptiveHeight: true,
			autoplaySpeed: 5000
		});

		// 이전 슬라이드 버튼 클릭
		$('.nav_banner_ctrl .nav_banner_prev').click(function () {
			slider_nav_banner.slick('slickPrev');
		});

		// 다음 슬라이드 버튼 클릭
		$('.nav_banner_ctrl .nav_banner_next').click(function () {
			slider_nav_banner.slick('slickNext');
		});

		// 일시정지 버튼 클릭
		$('.nav_banner_ctrl .nav_banner_pause').click(function () {
			slider_nav_banner.slick('slickPause');
			$(this).hide();
			$('.nav_banner_play').show();
		});

		// 재생 버튼 클릭
		$('.nav_banner_ctrl .nav_banner_play').click(function () {
			slider_nav_banner.slick('slickPlay');
			$(this).hide();
			$('.nav_banner_pause').show();
		});

		// 슬라이드 변경 이벤트 감지
		slider_nav_banner.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$('.nav_banner_ctrl .slide_count strong').text(nextSlide + 1);
		});
		
		/**
		 * 팝업 설정
		 **/
		if(fnGetCookie("popupOpenCheck") == null ){
		 
			$("#popupBanner").show();
			
			var str2 = "";
			for(var i=0; i<response.data.length; i++){
				var data = response.data[i];
				
				if(data.fileUrl) {
					str2 += "<div class=\"item\" style=\"background:white;\"><a href=\"" + data.fileUrl + "\">" + data.popupCn + "</a></div>"
				} else {
					str2 += "<div class=\"item\" style=\"background:white;\">" + data.popupCn + "</div>"
				}
			}
			
			$("#popupBannerSlider").html(str2);
			$("#popupBannerSlideCnt").text(response.data.length);
			 
			//팝업 슬라이드
			var slider_popup_banner = $('.popup_slide').slick({
				dots: false,
				arrows: false,
				autoplay: true,
				adaptiveHeight: true,
				autoplaySpeed: 5000
			});

			// 이전 슬라이드 버튼 클릭
			$('.popup_banner_ctrl .popup_banner_prev').click(function () {
				slider_popup_banner.slick('slickPrev');
			});

			// 다음 슬라이드 버튼 클릭
			$('.popup_banner_ctrl .popup_banner_next').click(function () {
				slider_popup_banner.slick('slickNext');
			});

			// 일시정지 버튼 클릭
			$('.popup_banner_ctrl .popup_banner_pause').click(function () {
				slider_popup_banner.slick('slickPause');
				$(this).hide();
				$('.popup_banner_play').show();
			});

			// 재생 버튼 클릭
			$('.popup_banner_ctrl .popup_banner_play').click(function () {
				slider_popup_banner.slick('slickPlay');
				$(this).hide();
				$('.popup_banner_pause').show();
			});

			// 슬라이드 변경 이벤트 감지
			slider_popup_banner.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
				$('.popup_banner_ctrl .slide_count strong').text(nextSlide + 1);
			});
		
		}
	}
}

//팝업닫기
function fn_closePopupBanner(){
	
	//팝업창 쿠키 설정
	if($("#popupOpenCheck").is(':checked')) {
		fnSetCookiePopup( "popupOpenCheck", "done" , 1);
	} else {
		fnSetCookiePopup( "popupOpenCheck", "done" , -1);
	}
	
	$('.popup_banner').hide();
}

//팝업창  오픈 쿠키 정보 OPEN
function fnGetCookie(name) {

	  var prefix = name + "=";
	  var cookieStartIndex = document.cookie.indexOf(prefix);
	  if (cookieStartIndex == -1) return null;
	  var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	  if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;

	  return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

// 쿠키설정
function fnSetCookiePopup( name, value, expiredays ) {
	  var todayDate = new Date();
	  todayDate.setDate( todayDate.getDate() + expiredays );
	  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

//공지사항 관련 함수
/* ********************************************************
 * 현재 공지사항 목록 정보 Ajax통신으로 정보 획득
 ******************************************************** */
function fn_getMainNotice(cnt)
{
	trionsoft.ajaxCall("/main/selectMainNoticeAjax.do?cnt="+cnt,
			null,
			null,
			"json",
			false,
			null,
			null,
			callback_selectMainNotice);
}
var callback_selectMainNotice = function(response, statusText) {
	//통신이 성공적으로 이루어졌을 때 처리하고 싶은 함수
	if(response.data.length > 0){
		var list = response.data;
		var text = list[0].NTT_SJ;
		var textWithoutTag = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");

		if(textWithoutTag.length > 30) {
			textWithoutTag = textWithoutTag.substr(0,40);
		}
		
		var contSeq = list[0].NTT_ID;
		var contDate = list[0].REGIST_PNTTM;

		var html = "";
		
		for(var i = 0; i < list.length; i++){
   			var map = list[i];
   			
   			html += "<div class=\"item\">";
   			html += "<a href=\"javascript:fn_board_Move('8510000','" + map.NTT_ID + "','BBSMSTR_000000000001')\">";
   			
   			html += "<span>" + map.NTT_SJ + "</span>";
   			
   			/* if(map.SJ_BOLD_AT == 'Y'){
   				html += "<span style='color:blue;'>" + map.NTT_SJ + "</span>";
   			}else{
   				html += "<span>" + map.NTT_SJ + "</span>";
   			} */
   			
   			html += "</a>";
			html += "<span class=\"date\">" + map.REGIST_PNTTM + "</span>";
			html += "</div>";
   			
   		}
   		
		$("#notice_Content").html(html);
	}
}

//교육강좌 관련 함수
/* ********************************************************
 * 현재 교육강좌 목록 정보 Ajax통신으로 정보 획득
 ******************************************************** */
//랜덤변수생성 15자리
var randomNum = {};
randomNum.random = function(n1, n2) {
    return parseInt(Math.random() * (n2 -n1 +1)) + n1;
};

randomNum.authNo= function(n) {
    var value = "";
    for(var i=0; i<n; i++){
        value += randomNum.random(0,9);
    }
    return value;
};

/**
 * null 이나 빈값을 기본값으로 변경
 * @param str       입력값
 * @param defaultVal    기본값(옵션)
 * @returns {String}    체크 결과값
 */
function nvl(str, defaultVal) {
    var defaultValue = "";

    if (typeof defaultVal != 'undefined') {
        defaultValue = defaultVal;
    }

    if (!!!str) {
        return defaultValue;
    }

    return str;
}

function fn_getEduCourseList(field,cnt)
{
	searchCode = field;
	
	var frm = document.mainEduList;
	frm.searchCode.value = searchCode;

	trionsoft.ajaxCall("/main/selectEducationCourseListAjax.do",
			$('#mainEduList'),
			null,
			"json",
			false,
			null,
			null,
			function(response, statusText) {
                callback_EduCourseList(response, statusText, callback); 
            }
        );
}

var callback_EduCourseList = function(response, statusText) {
	
	examCnt = Number($("#examNum").val());
	
	if(statusText == 'error') {
		alert("리스트 조회에 실패했습니다.");	
	} else {			
		var result = response.data;
			var html = "";
			if(examCnt != 0){
				html = $("#eduList").html();
			}
			
			if(result != null && result.length > 0){
				
				$("#classCnt").val(result[0].CLASS_CNT);
				
	   	   		for(var i = 0; i < result.length; i++){
					var map = result[i];
					
					html += "<li>";
					html += "<a href=\"javascript:fn_moveDetail('" + nvl(String(map.EDU_PRGM_SN)) + "');\">";
					
					if(!!map.FILE_SEQ){
						html += "<div class=\"thum\" style=\"background-image:url('/comm/imageView.do?fileId="+ nvl(map.FILE_SEQ) +"');\">";
						//html += "<div class=\"thum\">";
	   					
	   					// if(map.FIELD == '08'){
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.EDU_PRGM_NM)+nvl(map.ORG_NM)+"</span>"; 	
	   					// }else if(map.FIELD == '05'){
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.JOB_NM)+" 직무 "+nvl(map.STATUS)+" 강좌 "+nvl(map.EDU_PRGM_NM)+nvl(map.ORG_NM)+"</span>"; 	
	   					// }else if(map.FIELD == '07'){
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.FIELD_NM)+nvl(map.JOB_NM)+nvl(map.EDU_PRGM_NM)+"</span>"; 
	   					// }else if(map.FIELD == '010'){
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.EDU_PRGM_NM)+"교수자 : "+nvl(map.TEACHER)+"</span>"; 
	   					// }else if(map.FIELD == '09'){
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.JOB_NM)+"전문가 과정"+nvl(map.EDU_PRGM_NM)+"</span>"; 
	   					// }else if(map.FIELD == '09'){
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.JOB_NM)+"전문가 과정"+nvl(map.EDU_PRGM_NM)+"</span>"; 
	   					// }else{
	   					// 	html += "<span class=\"sound_only\">"+nvl(map.EDU_PRGM_NM)+"</span>"; 
	   					// }

						html += "<span class=\"sound_only\">";
						var id = nvl(String(map.EDU_PRGM_SN));
						if(map.FIELD == '04') {			//스마트팜
							if(id == '84') html += "스마트팜 방제 전문가";
							else html += nvl(map.EDU_PRGM_NM).replaceAll("교육 과정", "전문가"); 
						} else if(map.FIELD == '05'){	//신에너지자동차
							if(id == '81' || id == '80' || id == '79' || id == '78') html += "공통 직무 선택 강좌 "+nvl(map.EDU_PRGM_NM);
							else if(id == '64') html += nvl(map.EDU_PRGM_NM)+" 공통 직무 필수 강좌";
							else if(id == '225') html += "공통 직무 선택 강좌 HMG 신에너지자동차 이해";
							else if(id == '76') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+"모터 직무 필수 강좌";
							else if(id == '77' || id == '75') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 모터 직무 선택 강좌";
							else if(id == '73' || id == '72') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 전력변환 직무 필수 강좌";
							else if(id == '74' || id == '71') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 전력변환 직무 선택 강좌";
							else if(id == '69') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 배터리 직무 필수 강좌";
							else if(id == '70' || id == '68') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 배터리 직무 선택 강좌";
							else if(id == '66') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 연료전지 직무 필수 강좌";
							else if(id == '67' || id == '65') html += "현대엔지비(주) "+nvl(map.EDU_PRGM_NM)+" 연료전지 직무 선택 강좌";
							else html += nvl(map.EDU_PRGM_NM);
						} else if(map.FIELD == '08'){ 	//지능형자동차
							html += nvl(map.EDU_PRGM_NM);
							if(id == '108') html += "(공통) 필수교육 ";
							else if(id == '109' || id == '111' || id == '113' || id == '115') html += " 필수교육";
							else if(id == '110' || id == '112' || id == '114' || id == '116') html += " 선택교육";
						} else if(map.FIELD == '09'){ 	//드론
							if(id == '124' || id == '125' ) 
								html += "드론 조종 전문가 기초과정 "+nvl(map.EDU_PRGM_NM); 
							else if(id == '126' || id == '127') 
								html += "드론 촬영 전문가 기초과정 "+nvl(map.EDU_PRGM_NM); 
							else if(id == '122' || id == '123') 
								html += "드론 정비 전문가 기초과정 "+nvl(map.EDU_PRGM_NM); 
							else if(id == '121') 
								html += "드론 코딩 전문가 기초과정 "+nvl(map.EDU_PRGM_NM); 
							else html += nvl(map.EDU_PRGM_NM);
						} else if(map.FIELD == '010'){	//가상·증강현실
							html += nvl(map.EDU_PRGM_NM)+" "+nvl(map.TEACHER)+" 교수"; 
						} else if(map.FIELD == '013'){	//의료메타버스
							html += nvl(map.EDU_PRGM_NM) + " 과정";
						} else if(map.FIELD == '014'){	//DNA
							if(id == '152') html += "건솔루션 제조시스템 엄주명 교수 경희대학교";
							else if(id == '153') html += "건솔루션 IIoT 구축 엄주명 교수 경희대학교";
							else if(id == '154') html += "데이터 사이언스 김영훈 교수 진현우 교수";
							else if(id == '164') html += "건솔루션 가상현실 윤종완 교수 한양대학교";
							else html += nvl(map.EDU_PRGM_NM);
						} else if(map.FIELD == '015'){	//지능형농장(스마트팜)
							if(id == '148' || id == '149' || id == '150' || id == '151' || id == '179' || id == '180' || id == '181' || id == '182') 
								html += nvl(map.EDU_PRGM_NM).replaceAll("2024년", "").replaceAll("(1차)", "").replaceAll("(2차)", "");
							else html += nvl(map.EDU_PRGM_NM);
						} else if(map.FIELD == '016'){	//클라우드
							if(id == '160') html += "클라우드 보안 아키텍처 양성과정";
							else html += nvl(map.EDU_PRGM_NM);
						} else if(map.FIELD == '017'){	//바이오헬스
							if(id == '208') html += "디지털 헬스케어 서비스 프로젝트 관리 실무";
							else html += nvl(map.EDU_PRGM_NM);
						} else if(map.FIELD == '019'){	//항공드론
							if(id == '219' || id == '223' ) html += "드론 군집 비행";
							else if(id == '224') html += "드론 3D 매핑 모델링 실습";
							else html += nvl(map.EDU_PRGM_NM);
						} else {
							//미래자동차 018, 빅데이터 011
							html += nvl(map.EDU_PRGM_NM);
						}
						html +="</span>"; 
	   				} else {
						html += "<div class=\"thum\" style=\"background-image:url('/images/matchup/v1/noimage.png');\">";
	   					html += "<span class=\"sound_only\">"+nvl(map.EDU_PRGM_NM)+"</span>";
	   				}
					
					html += "<span class=\"status-span\">";
					if(map.FIELD == '01' || map.FIELD == '02' ||  map.FIELD == '03'){
						html += "<span class=\"status\" style=\"background-color:#666666;\">운영종료</span>";
	   				}else if(map.FIELD == '012'){
	   					html += "<span class=\"status\" style=\"background-color:#666666;\">접수마감</span>";
	   				}else{
						if('N' == map.EARLY_CLOSING_YN){
							if(nvl(map.LECTURE_STTS_NM) == '준비중' && 'N' == map.EARLY_CLOSING_YN) {
								html += "<span class=\"status\">접수예정</span>";
							} else{
								html += "<span class=\"status\">" + nvl(map.LECTURE_STTS_NM) + "</span>";
								if(map.CLASS_DIV_CD == '2'){
									html += "<span class=\"status-blue\">상시강좌</span>";
								}
							}
						}
	   				}
					html += "</span>";
					
					html += "</div>";
					html += "<div class=\"cnt\">";
					html += "<span class=\"subject\">"+nvl(map.EDU_PRGM_NM)+"</span>";
					html += "<div class=\"info\">";
					html += "<div>교육기관 : "+nvl(map.ORG_NM)+"</div>";
					html += "<div>교육분야 : "+nvl(map.FIELD_NM)+"</div>";
					//html += "<div>필수여부 : "+nvl(map.STATUS)+"</div>";
					html += "</div>";
					html += "<div class=\"stars\">";
					//html += "<div>만족도 <span class=\"sound_only\">별 "+map.STAR_RATING+"개/5점 만점</span><div class=\"star-rating\"><span class=\"star\" style=\"width:"+(map.STAR_RATING*2)*10+"%\"></span></div></div>";
					var starRating = Math.round(Number(map.STAR_RATING));
					
					html += "<span class=\"sound_only\">별 " + starRating +"개/5점 만점</span>";
					
					for(var j = 0; j < 5; j++){					
						html += "<span class=\"star";
						if(j < starRating){
							html += " active";
						}
						html += "\"></span>";
					}
					
					html += "</div>";
					if(map.FIELD == '01' || map.FIELD == '02' ||  map.FIELD == '03'){
						html += "<span style=\"display: inline-block;margin-top: 20px;\">운영종료</span>";
					}else if(map.FIELD == '012'){
						html += "<span style=\"display: inline-block;margin-top: 20px;\">접수마감</span>";
					}else{
						html += "<span class=\"btn_join\">수강신청하기</span>";
					}
					html += "</div>";
					html += "</a>";
					html += "</li>";
					
	   			}

	   	   		if(Number($("#examNum").val()) == 0){
	   	   			$("#examNum").val(Number($("#examNum").val())+8);
	   	   		}else{
	   	   			$("#examNum").val(Number($("#examNum").val())+4);
	   	   		}
			}else{
				html += "<div class=\"item clearfix\"><h2>현재 준비중 입니다.</h2></div>";
				$("#classCnt").val(0);
			}
		$("#eduList").html(html);
         // 추가된 항목에 포커스 설정을 위한 콜백 실행
         if (typeof callback === "function") {
            callback();
        }

	}
}

function fn_searchEduCourseList(field){
	$("#examNum").val(0);
	fn_getEduCourseList(field,$("#examNum").val());
}

//공지사항 게시판 이동
function fn_board_Move(menuNo,nttId,bbsId) {
	document.selectTwo.method = 'get';
	document.selectTwo.menuNo.value = menuNo;
	document.selectTwo.nttId.value = nttId;
	document.selectTwo.bbsId.value = bbsId;
	document.selectTwo.action = "/cop/bbs/selectBoardArticle.do";
	document.selectTwo.submit();
}

//메뉴 페이지 이동
function fn_HeadPageMove(menuNo, chkUrl){
	document.selectOne.method = 'post';
	document.selectOne.menuNo.value=menuNo;
	//document.selectOne.chkURL.value=chkUrl;
	document.selectOne.chkURL.value="";
    document.selectOne.action = "/Contents.do";
    document.selectOne.submit();
}

//서브메뉴 페이지 이동
function fn_subPageMove(menuNo, chkUrl)
{
	document.selectOne.method = 'post';
	document.selectOne.menuNo.value=menuNo;
	document.selectOne.chkURL.value=chkUrl;
    document.selectOne.action = chkUrl;
    document.selectOne.submit();
}

//교육강좌 페이지 이동
function fn_moveDetail(param1)
{
	var frm = document.frmDetail;
	frm.eduPrgmSn.value = param1;
	frm.menuNo.value = "8310000";
	frm.method = "POST";
	frm.action = "/job/programFindDetail2.do";
	frm.submit();
}

//간편로그인 팝업 호출
function fn_openProgramPassLoginPopup(popupCode)
{
	var popupX = (window.outerWidth / 2) - (558 / 2);
	var popupY = (window.outerHeight / 2) - (558 / 2);
	window.open('/simpleLogin/pop/openPopupProgramPassLogin.do?popupCode='+popupCode, 'ProgramPassLogin', 'width=500px, height=700px, top='+ popupY +', left=' + popupX+ ', fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbars=no resizable=no');
}

//ASTx 설치페이지
function gotoInstallASTX2() {
	location.href="/main/secureCheck.do";
}
 
function fn_updateVisitCountAjax()
{
	var url = "/comm/updateVisitCountAjax.do";
	trionsoft.ajaxCall(url,
			null,
			null,
			"json",
			false,
			null,
			null,
			callback_updateVisitCount);
} 
var callback_updateVisitCount = function(response, statusText) {
	var result = response.data;
	if(statusText == 'error') {
		alert("접속이 올바르지 않습니다.");	
	} 
}

function enterkey() {
    if (window.event.keyCode == 13) {

		document.searchForm.action = "/job/allFind.do";
		document.searchForm.submit();
    }
}

function fn_moveDetail2(param1, param2) {
	var frm = document.frmDetail2;
	frm.orgSn.value = param1;
	frm.jobSn.value = param2;
	frm.method = "POST";
	frm.action = "/job/educationCourseDetail.do";
	frm.submit();
}

function fn_movePrgmDetail(param1)
{
	var frm = document.frmDetail2;
	frm.eduPrgmSn.value = param1;
	frm.method = "POST";
	frm.action = "/job/programFindDetail2.do";
	frm.submit();
}

//전체 선택시 교육과정 조회
function fn_getCourseAllList(){
	$("#fieldCd").val('');
	trionsoft.ajaxCall("/job/mainEducationCourseAllListAjax.do"
			,$("#searchFrm")
			, null
			, "json"
			, false
			, null
			, null
			, callback_selectCourseAllList);
}

var callback_selectCourseAllList = function(response, statusText, currentPage) {
	//통신이 성공적으로 이루어졌을 때 처리하고 싶은 함수
	if (statusText == 'error') {
		alert("리스트 조회에 실패했습니다.");
	} else {
		resultArr = response.hashMapList;
		var result = response.hashMapList;
		var html = "";
		
		var rowCnt = 0;
		var tmpEduOrgSn = "";
		
		if (result != null) {
			var url = "";
			var lastResult = result.length;
			var rank = "";
			var strHeaderCheck = "Y";

			for (var i = 0; i< lastResult; i++) {
				var map = result[i];
				url = fnMenuUrlLink(map.MENU_NO);
				
				html += "<li>";
				html += "<a href=\"javascript:fn_subPageMove(\'"+nvl(String(map.MENU_NO)) + "\', \'"  +url + "\', \'"+ nvl(String(map.UPPER_MENU_NO))+"\');\">";
				html += "<div class=\"top\">";
				html += "<div class=\"cate_img\" style=\"background-image:url('/comm/imageView.do?fileId="+nvl(map.FIELD_LOGO_FILE_SEQ)+"');\"></div>";
				html += "<div class=\"cnt\">";
				html += "<div class=\"subject\" style=\"-webkit-box-orient: vertical;display: -webkit-box;-webkit-line-clamp: 1;overflow: hidden;\">" + nvl(String(map.FIELD_NM)) + "</div>";
				html += "<div class=\"wt\">";
				html += "<span>" + nvl(map.EDU_ORG_NM) + "</span>";
				html += "<span>강좌 수 : " + nvl(map.CNT, 0) + "개</span>";
				html += "</div>";
				html += "</div>";
				html += "</div>";
				html += "<div class=\"bottom\">";
				html += "<div class=\"txt\">" + nvl(map.FIELD_INTRO) + "</div>";
				html += "<div class=\"ci\" >";
				html += "<div style=\"background-image:url('/comm/imageView.do?fileId="+nvl(map.LOGO_FILE_SEQ)+ "');\"></div>";
				html += "<span class=\"sound_only\">" + map.COP_ORG_NM + "</span>";
				html += "</div>";
				html += "</div>";
				html += "</a>";
				html += "</li>";
			}
		}
		$("#educationCourseListAll").html(html);
	}

}

function fn_getCourseList(fieldCd) {
	$("#fieldCd").val(fieldCd); 
	trionsoft.ajaxCall("/job/educationCourseListAjax.do"
					,$("#searchFrm")
					, null
					, "json"
					, false
					, null
					, null
					, callback_selectCourseList);
}

var callback_selectCourseList = function(response, statusText, currentPage) {
	//통신이 성공적으로 이루어졌을 때 처리하고 싶은 함수
	if (statusText == 'error') {
		alert("리스트 조회에 실패했습니다.");
	} else {
		resultArr = response.hashMapList;
		var result = response.hashMapList;
		var html = "";
		var totField = $("#fieldCd").val();
		
		var rowCnt = 0;
		var tmpEduOrgSn = "";
		
		if (result != null) {
			var url = "";
			var lastResult = result.length;
			var rank = "";
			var strHeaderCheck = "Y";

			for (var i = 0; i< lastResult; i++) {
				var map = result[i];
		
				if((!Object.is(strHeaderCheck,"Y")) && (!Object.is(rank,map.ORDR)))
				{
					strHeaderCheck = "Y";
					
					if(totField == '01' || totField == '02' || totField == '03' ){
						html += "</ul><div class=\"row\" style=\"color:red;font-weight:600;\">해당 분야는 운영종료되었음</div></div></li>";
					}else{
						html += "</ul></div></li>";
					}
				}
				if(Object.is(strHeaderCheck,"Y"))
				{
					html += "<li>";
					if(map.FILE_SEQ != null){
						html += "<div class=\"thum_title\" style=\"background-image: url('/comm/imageView.do?fileId="+nvl(map.FILE_SEQ)+"');\"><span class=\"sound_only\">"+ nvl(String(map.JOB_NM)) +"</span></div>";
					}else{
						html += "<div class=\"thum_title\" style=\"background-image: url('/images/matchup/v1/noimage.png');\"><span class=\"sound_only\">"+ nvl(String(map.JOB_NM)) +"</span></div>";
					}
					html += "<div class=\"cnt\">";
					html += "<a href=\"javascript:fn_moveDetail2(\'" + nvl(String(map.EDU_ORG_SN)) + "\', \'" + nvl(String(map.JOB_SN)) + "\');\" class=\"subject\" target=\"_top\">"+ nvl(String(map.JOB_NM)) +"</a>";
					html += "<span class=\"wt\">" + nvl(map.ORG_NM) + "</span>";
					html += "<ul class=\"links\">";
					
					strHeaderCheck = "N";
					rank = map.ORDR;
				}
				
				html += "<li><a href=\"javascript:fn_movePrgmDetail(\'" + nvl(map.EDU_PRGM_SN) + "\');\"><span>" + map.EDU_PRGM_NM + "</span></a></li>";
				rank = map.ORDR;
				
				
				if(map.EDU_ORG_SN != tmpEduOrgSn){
					rowCnt++;
				}
				
				tmpEduOrgSn = map.EDU_ORG_SN;
			}
			totalData = result.length;

			if(totField == '01' || totField == '02' || totField == '03' ){
				html += "</ul><div class=\"row\" style=\"color:red;font-weight:600;\">해당 분야는 운영종료되었음</div></div></li>";
			}else{
				html += "</ul></div></li>";
			}
		} else {
			totalData = 0;
			html = "<div class=\"item clearfix\"><h2>현재 준비중 입니다.</h2></div>";
		}
		
		$("#educationCourseList"+totField).html(html);
		
	}

}

//본문 바로가기
function enterkeyF() {
	$("#contentMove").blur();

	$("#content").attr("tabindex", "0");
	$("#content").focus();
	$("#content").removeAttr("tabindex");
	
	window.scrollTo(0, 0);
}