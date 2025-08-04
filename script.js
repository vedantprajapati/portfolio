// Slide Navigation System
class SlideNavigator {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slides = document.querySelectorAll('.slide');
        this.prevArrow = document.getElementById('prev-arrow');
        this.nextArrow = document.getElementById('next-arrow');
        this.upArrow = document.getElementById('up-arrow');
        this.downArrow = document.getElementById('down-arrow');
        
        // Define slide names for tooltips
        this.slideNames = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'];
        
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Ensure all arrows are initially visible and clickable on home page
        this.updateArrowVisibility();
        
        // Debug: Check if arrows exist
        console.log('Arrows found:', {
            prev: this.prevArrow,
            next: this.nextArrow,
            up: this.upArrow,
            down: this.downArrow
        });
        
        // Event listeners for arrows
        this.prevArrow.addEventListener('click', () => {
            console.log('Prev arrow clicked, current slide:', this.currentSlide);
            this.prevSlide();
        });
        this.nextArrow.addEventListener('click', () => {
            console.log('Next arrow clicked, current slide:', this.currentSlide);
            this.nextSlide();
        });
        this.upArrow.addEventListener('click', () => {
            console.log('Up arrow clicked, current slide:', this.currentSlide);
            this.upSlide();
        });
        this.downArrow.addEventListener('click', () => {
            console.log('Down arrow clicked, current slide:', this.currentSlide);
            this.downSlide();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'ArrowUp') {
                this.upSlide();
            } else if (e.key === 'ArrowDown') {
                this.downSlide();
            }
        });

        // Touch/swipe support for mobile
        this.initTouchSupport();
    }

    prevSlide() {
        if (this.isTransitioning) return;
        
        // Navigate to specific sections without looping
        if (this.currentSlide === 0) {
            this.goToSlide(1, 'left'); // Home -> About
        } else if (this.currentSlide > 0) {
            this.goToSlide(0, 'left'); // Any other page -> Home
        }
    }

    nextSlide() {
        if (this.isTransitioning) return;
        
        // Navigate to specific sections without looping
        if (this.currentSlide === 0) {
            this.goToSlide(2, 'right'); // Home -> Experience
        } else if (this.currentSlide === 1) {
            this.goToSlide(0, 'right'); // About -> Home
        } else if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1, 'right');
        }
    }

    upSlide() {
        if (this.isTransitioning) return;
        
        // Navigate to specific sections without looping
        if (this.currentSlide === 0) {
            this.goToSlide(3, 'up'); // Home -> Projects
        } else if (this.currentSlide === 1) {
            this.goToSlide(4, 'up'); // About -> Skills
        } else if (this.currentSlide === 2) {
            this.goToSlide(5, 'up'); // Experience -> Contact
        } else if (this.currentSlide === 4) {
            this.goToSlide(0, 'up'); // Skills -> Home
        }
    }

    downSlide() {
        if (this.isTransitioning) return;
        
        // Navigate to specific sections without looping
        if (this.currentSlide === 0) {
            this.goToSlide(4, 'down'); // Home -> Skills
        } else if (this.currentSlide === 3) {
            this.goToSlide(0, 'down'); // Projects -> Home
        } else if (this.currentSlide === 5) {
            this.goToSlide(2, 'down'); // Contact -> Experience
        }
    }

    goToSlide(index, direction = 'right') {
        if (index < 0 || index >= this.totalSlides || this.isTransitioning) {
            console.log('Invalid slide index or transitioning:', index, 'total slides:', this.totalSlides);
            return;
        }

        // Prevent multiple rapid transitions
        this.isTransitioning = true;

        // Get the current slide element
        const currentSlideElement = this.slides[this.currentSlide];
        
        // Remove active class from current slide
        currentSlideElement.classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide
        this.slides[this.currentSlide].classList.add('active');

        // Apply directional animations for both current and new slide
        this.animateSlideTransition(direction, currentSlideElement);

        // Update arrow visibility and tooltips
        this.updateArrowVisibility();

        // Allow transitions after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    animateSlideTransition(direction, currentSlideElement) {
        const activeSlide = this.slides[this.currentSlide];
        
        // Determine slide-in animation for new slide
        let slideInAnimation = 'slideInFromRight';
        let slideOutAnimation = 'slideOutToLeft';
        
        switch(direction) {
            case 'left':
                slideInAnimation = 'slideInFromLeft';
                slideOutAnimation = 'slideOutToRight';
                break;
            case 'right':
                slideInAnimation = 'slideInFromRight';
                slideOutAnimation = 'slideOutToLeft';
                break;
            case 'up':
                slideInAnimation = 'slideInFromTop';
                slideOutAnimation = 'slideOutToBottom';
                break;
            case 'down':
                slideInAnimation = 'slideInFromBottom';
                slideOutAnimation = 'slideOutToTop';
                break;
        }
        
        // Apply slide-out animation to current slide
        if (currentSlideElement) {
            currentSlideElement.style.animation = `${slideOutAnimation} 0.5s ease-out`;
        }
        
        // Apply slide-in animation to new slide
        activeSlide.style.animation = `${slideInAnimation} 0.5s ease-out`;
        
        setTimeout(() => {
            if (currentSlideElement) {
                currentSlideElement.style.animation = '';
            }
            activeSlide.style.animation = '';
        }, 500);
    }

    updateArrowVisibility() {
        // Home page - show all 4 arrows
        if (this.currentSlide === 0) {
            this.showArrow(this.prevArrow, 'About');
            this.showArrow(this.nextArrow, 'Experience');
            this.showArrow(this.upArrow, 'Projects');
            this.showArrow(this.downArrow, 'Skills');
        } else {
            // Other pages - show only one arrow to go back home
            this.hideAllArrows();
            
            // Show the appropriate arrow to go back home
            if (this.currentSlide === 1) {
                // About page - show right arrow to go back to Home
                this.showArrow(this.nextArrow, 'Home');
            } else if (this.currentSlide === 2) {
                // Experience page - show left arrow to go back to Home
                this.showArrow(this.prevArrow, 'Home');
            } else if (this.currentSlide === 3) {
                // Projects page - show down arrow to go back to Home
                this.showArrow(this.downArrow, 'Home');
            } else if (this.currentSlide === 4) {
                // Skills page - show up arrow to go back to Home
                this.showArrow(this.upArrow, 'Home');
            } else if (this.currentSlide === 5) {
                // Contact page - show down arrow to go back to Home
                this.showArrow(this.downArrow, 'Home');
            }
        }
    }

    hideAllArrows() {
        this.prevArrow.style.opacity = '0';
        this.nextArrow.style.opacity = '0';
        this.upArrow.style.opacity = '0';
        this.downArrow.style.opacity = '0';
        
        this.prevArrow.style.pointerEvents = 'none';
        this.nextArrow.style.pointerEvents = 'none';
        this.upArrow.style.pointerEvents = 'none';
        this.downArrow.style.pointerEvents = 'none';
    }

    showArrow(arrow, targetName) {
        arrow.style.opacity = '1';
        arrow.style.pointerEvents = 'auto';
        arrow.setAttribute('data-tooltip', targetName);
    }

    initTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isSwiping = false;

        document.addEventListener('touchstart', (e) => {
            if (this.isTransitioning) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = true;
        });

        document.addEventListener('touchend', (e) => {
            if (!isSwiping || this.isTransitioning) return;
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe();
            isSwiping = false;
        });

        document.addEventListener('mousedown', (e) => {
            if (this.isTransitioning) return;
            startX = e.clientX;
            startY = e.clientY;
            isSwiping = true;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isSwiping || this.isTransitioning) return;
            endX = e.clientX;
            endY = e.clientY;
            this.handleSwipe();
            isSwiping = false;
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > swipeThreshold || Math.abs(diffY) > swipeThreshold) {
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe
                if (diffX > 0) {
                    // Swiped left - go to next slide
                    this.nextSlide();
                } else {
                    // Swiped right - go to previous slide
                    this.prevSlide();
                }
            } else {
                // Vertical swipe
                if (diffY > 0) {
                    // Swiped up - go up
                    this.upSlide();
                } else {
                    // Swiped down - go down
                    this.downSlide();
                }
            }
        }
    }
}

// Initialize slide navigation
const slideNavigator = new SlideNavigator();

// Function to go to projects section
function goToProjects() {
    slideNavigator.goToSlide(3, 'up'); // Go to Projects section
}

// Existing functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project expansion functionality
    const expandBtn = document.getElementById('expand-projects-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');

    if (expandBtn && hiddenProjects.length > 0) {
        expandBtn.addEventListener('click', function() {
            hiddenProjects.forEach(project => {
                project.classList.add('show');
            });
            
            // Change button text and hide it
            this.innerHTML = '<i class="fas fa-check"></i> All Projects Shown';
            this.style.opacity = '0.5';
            this.style.pointerEvents = 'none';
        });
    }

    // Particle animation (keep simple)
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 0.5}s`;
    });

    // Ripple effect for project cards (keep simple)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}); 