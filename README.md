# EventHub - College Event Management & Verification Platform

A modern, responsive authentication interface and 3D interactive showcase for **EventHub**, built with **React.js (Vite)**, **Tailwind CSS**, and **Lucide React**.

---

## ✨ Features

- **Only Two Dedicated Views**: Clean **Log In** and **Create Account** forms.
- **Interactive 3D Hanging Lanyard ID Card**:
  - Continuous gentle pendulum sway animation (`@keyframes continuousSway`).
  - Realistic woven strap printed with `"EVENTHUB"` and metallic swivel clasp.
  - **Click/Tap-Anywhere Two-Way 3D Flip (`rotateY(180deg)`)**:
    - **Front**: EventHub AI campus pass, catchy punchline, metadata grid & barcode.
    - **Back**: Team contacts (`vikram@eventhub.in`, `shivam@eventhub.in`) with one-click copy, contact management, and interactive **Schedule a Call** modal.
- **Top Viewport Switcher Toolbar**:
  - Live instant toggle between **Desktop (1040px)**, **Tablet (768px)**, and **Mobile (400px)** preview layouts.
- **Mobile 3-Second Timed Auto-Scroll & 3D Sheet Glide**:
  - Auto-scrolls smoothly down to the form after 3 seconds with a live countdown indicator.
  - **Smart Interaction Override**: Cancels immediately if the user touches the screen, scrolls manually, or taps to flip the ID card.
  - Physics-inspired 3D depth recede (`scale(0.86)`, `rotateX(12deg)`, `translateY(-28px)`, depth blur) and elevated sheet glide.
  - Circular `<` back button smoothly scrolls back up to the ID card.
- **Create Account Flow**:
  - Student vs Faculty role selection.
  - Drag-and-drop ID proof upload dropzone (JPG, PNG, PDF) with preview and remove.
  - FastAPI-ready `FormData` payload inspector modal.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd "mini project"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
