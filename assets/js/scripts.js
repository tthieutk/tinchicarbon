/* -----------------------------------------------
Table of Contents (common js)
--------------------------------------------------
1. UserAgent determination
2. URL determination
3. Settings
4. Execute immediately when JS file is loaded (Execute JavaScript when the page loaded.)
5. Execute after DOM is constructed (Execute JavaScript when the DOM is fully loaded.)
6. Execute after page loading including images is complete (Execute JavaScript when the Window Object is fully loaded.)
7. Set events for dynamic content
8. Set other events
9. Multiple functions (plugins)

// require jQuery JavaScript Library v3.5.1
/* ------------------------------------------------------------
 * [ userAgent ] http://www.useragentstring.com/pages/useragentstring.php
 * ------------------------------------------------------------ */
var ua                   = window.navigator.userAgent;
var appVer               = window.navigator.appVersion;

//PC
var isIE                 = ua.indexOf('MSIE') != -1 || ua.indexOf('Trident') != -1;
var isIE6                = isIE && appVer.indexOf('MSIE 6') != -1;
var isIE7                = isIE && appVer.indexOf('MSIE 7.') != -1;
var isIE8                = isIE && ua.indexOf('Trident/4.') != -1;
var isIE9                = isIE && ua.indexOf('Trident/5.') != -1;
var isIE10               = isIE && ua.indexOf('Trident/6.') != -1;
var isIE11               = ua.indexOf('Trident/7.') != -1;

var isFirefox            = ua.indexOf('Firefox') != -1;
var isChrome             = ua.indexOf('Chrome') != -1;
var isSafari             = ua.indexOf('Safari') != -1;

//Mobile (smartphone + tablet)
var isMobileSafari       = ua.match(/iPhone|iPad|iPod/i) ? true : false;
var isMobileSafariTypeT  = ua.match(/ipad/i) ? true : false;
var isMobileSafariTypeS  = ua.match(/iphone|ipod/i) ? true : false;
var isAndroid            = ua.indexOf('Android') != -1;
var isMobileAndroidTypeT = isAndroid && ua.indexOf('Mobile') == -1;
var isMobileAndroidTypeS = isAndroid && ua.indexOf('Mobile') != -1;
var isAndroidChrome      = isChrome && isAndroid;
var isAndroidFirefox     = isFirefox && isAndroid;
var isMobileFirefox      = isFirefox && ua.indexOf('Mobile') != -1;
var isTabletFirefox      = isFirefox && ua.indexOf('Tablet') != -1;

//PC or Mobile
var isTablet             = isMobileSafariTypeT || isMobileAndroidTypeT || isTabletFirefox;
var isSmartPhone         = isMobileSafariTypeS || isMobileAndroidTypeS || isMobileFirefox;
var isMobile             = isTablet || isSmartPhone || isAndroidChrome || isAndroidFirefox;
var isPC                 = !isMobile;



/* ------------------------------------------------------------
 * [ Location ]
 * ------------------------------------------------------------ */
var  locationHref     = window.location.href,     // http://www.google.com:80/search?q=demo#test
     locationProtocol = window.location.protocol, // http:
     locationHostname = window.location.hostname, // www.google.com
     locationHost     = window.location.host,     // www.google.com:80
     locationPort     = window.location.port,     // 80
     locationPath     = window.location.pathname, // /search
     locationSearch   = window.location.search,   // ?q=demo
     locationHash     = window.location.hash;     // #test

