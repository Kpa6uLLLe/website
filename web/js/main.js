//slider begin
$(function() {
	
    $('.slider-button').draggable({
        axis: "x",
        containment: "parent",
        drag: function(){
        	let currentSliderLeft = window.getComputedStyle(document.querySelector('#slider-button')).left.replace("px","") - 0;
        	let newMargin = (currentSliderLeft/sliderCaseFreeSpace*-1)*(marginLength)
        	arrowChanger(newMargin,0);
        }
    });
    
});
let slides = document.querySelectorAll('.slide');
let slidesToShow = 3;
let slideTotalMargin = window.getComputedStyle(document.querySelector('.slide')).marginRight.replace("px","") - 0;
slideTotalMargin += ( window.getComputedStyle(document.querySelector('.slide')).marginLeft.replace("px","") -1 +1);
let slideWidth = document.querySelector('.slide').offsetWidth + slideTotalMargin;
let sliderBtn = document.getElementById('slider-button');
let sliderCaseWidth = document.querySelector('.slider-case').offsetWidth;
sliderBtn.style.width = ""+(slidesToShow/slides.length)*sliderCaseWidth+"px";
if(sliderBtn.style.width == ""+sliderCaseWidth+"px")
{
	sliderBtn.style.backgroundColor = "#D9D9D9";
}
let sliderCaseFreeSpace =  sliderCaseWidth - sliderBtn.style.width.replace('px','');
let holderStyles = window.getComputedStyle(document.querySelector('.holder'));
let minMargin = slideWidth*(slides.length-slidesToShow)*((slides.length-slidesToShow)>0)*(-1);
let maxMargin = 0;
let marginLength = maxMargin-minMargin;
if(slides.length<=slidesToShow)
{
	document.querySelector('.right-arrow').classList.replace("right-arrow","deactivated-right");
}
function arrowChanger(newML,delay){

	let newMargin = newML;
	if(document.querySelector('.deactivated-left') != null)
	{
		document.querySelector('.deactivated-left').classList.replace("deactivated-left","left-arrow");
	}
	if(document.querySelector('.deactivated-right') != null)
	{
		document.querySelector('.deactivated-right').classList.replace("deactivated-right","right-arrow");
	}
	if(newMargin<=minMargin)
	{
		newMargin = minMargin;
		document.querySelector('.right-arrow').classList.replace("right-arrow","deactivated-right");
	}
	if(newMargin>=maxMargin)
	{
		newMargin = maxMargin;
		document.querySelector('.left-arrow').classList.replace("left-arrow","deactivated-left");
	}
	$("#holder").animate({
		marginLeft: newMargin
	},delay,function() {
    // Animation complete.
  });
	let sliderLeft = sliderCaseFreeSpace*(Math.abs(newMargin)/Math.abs((maxMargin-minMargin)));
	$("#slider-button").animate({
		"left": sliderLeft
	},delay,function() {
    // Animation complete.
  });
}
function sliderscroll(marginRatio){
	//
	let baseHolderMargin = holderStyles.marginLeft.replace('px','') - 0;
	let newMargin = baseHolderMargin + slideWidth * marginRatio;
	arrowChanger(newMargin,300);
	
	
	
	
}
//slider end