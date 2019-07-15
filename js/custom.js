$(document).ready(function(){
	//project_brief_slick('div.project-focus');
	//project_indv_slick('div.slider-indv-thumbs');
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
