# Focus Booster

A React-based Pomodoro timer app built with Vite + MUI + Recharts.

## Features
- **Pomodoro Timer**: 25min work, 5min short break, 15min long break
- **Progress Tracking**: Charts of focus sessions (Recharts)
- **Dashboard**: Sidebar nav, Header, Cards (Timer, Quote, Progress)
- **Auth**: Login/Signup (localStorage)
- **Responsive**: MUI theme, mobile-friendly
- **Settings**: Work/break times, auto-next, sounds

## Tech Stack
- React 19
- Vite (fast HMR)
- MUI (Material UI) for components/theme
- Recharts for progress charts
- React Router for routes

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Routes**:
- `/` or `/login` - Auth
- `/dashboard` - Main app
- `/timer` - Timer page
- `/progress` - Stats

## Structure
```
focus-booster/
│
├── public/
│   ├── alarm.mp3
│   ├── Bell.mp3
│   ├── Beep.mp3
│   └── icons.svg
│
├── src/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   │
│   ├── components/
│   │   ├── AICoach.jsx
│   │   ├── Analytics.jsx
│   │   ├── Header.jsx
│   │   ├── Heatmap.jsx
│   │   ├── Profile.jsx
│   │   ├── ProgressCard.jsx
│   │   ├── QuoteCard.jsx
│   │   ├── Settings.jsx
│   │   ├── Sidebar.jsx
│   │   └── TimerCard.jsx
│   │
│   ├── server/          👈 (IMPORTANT)
│   │   └── index.js     👈 Backend API (AI logic)
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── utils/
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
