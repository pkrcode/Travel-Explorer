# Travel Explorer

A modern, responsive travel website designed to help users discover new destinations, check weather conditions, and explore stunning photography. This project integrates with Unsplash and OpenWeatherMap APIs to provide dynamic, real-time content.

![Travel Explorer Preview](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

- **Destination Search**: Instantly search for any destination worldwide with dynamic photo galleries
- **Dynamic Photo Gallery**: View beautiful, high-quality photos of your searched destination, powered by the Unsplash API
- **Real-Time Weather**: Get current weather conditions, including temperature, humidity, and wind speed, from the OpenWeatherMap API
- **Multi-Page Navigation**: Explore dedicated pages for:
  - **Destinations**: Filterable grid of popular travel spots by continent
  - **Luxury Packages**: Curated romantic honeymoon getaways
  - **International Tours**: Professional guided tours for international travelers
  - **Car Rentals**: Complete car booking system with search functionality
- **Responsive Design**: A seamless experience across all devices, from mobile phones to desktops
- **Interactive UI**: Smooth animations, modal pop-ups, and a user-friendly interface
- **Professional Testimonials**: Real customer feedback with enhanced styling

## 🚀 Live Demo

The project is deployed on Vercel. You can view the live version here:

[**Travel Explorer Live**](https://your-vercel-deployment-url.vercel.app)

*(Note: Replace the URL above with your actual Vercel deployment link after deployment.)*

## 🛠️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari)
- Python 3.x installed (for the local server)
- API keys for Unsplash and OpenWeatherMap (optional - demo data available)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pkrcode/Travel-Explorer.git
   cd Travel-Explorer
   ```

2. **Add your API keys (Optional):**
   - Open `script.js`
   - Replace `'YOUR_UNSPLASH_ACCESS_KEY'` with your Unsplash API key
   - Replace `'YOUR_OPENWEATHER_API_KEY'` with your OpenWeatherMap API key

3. **Run the local server:**
   ```bash
   python -m http.server 8000
   ```

4. **Open in your browser:**
   Navigate to `http://localhost:8000` to see the website in action

## ☁️ Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/).

### Steps to Deploy on Vercel:

1. **Push to GitHub:**
   - Your repository is already set up at: `https://github.com/pkrcode/Travel-Explorer`

2. **Import Project on Vercel:**
   - Go to your Vercel dashboard
   - Click "Add New..." -> "Project"
   - Import your GitHub repository: `pkrcode/Travel-Explorer`

3. **Configure and Deploy:**
   - Vercel will automatically detect the project type
   - The `vercel.json` file in this repository is configured for static site deployment
   - Click **"Deploy"**

4. **Update Live URL:**
   - Once deployed, Vercel will provide you with a live URL
   - Update the "Live Demo" link in this README.md file

## � Project Structure

```
TravelExplorer/
├── assets/                 # Images, icons, and other static assets
├── index.html              # Main homepage
├── destinations.html       # Destinations page
├── honeymoon.html          # Honeymoon packages page
├── foreigner-tours.html    # International tours page
├── car-rentals.html        # Car rentals page
├── style.css               # Main stylesheet for homepage
├── pages.css               # Stylesheet for additional pages
├── script.js               # Main JavaScript for homepage
├── destinations.js         # JavaScript for destinations page
├── honeymoon.js            # JavaScript for honeymoon page
├── foreigner-tours.js      # JavaScript for foreigner tours page
├── car-rentals.js          # JavaScript for car rentals page
├── package.json            # Project metadata and scripts
├── vercel.json             # Vercel deployment configuration
└── README.md               # This file
```

## 🙏 Acknowledgements

- **Unsplash** for the beautiful photography API.
- **OpenWeatherMap** for the real-time weather data API.
- **Font Awesome** for the icons.
- **Google Fonts** for the typography.

---

*This project was created as a demonstration of modern web development techniques using HTML, CSS, and Vanilla JavaScript.*

## 🎨 Customization

### Colors
Main colors defined in CSS:
```css
:root {
    --primary-gold: #f4d03f;
    --accent-orange: #e67e22;
    --error-red: #e74c3c;
    --success-green: #27ae60;
}
```

### Backgrounds
Hero backgrounds are defined in `script.js`:
```javascript
const heroBackgrounds = [
    {
        url: 'your-image-url-here',
        name: 'Location Name'
    },
    // Add more backgrounds
];
```

### Animations
Customize animation timing in CSS:
```css
.destination-card {
    transition: all 0.3s ease;
    animation: fadeInScale 0.5s ease;
}
```

## 🔧 Advanced Configuration

### API Rate Limits
- **Unsplash**: 50 requests/hour (demo tier)
- **OpenWeatherMap**: 1000 requests/day (free tier)

### Local Storage
Search history is automatically saved:
```javascript
// View saved searches
console.log(localStorage.getItem('travelSearchHistory'));

// Clear search history
localStorage.removeItem('travelSearchHistory');
```

### Demo Mode
Without API keys, the website runs in demo mode with:
- Pre-defined sample photos
- Simulated weather data
- Full UI functionality

## 🐛 Troubleshooting

### Common Issues

1. **Photos not loading**
   - Check Unsplash API key
   - Verify internet connection
   - Check browser console for errors

2. **Weather data missing**
   - Verify OpenWeatherMap API key
   - Check city name spelling
   - API might be rate-limited

3. **Mobile navigation issues**
   - Clear browser cache
   - Check for JavaScript errors
   - Verify viewport meta tag

### Debug Mode
Enable debug logging:
```javascript
// Add to script.js
console.log('Debug mode enabled');
localStorage.setItem('debugMode', 'true');
```

## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Enable in repository settings

### Traditional Hosting
Upload all files to your web server's public directory.

### CDN Integration
For better performance, consider using:
- **Cloudflare**: CDN and caching
- **ImageKit**: Image optimization

## 🎓 Learning Resources

### Technologies to Learn More About
- **CSS Grid & Flexbox**: Layout fundamentals
- **Fetch API**: Making HTTP requests
- **LocalStorage**: Browser data persistence
- **Responsive Design**: Mobile-first approach

### API Documentation
- [Unsplash API Docs](https://unsplash.com/documentation)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙋‍♂️ Support

Having issues? Here's how to get help:

1. **Check the console**: F12 → Console tab
2. **Verify API keys**: Make sure they're correctly set
3. **Test in incognito**: Rule out extension conflicts
4. **Check network tab**: Verify API requests are working

## 🌟 Features to Add

Future enhancements you could implement:
- [ ] 5-day weather forecast
- [ ] Dark/light theme toggle
- [ ] Favorite destinations
- [ ] Social media sharing
- [ ] Map integration
- [ ] Travel blog section
- [ ] User reviews system

---

## 📂 Project Structure

```
Travel-Explorer/
├── assets/                 # Images, icons, and other static assets
├── index.html              # Main homepage with hero section and search
├── destinations.html       # Destinations page with continent filtering
├── honeymoon.html          # Luxury honeymoon packages page
├── foreigner-tours.html    # International tours and experiences
├── car-rentals.html        # Car rental booking system
├── style.css               # Main stylesheet for homepage
├── pages.css               # Stylesheet for additional pages
├── script.js               # Main JavaScript for homepage functionality
├── destinations.js         # JavaScript for destinations filtering
├── honeymoon.js            # JavaScript for honeymoon page interactions
├── foreigner-tours.js      # JavaScript for tours page functionality
├── car-rentals.js          # JavaScript for car rental booking
├── package.json            # Project metadata and build scripts
├── vercel.json             # Vercel deployment configuration
└── README.md               # Project documentation
```

## 🌟 Key Features & Technology

### Frontend Technologies
- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Advanced styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript**: No frameworks - pure JavaScript for optimal performance
- **Google Fonts**: Poppins and Playfair Display for professional typography
- **Font Awesome**: Comprehensive icon library

### API Integrations
- **Unsplash API**: High-quality destination photography (with demo fallbacks)
- **OpenWeatherMap API**: Real-time weather data (with demo fallbacks)
- **Dynamic Content**: Over 50+ destinations with specific photo collections

### Professional Features
- **Advanced Search**: Destination-specific photo galleries with 50+ locations
- **Modal System**: Professional destination detail modals with booking CTAs
- **Filter System**: Continent-based destination filtering (Europe, Asia, Americas, Africa, Oceania)
- **Booking Forms**: Complete car rental booking with validation and suggestions
- **Testimonial System**: Professional customer feedback with avatar placeholders
- **Contact Forms**: Lead capture with form validation

## 🎨 Design Philosophy

- **Professional Typography**: Playfair Display for headlines, Poppins for body text
- **Consistent Branding**: Travel Explorer brand with globe iconography
- **Premium Color Scheme**: Gold and orange gradients (#f4d03f, #e67e22)
- **Modern UI/UX**: Glassmorphism effects, smooth animations, hover states
- **Mobile-First**: Responsive design optimized for all screen sizes

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+  
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 8+)

## 👨‍💻 Author

**pkrcode** - [GitHub Profile](https://github.com/pkrcode)

Repository: [Travel-Explorer](https://github.com/pkrcode/Travel-Explorer)

## 📄 License

This project is licensed under the ISC License.

**Made with ❤️ using modern web technologies**

*Ready to explore the world? Start your journey with Travel Explorer!* 🚀