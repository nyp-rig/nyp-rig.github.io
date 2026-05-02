import * as bootstrap from 'bootstrap';
document.addEventListener("DOMContentLoaded", function () {

  const noEventsMsg = document.getElementById('noEventMsg');
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hideMoreBtn = document.getElementById('hideMoreBtn');
  const eventsBody = document.getElementById('eventsBody');


  /**
   * Render Events in the table
   * @param {boolean} showPast Whether to show past events.
   */
  const renderEvents = (showPast) => {
    const dateNow = new Date();
    const events = eventsBody.children
    const eventsCount = events.length - 1;
    const timeInfo = "T23:59:59+08:00";

    let activeEvents = 0;

    for (let i = 0; i < eventsCount; i++) {
      const event = events[i];
      const dateRaw = event.getAttribute('data-date')
      const date = new Date(dateRaw + timeInfo);
      const isActive = date > dateNow;


      if (isActive) {
        activeEvents++;
        event.querySelectorAll('.sign-up-link').forEach((elm) => {
          elm.classList.remove("hidden")
        })
      }
      else {
        event.querySelectorAll('.sign-up-link').forEach((elm) => {
          console.dir(elm);
          elm.classList.add("hidden")
        })
      }

      if (showPast || isActive) {
        event.classList.remove("hidden")
      }
      else {
        event.classList.add("hidden")
      }
    }

    if ((showPast && events != 0) || activeEvents > 0) {
      noEventsMsg.classList.add("hidden");
    }
    else {
      noEventsMsg.classList.remove("hidden");
    }
  }


  showMoreBtn.addEventListener('click', () => {
    renderEvents(true);
    showMoreBtn.style.display = 'none';
    hideMoreBtn.style.display = 'inline-block';
  });

  hideMoreBtn.addEventListener('click', () => {
    renderEvents(false);
    showMoreBtn.style.display = 'inline-block';
    hideMoreBtn.style.display = 'none';
  });


  const modal = document.getElementById('modal');
  bootstrap.Modal.getOrCreateInstance(modal).handleUpdate();
  modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const content = button.parentElement.querySelector('.card-content-extra');
    console.dir(content);
    document.getElementById('modalLabel').textContent = button.parentElement.getAttribute('data-title');
    document.getElementById('modalBody').innerHTML = '';
    document.getElementById('modalBody').appendChild(content.cloneNode(true));
    const carousel = modal.querySelector('#carousel-phony')
    if (carousel) {
      carousel.id = 'carousel'
      // console.dir(carousel)
      new bootstrap.Carousel(carousel)
    }
  })

  renderEvents(false);

});