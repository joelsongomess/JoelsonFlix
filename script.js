// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('JoelsonFlix loaded successfully!');
    
    // Initialize movie hover functionality
    initializeMovieCards();
    
    // Add smooth scrolling to navigation links
    addSmoothScrolling();
    
    // Add loading animation for videos
    addVideoLoadingHandlers();
});

function initializeMovieCards() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const poster = card.querySelector('.movie-poster');
        const video = card.querySelector('.trailer-video');
        
        if (poster && video) {
            // Preload video on hover
            poster.addEventListener('mouseenter', function() {
                video.load(); // Ensure video is loaded
                video.play().catch(e => {
                    console.log('Video autoplay prevented:', e);
                });
            });
            
            // Pause video when mouse leaves
            poster.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0; // Reset to beginning
            });
            
            // Handle video loading errors
            video.addEventListener('error', function() {
                console.log('Video failed to load for:', card.querySelector('h3')?.textContent);
            });
            
            // Add loading state
            video.addEventListener('loadstart', function() {
                poster.style.cursor = 'wait';
            });
            
            video.addEventListener('canplay', function() {
                poster.style.cursor = 'pointer';
            });
        }
    });
}

function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply smooth scrolling to anchor links
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function addVideoLoadingHandlers() {
    const videos = document.querySelectorAll('.trailer-video');
    
    videos.forEach(video => {
        // Set video properties for better performance
        video.setAttribute('preload', 'metadata');
        video.setAttribute('playsinline', true);
        
        // Add intersection observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.setAttribute('preload', 'auto');
                    observer.unobserve(video);
                }
            });
        });
        
        observer.observe(video);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Pause all videos when Escape is pressed
        const videos = document.querySelectorAll('.trailer-video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const poster = card.querySelector('.movie-poster');
        const video = card.querySelector('.trailer-video');
        
        if (poster && video) {
            let touchStarted = false;
            
            poster.addEventListener('touchstart', function(e) {
                e.preventDefault();
                touchStarted = true;
                video.play().catch(e => console.log('Video autoplay prevented:', e));
            });
            
            poster.addEventListener('touchend', function(e) {
                if (touchStarted) {
                    setTimeout(() => {
                        video.pause();
                        video.currentTime = 0;
                        touchStarted = false;
                    }, 3000); // Play for 3 seconds on mobile
                }
            });
        }
    });
}