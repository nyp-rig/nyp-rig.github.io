const moreWeeks = document.getElementById('moreWeeks');
const showMoreBtn = document.getElementById('showMoreBtn');
const hideMoreBtn = document.getElementById('hideMoreBtn');

showMoreBtn.addEventListener('click', () => {
  moreWeeks.style.display = 'table-row-group';
  showMoreBtn.style.display = 'none';
  hideMoreBtn.style.display = 'inline-block';
});

hideMoreBtn.addEventListener('click', () => {
  moreWeeks.style.display = 'none';
  showMoreBtn.style.display = 'inline-block';
  hideMoreBtn.style.display = 'none';
});
