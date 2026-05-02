import $ from 'jquery';
import { Modal } from 'bootstrap';

// GOOGLE FORM FIELD MAPPINGS to map Google Form fields to response page field IDs
const formFieldMappings = {
  'emailAddress': 'email-response',
  'entry.851075444': 'name-response',
  'entry.1485536765': 'phone-response',
  'entry.207949549': 'year-response',
  'entry.725278553': 'school-response',
  'entry.897263461': 'class-response',
  'entry.1365629489': 'reason-response'
}



// Reset form when back button pressed.
$(window).on('pageshow', () => {
  $('#joinForm')[0].reset();
});

// ON DOCUMENT READY
$(() => {
  const formResponseModal = new Modal('#formResponse', { keyboard: false });

  // Prevent Enter from triggering form submission.
  $('#joinForm').on('keypress', (event) => {
    if (event.which === 13) {// Enter key is keycode 13
      event.preventDefault();
      return false;
    }
  })


  // Custom Form Validation Handling
  $('#joinForm').on('submit', (event) => {
    // Check if Form is invalid
    if (!$('#joinForm')[0].checkValidity() || !$('#email-input').val().trim().endsWith('.nyp.edu.sg')) {
      // Form is invalid, prevent submission.
      event.preventDefault();
      event.stopPropagation();

      // Scroll to the first invalid element
      const inputElements = $('#joinForm input, #joinForm select,#joinForm textarea')
      for (let i = 0; i < inputElements.length; i++) {

        // Use setTimeout so that feedback text displays before scroll starts
        if (!inputElements[i].checkValidity() ||
          (inputElements[i].id === 'email-input' && !$(inputElements[i]).val().trim().endsWith('.nyp.edu.sg'))
        ) {
          setTimeout(() => {
            // Scroll to element
            $('body > div').animate({
              scrollTop: (
                $(inputElements[i]).parent().children().first().offset().top -
                $('body > div').offset().top + $('body > div').scrollTop() - $('body > nav').outerHeight() - 16
              )
            }, 500);

            // Focus on element (Puts user's curson in input box)
            inputElements[i].focus();
          }, 100);

          // Only scroll to the first invalid item, thus we break here.
          break;
        }
      }

      // Show feedback messages
      $('#joinForm').addClass('was-validated')
      return false;
    }
    else {
      // event.preventDefault();
      // // Show feedback messages
      // $('#joinForm').addClass('was-validated');
      // const formData = new FormData($('#joinForm')[0]);
      // fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLScijvgVreEVfk9CXr-zwfA7ffKTs8rQWrGrkHsmSa4f6rctyA/formResponse', {
      //   method: 'POST',
      //   body: formData,
      //   // mode: 'no-cors'// Since we only want to send data and Google Forms which uses CORS, 
      //   // we use `no-cors` so that we can send the data and bypass CORS.
      // }).then(() => {
      //   for (const fieldEntry of formData.entries()) {
      //     const [fieldName, fieldValue] = fieldEntry;
      //     if (formFieldMappings[fieldName]) {
      //       $(`#${formFieldMappings[fieldName]}`).val(fieldValue)
      //     }
      //   }
      //   formResponseModal.show();
      // }).catch(() => {
      //   alert('An error occured when trying to submit the form. Please try again!');
      //   window.location.reload();
      // });
    }
    // return false;
  });

  // Validate Email Input
  $('#email-input').on('input', () => {
    if (!$('#email-input').val().trim().endsWith('.nyp.edu.sg') || !$('#email-input')[0].checkValidity()) {
      $('#email-input').addClass('is-invalid')
    }
    else {
      $('#email-input').removeClass('is-invalid')
    }
  });
})