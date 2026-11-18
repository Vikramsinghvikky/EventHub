import React, { useState } from 'react';
import Auth from './Auth';
import { Calendar, Monitor, Tablet, Smartphone, Sparkles, Layers } from 'lucide-react';

export default function App() {
  // Live Device Viewport Preview Mode: 'desktop' | 'tablet' | 'mobile'
  const [previewMode, setPreviewMode] = useState('desktop');

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col justify-between items-center px-3 sm:px-6 lg:px-8 py-3 sm:py-5 relative overflow-x-hidden selection:bg-[#FF6B00] selection:text-white">
      {/* Background Soft Ambient Light Blobs */}
      <div className="fixed top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-orange-200/25 blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-amber-100/35 blur-[140px] pointer-events-none"></div>

      {/* Top Header & Floating Viewport Switcher Toolbar */}
      <header className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 pb-3 z-30">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <Calendar className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-gray-900">EventHub</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#FF6B00] border border-[#FED7AA]">
                AI PASS
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:block">
              College Event Management Platform
            </p>
          </div>
        </div>

        {/* =========================================================
            FLOATING DEVICE VIEWPORT SWITCHER (Desktop / Tablet / Mobile)
           ========================================================= */}
        <div className="flex items-center bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-gray-200/90 shadow-lg shadow-black/5 text-xs select-none">
          
          <div className="hidden md:flex items-center gap-1 pl-2.5 pr-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-200/80 mr-1">
            <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Preview:</span>
          </div>

          {/* 1. Desktop Button (1040px wide split-screen) */}
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 cursor-pointer ${
              previewMode === 'desktop'
                ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-400'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Desktop View (1040px Wide Split Screen)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="text-xs">Desktop</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                previewMode === 'desktop'
                  ? 'bg-black/20 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              1040px
            </span>
          </button>

          {/* 2. Tablet Button (768px compact two-column) */}
          <button
            type="button"
            onClick={() => setPreviewMode('tablet')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 cursor-pointer ${
              previewMode === 'tablet'
                ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-400'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Tablet View (768px Compact Split Screen)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="text-xs">Tablet</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                previewMode === 'tablet'
                  ? 'bg-black/20 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              768px
            </span>
          </button>

          {/* 3. Mobile Button (400px stacked hero + form) */}
          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all duration-200 cursor-pointer ${
              previewMode === 'mobile'
                ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-400'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Mobile View (400px Stacked View)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-xs">Mobile</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                previewMode === 'mobile'
                  ? 'bg-black/20 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              400px
            </span>
          </button>
        </div>

      </header>

      {/* Main Authentication & 3D Hanging Lanyard Showcase */}
      <main className="w-full flex-1 flex justify-center items-center z-10 my-auto py-1">
        <Auth previewMode={previewMode} />
      </main>

      {/* Brand Footer */}
      <footer className="text-center py-2 text-xs text-gray-400 z-10 select-none">
        <p>© {new Date().getFullYear()} EventHub • College Event Management & Verification Platform</p>
      </footer>
    </div>
  );
}
