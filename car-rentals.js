/*
Car Rentals Page JavaScript
Handles booking form, car category selection, and rental functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeCarRentalsPage();
});

function initializeCarRentalsPage() {
    setupMobileNavigation();
    setupBookingForm();
    setupCategoryCards();
    setupDestinationCards();
    initializeDatePickers();
    
    console.log('🚗 Car Rentals page initialized successfully!');
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

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Booking form functionality
function setupBookingForm() {
    const form = document.getElementById('rentalForm');
    const searchBtn = document.querySelector('.search-cars-btn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCarSearch();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleCarSearch();
        });
    }
    
    // Location input suggestions
    setupLocationSuggestions();
    
    // Date validation
    setupDateValidation();
}

function setupLocationSuggestions() {
    const pickupInput = document.getElementById('pickupLocation');
    const dropoffInput = document.getElementById('dropoffLocation');
    
    const popularLocations = [
        'London Heathrow Airport',
        'Paris Charles de Gaulle Airport',
        'New York JFK Airport',
        'Los Angeles LAX Airport',
        'Tokyo Narita Airport',
        'Sydney Airport',
        'Dubai Airport',
        'Rome Fiumicino Airport',
        'Barcelona Airport',
        'Amsterdam Schiphol Airport'
    ];
    
    function showSuggestions(input, suggestions) {
        const suggestionsContainer = input.nextElementSibling;
        if (!suggestionsContainer || !suggestionsContainer.classList.contains('location-suggestions')) return;
        
        suggestionsContainer.innerHTML = '';
        
        const filteredSuggestions = suggestions.filter(location => 
            location.toLowerCase().includes(input.value.toLowerCase())
        );
        
        if (filteredSuggestions.length > 0 && input.value.length > 2) {
            suggestionsContainer.style.display = 'block';
            
            filteredSuggestions.slice(0, 5).forEach(location => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = location;
                suggestionItem.addEventListener('click', function() {
                    input.value = location;
                    suggestionsContainer.style.display = 'none';
                });
                suggestionsContainer.appendChild(suggestionItem);
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }
    
    if (pickupInput) {
        pickupInput.addEventListener('input', function() {
            showSuggestions(this, popularLocations);
        });
        
        pickupInput.addEventListener('blur', function() {
            setTimeout(() => {
                const suggestionsContainer = this.nextElementSibling;
                if (suggestionsContainer) {
                    suggestionsContainer.style.display = 'none';
                }
            }, 200);
        });
    }
    
    if (dropoffInput) {
        dropoffInput.addEventListener('input', function() {
            showSuggestions(this, popularLocations);
        });
        
        dropoffInput.addEventListener('blur', function() {
            setTimeout(() => {
                const suggestionsContainer = this.nextElementSibling;
                if (suggestionsContainer) {
                    suggestionsContainer.style.display = 'none';
                }
            }, 200);
        });
        
        // Auto-fill drop-off with pickup location
        pickupInput.addEventListener('change', function() {
            if (!dropoffInput.value && this.value) {
                dropoffInput.placeholder = this.value;
            }
        });
    }
}

function setupDateValidation() {
    const pickupDate = document.getElementById('pickupDate');
    const dropoffDate = document.getElementById('dropoffDate');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (pickupDate) pickupDate.min = today;
    if (dropoffDate) dropoffDate.min = today;
    
    if (pickupDate) {
        pickupDate.addEventListener('change', function() {
            if (dropoffDate) {
                dropoffDate.min = this.value;
                
                // If drop-off date is before pickup date, reset it
                if (dropoffDate.value && dropoffDate.value < this.value) {
                    dropoffDate.value = '';
                }
            }
        });
    }
}

function initializeDatePickers() {
    // Set default pickup date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const pickupDate = document.getElementById('pickupDate');
    if (pickupDate && !pickupDate.value) {
        pickupDate.value = tomorrowStr;
    }
    
    // Set default drop-off date to 3 days later
    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 4);
    const threeDaysLaterStr = threeDaysLater.toISOString().split('T')[0];
    
    const dropoffDate = document.getElementById('dropoffDate');
    if (dropoffDate && !dropoffDate.value) {
        dropoffDate.value = threeDaysLaterStr;
    }
}

function handleCarSearch() {
    const formData = new FormData(document.getElementById('rentalForm'));
    const searchData = Object.fromEntries(formData);
    
    // Validate required fields
    if (!validateSearchForm(searchData)) {
        return;
    }
    
    // Show loading and then results
    showSearchLoading();
    
    setTimeout(() => {
        hideSearchLoading();
        showCarResults(searchData);
    }, 2000);
}

function validateSearchForm(data) {
    const requiredFields = ['pickupLocation', 'pickupDate', 'dropoffDate', 'pickupTime', 'dropoffTime', 'driverAge'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!data[field]) {
            missingFields.push(field);
            // Highlight missing field
            const fieldElement = document.getElementById(field);
            if (fieldElement) {
                fieldElement.style.borderColor = '#e74c3c';
                fieldElement.addEventListener('focus', function() {
                    this.style.borderColor = '#f4d03f';
                });
            }
        }
    });
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields');
        return false;
    }
    
    // Validate dates
    if (new Date(data.dropoffDate) <= new Date(data.pickupDate)) {
        showNotification('Drop-off date must be after pickup date');
        return false;
    }
    
    return true;
}

function showSearchLoading() {
    const searchBtn = document.querySelector('.search-cars-btn');
    if (searchBtn) {
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchBtn.disabled = true;
    }
}

function hideSearchLoading() {
    const searchBtn = document.querySelector('.search-cars-btn');
    if (searchBtn) {
        searchBtn.innerHTML = '<i class="fas fa-search"></i> Search Available Cars';
        searchBtn.disabled = false;
    }
}

function showCarResults(searchData) {
    // Create results modal
    const resultsModal = document.createElement('div');
    resultsModal.className = 'car-results-modal';
    resultsModal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Available Cars - ${searchData.pickupLocation}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-summary">
                        <div class="summary-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${searchData.pickupLocation}</span>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(searchData.pickupDate)} - ${formatDate(searchData.dropoffDate)}</span>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-user"></i>
                            <span>${searchData.driverAge} years</span>
                        </div>
                    </div>
                    <div class="car-results-grid">
                        ${generateCarResults()}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    addCarResultsStyles();
    document.body.appendChild(resultsModal);
    setupModalClose(resultsModal);
    
    // Setup booking buttons in results
    const bookButtons = resultsModal.querySelectorAll('.book-car-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const carName = this.dataset.car;
            closeModal(resultsModal);
            setTimeout(() => showCarBooking(carName, searchData), 300);
        });
    });
    
    showNotification('Found available cars for your dates! 🚗');
}

function generateCarResults() {
    const cars = [
        {
            name: 'Economy - Nissan Micra',
            image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: 35,
            features: ['4 seats', '2 bags', 'Manual', 'A/C'],
            rating: 4.2
        },
        {
            name: 'Compact - Toyota Corolla',
            image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: 45,
            features: ['5 seats', '3 bags', 'Automatic', 'A/C'],
            rating: 4.5
        },
        {
            name: 'SUV - Honda CR-V',
            image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: 75,
            features: ['5 seats', '4 bags', 'Automatic', 'AWD'],
            rating: 4.7
        },
        {
            name: 'Luxury - BMW 3 Series',
            image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
            price: 120,
            features: ['5 seats', '3 bags', 'Premium', 'GPS'],
            rating: 4.9
        }
    ];
    
    return cars.map(car => `
        <div class="car-result-card">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-details">
                <h3>${car.name}</h3>
                <div class="car-rating">
                    ${'★'.repeat(Math.floor(car.rating))}${'☆'.repeat(5-Math.floor(car.rating))}
                    <span>${car.rating}</span>
                </div>
                <div class="car-features">
                    ${car.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="car-footer">
                    <div class="car-price">
                        <span class="price">$${car.price}</span>
                        <span class="per-day">per day</span>
                    </div>
                    <button class="book-car-btn" data-car="${car.name}">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showCarBooking(carName, searchData) {
    const modal = document.createElement('div');
    modal.className = 'car-booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Book ${carName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="booking-summary">
                        <h3>Booking Summary</h3>
                        <div class="summary-details">
                            <div class="detail-row">
                                <span>Vehicle:</span>
                                <span>${carName}</span>
                            </div>
                            <div class="detail-row">
                                <span>Pickup:</span>
                                <span>${searchData.pickupLocation} - ${formatDate(searchData.pickupDate)} ${searchData.pickupTime}</span>
                            </div>
                            <div class="detail-row">
                                <span>Drop-off:</span>
                                <span>${searchData.dropoffLocation || searchData.pickupLocation} - ${formatDate(searchData.dropoffDate)} ${searchData.dropoffTime}</span>
                            </div>
                        </div>
                    </div>
                    <form class="car-booking-form">
                        <div class="form-section">
                            <h3>Driver Information</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" required placeholder="As shown on driving license">
                                </div>
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="email" required placeholder="For booking confirmation">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" required placeholder="Include country code">
                                </div>
                                <div class="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3>License Information</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>License Number</label>
                                    <input type="text" required placeholder="Driving license number">
                                </div>
                                <div class="form-group">
                                    <label>Issuing Country</label>
                                    <select required>
                                        <option value="">Select country</option>
                                        <option value="US">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                        <option value="DE">Germany</option>
                                        <option value="FR">France</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3>Additional Options</h3>
                            <div class="options-grid">
                                <label class="option-item">
                                    <input type="checkbox" value="gps">
                                    <span>GPS Navigation (+$5/day)</span>
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" value="child-seat">
                                    <span>Child Seat (+$8/day)</span>
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" value="additional-driver">
                                    <span>Additional Driver (+$10/day)</span>
                                </label>
                                <label class="option-item">
                                    <input type="checkbox" value="insurance">
                                    <span>Premium Insurance (+$15/day)</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="terms-section">
                            <label class="terms-checkbox">
                                <input type="checkbox" required>
                                <span>I agree to the rental terms and conditions, privacy policy, and age requirements</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close-btn">Cancel</button>
                    <button class="btn-primary confirm-booking">Confirm Booking</button>
                </div>
            </div>
        </div>
    `;
    
    addBookingModalStyles();
    document.body.appendChild(modal);
    setupModalClose(modal);
    
    const confirmBtn = modal.querySelector('.confirm-booking');
    confirmBtn.addEventListener('click', function() {
        if (validateCarBookingForm(modal)) {
            submitCarBooking(carName, modal);
        }
    });
}

function validateCarBookingForm(modal) {
    const requiredFields = modal.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim() && field.type !== 'checkbox') {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (field.type === 'checkbox' && !field.checked) {
            field.parentElement.style.color = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
            field.parentElement.style.color = '#333';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields and accept terms');
    }
    
    return isValid;
}

function submitCarBooking(carName, modal) {
    showNotification('Booking confirmed! Confirmation details sent to your email. 🎉');
    closeModal(modal);
}

// Category and destination card interactions
function setupCategoryCards() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryCard = this.closest('.category-card');
            const categoryName = categoryCard.querySelector('h3').textContent;
            showCategoryDetails(categoryName);
        });
    });
}

function setupDestinationCards() {
    const destinationButtons = document.querySelectorAll('.destination-btn');
    
    destinationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destinationCard = this.closest('.destination-card');
            const cityName = destinationCard.querySelector('h3').textContent;
            prefillLocation(cityName);
        });
    });
}

function showCategoryDetails(categoryName) {
    showNotification(`Viewing ${categoryName} vehicles...`);
    // Scroll to booking form
    document.getElementById('rentalForm').scrollIntoView({ behavior: 'smooth' });
}

function prefillLocation(cityName) {
    const pickupInput = document.getElementById('pickupLocation');
    if (pickupInput) {
        pickupInput.value = cityName;
        pickupInput.focus();
    }
    
    // Scroll to booking form
    document.getElementById('rentalForm').scrollIntoView({ behavior: 'smooth' });
    showNotification(`${cityName} selected as pickup location`);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #e67e22, #d35400);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(230, 126, 34, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function addCarResultsStyles() {
    if (document.querySelector('#car-results-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'car-results-styles';
    styles.textContent = `
        .car-results-modal {
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
        
        .car-results-modal .modal-content {
            max-width: 900px;
            width: 95%;
        }
        
        .search-summary {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 10px;
            flex-wrap: wrap;
        }
        
        .summary-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .summary-item i {
            color: #e67e22;
        }
        
        .car-results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .car-result-card {
            border: 1px solid #e9ecef;
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .car-result-card:hover {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
        
        .car-image img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }
        
        .car-details {
            padding: 1rem;
        }
        
        .car-details h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }
        
        .car-rating {
            color: #f4d03f;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        
        .car-rating span {
            color: #666;
            margin-left: 0.5rem;
        }
        
        .car-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .feature-tag {
            background: #e9ecef;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            color: #666;
        }
        
        .car-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .car-price {
            display: flex;
            flex-direction: column;
        }
        
        .price {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
        }
        
        .per-day {
            font-size: 0.8rem;
            color: #666;
        }
        
        .book-car-btn {
            background: linear-gradient(135deg, #e67e22, #d35400);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .book-car-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
        }
        
        /* Location suggestions */
        .location-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
            display: none;
            z-index: 100;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .suggestion-item {
            padding: 10px 15px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .suggestion-item:hover {
            background: #f8f9fa;
        }
    `;
    
    document.head.appendChild(styles);
}

function addBookingModalStyles() {
    if (document.querySelector('#booking-modal-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'booking-modal-styles';
    styles.textContent = `
        .car-booking-modal {
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
        
        .car-booking-modal .modal-content {
            max-width: 700px;
            width: 95%;
        }
        
        .booking-summary {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        
        .booking-summary h3 {
            margin-bottom: 1rem;
            color: #333;
        }
        
        .summary-details {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
        }
        
        .detail-row span:first-child {
            font-weight: 500;
            color: #666;
        }
        
        .form-section {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .form-section:last-of-type {
            border-bottom: none;
        }
        
        .form-section h3 {
            margin-bottom: 1rem;
            color: #333;
            font-size: 1.2rem;
        }
        
        .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .option-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .option-item:hover {
            background: #f8f9fa;
            border-radius: 5px;
        }
        
        .option-item input[type="checkbox"] {
            width: auto;
            margin: 0;
        }
        
        .terms-section {
            margin-top: 1.5rem;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .terms-checkbox {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            cursor: pointer;
        }
        
        .terms-checkbox input[type="checkbox"] {
            margin-top: 3px;
        }
        
        .terms-checkbox span {
            font-size: 0.9rem;
            line-height: 1.4;
        }
    `;
    
    document.head.appendChild(styles);
}

function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtnSecondary = modal.querySelector('.modal-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    function handleClose() {
        closeModal(modal);
    }
    
    if (closeBtn) closeBtn.addEventListener('click', handleClose);
    if (closeBtnSecondary) closeBtnSecondary.addEventListener('click', handleClose);
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                handleClose();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            handleClose();
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

// Add universal modal styles
if (!document.querySelector('#universal-modal-styles')) {
    const styles = document.createElement('style');
    styles.id = 'universal-modal-styles';
    styles.textContent = `
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
            max-height: 85vh;
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
            margin: 0;
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
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            padding: 1rem 2rem 2rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .form-group {
            position: relative;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #e67e22;
            box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
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
            background: linear-gradient(135deg, #e67e22, #d35400);
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
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .search-summary {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    
    document.head.appendChild(styles);
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