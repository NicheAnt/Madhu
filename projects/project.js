$(document).ready(function() {//enabling js after page loads

//lazy-loading for each image tagged as lazy
  // Get all of the images that are marked up to lazy load (vanilla JS)
  const images = document.querySelectorAll('.lazy');
  const config = {
    rootMargin: '50px 0px',// If the image gets within 50px in the Y axis, start the download.
    threshold: 0.01
  };
  // The observer for the images on the page
  let observer = new IntersectionObserver(onIntersection, config);
  //if browser doesn't support, load all lazy content after a 5s timeout
  if (!('IntersectionObserver' in window))
  {
    var imgs = document.getElementsByClassName('lazy');
    $(".loader").fadeOut(6000);
    setTimeout(function(){
      for (var i=0; i<imgs.length; i++) {
        $(imgs[i]).attr('src', $(imgs[i]).attr('data-src'));
        $(imgs[i]).css('opacity','1');
      }
    }, 5000);
  }
  //initiate observer for each image
  images.forEach(image => {
    observer.observe(image);
  });

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
        $('html, body').animate({
          scrollTop: ($('.link-1').offset().top)
        },500);
      });
    $('.project-body').on('mousedown', '.link-2', function(event) {
        $('.hidden-1').css('display','none');
        $('.hidden-2').css('display','block');
        event.preventDefault();
        $('html, body').animate({
          scrollTop: ($('.link-2').offset().top)
        },500);
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

  //for (lazy) loading image that has come into viewport
  function onIntersection(entries) {
    // Loop through the entries
    entries.forEach(entry => {
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        $(entry.target).attr('src', $(entry.target).attr('data-src'));
        //On load, ease-in the image, fade-out the loading animation
        if (entry.target.complete){//already cached
          $(entry.target).siblings(".loader").fadeOut(500);
          $(entry.target).css('opacity','1');
        }
        else {
          $(entry.target).on('load', function(){//fresh load
            $(entry.target).siblings(".loader").fadeOut(500);
            $(entry.target).css('opacity','1');
          });
        }
        //Stop watching this image
        observer.unobserve(entry.target);
      }
    });
  }
