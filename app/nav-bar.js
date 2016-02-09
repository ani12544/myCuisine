/**
 * Created by Ani on 2/5/2016.
 */

$(function () {

    $("#navigation li button").on("click", function(e){
        e.preventDefault();


        var classclick = $(this).hasClass("click");


        if(classclick == true) {
            var distance = $('#mainpage').css('right');

            if(distance == "auto" || distance == "0px") {
                $(this).addClass("open");
                openSidepage();
                $("#aboutright").css("display", "block");
            } else {
                closeSidepage();
                $("#aboutright").css("display", "none");
            }
        }
    }); // end click event handler

    $("#navigation li button").on("hover", function(){
        var classval = $(this).hasClass("hovertrigger");

        if(classval == true) {
            var distance = $('#mainpage').css('left');

            if(distance == "auto" || distance == "0px") {
                $(this).addClass("open");
                openSidepage();
                $("#aboutright").css("display", "block");
            }
        }
    }); // end hover event handler

    $("#closebtn").on("click", function(e){
        e.preventDefault();
        closeSidepage();
        $("#aboutright").css("display", "none");
    }); // end close button event handler

    function openSidepage() {
        $('#mainpage').animate({
            right: '350px'
        }, 400, 'easeOutBack');
    }

    function closeSidepage(){
        $("#navigation li a").removeClass("open");
        $('#mainpage').animate({
            right: '0px'
        }, 400, 'easeOutQuint');
    }


}());
