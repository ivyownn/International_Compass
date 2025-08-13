# 🌍 International Compass – by Revival International

**International Compass** is a welcoming and user-friendly website created by **Revival International** to help new international students adjust to life on college campuses across the USA. Rooted in our church network’s mission to provide spiritual, emotional, and practical support, this site connects students with essential services such as airport pickups, mentoring, local church families, and helpful cultural resources.

## Mission & Purpose

Our goal is to serve and support international students through the love of Christ by:

- Offering safe airport pickups upon arrival.
- Connecting students to trusted local churches and host families.
- Providing guidance through mentorship and practical resources.
- Fostering a sense of belonging through a fellowship.

## Key Features

**Homepage**  
A welcoming landing page with an introduction to the mission, key services, and navigation to essential areas of the site.

**About Revival International**  
Details about our mission, values, church network, and commitment to supporting international students.

**Airport Pickup Request**  
A simple form where students can submit their arrival details and request a pickup from a local church volunteer or host family.

**Church Connections**  
A map-based directory of Revival International churches and trusted partner churches across the U.S.  
Each listing includes name, location, contact info, and links to Google Maps directions.  
Uses the **Google Maps JavaScript API** for interactive maps.

**Mentorship & Support**  
Students can sign up to be paired with mentors from local churches or campus ministries to help them navigate cultural and academic challenges.

**Helpful Resources**  
Articles, FAQs, and links about housing, U.S. culture, student services, and practical challenges.

**Community Forum**  
A safe space for students to ask questions, connect with others, and share experiences.

**Visual Inspiration**  
Uses the **Unsplash API** for dynamic banners and images related to student life and community.

**Language Tools (yet to be implemented)**  
Integration with translation and language detection APIs to support multilingual content. E.g.:

- DetectLanguage API: Identifies a student's native language.
- ApyHub Translate API: Translates content into a preferred language for better understanding.

## APIs Used

- **Unsplash API** – To fetch high-quality images
  🔗 https://unsplash.com/developers
- **Google Maps JavaScript API** – For interactive maps and location markers  
   🔗 https://developers.google.com/maps/documentation
- **DetectLanguage API** – Detects user language  
   🔗 https://detectlanguage.com/
- **ApyHub Translate API** – Translates content for accessibility  
   🔗 https://apyhub.com/utility/sharpapi-translate-text
- **Google Translate Widget or API** – Optional page translation
  🔗 https://translate.google.com/manager/website/

## Technologies Used

**Frontend:** HTML5, CSS3 (Flexbox, Grid, Media Queries), JavaScript  
**Backend:** Node.js, Express.js, Nodemailer (for contact form emails)  
**Database (optional/future):** MongoDB Atlas

---

## Project Structure

```
/public
  ├── index.html
  ├── about.html
  ├── team.html
  ├── services.html
  ├── resources.html
  ├── donate.html
  ├── contact.html
  ├── js/
  │    ├── contact.js
  │    ├── countdown.js
  │    ├── images.js
  │    ├── map.js
  │    ├── search.js
  │    └── locations.json
  └── css/
       └── styles.css
/international-compass-server
  ├── server.js
  └── .env
.gitignore
README.md

```

## How to Run the Project Locally

### 1. Clone This Repository

```bash
git clone https://github.com/ivyownn/international-compass.git
cd international-compass
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env file in the backend folder (international-compass-server/.env) and add:

```
PORT=5001
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
UNSPLASH_ACCESS_KEY=your_unsplash_key
GOOGLE_MAPS_KEY=your_google_maps_key
```

## API Keys Setup

- Google Maps

1. Go to Google Cloud Console.
2. Create / select a project.
3. Enable APIs: Maps JavaScript API
4. Create an API key.
5. Restrict the key:

- Application restriction: HTTP referrers.
- Allowed:
  http://localhost/_
  http://localhost:5001/_
  https://your-deployed-site.onrender.com/*
- API restriction: Restrict to "Maps JavaScript API".

* Unsplash

1. Go to Unsplash Developer.
2. Create a new app to get your Access Key.
3. Add it to .env as UNSPLASH_ACCESS_KEY.

### 4. Start the Server

```bash
npm start
```

Visit: `http://localhost:5001`

### Run backend server:

node server.js or node international-compass-server/server.js

## Deployment (Render)

### Steps to deploy

1. Push repo to GitHub.
2. Create a new Web Service on Render:

- Connect your GitHub repo.
- Set build command: npm install
- Set start command: node server.js or node international-compass-server/server.js
- Set environment variables on Render dashboard (same as .env).

3. Deploy.
4. Frontend will fetch images and Google Maps API keys securely via backend proxy routes.

### Frontend Behavior

- images.js dynamically loads banner images for each page from Unsplash via backend proxy.
- maps.js loads Google Maps only on team.html and fetches Google Maps API key securely from the backend.
- Map markers are loaded from locations.json in the public/js/ folder.
- Both scripts automatically detect local vs production base URLs.

---

## Developer Notes

- Google Maps API key is kept secret by fetching it from backend.
- **Marker Clusterer**: Add `@googlemaps/markerclusterer` for clustering map markers.
- Add search/filter functionality for church locations on the map.
- Display detailed info windows with church photos or schedules.
- **Async Error Handling**: Wrap async Express routes with error-handling middleware to avoid repetitive try/catch.
- **Improved Nodemailer Config**: Use Gmail OAuth2 (sign in with Google) or app passwords for more secure email sending.
- **AI Assistance**: AI assistance was leveraged to validate code during development challenges and to refactor the JavaScript API base, incorporating features such as marker clustering for improved functionality and to fix Google maps loading issues.

---

### Known Limitations

- Free APIs may have rate limits
- No authentication/login system (planned for the future)
- Some features (community forum, language translation) are planned but not yet implemented
- Requires regular content updates and moderator involvement

### About Revival International

Revival International is a growing network of churches across the U.S. committed to serving students, families, and communities through gospel-centered hospitality, prayer, and mentorship. This project is one way we express our love and care for the nations God brings to our doorstep.

## Get Involved

We welcome mentors, church members, developers, and students to join this effort.  
Contact us via the **Contact** page on the website.
