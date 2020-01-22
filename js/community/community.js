/*Created by Chan Lim*/

"use strict";

$(document).ready(function(){
	
	var image, imageCounter = 0, imageCache = [];  // for Slide Show
    var slideshow = myapp.slideshow; // create the slideshow object for Sugmented Slide


     // Question List - Start ////////////////////////////////
    $("#add_question").click( function() {
        
        if ( $("#due_date").val() === "" ) {
           var newTask = new Task( $("#question").val() );
        } else {
           var newTask = new Task( $("#question").val(),
               $("#due_date").val() );
        }
        
        if ( newTask.isValid() ) {
            tasklist.load().add(newTask).save().display(
                $("#comments") );  
            $("#question").val("");
        } else {
            alert("Please enter a question and a due date for the answer.");
        }
      
        $("#question").focus();
    });
    
    $("#clear_questions").click( function() {
        tasklist.clear();
        $("#comments").html("");
        $("#question").val("");
        $("#due_date").val("");
        $("#question").focus();
    });   
    
    $("#due_date").datepicker({
        changeMonth: true,
        changeYear: true
    });
    
    tasklist.load().display( $("#comments") );
    $("#question").focus();
    // Question List - End ////////////////////////////////      
    
    
    
    // FAQ Application - Start ///////////////////////////////    
    $("#faq h3").click(function() {
        $(this).toggleClass("minus");
        if ($(this).attr("class") != "minus") {
            $(this).next().hide();
        }
        else {
            $(this).next().show();
        }
        //evt.preventDefault();
    }); // end click
    // FAQ Application - End ///////////////////////////////
 
	
	
    // Slide Show - Start ////////////////////////////////
    $("#slides img").each(function() {
        image = new Image();
        image.src = $(this).attr("src");
        image.title = $(this).attr("alt");
        imageCache[imageCounter] = image;
        imageCounter++;
    });
            // start slide show
    imageCounter = 0;
    var nextImage;
    setInterval( function () {
/*        $("#caption").fadeOut(1000);*/
		    $(".slide").fadeOut(1000,
            function() {
                imageCounter = (imageCounter + 1) %
                               imageCache.length;
                nextImage = imageCache[imageCounter];
                $(".slide").attr("src",
                    nextImage.src).fadeIn(1000);
/*                $("#caption").text(
                    nextImage.title).fadeIn(1000);*/
            }
        );
    },
    3000);
    // Slide Show - End////////////////////////////
 
	
    
	
    // introduce the consulting team - Start ///////////////////////////////
	$.getJSON("js/community/team.json", function(data) {
		$.each(data, function() {
			$.each(this, function(key, value) {
				$("#consultant .imgList").append(
					'<div class="imgBox"><img src=' + value.image + '></div'
				);
                $("#consultant .description").append(
					'<div class="detail"><p class="name">' + value.full_name + '<p class="title">' + value.title + '</p>'
				);
			});
		}); 
	});
	
	
	// introduce the consulting team - End ///////////////////////////////
	
	
	
    // Consulting reservation - Start ///////////////////////////////
 	$("#name").focus();
	
	$("#reservation_form").submit(
		function(event) {
			var isValid = true;		
			
			// validate name
			var name = $("#name").val().trim();
			if (name == "") {
				$("#name").next().text("This field is required.");
				isValid = false;
			} else {
				$("#name").next().text("");
			}
			$("#name").val(name);
			
			// validate the email
			var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
			var email = $("#email").val().trim();
			if (email == "") { 
				$("#email").next().text("This field is required.");
				isValid = false;
			} else if ( !emailPattern.test(email) ) {
				$("#email").next().text("Must be a valid email address.");
				isValid = false;
			} else {
				$("#email").next().text("");
			}
			$("#email").val(email);
			
			// validate the phone number
			var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
			var phone = $("#phone").val().trim();
			if (phone == "") { 
				$("#phone").next().text("This field is required.");
				isValid = false; 
			} else if ( !phonePattern.test(phone) ) {
				$("#phone").next().text("Use 999-999-9999 format.");
				isValid = false;
			} else {
				$("#phone").next().text("");
			}
			$("#phone").val(phone);
			
			if (isValid == false) {
				event.preventDefault();
				var sub = document.getElementById(submit);
				sub.innerHTML = "Cancel";
			}
			
		} // end function
	); //end submit   
    
    // Consulting reservation - End ///////////////////////////////
    
    

    // Consulting fee and commission - Start /////////////////////////////
    var calculateCommission = function(customer, housingPrice) {
        switch( customer ) {
            case "reg":
                if (housingPrice < 100000) {
                    return .05;
                } else if (housingPrice >= 100000 && housingPrice < 250000) {
                    return .03;
                } else if (housingPrice >= 250000 && housingPrice < 500000) {
                    return .025;
                } else if (housingPrice >= 500000) {
                    return .01;
                }
                break;
            case "loyal":
                return .01;
                break;
            case "honored":
                return (housingPrice < 500000) ? .0075 : .006;
                break;
            default:
                return 0;
                break;
        }
    };
    
    $( "#calculate" ).click(function() {
        var discountAmount, totalFee, commissionPercent;

        var customerType = $("#type").val();
        var housingPrice = $("#housingPrice").val() || 0;
        housingPrice = parseFloat(housingPrice);

        commissionPercent =
            calculateCommission(customerType, housingPrice);
        totalFee = housingPrice * commissionPercent;

        $("#housingPrice").val( housingPrice.toFixed(2) );
        $("#percent").val( (commissionPercent * 100).toFixed(2) );
        $("#total").val(  totalFee.toFixed(2) );
        // set focus on type drop-down when done
        $("#type").focus();
    });

    $("#type").focus();
    // Consulting fee and commission - End ///////////////////////////////
 
	
    
     // Augmented slide show - Start ///////////////////////////////   
    var slides = [
        {href:"20_Barrel_Yards_Blvd._Waterloo.jpg", title:"20 Barrel Yards Blvd. Waterloo"}, 
        {href:"6_Brybeck_Crescent_Kitchener.jpg", title:"6 Brybeck Crescent Kitchener"},
        {href:"49_Vanier_Dr._Kitchener.jpg", title:"49 Vanier Dr. Kitchener"},
        {href:"67_Valleyview_Rd._Kitchener.jpg", title:"67 Valleyview Rd. Kitchener"},
        {href:"81_York_St._Kitchener.jpg", title:"81 York St. Kitchener"},
        {href:"499_Albert_St._Kitchener.jpg", title:"499 Albert St. Kitchener"},
        {href:"545_Belmont_Ave_West_Kitchener.jpg", title:"545 Belmont Ave West Kitchener"}
    ];
    
    $("#play_pause").click( slideshow.createToggleHandler() );  
    $("#change_speed").click( function() {
        var ms = prompt( "Current speed is " 
            + slideshow.interval + " milliseconds.\n"
            + "Please enter a new speed in milliseconds."
       , 2000 );
        slideshow.changeSpeed(ms).startSlideShow();
    });
    $("#view_slides").click( function() {
        alert( slideshow.displaySlides() );
    });
    
    slideshow.loadImages(slides).startSlideShow( $("#image"), $("#caption") );
    // Augmented slide show - End ///////////////////////////////
 

	
    // Flickr Search - Start ///////////////////////////////
    $('#search-form').submit(function (event) {
        var url = '';
        url += 'http://api.flickr.com/services/feeds/photos_public.gne';
        url += '?jsoncallback=?';
        $.getJSON(url, $(this).serialize(), function (data) {
            
            $('#flickrSearch #images').empty();
                // add images in the tag of #images 
            $.each(data.items, function (i, item) {

                var $image = $('<img />').attr({
                    'src': item.media.m,
                    'width': '450px',
                });
                    
                $('<a></a>').attr({
                    'class': 'flickr-image',
                    'href': item.media.m,
                    'rel': 'colorbox'
                }).html($image).appendTo('#images');
            });
                // plugin Colorbox
            $('a.flickr-image').colorbox();
        });
        //prevent default event                                       
        return false;
    });
    // Flickr Search - End ///////////////////////////////
    
});

//using History object
function changePageBW(){
    window.history.back();
}
    
function changePageFW(){
    window.history.forward();
}

/*Created by Chan Lim*/



