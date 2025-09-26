/*
Honeymoon Page JavaScript
Handles package interactions, favorites, and booking functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeHoneymoonPage();
});

function initializeHoneymoonPage() {
    setupMobileNavigation();
    setupFavoriteButtons();
    setupBookingButtons();
    setupCountdownTimer();
    
    console.log('💕 Honeymoon page initialized successfully!');
}

// Mobile navigation toggle
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Favorite button functionality
function setupFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = '#ff6b9d';
                this.style.color = 'white';
                showNotification('Added to favorites! ❤️');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = 'rgba(255, 255, 255, 0.9)';
                this.style.color = '#666';
                showNotification('Removed from favorites');
            }
        });
    });
}

// Booking button functionality
function setupBookingButtons() {
    const bookButtons = document.querySelectorAll('.book-btn');
    const dealButton = document.querySelector('.deal-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            handleBooking(packageName);
        });
    });
    
    if (dealButton) {
        dealButton.addEventListener('click', function() {
            handleSpecialDeal();
        });
    }
}

function handleBooking(packageName) {
    showBookingModal(packageName);
}

function handleSpecialDeal() {
    showBookingModal('Early Bird Special Offer');
}

function showBookingModal(packageName) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Book ${packageName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="booking-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Your Name</label>
                                <input type="text" required placeholder="Enter your full name">
                            </div>
                            <div class="form-group">
                                <label>Partner's Name</label>
                                <input type="text" required placeholder="Enter partner's name">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" required placeholder="Enter your email">
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="tel" required placeholder="Enter your phone">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Travel Date</label>
                                <input type="date" required>
                            </div>
                            <div class="form-group">
                                <label>Number of Guests</label>
                                <select required>
                                    <option value="">Select guests</option>
                                    <option value="2">2 Adults</option>
                                    <option value="3">3 Adults</option>
                                    <option value="4">4 Adults</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Special Requests</label>
                            <textarea placeholder="Any special requests or dietary requirements..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close-btn">Cancel</button>
                    <button class="btn-primary submit-booking">Book Now</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    addModalStyles();
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close modal functionality
    setupModalClose(modal);
    
    // Form submission
    const submitBtn = modal.querySelector('.submit-booking');
    submitBtn.addEventListener('click', function() {
        submitBooking(packageName, modal);
    });
}

function submitBooking(packageName, modal) {
    // Simulate booking process
    showNotification('Booking submitted! We\'ll contact you within 24 hours. 🎉');
    closeModal(modal);
}

// Countdown timer for special offer
function setupCountdownTimer() {
    const timerElements = {
        days: document.querySelector('.timer-item:nth-child(1) .timer-number'),
        hours: document.querySelector('.timer-item:nth-child(2) .timer-number'),
        minutes: document.querySelector('.timer-item:nth-child(3) .timer-number')
    };
    
    if (!timerElements.days) return;
    
    // Set end time (24 hours from now for demo)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            timerElements.days.textContent = days.toString().padStart(2, '0');
            timerElements.hours.textContent = hours.toString().padStart(2, '0');
            timerElements.minutes.textContent = minutes.toString().padStart(2, '0');
        } else {
            timerElements.days.textContent = '00';
            timerElements.hours.textContent = '00';
            timerElements.minutes.textContent = '00';
        }
    }
    
    // Update timer every minute
    updateTimer();
    setInterval(updateTimer, 60000);
}

// Utility functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function addModalStyles() {
    if (document.querySelector('#modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modal-styles';
    styles.textContent = `
        .booking-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h2 {
            color: #333;
            font-size: 1.8rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #999;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .booking-form .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .booking-form .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .booking-form label {
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
        }
        
        .booking-form input,
        .booking-form select,
        .booking-form textarea {
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .booking-form input:focus,
        .booking-form select:focus,
        .booking-form textarea:focus {
            outline: none;
            border-color: #ff6b9d;
            box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }
        
        .booking-form textarea {
            resize: vertical;
            min-height: 80px;
        }
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            padding: 1rem 2rem 2rem;
        }
        
        .btn-primary, .btn-secondary {
            flex: 1;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            border: none;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #ff6b9d, #c44569);
            color: white;
        }
        
        .btn-secondary {
            background: #f8f9fa;
            color: #333;
            border: 2px solid #ddd;
        }
        
        .btn-primary:hover, .btn-secondary:hover {
            transform: translateY(-2px);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .booking-form .form-row {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtnSecondary = modal.querySelector('.modal-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    if (closeBtnSecondary) {
        closeBtnSecondary.addEventListener('click', closeModal);
    }
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modal.parentNode) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});