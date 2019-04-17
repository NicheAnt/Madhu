var project_view=false;//page loads with grid-view
var dropped_down=false;//page loads without dropdown active
var home_chosen = false;//content covered till chosen
var dynamic_content = getParameterByName('dc');//decide exact content of home-page

//loading sequence for home-page: after everything loads
window.onload = function() {
  $(".colh1 img").css('visibility','visible');
  $(".colh3 img").css('visibility','visible');
  $(".landing-1").css('display','block');
  $(".landing-2").css('display','block');
};

//enabling js after page loads
$(document).ready(function() {
  //check scrollbar width and if non-zero(old firefox) adjust col3
  if(window.innerWidth-$(window).width()>0){ adjustWidth(); }
  //activate dropdown button
  dropdown_toggle();
//page loading sequence 1: right after dom loads
  $(".image-grid").css('display','block');
  $(".project-background").fadeIn(1000);
  $("footer").fadeIn(1000);
  //home-page; show green images
  setTimeout(function(){
    $(".green").css('visibility','visible');
  }, 500);

//loading sequence 2: as each image loads
  var imgDefer = document.getElementsByClassName('visible');
  for (var i=0; i<imgDefer.length; i++) {
    //check if it's already in cache
    var x = imgDefer[i].getElementsByTagName('img')[0];
    if (x.complete){
      //fade in grandparent
      $(x).parent().parent().fadeIn(500);
      //fade in hidden text behind
      $(x).parent().parent().parent().find('a').fadeIn(5000);
    }
    else {//do same on load
      $(this).find('img').on('load', function(){
        $(this).parent().parent().fadeIn(500);
        $(this).parent().parent().parent().find('a').fadeIn(5000);
      });
    }
  }

  //hover-click (mobiles), prevent it from scrolling to the top
  $('.image-grid').on('click', '.visible', function(event) {
    if (project_view==false && dropped_down==false){
        event.preventDefault();
    }
  });

//mobile home-page
  $('.mvisible').on('click', '.green', function(event) {
    home_chosen = true;
    event.preventDefault();
    window.history.pushState('','','index.html?dc='+$(this).parent().attr('class').split(" ")[0]);//update url
    //turn all topics green
    $('.yellow').css('display','none');
    $('.green').css('display','block');
    //turn only this topic yellow
    $(this).css('display','none');
    $(this).siblings().css('display','block');
    //display only content of this topic
    $('.mhidden').css('display','none');
    $(this).parent().parent().find('.mhidden').css('display','block');
    //scrolls to the top of this topic over 2 seconds
    $('html, body').animate({scrollTop: $(this).offset().top}, 2000);
  });
  $('.mvisible').on('click', '.yellow', function(event) {
    home_chosen = false;
    event.preventDefault();
    window.history.pushState('','','index.html');//update url
    //reverse everything
    $(this).css('display','none');
    $(this).siblings().css('display','block');
    $('.mhidden').css('display','none');
  });

//pc home-page
  //toggle tint on hover
  $(".colh2 .green").hover(function(){
    $(this).css('filter','contrast(100%)');
    }, function(){
    $(this).css('filter','contrast(50%)');
  });
  //toggle content on click
  $('.colh2').on('click', '.green', function(event) {
    home_chosen = true;
    event.preventDefault();
    var chosen = $(this).parent().attr('class').split(" ")[0];
    //slide out big images (not left one if it's contact)
    if(chosen!="hcontact"){
      $('.colh1').find('img').animate({right: '100%'});
    }
    else {
      $('.colh1').find('img').animate({right: '0'});
    }
    $('.colh3').find('img').animate({left: '100%'});
    //turn all topics green
    $('.yellow').css('display','none');
    $('.green').css('display','block');
    $('.green').css('filter','contrast(50%)');
    //turn only this topic yellow
    $(this).css('display','none');
    $(this).siblings().css('display','block');
    //fill middle coloumn with extra images based on chosen
    if(chosen=="work-ex"){
      $('.extra').css('display','block');
      $('.xextra').css('display','block');
      window.history.pushState('','','index.html?dc=work-ex');//update url
    }
    else if(chosen=="about") {
      $('.extra').css('display','block');
      $('.xextra').css('display','none');
      window.history.pushState('','','index.html?dc=about');//update url
    }
    else {
      $('.extra').css('display','none');
      $('.xextra').css('display','none');
      window.history.pushState('','','index.html?dc=hcontact');//update url
    }
    //fadeout all, fadein chosen content
    $('.colh1').find('div').fadeOut(500);
    $('.colh3').find('div').fadeOut(500);
    $('.colh1').find('.'+chosen).fadeIn(1000);
    $('.colh3').find('.'+chosen).fadeIn(1000);
  });
  $('.colh2').on('click', '.yellow', function(event) {
    home_chosen = false;
    event.preventDefault();
    window.history.pushState('','','index.html');//update url
    var chosen = $(this).parent().attr('class').split(" ")[0];
    //slide in big images
    $('.colh1').find('img').animate({right: '0'});
    $('.colh3').find('img').animate({left: '0'});
    //slide down all, slide up chosen small images
    $('.yellow').css('display','none');
    $('.green').css('display','block');
    //fadeout all, fadein chosen content
    $('.colh1').find('div').fadeOut(500);
    $('.colh3').find('div').fadeOut(500);
    //remove extra middle coloumn images
    $('.extra').css('display','none');
    $('.xextra').css('display','none');
  });
  //home-page hover
  $(".hvisible").hover(function(){
    if(home_chosen){
      $(this).css('filter','none');
    }
    }, function(){
    if(home_chosen){
      $(this).css('filter','contrast(50%)');
    }
  });

//opening project pages, only if hidden panels are clicked
  $('.image-grid').on('mousedown', '.hidden', function(event) {
    if (project_view==false && dropped_down==false){
        event.preventDefault();
        window.history.pushState('','','?dc='+$(this).parent().attr('class'));//update url
        openprojectpage($(this));
    }//if conditional
  });
  //opening project pages, only if visible edu panels are clicked
  $('.education').on('mousedown', '.visible', function(event) {
    if (project_view==false && dropped_down==false){
        event.preventDefault();
        window.history.pushState('','','?dc='+$(this).parent().attr('class'));//update url
        openprojectpage($(this));
    }//if conditional
  });//opening project pages

  //dynamic content - project pages, and home page sliders
  setTimeout(function(){
    if (dynamic_content != null) {
      var page_title = window.location.href;
      if(page_title.indexOf("index") >= 0) {//home page
        if($(".pc-header").css('display')=='none')
          {$('.m-home').find("."+dynamic_content).find('.green').trigger("click");}
        else
          {$('.pc-home').find("."+dynamic_content).find('.green').trigger("click");}
      }
      else if(page_title.indexOf("Education") >= 0) {
        openprojectpage($('.'+dynamic_content+' .visible'));
      }
      else {
        openprojectpage($('.'+dynamic_content+' .hidden'));
      }
    }
  }, 500);//adjust time-out?

  //click outside text in projects should refocus scroll. how?

//exiting project pages
  //1.escape key is pressed
  $(document).keydown(function(event) {
    if (project_view==true){
      if(event.which==27){
        $('.project-page').html('');
        $('.project-background').css('z-index','0');
        $('.image-grid').css('filter','none');
        $('.image-grid').css('position','relative');
        $('.image-grid').css('left','0');
        $('.image-grid').css('pointer-events','auto');
        $(document).scrollTop(0);
        project_view=false;
        //update url
        window.history.pushState('','',window.location.href.substring(0, window.location.href.indexOf("?")));
      }
    }
  });
  //2.if click is outside project
  $(document).click(function(event) {
    if (project_view==true && dropped_down==false){
      if(!$(event.target).closest('.project-page').length &&
      !$(event.target).closest('.dropdown-button').length &&
      !$(event.target).closest('.hidden').length &&
      !$(event.target).closest('.previous-project').length &&
      !$(event.target).closest('.next-project').length) {
        $('.project-page').html('');
        $('.project-background').css('z-index','0');
        $('.image-grid').css('filter','none');
        $('.image-grid').css('position','relative');
        $('.image-grid').css('left','0');
        $('.image-grid').css('pointer-events','auto');
        $(document).scrollTop(0);
        project_view=false;
        //update url
        window.history.pushState('','',window.location.href.substring(0, window.location.href.indexOf("?")));
      }
    }//if click is outside dropdown
    else if (dropped_down==true){
      if(!$(event.target).closest('.dropdown').length){
        $('.dropdown-content').css('display','none');
        dropped_down=false;
      }//if click is on a link?
    }
  });
});//end of document-ready code

