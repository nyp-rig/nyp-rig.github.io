// function downloadTimetable() {
//     // Create a copy of the current document
//     const htmlContent = document.documentElement.outerHTML;
    
//     // Create a blob with the HTML content
//     const blob = new Blob([htmlContent], { type: 'text/html' });
    
//     // Create a download link
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = '../timetable2.html';
    
//     // Trigger the download
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
    
//     // Clean up the URL object
//     window.URL.revokeObjectURL(url);
    
//     // Show confirmation
//     alert('Timetable downloaded successfully! 🤖');
// }

// // Add some interactive effects
// document.addEventListener('DOMContentLoaded', function() {
//     const activitySlots = document.querySelectorAll('.activity-slot');
    
//     activitySlots.forEach(slot => {
//         slot.addEventListener('mouseenter', function() {
//             this.style.background = '#e3f2fd';
//         });
        
//         slot.addEventListener('mouseleave', function() {
//             this.style.background = '#f8f9fa';
//         });
//     });
// });

// const monthYearElement = document.getElementById('monthYear');
// const datesElement = document.getElementById('dates');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// let currentDate = new Date();

// const updateCalendar = () => {
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();
//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth + 1, 0);
//     const totalDays = lastDay.getDate();
//     // const firstDayIndex = firstDay.getDay(); // 0=Sunday, 1=Monday...
//     const firstDayIndex = (firstDay.getDay() + 6) % 7; // FIXED
//     const lastDayIndex = lastDay.getDay();

//     const monthYearString = currentDate.toLocaleString('default', {
//         month: 'long',
//         year: 'numeric'
//     });
//     monthYearElement.textContent = monthYearString;

//     let datesHTML = '';

//     // Previous month's dates
//     for (let i = firstDayIndex - 1; i >= 0; i--) {
//         const prevDate = new Date(currentYear, currentMonth, -i);
//         datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
//     }

//     // Current month's dates
//     // for (let i = 1; i <= totalDays; i++) {
//     //     const date = new Date(currentYear, currentMonth, i);
//     //     const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
//     //     datesHTML += `<div class="date ${activeClass}">${i}</div>`;
//     // }
//     for (let i = 1; i <= totalDays; i++) {
//         const date = new Date(currentYear, currentMonth, i);
//         const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
//         const fridayClass = date.getDay() === 5 ? 'friday' : '';
//         datesHTML += `<div class="date ${activeClass} ${fridayClass}" data-date="${date.toISOString()}">${i}</div>`;
//     }

//     // Next month's filler dates
//     const totalCells = firstDayIndex + totalDays;
//     const nextDays = (7 - (totalCells % 7)) % 7;
//     for (let i = 1; i <= nextDays; i++) {
//         const nextDate = new Date(currentYear, currentMonth + 1, i);
//         datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
//     }

//     datesElement.innerHTML = datesHTML;
// }

// prevBtn.addEventListener('click', () => {
//     currentDate.setMonth(currentDate.getMonth() - 1);
//     updateCalendar();
// })

// nextBtn.addEventListener('click', () => {
//     currentDate.setMonth(currentDate.getMonth() + 1);
//     updateCalendar();
// })

// updateCalendar();

// // function showFridayModal(dateStr) {
// //     // Create modal container
// //     const overlay = document.createElement('div');
// //     overlay.classList.add('modal-overlay');

// //     overlay.innerHTML = `
// //         <div class="modal-content">
// //             <button class="modal-close">&times;</button>
// //             <h2>📅 Schedule for ${new Date(dateStr).toDateString()}</h2>
// //             <iframe src="friday-schedule.html" width="100%" height="500px" frameborder="0"></iframe>
// //         </div>
// //     `;

// //     document.body.appendChild(overlay);

// //     // Close functionality
// //     overlay.querySelector('.modal-close').addEventListener('click', () => {
// //         document.body.removeChild(overlay);
// //     });
// // }

// const fridayDates = document.querySelectorAll('.date.friday');
// fridayDates.forEach(el => {
//     el.addEventListener('click', function () {
//         showFridayModal(this.dataset.date);
//     });
// });
// document.querySelectorAll('.date.friday').forEach(el => {
//     el.addEventListener('click', function () {
//         const selectedDate = this.dataset.date;
//         loadFridaySchedule(selectedDate);
//     });
// });


// function loadFridaySchedule(dateStr) {
//     fetch('friday-schedule.html')
//         .then(response => response.text())
//         .then(html => {
//             const wrapper = document.createElement('div');
//             wrapper.innerHTML = html;

//             // Optional: remove existing schedule if it's already injected
//             const existing = document.getElementById('fridaySchedule');
//             if (existing) existing.remove();

//             // Append to your page, e.g., under the calendar
//             document.body.appendChild(wrapper);
//         })
//         .catch(error => {
//             console.error('Error loading Friday schedule:', error);
//         });
// }


// document.getElementById('showMoreBtn').addEventListener('click', () => {
//     const moreWeeks = document.getElementById('moreWeeks');
//     moreWeeks.style.display = 'table-row-group'; // or 'contents' if using HTML5
//     document.getElementById('showMoreBtn').style.display = 'none';
//   });
// document.getElementById('hideCalendarBtn').addEventListener('click', () => {
//     const calendar = document.getElementById('calendarContainer');
//     calendar.style.display = 'none';
//   });


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
