document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  
  // Toggle mobile menu
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', burger.classList.contains('active'));
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
    // Cursor effects
  const cursorFollower = document.querySelector('.cursor-follower');
  const cursorTrail = document.querySelector('.cursor-trail');
  
  if (cursorFollower && cursorTrail) {
    document.addEventListener('mousemove', (e) => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
      
      setTimeout(() => {
        cursorTrail.style.left = `${e.clientX}px`;
        cursorTrail.style.top = `${e.clientY}px`;
      }, 100);
    });
    
    // Interactive elements effect
    document.querySelectorAll('a, button, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorTrail.style.width = '60px';
        cursorTrail.style.height = '60px';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorTrail.style.width = '40px';
        cursorTrail.style.height = '40px';
      });
    });
  }
   const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme or use preferred color scheme
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Toggle theme
  themeToggle.addEventListener('click', () => {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
      theme = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
  
  // Listen for system theme changes
  prefersDarkScheme.addListener((e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', 
        e.matches ? 'dark' : 'light');
    }
  });

   const header = document.querySelector('.header');
  const scrollThreshold = 100; // Pixels to scroll before effect triggers
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Initialize on load in case page is scrolled
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  }
  
   const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top + windowTop;
      const elementBottom = elementTop + element.offsetHeight;

      if (elementBottom >= windowTop && elementTop <= windowBottom) {
        element.classList.add('animate');
      } else {
        // Optional: Remove to animate only once
        // element.classList.remove('animate');
      }
    });
  };

  // Initialize and add scroll listener
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Floating animation for about image
  const aboutImage = document.querySelector('.about-image img');
  if (aboutImage) {
    aboutImage.style.animation = 'float 4s ease-in-out infinite';
  }

// Modal functionality - only run if modal exists
const modal = document.getElementById('imageModal');
if (modal) { // Check if modal exists before proceeding
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeModal = document.getElementById('closeModal'); // Match HTML ID

  // Open modal when clicking project images
  document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = "block";
      modalImg.src = this.dataset.large || this.src; // Use larger image if available
      captionText.innerHTML = this.alt;
      modalImg.classList.add('modal-zoom');
    });
  });

  // Close modal when clicking X (if element exists)
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = "none";
      modalImg.classList.remove('modal-zoom');
    });
  }

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.classList.remove('modal-zoom');
    }
  });

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      modalImg.classList.remove('modal-zoom');
    }
  });
}

// Image Modal Functionality
// Define the function globally
function openImageModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  modal.style.display = "block";
  modalImg.src = imageSrc;
  
  // Close modal when clicking X
  document.querySelector('.close-modal').onclick = function() {
    modal.style.display = "none";
  }
  
  // Close modal when clicking outside image
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  
  // Close modal with ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // All your existing DOMContentLoaded code...
  // (keep everything else the same)
});

// Add this inside your DOMContentLoaded event
const profileImage = document.getElementById('profileImage');
if (profileImage) {
  profileImage.addEventListener('click', () => {
    openImageModal('assets/author-removebg-preview.png');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and project cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Set up filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          card.classList.add('animate');
        } else {
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            card.classList.add('animate');
          } else {
            card.style.display = 'none';
            card.classList.remove('animate');
          }
        }
      });
    });
  });
  
  // Initialize - show all projects by default
  document.querySelector('.filter-btn[data-filter="all"]').click();
});

// Add this to your main.js as fallback
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(`https://mail.google.com/mail/?view=cm&tf=1&to=${link.href.split(':')[1]}`, '_blank');
  });
});


});