"use strict";
$(document).ready(function(){

     /*-------------------form validation and submission--------------*/
    
    $("#formsearch").submit(function(event){
        
        var isValid=true;
        
        var searchlocation = $("#searchlocation").val().trim();
        var searchtype = $("#searchtype").val().trim();
		var searchbudget = $("#searchbudget").val().trim();
		
        if(searchlocation==""){
            isValid=false;
            $("#renterror").html("Enter location is required.");
            $("#searchlocation").focus();
        }else if(searchtype==""){
            isValid=false;
            $("#renterror").html("Property Type is required.");
            $("#searchtype").focus();
        }else if(searchbudget==""||isNaN(searchbudget)){
            isValid=false;
            $("#renterror").html("Budget is required and should be numeric");
            $("#searchbudget").focus();
        }

        if (isValid == false) { event.preventDefault();}
        
    });
    
    /*-------------------tabs functionality for tables --------------*/
    
     $("#tabs").tabs({
                collapsible: false,
                heightStyle: "auto"
     });
    
    /*-------------------BXSlider for floatitem above banner --------------*/
    
    $('#slider').bxSlider({
              auto: false,
              autoControls: false,
              captions: false,
              minSlides: 4,
              maxSlides: 4,
              slideWidth: 320,
              slideMargin: 10,
              autoDelay:0,
              responsive:true,
              pager: false
              
   });
    
    (function(){
        
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
            var xmlDoc = xhr.responseXML;
            var team = xmlDoc.getElementsByTagName("event");
                
            var html = "";
            for (var i = 0; i < team.length; i++) {
                html += '<div class="col-lg-4 col-md-4  col-sm-4" ><div class="trow"><span>'+xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue+'</span><h2>'+xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue+'</h2><span class="date">'+xmlDoc.getElementsByTagName("date")[i].childNodes[0].nodeValue+'</span></div><div class="brow"><span>Expert</span><h4>'+xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue+'</h4><span class="post">'+xmlDoc.getElementsByTagName("designation")[i].childNodes[0].nodeValue+'</span><input type="button" name="button" value="Know More" id="button1">                            </div></div>';

            }
                
            document.getElementById("event").innerHTML = html;
                
            }
            
        };
        document.getElementById("event").innerHTML = "Loading.............";
        xhr.open("GET", "rent.xml", true);
        xhr.send();
    })()
    
    
	$("#submit").mouseover(function(){
		$("#submit").css("background-color", "#9d7622");
	});
	
	$("#submit").mouseout(function(){
		$("#submit").css("background-color", "#d0a23e");
	});
	

	
});


