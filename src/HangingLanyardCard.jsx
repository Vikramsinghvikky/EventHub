import React, { useState } from 'react';
import {
  RotateCcw,
  Bot,
  Calendar,
  Sparkles,
  Mail,
  Copy,
  Check,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  X,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';

export default function HangingLanyardCard({ scrollProgress = 0, isMobile = false, onCardInteract }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Team contact emails
  const [teamEmails, setTeamEmails] = useState([
    { id: 1, name: 'Vikram', role: 'Event Operations', email: 'vikram@eventhub.in' },
    { id: 2, name: 'Shivam', role: 'AI Architecture', email: 'shivam@eventhub.in' },
  ]);

  const [copiedId, setCopiedId] = useState(null);
  const [isEditingEmails, setIsEditingEmails] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Call Schedule Modal States
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [callDate, setCallDate] = useState('');
  const [callTime, setCallTime] = useState('11:00 AM');
  const [callerName, setCallerName] = useState('');
  const [callerEmail, setCallerEmail] = useState('');
  const [callerCollege, setCallerCollege] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'];

  const setQuickDate = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setCallDate(d.toISOString().split('T')[0]);
  };

  const handleCopy = (e, email, id) => {
    e.stopPropagation();
    onCardInteract?.();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddEmail = (e) => {
    e.stopPropagation();
    if (!newEmail.trim() || !newRole.trim()) return;
    setTeamEmails((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim() || 'Team Member',
        role: newRole.trim(),
        email: newEmail.trim(),
      },
    ]);
    setNewName('');
    setNewRole('');
    setNewEmail('');
  };

  const handleDeleteEmail = (e, id) => {
    e.stopPropagation();
    if (teamEmails.length <= 1) return;
    setTeamEmails((prev) => prev.filter((item) => item.id !== id));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingConfirmed(true);
    }, 700);
  };

  const closeScheduleModal = () => {
    setIsScheduleOpen(false);
    setBookingConfirmed(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start pt-1 pb-2 relative select-none">
      
      {/* =========================================================
          CONTINUOUS SWAYING ASSEMBLY (Lanyard Strap + Clip + ID Card)
         ========================================================= */}
      <div className="flex flex-col items-center animate-lanyard-sway">
        
        {/* --- 1. LANYARD STRAP (Hanging from top edge) --- */}
        <div className="relative flex flex-col items-center">
          {/* Main Woven Texture Strap with printed EVENTHUB */}
          <div className="w-9 sm:w-10 h-14 sm:h-18 bg-gradient-to-b from-[#C43E00] via-[#FF6B00] to-[#E65100] shadow-md relative overflow-hidden flex flex-col items-center justify-between border-x border-[#9E3300]/40">
            {/* Woven fabric texture pattern */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_4px)]"></div>
            
            {/* Printed EVENTHUB branding running vertically */}
            <div className="relative z-10 flex flex-col items-center justify-around h-full py-1 text-white font-extrabold text-[8px] tracking-[0.25em] rotate-180 opacity-95 [writing-mode:vertical-rl]">
              <span>EVENTHUB</span>
            </div>
          </div>

          {/* Small Woven Side Tag / Badge Clip labeled "EVENTHUB" */}
          <div className="absolute -right-7 sm:-right-8 top-5 sm:top-7 bg-white border border-gray-200 text-[#FF6B00] px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1 font-black text-[7px] tracking-wider uppercase rotate-12 z-20">
            <span>EVENTHUB</span>
          </div>

          {/* --- 2. METALLIC SWIVEL HOOK / CLIP ASSEMBLY --- */}
          <div className="flex flex-col items-center -mt-0.5 z-10">
            {/* Metal Strap Clamp */}
            <div className="w-6 h-2 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-xs shadow-xs border border-gray-400"></div>

            {/* Metal Swivel Ring */}
            <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-transparent -mt-1 shadow-inner"></div>

            {/* Chrome Swivel Hook / Lobster Clasp */}
            <div className="w-3 h-5 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-t-xs rounded-b-sm border border-gray-400 shadow-sm flex items-center justify-center -mt-1">
              <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* --- 3. 3D FLIPPABLE ID CARD CONTAINER WITH PHYSICS SCROLL PARALLAX --- */}
        <div
          className="perspective-1000 -mt-1"
          style={{
            transform: isMobile
              ? `perspective(1000px) scale(${1 - scrollProgress * 0.14}) translateY(-${scrollProgress * 28}px) rotateX(${scrollProgress * 12}deg)`
              : undefined,
            opacity: isMobile ? Math.max(1 - scrollProgress * 1.05, 0) : 1,
            filter: isMobile ? `blur(${scrollProgress * 2}px)` : undefined,
            transition: 'transform 0.18s ease-out, opacity 0.18s ease-out, filter 0.18s ease-out',
          }}
        >
          {/* 
            Entire outer 3D card wrapper:
            - Tap anywhere on Front -> Flips to Back (rotateY(180deg))
            - Tap anywhere on Back -> Flips back to Front (rotateY(0deg))
            - Uses spring cubic-bezier(0.34, 1.56, 0.64, 1) for tactile 3D snap
          */}
          <div
            onClick={() => {
              onCardInteract?.();
              setIsFlipped((prev) => !prev);
            }}
            className={`w-[275px] sm:w-[295px] h-[395px] sm:h-[415px] relative preserve-3d cursor-pointer group ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{
              transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            title={isFlipped ? "Tap anywhere to return to front" : "Tap anywhere to flip card"}
          >
            
            {/* =========================================================
                FRONT SIDE (Theme-Matched Clean ID Card — No Photo)
               ========================================================= */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white shadow-2xl border border-gray-200/90 overflow-hidden flex flex-col justify-between text-gray-900 select-none">
              
              {/* TOP SECTION: Slot Cutout & Orange Header Band */}
              <div className="bg-gradient-to-r from-[#FF7A1A] to-[#FF6B00] pt-2 pb-2.5 px-3.5 text-white relative">
                {/* Punch-hole cutout slot for the lanyard clip */}
                <div className="w-11 h-2.5 bg-[#421700]/70 rounded-full mx-auto mb-2 border border-black/30 shadow-inner flex items-center justify-center">
                  <div className="w-4 h-1 bg-[#1A0A00] rounded-full"></div>
                </div>

                {/* Brand Header Band */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <Calendar className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="font-extrabold text-sm tracking-tight">EVENTHUB</span>
                  </div>

                  {/* Official Pass Pill */}
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full border border-white/30 text-white">
                    OFFICIAL PASS
                  </span>
                </div>
              </div>

              {/* CENTER VISUAL: Sleek Glowing Orange AI Emblem + Punchline (Replaces Photo) */}
              <div className="px-4 py-2 flex flex-col items-center text-center my-auto">
                {/* Glowing AI Emblem */}
                <div className="relative mb-2.5">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-[#FF6B00] via-[#FF8533] to-[#FFA066] p-[2px] shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-orange-50/70"></div>
                      <Bot className="w-8 h-8 sm:w-9 sm:h-9 text-[#FF6B00] stroke-[1.9] relative z-10" />
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute top-1.5 right-1.5 animate-pulse z-10" />
                    </div>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-base font-extrabold text-[#111827] tracking-tight">
                  EventHub AI
                </h3>

                {/* Bold Catchy Punchline */}
                <p className="text-[12px] font-bold text-gray-800 leading-snug mt-1 max-w-[240px]">
                  "Organize college events{' '}
                  <span className="text-[#FF6B00]">100% stress-free</span> with our AI Agent Chatbot."
                </p>

                <p className="text-[10px] text-gray-500 mt-1 max-w-[220px] leading-tight">
                  Autonomous hall booking, faculty approvals & live campus passes.
                </p>
              </div>

              {/* BOTTOM SECTION: Mini Metadata Grid, Barcode & "Flip for more" Pill */}
              <div className="px-3.5 pb-3 pt-2 bg-[#FBFBFC] border-t border-gray-100">
                {/* Metadata Grid */}
                <div className="grid grid-cols-3 gap-1 pb-2 border-b border-gray-200/60 font-mono text-[8px] text-gray-500 uppercase tracking-tighter">
                  <div>
                    <span className="block text-[7px] text-gray-400">SYSTEM</span>
                    <span className="font-bold text-gray-800">AI Co-Pilot</span>
                  </div>
                  <div>
                    <span className="block text-[7px] text-gray-400">MODE</span>
                    <span className="font-bold text-[#FF6B00]">Stress-Free</span>
                  </div>
                  <div>
                    <span className="block text-[7px] text-gray-400">ACCESS</span>
                    <span className="font-bold text-gray-800">Campus Wide</span>
                  </div>
                </div>

                {/* Barcode & Flip Indicator Row */}
                <div className="flex items-center justify-between pt-2">
                  {/* Decorative Barcode */}
                  <div className="flex items-center gap-[2px] opacity-80" title="Pass Barcode">
                    <div className="w-[2px] h-5 bg-gray-900"></div>
                    <div className="w-[1px] h-5 bg-gray-900"></div>
                    <div className="w-[3px] h-5 bg-gray-900"></div>
                    <div className="w-[1px] h-5 bg-gray-900"></div>
                    <div className="w-[2px] h-5 bg-gray-900"></div>
                    <div className="w-[1px] h-5 bg-gray-900"></div>
                    <div className="w-[3px] h-5 bg-gray-900"></div>
                    <div className="w-[2px] h-5 bg-gray-900"></div>
                    <div className="w-[1px] h-5 bg-gray-900"></div>
                    <div className="w-[2px] h-5 bg-gray-900"></div>
                    <div className="w-[1px] h-5 bg-gray-900"></div>
                    <div className="w-[3px] h-5 bg-gray-900"></div>
                  </div>

                  {/* "Flip for more" Pill Indicator */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 group-hover:bg-[#FF6B00] border border-[#FED7AA] group-hover:border-[#FF6B00] text-[#FF6B00] group-hover:text-white text-[10px] font-bold transition-all shadow-xs">
                    <span>Flip for more</span>
                    <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                </div>
              </div>

            </div>


            {/* =========================================================
                BACK SIDE (Tap-Anywhere Two-Way Flip Back + Contacts)
               ========================================================= */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col justify-between text-gray-900 select-none">
              
              {/* TOP SECTION: Slot Cutout & Magnetic-stripe Style Orange Header */}
              <div>
                {/* Slot Cutout Area */}
                <div className="pt-2 pb-1 bg-gray-50 border-b border-gray-100">
                  <div className="w-11 h-2.5 bg-[#421700]/70 rounded-full mx-auto border border-black/30 shadow-inner flex items-center justify-center">
                    <div className="w-4 h-1 bg-[#1A0A00] rounded-full"></div>
                  </div>
                </div>

                {/* Magnetic-stripe style orange accent bar */}
                <div className="bg-gradient-to-r from-[#FF6B00] to-[#E65100] px-3.5 py-1.5 text-white flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    OUR CONTACT INFO
                  </span>
                  
                  {/* Subtle Flip Back Pill */}
                  <span className="text-[9px] font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Front</span>
                    <RotateCcw className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>

              {/* CONTACT INFO BODY: Team Emails (vikram@eventhub.in & shivam@eventhub.in) */}
              <div className="px-3.5 py-2 flex-1 overflow-y-auto space-y-2">
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#FF6B00]" />
                    Direct Team Contacts
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCardInteract?.();
                      setIsEditingEmails(!isEditingEmails);
                    }}
                    className="text-[9px] text-[#FF6B00] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                    <span>{isEditingEmails ? 'Done' : 'Edit'}</span>
                  </button>
                </div>

                {/* Email Cards List */}
                <div className="space-y-1.5">
                  {teamEmails.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-xl bg-orange-50/50 border border-orange-100 hover:border-orange-300 transition-colors flex items-center justify-between group/contact"
                    >
                      <div className="overflow-hidden pr-1">
                        <div className="text-[9px] font-bold text-gray-500 uppercase leading-none">
                          {item.name} • {item.role}
                        </div>
                        <div className="text-[11px] font-bold text-gray-900 truncate mt-0.5 font-mono">
                          {item.email}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Copy Button */}
                        <button
                          type="button"
                          onClick={(e) => handleCopy(e, item.email, item.id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            copiedId === item.id
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                          title="Copy email"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                        {/* Delete Button (if editing) */}
                        {isEditingEmails && teamEmails.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteEmail(e, item.id)}
                            className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline Add Email Form */}
                {isEditingEmails && (
                  <div
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 space-y-1 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-2 gap-1">
                      <input
                        type="text"
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-2 py-1 rounded bg-white border border-gray-300 text-[10px]"
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="px-2 py-1 rounded bg-white border border-gray-300 text-[10px]"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="email@eventhub.in"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-2 py-1 rounded bg-white border border-gray-300 text-[10px]"
                    />
                    <button
                      type="button"
                      onClick={handleAddEmail}
                      className="w-full py-1 rounded bg-[#FF6B00] text-white font-bold text-[10px] hover:bg-[#EA5E00] cursor-pointer"
                    >
                      + Add Email
                    </button>
                  </div>
                )}
              </div>

              {/* PROMINENT BUTTON: "Contact / Schedule a Call" */}
              <div className="p-3 bg-gray-50/80 border-t border-gray-100 flex flex-col items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Clicking the button opens the modal without flipping the card
                    onCardInteract?.();
                    setQuickDate(1);
                    setIsScheduleOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-[0.985] text-white font-bold text-xs shadow-float transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Contact / Schedule a Call</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <p className="text-[9px] text-gray-400 mt-1.5 text-center">
                  Tap anywhere on card to flip back
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* =========================================================
          SCHEDULE A CALL MODAL (Date, Time Slot & Email Picker)
         ========================================================= */}
      {isScheduleOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-view-fade"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-orange-500 to-[#FF6B00] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-white" />
                <h4 className="text-sm font-bold">Schedule an EventHub Call</h4>
              </div>
              <button
                type="button"
                onClick={closeScheduleModal}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 text-xs text-gray-800 space-y-3">
              {!bookingConfirmed ? (
                <form onSubmit={handleScheduleSubmit} className="space-y-3">
                  {/* Date Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-gray-700 text-[11px]">Pick a Date</label>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setQuickDate(0)}
                          className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-orange-100 text-[9px] font-semibold cursor-pointer"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate(1)}
                          className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-orange-100 text-[9px] font-semibold cursor-pointer"
                        >
                          Tomorrow
                        </button>
                      </div>
                    </div>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={callDate}
                      onChange={(e) => setCallDate(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  {/* Time Slot Picker */}
                  <div>
                    <label className="font-semibold text-gray-700 text-[11px] block mb-1">Preferred Time</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setCallTime(slot)}
                          className={`py-1.5 px-2 rounded-lg border text-center font-bold text-[11px] transition-colors cursor-pointer ${
                            callTime === slot
                              ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Attendee Info */}
                  <div>
                    <label className="font-semibold text-gray-700 text-[11px] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={callerName}
                      onChange={(e) => setCallerName(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 text-[11px] block mb-1">College Email</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@college.edu"
                      value={callerEmail}
                      onChange={(e) => setCallerEmail(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 text-[11px] block mb-1">College Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RVCE Bangalore"
                      value={callerCollege}
                      onChange={(e) => setCallerCollege(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  {/* Confirm CTA */}
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] text-white font-bold text-xs shadow-float transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Scheduling...</span>
                      </>
                    ) : (
                      <>
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Confirm Call Booking</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Confirmation */
                <div className="py-3 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-gray-900">Call Confirmed!</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Calendar invite sent to <span className="font-semibold">{callerEmail}</span>.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-left font-mono text-[10px] space-y-1">
                    <div><span className="text-gray-400">Date:</span> <span className="font-bold">{callDate}</span></div>
                    <div><span className="text-gray-400">Time:</span> <span className="font-bold">{callTime}</span></div>
                    <div><span className="text-gray-400">Host:</span> <span className="font-bold text-[#FF6B00]">Vikram / Shivam</span></div>
                  </div>
                  <button
                    type="button"
                    onClick={closeScheduleModal}
                    className="w-full py-2 rounded-full bg-[#111827] text-white text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
