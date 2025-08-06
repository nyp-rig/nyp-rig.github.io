import $ from 'jquery';

// Reset form when back button pressed.
$(window).on('pageshow', () => {
  $('#joinForm')[0].reset();
});

$(() => {

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
    }

    // Show feedback messages
    $('#joinForm').addClass('was-validated')
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