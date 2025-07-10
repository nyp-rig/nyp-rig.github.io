// Import all plugins
import * as bootstrap from 'bootstrap';
import $, { event } from 'jquery';
$(() => {
  if (document.getElementById('introScreen')){
    $('html').addClass('is-ready');
    setTimeout(()=>{
      $('html').addClass('is-fully-ready');
      setTimeout(()=>{// Remove element for firefox support.
        $('#introScreen').remove()
      }, 1000)
    }, 2000)
  }
  else{
    $('html').addClass('is-ready');
    $('html').addClass('is-fully-ready');
  }
  $('.has-loading-aft-click').on('click', (event)=>{
    const elm = $(event.currentTarget);
    if (elm.attr('type') == 'submit' && !elm.parent()[0].checkValidity()){
      return;
    }
    elm.html(`<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`)
    });   
});