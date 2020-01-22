//mouseenter event to display the title
$(".effect-ruby").mouseenter(function(){
    var test ="Click image to see full image";
    $(this).attr("title",test).css("color","red");
})

//functions for slider
var slideIndex = 1;
var n = -1;

showSlides(slideIndex);

//function for next slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

//function for slideshow
function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//interval for image display every 5 secs
setInterval("plusSlides(n)", 5000);
