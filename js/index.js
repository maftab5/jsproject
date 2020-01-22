$(document).ready(function () {

//    $(document).ready(function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var xmlDoc = xhr.responseXML;
                var team = xmlDoc.getElementsByTagName("teammember");
                var html = "";
                for (i = 0; i < team.length; i++) {
                    var image = xmlDoc.getElementsByTagName("image")[i]
                        .childNodes[0].nodeValue ;
                    html +=
                         "<div class='col-lg-12'><div class='col-lg-6 grid'><figure class=''><img src='"+image+ "'alt='banner2'></figure></div><div class='col-lg-6 grid'><h1>" +
                        xmlDoc.getElementsByTagName("name")[i]
                        .childNodes[0].nodeValue + "</h1><br><strong>Title : </strong>" +
                        xmlDoc.getElementsByTagName("title")[i]
                        .childNodes[0].nodeValue + "<br><strong>Description : </strong>" +
                       
                        xmlDoc.getElementsByTagName("des")[i]
                        .childNodes[0].nodeValue +  "<br><strong>Area : </strong>" +
                       
                        xmlDoc.getElementsByTagName("area")[i]
                        .childNodes[0].nodeValue +  "<br><strong>Price : </strong>" +
                       
                        xmlDoc.getElementsByTagName("price")[i]
                        .childNodes[0].nodeValue +"</div></div>";
                }
                html +=""
                document.getElementById("property").innerHTML = html;
            }
        };
        xhr.open("GET", "property.xml", true);
        xhr.send();
//    });




    var interiors = ["images/interiors/banner1.jpg", "images/interiors/banner2.jpg", "images/interiors/banner3.jpg", "images/interiors/banner4.jpg", "images/interiors/banner5.jpg", "images/interiors/banner6.jpg"];





    //function to display clicked image on modal
    $('.effect-ruby').on('click', function (e) {

        e.preventDefault();
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');
        $(".modal-overlay").remove();
    });


    var isValid = true;


    //iife function for the subscription form modal
    (function () {
        setTimeout(function () { //timeout to delay the modal pop up

            if (localStorage.getItem('popState') != 'shown') { //local storage to check if the modal is displayed already

                $('#subsmodal').modal();
                $(".modal-overlay").remove();
                $('#subsmodal').on('shown.bs.modal', function (e) {

                    $(".modal-overlay").remove(); //function to stay at the same place when image is displayed on click
                    $('#username').focus(); //input focus
                })
                localStorage.setItem('popState', 'shown');
            }
        }, 2000);
    })()



    // click funtion for subcription button
    $("#subs").on("click", function (e) {
        e.preventDefault();
        $("#name_error").html("");
        $("#email_error").html("");
        var name = $("#username").val();
        var email = $("#useremail").val();
        var isValid = true;


        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (name == "") {
            $("#name_error").html('<p style="color:red">Please fill the name field</p>');
            isValid = false;
        }
        if (email == "" || !pattern.test(email)) {
            $("#email_error").html("");
            $("#email_error").html('<p style="color:red">Please provide a valid email.</p>');
            isValid = false;
        }

        if (isValid == true) {


            $("#username").val("");
            $("#useremail").val("");

            $('#subsmodal').modal('hide');
            $("#thank").modal();
            setTimeout(function () {
                $('#thank').modal("hide");
            }, 3000);
        }
    })


});
