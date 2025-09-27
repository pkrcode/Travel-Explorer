# Travel Explorer

A modern, responsive travel website designed to help users discover new destinations, check weather conditions, and explore stunning photography. This project integrates with Unsplash and OpenWeatherMap APIs to provide dynamic, real-time content.

## ✨ Features

- **Destination Search**: Instantly search for any destination worldwide.
- **Dynamic Photo Gallery**: View beautiful, high-quality photos of your searched destination, powered by the Unsplash API.
- **Real-Time Weather**: Get current weather conditions, including temperature, humidity, and wind speed, from the OpenWeatherMap API.
- **Multi-Page Navigation**: Explore dedicated pages for:
  - **Destinations**: Filterable grid of popular travel spots.
  - **Honeymoon Packages**: Curated romantic getaways.
  - **Foreigner Tours**: Special tours for international travelers.
  - **Car Rentals**: Easy-to-use car booking system.
- **Responsive Design**: A seamless experience across all devices, from mobile phones to desktops.
- **Interactive UI**: Smooth animations, modal pop-ups, and a user-friendly interface.
- **Search History**: Quickly access your recent searches.

## 🚀 Live Demo

The project is deployed on Vercel. You can view the live version here:

[**Travel Explorer Live**](https://vercel.com/praveen-kumars-projects-81ba3472/travel-explorer)

## 🛠️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari).
- Python 3.x installed (for the local server).
- API keys for Unsplash and OpenWeatherMap.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/TravelExplorer.git
   cd TravelExplorer
   ```

2. **Add your API keys:**
   - Open `script.js`.
   - Replace `'YOUR_UNSPLASH_ACCESS_KEY'` with your Unsplash API key.
   - Replace `'YOUR_OPENWEATHER_API_KEY'` with your OpenWeatherMap API key.

3. **Run the local server:**
   ```bash
   python -m http.server 8000
   ```

4. **Open in your browser:**
   Navigate to `http://localhost:8000` to see the website in action.

### 📱 Mobile Device Testing

Want to view the site on your phone while developing?

#### Option A: Same Wi‑Fi (LAN)
1. Install dependencies for a static server (first time only):
   ```bash
   npm install --save-dev serve
   ```
   (Or just rely on `npx` each time.)
2. Start the dev server that binds to all interfaces:
   ```bash
   npm run lan
   ```
3. Find your computer's local IP (Windows PowerShell):
   ```powershell
   (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "*Wi-Fi*","*Ethernet*" | Where-Object { $_.IPAddress -notlike "169.*" }).IPAddress
   ```
4. On your phone (same network) open: `http://YOUR_IP:5173`

#### Option B: Quick Tunnel (Public Temporary URL)
Use a one‑time secure URL if your phone is on cellular.
```bash
npm install -g cloudflared   # or download executable from Cloudflare
cloudflared tunnel --url http://localhost:5173
```
Copy the generated https URL into your phone browser.

#### Option C: Vercel Preview
Push changes → Vercel auto‑deploys → open preview URL on phone.

#### QR Code (Optional)
Generate a QR for the LAN URL:
```powershell
pip install qrcode[pil]
python - <<'PY'
import qrcode; url='http://192.168.1.42:5173'; qrcode.make(url).save('mobile-url.png'); print('Saved mobile-url.png')
PY
```
Scan `mobile-url.png` from your phone.

> Tip: If the page doesn’t load over LAN, allow the Node/serve process in Windows Firewall (Private networks).

## ☁️ Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/).

### Steps to Deploy on Vercel:

1. **Push to GitHub:**
   - Create a new repository on GitHub.
   - Follow the instructions to push your local project to the new repository.

2. **Import Project on Vercel:**
   - Go to your Vercel dashboard.
   - Click "Add New..." -> "Project".
   - Import the GitHub repository you just created.

3. **Configure and Deploy:**
   - Vercel will automatically detect the project type.
   - The `vercel.json` file in this repository is configured for a static site build.
   - Click **"Deploy"**. Vercel will build and deploy your site.

4. **Update Live URL:**
   - Once deployed, Vercel will provide you with a live URL.
   - Copy this URL and update the "Live Demo" link in this `README.md` file.

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

**Made with ❤️ by GitHub Copilot**

*Ready to explore the world? Start your journey with Travel Explorer!* 🚀
