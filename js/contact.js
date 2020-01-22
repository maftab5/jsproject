"use strict";
$(document).ready(function(){

    /*-------------------tabs functionality for tables --------------*/
    $("#questions h4").next().hide();
    
	$("#questions h4").click(function() {
        
        
		$(this).toggleClass("minus");
        console.log($(this).attr("class"));
		if ($(this).attr("class") != "minus") {
            
			$(this).next().hide();
            
		}else {
            
			$(this).next().show();
            
		}
        

        
	}); // end click
    
    /*-------------------contact us form --------------*/

	var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	var phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    
   $("#submit").click(function(event) {
       // $("span").text("");   // clear any previous error messages
       
        var isValid = true;   // initialize isValid flag
        event.preventDefault();
       
        var name = $("#your-name").val();
        var email  = $("#your-email").val();
        var phone = $("#your-phone").val();
        var subject = $("#your-subject").val();
		var message = $("#your-message").val();
		
       if(name=="") {
           
            $("#error-message").html("Please enter your name.");
            isValid = false;
            $("#your-name").focus();
           
        }else if(email=="" || !emailPattern.test(email)){
           
            $("#error-message").html("Please enter your email and must be valid.");
            
            isValid=false;
            $("#your-email").focus();
           
        }else if (phone == "" || !phonePattern.test(phone)) { 
            
		  $("#error-message").html("Please enter a phone number in xxx-xxx-xxxx format");
		  isValid = false;
            $("#your-phone").focus();
            
		} else if(subject == "") {
            
            isValid = false;
            $("#error-message").html("Please enter subject");
             $("#your-subject").focus();
            
        }else if(message == "") {
            
            isValid = false;
            $("#error-message").html("Please enter message");
            $("#your-message").focus();
            
        }else if($("#privacy")[0].checked==false) {
            
            isValid = false;
            $("#error-message").html("Please select checkbox");
            
        }

        if (isValid) { 

			$("#error-message").html("Form Submitted Successfully!");
			
        }
		
		
        
    });
    
//--------------------Use of XMLHTTPREQUEST Request --------------//
    (function() {
        
        
        var about="";  // Global Variable.

        $.ajax({

                    type: "get",
                    url: "about.json",

                    beforeSend: function(){$("#aboutcontainer").html("Loading...");},
                    timeout: 10000,
                    error: function(xhr, status, error){
                        alert("Error: "+xhr.status+"-"+error);
                    },

                    dataType: "JSON",
                    success: function(data){

                        $.each(data, function(key, value){

                             about = value.about;

                        });

                        $("#aboutcontainer").html(about);

                    }
        });

  })();
	
	//-------------Use of XMLHTTPREQUEST end -------------//
	
});


