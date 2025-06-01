document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Disable submit button to prevent multiple submissions
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Get form values
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        showMessage('Please fill in all required fields', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        return;
      }
      
      try {
        // Save to Firebase
        const newContactRef = database.ref('contacts').push();
        await newContactRef.set(formData);
        console.log('Data saved to Firebase');
        
        // Send email
        const emailResponse = await sendEmail(formData);
        console.log('Email response:', emailResponse);
        
        // Reset form
        contactForm.reset();
        
        // Redirect to thank-you page
        window.location.href = 'thank-you.html';
      } catch (error) {
        console.error('Error:', error);
        showMessage('Error sending message. Please try again later.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
  
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
  
  async function sendEmail(formData) {
    try {
      const response = await fetch('https://formsubmit.co/ajax/omkardivekar15@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Contact: ${formData.subject}`,
          _template: 'table',
          _captcha: 'false'
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }
});