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
src/
├── components/     # Sidebar, Header