/* ============================================================
* IE11 Fixed element problems
* ============================================================ */
if(isIE11) {
	document.body.addEventListener("mousewheel", function(event) {
		event.preventDefault();
		var weelDelta = event.wheelDelta;
		var currentOffset = window.pageYOffset;
		window.scrollTo(0, currentOffset - weelDelta);
	});
}
/* ============================================================
* Common Script
* ============================================================ */
var Common = (function () {
	function Common() {
		this.onInit();
	}

	/**
	* Initialization
	*/
	Common.prototype.onInit = function () {
		var _this = this;
		_this.initValue();
		_this.addAgentClass();
		_this.jsMatchHeight();
		_this.smoothScroll();
		_this.initGlobalNav();
		_this.globalNavButton();
		_this.jsPageTop();
		_this.jsSlider();
		_this.jsTabs();
		_this.jsShowMore();
	}

	/**
	* initLocomotive SmoothScroll
	*/
	Common.prototype.initLocomotive = function () {
		gsap.registerPlugin(ScrollTrigger);
	}

	/**
	* userAgent Classes to <html>
	*/
	Common.prototype.initValue = function(){
		var vh = $(window).innerHeight() * 0.01,
		vw = $(window).innerWidth() * 0.01;
		document.documentElement.style.setProperty('--vh', vh + "px");
		document.documentElement.style.setProperty('--vw', vw + "px");
		var timer = false;
		$(window).on('resize', function(){
			if(timer) clearTimeout(timer);
			timer= setTimeout(function(){
				var lvh = $(window).innerHeight() * 0.01,
				lvw = $(window).innerWidth() * 0.01;
				if(isPC || (!isPC && lvw != vw)){
					vw = lvw;
					vh = lvh;
					document.documentElement.style.setProperty('--vh', vh + "px");
					document.documentElement.style.setProperty('--vw', vw + "px");
				}
				ScrollTrigger.refresh();
			}, 200);
		});
	}
	/**
	* userAgent Classes to <html>
	*/
	Common.prototype.addAgentClass = function(){

		if (isTablet) {
			$('html').addClass('is-tablet');
		}
		if (isSmartPhone) {
			$('html').addClass('is-sp');
		}
		if (isPC) {
			$('html').addClass('is-pc');
		}
		if (isMobile) {
			$('html').addClass('is-mobile');
		}
		if (isIE) {
			$('html').addClass('is-ie');
		}
		if (isAndroid) {
			$('html').addClass('is-android');
		}
	}

	/**
	* smoothScroll
	*/
	Common.prototype.smoothScroll = function(){
		$('body').on('click', 'a[href^="#"]:not([href="#top"])',function(){
			var href= $(this).attr('href');
			var target = $(href === '#' || href === '' ? 'html' : href);
			var position = target.offset().top - 100;
			$('body,html').animate({scrollTop:position}, 500, 'swing');
			return false;
		});
	}
	
	Common.prototype.initGlobalNav = function () {
		var globalNavItem = $(".l-header__nav > li");

		globalNavItem.each(function(){
			if($(this).find('.l-header__nav__sub').length > 0){
				$(this).addClass('is-sub');
			}
		});

		//Header scroll
		var $header = $('.l-header');
		var $body = $('body');
		var $footer = $('#l-footer');
		$(window).on('scroll', function(){
			var scroll = $(window).scrollTop();

			if(scroll > 205){
				$body.addClass('is-scrolled');
				$header.addClass('is-scrolled');
			} else{
				$body.removeClass('is-scrolled');
				$header.removeClass('is-scrolled');
			}

			if(scroll >$footer.offset().top - window.innerHeight){
				$body.addClass('is-scroll-foot');
			} else{
				$body.removeClass('is-scroll-foot');
			}
		});
	}
	
	//Global menu
	Common.prototype.globalNavButton = function () {
		var menuBtn = $(".nav-global-menu");
		var globalNav = $(".l-header__nav");
		var navSubBtn = $(".l-header__nav > li.is-sub > a");
		var globalSocial = $(".l-header__main__content");

		menuBtn && menuBtn.on('click', function(e){
			e.preventDefault();
			if(menuBtn.hasClass('is-active')){
				menuBtn.removeClass('is-active');
				globalNav.removeClass('is-active');
				globalSocial.removeClass('is-active');
					$('html').removeClass('is-opened-menu');
			} else{
				menuBtn.addClass('is-active');
				globalNav.addClass('is-active');
				globalSocial.addClass('is-active');
				$('html').addClass('is-opened-menu');
			}
		});
		
		function handleNavSubBtnClick(e) {
			e.preventDefault();
			var $this = $(this);
			var $thisNavSub = $this.next('.l-header__nav__sub');
		
			if ($this.hasClass('is-show')) {
				$this.removeClass('is-show');
				$thisNavSub.removeClass('is-show');
				$thisNavSub.slideUp(350);
			} else {
				// Đóng tất cả các menu khác trước khi mở menu mới
				$('.l-header__nav > li.is-sub > a').not($this).removeClass('is-show');
				$('.l-header__nav__sub').not($thisNavSub).removeClass('is-show').slideUp(350);
		
				$this.addClass('is-show');
				$thisNavSub.addClass('is-show');
				$thisNavSub.slideToggle(350);
			}
		}
		
		function checkWindowSize() {
			if ($(window).width() < 960) {
				navSubBtn.off('click').on('click', handleNavSubBtnClick);
			} else {
				navSubBtn.off('click');
				$('.l-header__nav__sub').removeAttr('style').removeClass('is-show');
				$('.l-header__nav > li.is-sub > a').removeClass('is-show');
			}
		}
		
		checkWindowSize();
		
		$(window).on('resize load', function(){
			checkWindowSize();
		});
	}


	/**
	* matchHeight
	*/
	Common.prototype.jsMatchHeight = function(){
		// call matchHeight
		$('.js-mh01').matchHeight();
		$('.js-mh02').matchHeight();
		$('.js-mh03').matchHeight();
	}

	/**
	* Page Top
	*/
	Common.prototype.jsPageTop = function(){
		var $backToTop = $(".page-top");
		$backToTop.hide();

		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 200) {
				$backToTop.fadeIn(100);
			} else {
				$backToTop.fadeOut(100);
			}
		});

		$backToTop.on('click', function (e) {
			$("html, body").animate({
				scrollTop: 0
			}, 300, 'linear');
		});
	}
	
	/**
	* Slider
	*/
	Common.prototype.jsSlider = function(){
		$('.js-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			fade: true,
			cssEase: 'linear',
			infinite: true,
			autoplay: true,
			autoplaySpeed: 4000,
			arrows: true,
			prevArrow: '<div class="slick-prev"><i class="fas fa-chevron-left"></i></div>',
			nextArrow: '<div class="slick-next"><i class="fas fa-chevron-right"></i></div>'
		});
		
		$('.slider-post').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			arrows: true,
			dots: true,
			prevArrow: '<div class="slick-prev"><i class="fas fa-chevron-left"></i></div>',
			nextArrow: '<div class="slick-next"><i class="fas fa-chevron-right"></i></div>',
			responsive: [
				{
					breakpoint: 959,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
	}
	
	/**
	* Tabs
	*/
	Common.prototype.jsTabs = function(){
		var $boxes = $('.box-tabs');
		
		$boxes.each(function(){
			var $box = $(this);
			var $nav = $box.find('.box-tabs__nav li');
			
			$nav.click(function(){
				var $tabID = $(this).attr('data-tab');
				
				$(this).addClass('is-active').siblings().removeClass('is-active');
				$box.find('#tab-'+$tabID).addClass('is-active').siblings().removeClass('is-active');
			});
		});
	}
	
	
	/**
	* Show More
	*/
	Common.prototype.jsShowMore = function(){
		const $showMoreBtn = $("#show-more-btn");
		const $comments = $(".comments_list .new_comment");

	    $showMoreBtn.on("click", function () {
	      $comments.each(function () {
	        $(this).css("display", "block");
	      });
	      $showMoreBtn.addClass("hidden");
	    });
	}
	


	return Common;
}());