//FUNCTIONS...

  //function for opening & closing drop-down
  function dropdown_toggle() {
    $('.mobile-header').on('click', '.dropdown-button', function() {
      if (dropped_down==false){
        $('.dropdown-content').css('display','block');
        dropped_down=true;
      }
      else {//close dropdown if it's already open
          $('.dropdown-content').css('display','none');
          dropped_down=false;
      }
    });
  }//toggle function end

  //function for opening project-pages
  function openprojectpage(thisObj) {
    var project_name = thisObj.parent().attr('class');
    $('.project-background').css('z-index','2');
    $('.image-grid').css('filter','contrast(25%)');
    $('.image-grid').css('position','fixed');
    $('.image-grid').css('left','0vw');
    $('.image-grid').css('pointer-events','none');

    //loading external html
    $.ajax({ url: 'projects/'+project_name+'.html',
            success: function(result) {
              $('.project-page').html(result);
              project_view=true;
            },
            error: function(request, errorType, errorMessage){
              alert('Error: '+errorType+', with message:'+errorMessage);
              $('.project-background').css('z-index','0');
              $('.image-grid').css('filter','none');
              $('.image-grid').css('position','relative');
              $('.image-grid').css('pointer-events','auto');
            }
    });//ajax
  }

  //function for parsing url for parameters (taken from http://jennamolby.com/how-to-display-dynamic-content-on-a-page-using-url-parameters/)
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  //function for adjusting width
  function adjustWidth() {
    var swidth=(window.innerWidth-$(window).width());
    var cwidth1 = 33.5*window.innerWidth/100;//illustration page
    var cwidth2 = 33*window.innerWidth/100;//other 3 pages
    //alert('col width is: '+cwidth);
    cwidth1 = cwidth1 - swidth;
    cwidth2 = cwidth2 - swidth;
    $(".col3").css('width', cwidth1.toString()+'px');
    $(".colp3").css('width', cwidth2.toString()+'px');
    $(".cole3").css('width', cwidth2.toString()+'px');
    $(".colc3").css('width', cwidth2.toString()+'px');
    //watch out for window resizes and recalculate everytime
    $(window).resize(function(){
        var swidth=(window.innerWidth-$(window).width());
        var cwidth1 = 33.5*window.innerWidth/100;
        var cwidth2 = 33*window.innerWidth/100;
        cwidth1 = cwidth1 - swidth;
        cwidth2 = cwidth2 - swidth;
        $(".col3").css('width', cwidth1.toString()+'px');
        $(".colp3").css('width', cwidth2.toString()+'px');
        $(".cole3").css('width', cwidth2.toString()+'px');
        $(".colc3").css('width', cwidth2.toString()+'px');
    });
  }
