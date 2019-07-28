$(document).ready(function(){
	//project_brief_slick('div.project-focus');
	//project_indv_slick('div.slider-indv-thumbs');
	highlight_awards();
});

$(window).on("load", function() {
	init_slick_ovrvw_lg();
	init_slick_ovrvw_tms();
	init_slick_indv_lg();
	init_slick_indv_tms();
	project_indv_slick('div.slider-indv-thumbs');
});

/*
* Slick Slide Project Outline Scroller
*
* http://kenwheeler.github.io/slick/
*/

function init_slick_ovrvw_lg() {
	$('.slider-overview-lg').slick({
  	infinite: true,
  	speed: 200,
  	fade: true,
  	lazyLoad: 'ondemand',
  	cssEase: 'linear',
    nextArrow: '<div class="right-arrow"></div>',
    prevArrow: '<div class="left-arrow"></div>',
	});
}

function init_slick_ovrvw_tms() {
	 $(".slider-overview-thumbs").slick({
			 infinite: false,
			 responsive: [{
					 breakpoint: 1024,
					 settings: {
							 slidesToShow: 6,
							 infinite: true
					 }
			 },{
					 breakpoint: 900,
					 settings: {
							 slidesToShow: 5,
							 slidesToScroll: 4,
							 infinite: true
					 }
			 },{
					 breakpoint: 600,
					 settings: {
							 slidesToShow: 4,
  						 slidesToScroll: 2,
							 infinite: true
					 }
			 },{
					 breakpoint: 450,
					 settings: {
							 slidesToShow: 3,
  						 slidesToScroll: 1,
							 infinite: true
					 }
			 },{
					 breakpoint: 200,
					 settings: "unslick" // destroys slick
			 }]
	 });
}

function init_slick_indv_lg() {
	$('.slider-indv-lg').slick({
  	infinite: true,
  	speed: 200,
  	fade: true,
  	cssEase: 'linear',
    nextArrow: '<div class="right-arrow"></div>',
    prevArrow: '<div class="left-arrow"></div>',
	});
}

function init_slick_indv_tms() {
	 $(".slider-indv-thumbs").slick({
			 infinite: false,
			 responsive: [{
					 breakpoint: 1024,
					 settings: {
							 slidesToShow: 6,
							 infinite: true
					 }
				},{
					 breakpoint: 900,
					 settings: {
							 slidesToShow: 5,
  						 slidesToScroll: 5,
							 infinite: true
					 }					 
				},{
					 breakpoint: 600,
					 settings: {
							 slidesToShow: 4,
  						 slidesToScroll: 2,
							 infinite: true
					 }
				},{
					 breakpoint: 100,
					 settings: "unslick" // destroys slick
			 }]
	 });
}



function project_indv_slick(dom_parent){
	$(dom_parent)
		.on('click', 'div.slick-slide', scroll_to_indv_lg)
}

function scroll_to_indv_lg(event) {
	var imgUrl = event.target.attributes.src.value;
	var slickIndex = event.currentTarget.dataset.slickIndex;
	
	var toFadeIn;
	var toFadeOut;

	var move = $('.slider-indv-lg .slick-slide').width()*parseInt(slickIndex)*-1;
	
	$('.slider-indv-lg .slick-slide').each(function(index, val) {
	  _ = $(this);
	  var pLeft = parseInt(_.css('left'));
	  var left = move - pLeft;
	  //_.css('left',left+'px');
	  _.attr('aria-hidden','true');
	  _.css('transition','opacity 200ms linear');
	  if (_.hasClass("slick-current")) {
	  	toFadeOut = _;
	    _.attr('aria-hidden','true');
	    _.attr('tabindex','-1');
	    _.css('z-index','998');
	    _.removeClass('slick-current');
	    _.removeClass('slick-active');
	  }
	  if (slickIndex == _.attr('data-slick-index')) {
	    toFadeIn = _;
	    _.attr('aria-hidden','false');
	    _.attr('tabindex','0');
	    _.css('z-index','999');
	    _.addClass('slick-current');
	    _.addClass('slick-active');
	  }
	 });
	 toFadeOut.css('opacity','0');
	 toFadeIn.css('opacity','1');
}

/*!
 * Run a callback function after scrolling has stopped
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} callback The function to run after scrolling
 */
var scrollStop = function (callback) {
	if (!callback || typeof callback !== 'function') return;
	var isScrolling;

	window.addEventListener('scroll', function (event) {
		window.clearTimeout(isScrolling);
		isScrolling = setTimeout(function() {
			callback();
		}, 66);
	}, false);
};

function highlight_awards() {

	if (~top.location.pathname.indexOf("/community/test")) {

	var viewOffset = ($( window ).height())/2.75;
	var yearOffset = 448;
	var highlightRange = 40;
  var $sections = $('.col-md-12.community ul > li');
  
  $(window).scroll(function(){
    
    // currentScroll is the number of pixels the window has been scrolled
    var currentScroll = $(this).scrollTop() + viewOffset;
    console.log("position from top: " + currentScroll);
    
    if (currentScroll >= 2590) {
     	console.log("stop!: ");
    	return false;
    }
    
    $('.timeline-year').removeClass("year-range month-year frequent");
    //$('.timeline-year').css("opacity",".05");
    
    var $currentSection
    
    $sections.each(function(){     
      var divPosition = $(this).offset().top;
      if( currentScroll > 400){
      	$(this).removeClass("highlight-award");
      }
      
      if( divPosition < currentScroll && divPosition >= (currentScroll-highlightRange)){
        $currentSection = $(this);
        console.log("make it bold " + $(this).text());
        $(this).addClass("highlight-award");
        var moveYear = divPosition - yearOffset;
        $('.timeline-year').css("top", moveYear + "px");
        $('.timeline-year').text($(this).attr("award-year"));
        var addClass = $(this).attr("add-class");
				if (typeof addClass !== typeof undefined && addClass !== false) {
					$('.timeline-year').addClass(addClass);
				}
      } 
      
    });
    if (currentScroll < 440) {
      var topAward = $('.col-md-12.community ul > li').first();
      var move = topAward.offset().top - yearOffset;
      $('.timeline-year').css("top", move + "px");
      $('.timeline-year').text(topAward.attr("award-year"));
      $sections.each(function(){
      	$(this).removeClass("highlight-award");
      });
      topAward.addClass("highlight-award");
    }
  });
  }
}

scrollStop(function () {
    //console.log('Scrolling has stopped.');
    //$('.timeline-year').animate({opacity: 1}, 300);
});