document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyDP4fbQoBEYQyRV8co-XIrvd5DLWrfqkIs",
        authDomain: "digital-risks.firebaseapp.com",
        projectId: "digital-risks",
        storageBucket: "digital-risks.firebasestorage.app",
        messagingSenderId: "226951548553",
        appId: "1:226951548553:web:7f7695a7709ec3d87f8058",
        measurementId: "G-140XW1VER3"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Check User Authentication Status
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            document.getElementById('loginButton').style.display = 'none'; // Hide login button
            document.getElementById('userStatus').style.display = 'block'; // Show user status
            document.getElementById('username').textContent = user.email; // Display user email
            localStorage.setItem('isLoggedIn', 'true'); // Store login state
        } else {
            // User is signed out
            document.getElementById('loginButton').style.display = 'block'; // Show login button
            document.getElementById('userStatus').style.display = 'none'; // Hide user status
            localStorage.removeItem('isLoggedIn'); // Remove login state
        }
    });

    // Handle "Visit as a Guest" Link (if exists)
    const visitAsGuestLink = document.querySelector('a[href="index.html"]');
    if (visitAsGuestLink) {
        visitAsGuestLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('isGuest', 'true'); // Mark user as guest
            window.location.href = 'index.html'; // Redirect to home page
        });
    }

    // Handle Login Button Click
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            const isGuest = localStorage.getItem('isGuest');
            if (isGuest === 'true' || !localStorage.getItem('isLoggedIn')) {
                window.location.href = 'login.html'; // Redirect to login page
            }
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Redirect to home page after successful login
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }

    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Redirect to home page after successful signup
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }

    // Initial animation on page load
    document.querySelectorAll('section').forEach(section => {
        section.style.animation = 'fadeIn 1s ease-out';
    });

    // Scroll-based animation
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                section.style.animation = 'fadeIn 1s ease-out';
            }
        });
    });
});

document.querySelectorAll('.navbar nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Find the target section

        if (targetSection) {
            // Smoothly scroll to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'start' // Align to the top of the section
            });
        }
    });
});


 // Initialize AOS
 AOS.init({
    duration: 1000, // Animation duration
    once: true, // Animation only happens once
});

// Check for dark mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
    }
});


// Dark Mode Toggle Function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save user preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

 