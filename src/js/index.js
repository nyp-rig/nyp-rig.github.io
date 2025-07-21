// Import all plugins
import * as _ from 'bootstrap';
import $ from 'jquery';
import initCarousel from './carousel';


function pageStartupCompleted(){
  // Setup IntersectionObserver
  const onIntersect = (objects, observer)=>{
    for (let i = 0; i < objects.length; i++){
      if (objects[i].isIntersecting){
        objects[i].target.classList.add("is-in-view");
      }else{
        objects[i].target.classList.remove("is-in-view");
      }
    }
  };
  const observer = new IntersectionObserver(onIntersect, {threshold: 0.5});
  const observer2 = new IntersectionObserver(onIntersect, {threshold: 0.2});

  $('.section:not(.special)').each((_, elm)=>{
    observer.observe(elm)
  });
  $('.section.special').each((_, elm)=>{
    observer2.observe(elm)
  });
}


$(() => {
  //Handle Intro Animations
  if (document.getElementById('introScreen')){
    setTimeout(()=> {
      $('html').addClass('is-ready');
      setTimeout(()=>{
        $('html').addClass('is-fully-ready');
        pageStartupCompleted();
        setTimeout(()=>{// Remove element for firefox support.
          $('#introScreen').remove()
        }, 1000)
      }, 2000)
    }, 500)
  }
  else{
    $('html').addClass('is-ready');
    $('html').addClass('is-fully-ready');
    pageStartupCompleted();
  }

  // Register Loading Signs After Click
  $('.has-loading-aft-click').on('click', (event)=>{
    const elm = $(event.currentTarget);
    if (elm.attr('type') == 'submit' && !elm.parent()[0].checkValidity()){
      return;
    }
    elm.html(`<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`)
  });

  if (document.getElementById('main-carousel-contain')){
    initCarousel();
  }
});