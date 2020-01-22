"use strict";
$(document).ready(function(){

     /*-------------------form validation and submission--------------*/
    
    $("#submit").click(function(event){
        
        var isValid=true; //locally scoped variable
        
        var location = $("#location").val().trim();
        
        if(location==""){
            isValid=false;
            alert("Location is required.");
            $("#location").focus();
        }

        if (isValid == false) { event.preventDefault();}
        
    });
    
    /*-------------------IIFE- Function Use of XMLHTTPREQUEST Request --------------*/
	
    (function() {
		
				var event="";  // Global Variable.
 
    $.ajax({
        
                type: "get",
                url: "property.json",

                beforeSend: function(){$("#searchleft").html("Loading...");},
                timeout: 10000,
                error: function(xhr, status, error){
                    alert("Error: "+xhr.status+"-"+error);
                },
                
                dataType: "JSON",
                success: function(data){

                    $.each(data.property, function(key, value){
                        
                         event+='<div class="searchitem"><div class="col-lg-3 col-md-3 col-xs-3 itemimage"><img src="'+value.property_image+'" alt="image" width="120" height="120" class="img-responsive">								<span>Post Date: '+value.post_date+'</span></div><div  class="col-lg-9 col-md-9  col-xs-9 itemdetails"><h2>'+value.property_name+'</h2>							<ul>								<li>Floor <span>'+value.floor+'</span></li>								<li>Furnishing <span>'+value.furnishing+'</span></li>								<li>Tenants Preferred <span>'+value.tenants+'</span></li>								<li>Bathroom <span>'+value.Bathroom+'</span></li>							</ul>						<p>'+value.property_description+'</p>							<a href="#" class="map">Contact Agent</a> <a href="#" class="map">Share Feedback</a> <a href="#" class="map"  onclick="javascript:map();">View Map</a>						</div>					</div>';
                        
                    });
					
                    $("#searchleft").html(event+'<script>function map(){  $("#dialog-form").dialog({width: 600,height:500});$("#dialog").dialog(function(){display:block}); }</script>');
                    
                }
    });
        
        
	})();

    
        /*-------------------IIFE- Function Use of XMLHTTPREQUEST Request End --------------*/
  
  
    
    //------------Get mouse x and y position on page--------//
    
    $("#dialog").mousemove(function(event) {
        
       $("#mouseposition").html("X Position: "+event.pageX+"<br/> Y Position: "+event.pageY);
        
    });

    function initMap() {
          // The location of Uluru
          var uluru = {lat: 43.3907, lng:-80.408};
          // The map, centered at Uluru
          var map = new google.maps.Map(
              document.getElementById('dialog'), {zoom: 4, center: uluru});
          // The marker, positioned at Uluru
          var marker = new google.maps.Marker({position: uluru, map: map});
    }
    
    
    
    initMap();
    //map();
    
    
});




