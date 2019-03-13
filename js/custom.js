jQuery(document).ready(function(){
	//project_brief_slick('div.project-focus');
});

$(window).on("load", function() {
	init_fade_slick();
	init_overview_slick();
	init_indv_slick();
});


/*
* Slick Slide Project Outline Scroller
*
* http://kenwheeler.github.io/slick/
*/

function init_fade_slick() {
	$('.slider-fade').slick({
  	infinite: true,
  	speed: 200,
  	fade: true,
  	lazyLoad: 'ondemand',
  	cssEase: 'linear',
    nextArrow: '<button class="right-arrow"></button>',
    prevArrow: '<button class="left-arrow"></button>',
	});
}

function init_overview_slick() {
	 $(".slider-project-overview").slick({
			 infinite: false,
			 responsive: [{
					 breakpoint: 1024,
					 settings: {
							 slidesToShow: 3,
							 infinite: true
					 }
			 },{
					 breakpoint: 600,
					 settings: {
							 slidesToShow: 2,
							 dots: true
					 }
			 },{
					 breakpoint: 300,
					 settings: "unslick" // destroys slick
			 }]
	 });
}

function init_indv_slick() {
	 $(".sliderProject").slick({
			 infinite: false,
			 responsive: [{
					 breakpoint: 1024,
					 settings: {
							 slidesToShow: 3,
							 infinite: true
					 }
				},{
					 breakpoint: 600,
					 settings: {
							 slidesToShow: 2,
							 dots: true
					 }
				},{
					 breakpoint: 300,
					 settings: "unslick" // destroys slick
			 }]
	 });
}



function project_brief_slick(dom_parent){
	jQuery(dom_parent)
		.on('click', '#left-arrow', project_glance_scroll_left)
		.on('click', '#right-arrow', project_glance_scroll_right)
}

function project_glance_scroll_left(){
	var slide = $('div.slick-current');
	var index = parseInt(slide.attr("data-slick-index"));
	if (index > 0) { index -= 1;
	} else if (index==0) { index = $(".slick-track").children().length-1; }
	project_glace_scroll(slide, index);
}

function project_glance_scroll_right(){
	var slide = $('div.slick-current');
	var index = parseInt(slide.attr("data-slick-index"));
	var count = $(".slick-track").children().length-1;
	if (index < count) { index += 1;
	} else if (index == count) { index = 0; }
	project_glace_scroll(slide, index);
}

function project_glace_scroll(slide, index) {
  slide.removeClass("slick-current");
	var nextSlide = $("div[data-slick-index='"+index+"']").addClass("slick-current"); 
	$("img#project-focus-img").attr("src", nextSlide.find("a").attr("main"));
	$("h5.project-detail").text(nextSlide.find("a").attr("title"));
}