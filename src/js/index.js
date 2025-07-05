// Import all plugins
import * as bootstrap from 'bootstrap';
import $ from 'jquery';
$(() => {
  $('.has-loading-aft-click').on('click', (event)=>{
    $(event.currentTarget).html(`
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span class="visually-hidden" role="status">Loading...</span>`)
  })
});