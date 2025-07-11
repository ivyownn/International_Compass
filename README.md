# 🌍 International Compass – by Revival International

**International Compass** is a welcoming and user-friendly website created by **Revival International** to help new international students adjust to life on college campuses across the USA. Rooted in our church network’s mission to provide spiritual, emotional, and practical support, this site connects students with essential services such as airport pickups, mentoring, local church families, and helpful cultural resources.

## Mission & Purpose

Our goal is to serve and support international students through the love of Christ by:

- Offering safe airport pickups upon arrival.
- Connecting students to trusted local churches and host families.
- Providing guidance through mentorship and practical resources.
- Fostering a sense of belonging through an fellowship.

## Key Features

**Homepage**:
A welcoming landing page with an introduction to the mission, key services, and navigation to essential areas of the site.

**About Revival International**:
Details about our mission, values, church network, and commitment to supporting international students.

**Airport Pickup Request**:
A simple form where students can submit their arrival details and request a pickup from a local church volunteer or host family.

**Church Connections**:
A map-based directory of Revival International churches, trusted partner churches, and available host families across the U.S.
Each listing may include name, location, contact info, services provided, languages spoken, and availability for hosting or transportation.  
Powered by OpenStreetMap API for easy navigation and display.

**Mentorship & Support**:
Students can sign up to be paired with mentors from local churches or campus ministries to help them navigate cultural and academic challenges.

**Helpful Resources**:
Articles, FAQs, and links about finding housing, understanding U.S. culture, accessing student services, and handling practical challenges.

**Community Forum**:
A space where students can ask questions, connect with others, share experiences, and receive peer or mentor advice in a safe, encouraging environment.

**Visual Inspiration (Unsplash API)**:
Uses the Unsplash API to fetch beautiful, relevant images that bring warmth and visual engagement to the website.

**Language Tools**:

- DetectLanguage API: Identifies a student's native language.
- ApyHub Translate API: Translates content into a preferred language for better understanding.

## APIs Used

This project integrates simple, free APIs to enhance the user experience:

1. **Unsplash API** – Fetches high-quality images  
   🔗 https://unsplash.com/developers

2. **OpenStreetMap API** – Displays church locations and resources  
   🔗 https://wiki.openstreetmap.org/wiki/API

3. **DetectLanguage API** – Detects user language  
   🔗 https://detectlanguage.com/

4. **ApyHub Translate API** – Translates content for accessibility  
   🔗 https://apyhub.com/utility/sharpapi-translate-text

5. **Google Maps JavaScript API** – For interactive maps, directions, and location search  
   🔗 https://developers.google.com/maps/documentation

6. **Google Translate Widget or API** – For real-time page or content translation  
   🔗 https://translate.google.com/manager/website/

## Technologies Used

### Frontend

- HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB (cloud-based via MongoDB Atlas)

## How to Run the Project Locally

### 1. Clone This Repository

```bash
git clone https://github.com/your-username/international-compass.git
cd international-compass
```

### 2. Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a .env file and add:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
UNSPLASH_API_KEY=your_unsplash_api_key
DETECTLANGUAGE_API_KEY=your_detectlanguage_api_key
APYHUB_API_KEY=your_apyhub_api_key

### 4. Start the Server

```bash
npm start

Visit: http://localhost:3000
```

### Known Limitations

- Free APIs may have rate limits
- No authentication/login system (planned for future)
- Requires regular content updates and moderator involvement

### About Revival International

Revival International is a growing network of churches across the U.S. committed to serving students, families, and communities through gospel-centered hospitality, prayer, and mentorship. This project is one way we express our love and care for the nations God brings to our doorstep.

### Get Involved

We welcome mentors, church members, developers, and students to join this effort. Reach out via the Contact Us page on the site.