/* ============================================================
 * Plugin
 * ============================================================ */
/**
* Full background
*/
$.fn.jsFullBackground = function(config){
	var defaults = {
			position : 'center center',
			bgsize: 'cover',
			repeat: 'no-repeat'
		};
	var config = $.extend({}, defaults, config);
	return this.each(function() {
		var $this = $(this);
		var $img = $this.children('img').first();
		if (!$img.length) return false;
		var src = $img.attr('src');
		var position = config.position;
		var bgsize = config.bgsize;
		var repeat = config.repeat;
		if ($this.data('position')) {
			position = $this.data('position');
		}
		if ($this.data('bgsize')) {
			bgsize = $this.data('bgsize');
		}
		if ($this.data('repeat')) {
			repeat = $this.data('repeat');
		}
		$this.css({
			backgroundSize: bgsize,
			backgroundImage: 'url(' + src + ')',
			backgroundRepeat: repeat,
			backgroundPosition: position
		});
		$img.hide();
	});
}

$.fn.menuInit = function(opt) {
	var opt       = opt || {},
	menuParentClass   = opt.menuParentClass === undefined ? '.js-menu-parent' : opt.menuParentClass, //Wrapper class of each accordion
	menuContentClass  = opt.menuContentClass  === undefined ? '.js-menu-content' : opt.menuContentClass, //Content class of subcontent
	triggerClass    = opt.triggerClass  === undefined ? '.js-menu-trigger' : opt.triggerClass, //Trigger class
	collapse      = opt.collapse  === undefined ? true : opt.collapse, //Collapse or not
	animateSpeed    = opt.animateSpeed  === undefined ? 300 : opt.animateSpeed, //Animate speed,  default: 300ms
	sync        = opt.sync  === undefined ? true : opt.sync, //Toggle at same time or not
	toggleIcon      = opt.toggleIcon  === undefined ? '.js-toggle-icn' : opt.toggleIcon, //Change icon
	openIcon      = opt.openIcon  === undefined ? 'fa-times' : opt.openIcon, //Change icon with specified class
	closeIcon       = opt.closeIcon === undefined ? 'fa-bars' : opt.closeIcon, // Name of close class
	openFirstMenu     = opt.openFirstMenu === undefined ? false : opt.openFirstMenu; // open on first menu item
	callback = opt.callback === undefined ? false : opt.callback;
	function slideMenu($menuElement, forceOpen){
		var href      = $menuElement.attr("href") == undefined ? $menuElement.next(menuContentClass) : $menuElement.attr("href");
		var $href     = $(href);
		var $menuParent   = $href.closest(menuParentClass);
		var $trigger    = $menuElement.closest(triggerClass).siblings(triggerClass);
		if($trigger.length == 0) $trigger= $menuParent.find(triggerClass);

		if (!$href.hasClass('is-active') || forceOpen === true){
			if(collapse) {
				if(sync == false){
					$menuParent.find(menuContentClass).not(href).slideUp(animateSpeed, function(){
						$href.slideDown(animateSpeed, function(){
							if(callback) callback();
						});
					}).removeClass('is-active');
				} else{
					$menuParent.find(menuContentClass).not(href).slideUp(animateSpeed).removeClass('is-active');
					$href.slideDown(animateSpeed, function(){
						if(callback) callback();
					});
				}
				$trigger.removeClass('is-opened');
				$menuParent.find(toggleIcon).addClass(closeIcon).removeClass(openIcon);
			} else{
				$href.slideDown(animateSpeed, function(){
					if(callback) callback();
				});
			}
			$href.addClass('is-active');
			$menuElement.find(toggleIcon).addClass(openIcon).removeClass(closeIcon);
			$menuElement.closest(triggerClass).addClass('is-opened');
		} else {
			$href.slideUp(animateSpeed);
			$href.removeClass('is-active');
			$menuElement.closest(triggerClass).removeClass('is-opened');
			$menuElement.find(toggleIcon).addClass(closeIcon).removeClass(openIcon);
		}
	}
	//open the first menu item
	var $menuParent = $(menuParentClass);
	var $menuContentClass = $(menuContentClass);
	$menuContentClass.hide();
	if(openFirstMenu){
		$menuParent.each(function(){
			slideMenu($(this).find(triggerClass).first(), true);
		})
	}
	return this.each(function() {
		var $menuElement = $(this);
		//Open when loaded if set class .is-active to trigger button
		if($menuElement.hasClass('is-active')){
			slideMenu($menuElement, true);
		}
		//click event
		$menuElement.on('click', function(e) {
			e.preventDefault();
			if(!$(this).hasClass('is-disable')){
				slideMenu($(this));
			}
			return false;
		});
	});
};


/* ============================================================
 * Execute JavaScript when the DOM is fully loaded.
 * ============================================================ */
var commonJS;
function eventHandler(){

	commonJS = new Common();
}
if(document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),i=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(i-a))<=o?r[r.length-1]=s.add(e):r.push(e),i=a}),r},i=function(e){var o={
	byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.2",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
	r._afterUpdate=null,r._rows=a,r._parse=n,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
	  "padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var a={
	  display:n};a[s.property]="",e.css(a),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
	  this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,a){if(a&&"resize"===a.type){var i=t(window).width();if(i===e)return;e=i;
	  }n?o===-1&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});