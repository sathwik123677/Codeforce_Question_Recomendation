# 🚀 CF Question Recommendation
A modern React-based web application that provides personalized Codeforces problem recommendations based on a user's profile.
The frontend communicates with a Python backend hosted on Hugging Face Spaces and presents recommendations through a clean, responsive interface with Dark and Light themes.
## 🌐 Live Demo 
https://codeforce-question-recomendation.vercel.app/
---
# ✨ Features
- 🎯 Personalized Codeforces problem recommendations
- 👤 Codeforces profile analysis
- 📚 Topic-based recommendations
- 🌙 Dark / ☀️ Light mode
- 📱 Fully responsive UI
- ⚡ Fast React + Vite application
---
# 🛠 Tech Stack
## Frontend
- React
- Vite
- JavaScript
- Tailwind CSS v4
- Axios
- Framer Motion
- Lucide React
## Backend
- Python
- Codeforces API
- Hugging Face Spaces
---
# 📁 Project Structure
```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── RecommendationForm.jsx
│   │   ├── Result.jsx
│   │   ├── Loader.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── vite.config.js
└── README.md
```
---
# 🚀 Quick Start
## 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```
## 2. Navigate to the Project
```bash
cd YOUR_REPOSITORY
```
## 3. Install Dependencies
```bash
npm install
```
## 4. Create a `.env` File
```env
VITE_BACKEND_URL=https://your-huggingface-space.hf.space
```
## 5. Start the Development Server
```bash
npm run dev
```
---
# 🏗 Build for Production
```bash
npm run build
```
Preview the production build:

```bash
npm run preview
```
---
# 🌐 Backend
The frontend communicates with a Python backend deployed on Hugging Face Spaces.

The backend is responsible for:

- Fetching Codeforces profile
- Analyzing solved problems
- Generating personalized recommendations
- Returning profile analysis
- Returning recommended problems
---
# 👨‍💻 Author

**Sathwik Pathivada**
GitHub: https://github.com/sathwik123677
---
# 📄 License
This project is licensed under the MIT License.
