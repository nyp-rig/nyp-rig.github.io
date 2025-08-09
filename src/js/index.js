// Import Bootstrap, Jquery and our Carousel all libraries
import * as _ from 'bootstrap';
import $ from 'jquery';
import initCarousel from './carousel';



/**
 * Initialises the Interaction Observer when called.
 * @returns None
 */
function setupInteractionObservers(){
  if (window.location.pathname == '/timetable'){// Skip for timetable page
    setTimeout(()=>{// Use setTimeout so that animations will play.
      $('.section:not(.special)').each((_, elm)=>{
        elm.classList.add("is-in-view")
      });
    }, 100);
    return;
  }
  
  // Function to run when elements enter or leave the viewport
  const onIntersect = (objects, _)=>{
    for (let i = 0; i < objects.length; i++){
      if (objects[i].isIntersecting){
        objects[i].target.classList.add("is-in-view");
      }else{
        objects[i].target.classList.remove("is-in-view");
      }
    }
  };

  // Set up Intersection Observers with diffrent thresholds for diffrent elements.
  const observer = new IntersectionObserver(onIntersect, {threshold: 0.5});
  const observer2 = new IntersectionObserver(onIntersect, {threshold: 0.2});

  $('.section:not(.special)').each((_, elm)=>{
    observer.observe(elm)
  });
  $('.section.special').each((_, elm)=>{
    observer2.observe(elm)
  });
}

// JQUERY ON DOCUMENT READY
$(() => {
  // Handle Intro Screen Logo Reveal Animations, skip if no intro screen.
  if (document.getElementById('introScreen')){
    setTimeout(()=> {
      $('html').addClass('is-ready');
      setTimeout(()=>{
        $('html').addClass('is-fully-ready');
        setupInteractionObservers();
        setTimeout(()=>{// Remove element for firefox support.
          $('#introScreen').remove()
        }, 1000)
      }, 2000)
    }, 500)
  }
  else{
    $('html').addClass('is-ready');
    $('html').addClass('is-fully-ready');
    setupInteractionObservers();
  }


  // Register Buttons with `has-loading-aft-click` class to show a loading sign after click
  $('.has-loading-aft-click').on('click', (event)=>{
    const elm = $(event.currentTarget);
    if (elm.attr('type') == 'submit' && !elm.parent()[0].checkValidity()){
      return;
    }
    elm.html(`<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`)
  });


  // Register Carousel if needed.
  if (document.getElementById('main-carousel-contain')){
    initCarousel();
  }
});