
$(document).ready(function() {//enabling js after page loads
  //loading sequence... slight delay for font
  //$(".loader").delay(1000).css('visibility','visible');
  //loading animation for each image tagged as invisible
  var y = document.getElementsByClassName("invisible");
  //alert(y.length+' number of images in this project');
  for (var i=0; i<y.length; i++) {
    if (y[i].complete){//check if it's already in cache
      $(y[i]).css('visibility','visible');
      $(y[i]).siblings(".loader").css("display", "none");
      $(y[i]).parent("figure").css("background-color", "white");
    }
    else {
      $(y[i]).on('load', function(){
        $(y[i]).css('visibility','visible');
        $(y[i]).siblings(".loader").css("display", "none");
        $(y[i]).parent("figure").css("background-color", "white");
      });
    }
  }
  //load all invisible content after timeout anyway
  setTimeout(function(){
    $(".invisible").css('visibility','visible');
    $(".loader").css("display", "none");
    $(".invisible").parent("figure").css("background-color", "white");
  }, 5000);
  //activate toggles
  imdropdown_toggle();
  caption_toggle();
});//end of document-ready code


  //FUNCTIONS...

  //function for opening & closing project image groups
  function imdropdown_toggle() {
    $('.project-body').on('mousedown', '.link-1', function(event) {
        $('.hidden-1').css('display','block');
        $('.hidden-2').css('display','none');
        event.preventDefault();
      });
    $('.project-body').on('mousedown', '.link-2', function(event) {
        $('.hidden-1').css('display','none');
        $('.hidden-2').css('display','block');
        event.preventDefault();
      });
      //back to top...
    $('.project-body').on('click', '.link-close', function(event) {
        $('.hidden-1').css('display','none');
        $('.hidden-2').css('display','none');
        event.preventDefault();
      });
  }//image toggle function end

  //function for opening & closing captions
  function caption_toggle() {
    $('figcaption').on('mousedown', 'a', function(event) {
        $('.hidden-text').css('display','none');
        $(this).parent().find(".hidden-text").css('display','block');
        event.preventDefault();
      });
  }//caption toggle function end
