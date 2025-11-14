🟫✨ IMAM – AI Outfit & Festival Style Recommender

Your Personal AI Stylist for Every Occasion

IMAM is an AI-powered styling assistant that recommends perfect outfits for men & women based on:

Event or festival
Body type
Skin tone
Personal preferences
Optional photo analysis
Budget and style category

The goal of IMAM is to bring human-like fashion advice to users through a simple, premium, modern web interface.

🚀 Features (MVP Completed)
✔ Event-Based Recommendations

Outfits curated for:

Casual
Office
Date
Wedding
Diwali
Eid
Party
College
Winter / Summer
More coming soon…
✔ Human-Like Fashion Advice
Every recommendation includes:
Outfit combination
Matching colors
Hairstyle
Accessories
Grooming suggestions
“Why this works” explanation (in simple Indian stylist style)
✔ Photo Upload + AI Analysis
Users can upload a photo, and the AI analyzes:
Skin tone
Face shape
Body structure
Current outfit

✔ AI Outfit Preview

If possible, the system uses Imagen to generate outfits.
If AI cannot generate, fallback displays curated sample images.

✔ Festival Mode

Special styling for:

Eid
Diwali
Weddings
Holi
Christmas
Traditional celebrations

✔ Responsive Modern UI

Works perfectly on mobile and desktop
Auto-scales images
No overlapping or broken layout
IMAM premium black-and-gold theme

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript (responsive layout + Flexbox + Grid)
AI Backend: Google AI Studio (Gemini + Imagen)
Styling: Custom CSS (Black × Gold IMAM theme)
Hosting: GitHub Pages (optional)

📸 Screenshots



🧠 How It Works

User selects event & preferences

(Optional) Uploads a photo
AI analyzes user traits
AI generates outfit, hairstyle, accessories, and festival-based style
AI provides a premium, human-like explanation
Optional outfit preview via Imagen or curated sample images

📁 Folder Structure

1.App.tsx
2.components
    CollagePre
    FestivalTog
    Footer.tsx
    Header.tsx
    InputPanel
    ResultCard
    ResultDispl
constants.ts
index.html
index.tsx
metadata.json
3.pages
    AppPage.tsx
    HomePage....
4.services
    apiService.ts
    geminiServ...
    types.ts
    
📌 Current Status

MVP Version 1 complete:
Event selector
Festival mode
Human-like recommendations
Image analysis
Imagen-based preview (when possible)

📅 Roadmap (Next)

Advanced AI outfit generation (full-body renders)

IMAM brand clothing integration
Wishlist + saved fits
Multi-language support
User accounts

© Branding

IMAM – Style Made Simple.
A premium stylist experience for everyone.
All rights reserved to IMAM (your personal brand).

💬 Contact

If you would like to collaborate or give feedback, feel free to reach out. 
shaikahmed1508@gmail.com




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
