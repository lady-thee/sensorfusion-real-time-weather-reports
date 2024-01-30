
    // Show or hide the scroll-up button based on scroll position
    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      const scrollBtn = document.getElementById("scrollUpBtn");
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    }

    // Smoothly scroll to the top of the page when the button is clicked
    document.getElementById("scrollUpBtn").addEventListener("click", function() {
        smoothScrollTop();
      });
  
      function smoothScrollTop() {
        const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentPosition > 0) {
          window.requestAnimationFrame(smoothScrollTop);
          window.scrollTo(0, currentPosition - currentPosition / 8);
        }
      }


// Function to check authentication status
const dashboardLink = document.getElementById('dashboardLink');
const loginLink = document.getElementById('loginLink');
const signupLink = document.getElementById('signupLink');

function checkAuthStatus() {
 
  const isAuthenticated = localStorage.getItem('token') !== null; // Check if authentication token exists
  console.log(isAuthenticated);
  return isAuthenticated;
}

if (checkAuthStatus() == true) {
  dashboardLink.style.display = 'block'; 
  loginLink.style.display = 'none';
  signupLink.style.display = 'none';
} else {
  dashboardLink.style.display = 'none'; 
  loginLink.style.display = 'block';
  signupLink.style.display = 'block';
}


// Setting up timer on token in localstorage

function setLogoutTimer() {
  const setExpirationTime = 3 * 60 * 60 * 1000; // 3 hours

  setTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  }, setExpirationTime);
}

setLogoutTimer()