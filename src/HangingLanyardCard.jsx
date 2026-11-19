import React, { useState } from 'react';
import {
  RotateCcw,
  Calendar,
  Mail,
  Copy,
  Check,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  X,
  CheckCircle2,
  Clock,
  PartyPopper,
  Code2,
  Gamepad2,
  GraduationCap
} from 'lucide-react';

export default function HangingLanyardCard({ scrollProgress = 0, isMobile = false, onCardInteract }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Custom Event Contact Emails
  const contactEmails = [
    {
      id: 1,
      name: 'Shivam',
      email: 'shivamchy076@gmail.com',
    },
    {
      id: 2,
      name: 'Vikram',
      email: 'vikramsingh0007770@gmail.com',
    },
  ];

  const [copiedId, setCopiedId] = useState(null);

  // Call Schedule Modal States
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [callDate, setCallDate] = useState('');
  const [callTime, setCallTime] = useState('11:00 AM');
  const [eventType, setEventType] = useState('Cultural Fests');
  const [callerName, setCallerName] = useState('');
  const [callerEmail, setCallerEmail] = useState('');
  const [callerCollege, setCallerCollege] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const hostableEvents = [
    { id: 'fest', label: 'Cultural Fests', icon: PartyPopper },
    { id: 'hackathon', label: 'Hackathons', icon: Code2 },
    { id: 'gaming', label: 'Gaming & Esports', icon: Gamepad2 },
    { id: 'workshop', label: 'Tech Workshops', icon: GraduationCap },
  ];

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
          <div className="w-8 sm:w-9 h-11 sm:h-13 bg-gradient-to-b from-[#C43E00] via-[#FF6B00] to-[#E65100] shadow-md relative overflow-hidden flex flex-col items-center justify-between border-x border-[#9E3300]/40">
            {/* Woven fabric texture pattern */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000,#000_2px,transparent_2px,transparent_4px)]"></div>
            
            {/* Printed EVENTHUB branding running vertically */}
            <div className="relative z-10 flex flex-col items-center justify-around h-full py-1 text-white font-extrabold text-[8px] tracking-[0.25em] rotate-180 opacity-95 [writing-mode:vertical-rl]">
              <span>EVENTHUB</span>
            </div>
          </div>

          {/* Small Woven Side Tag / Badge Clip labeled "EVENTHUB" */}
          <div className="absolute -right-5 sm:-right-6 top-3 sm:top-4 bg-white border border-gray-200 text-[#FF6B00] px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1 font-black text-[7px] tracking-wider uppercase rotate-12 z-20">
            <span>EVENTHUB</span>
          </div>

          {/* --- 2. METALLIC SWIVEL HOOK / CLIP ASSEMBLY --- */}
          <div className="flex flex-col items-center -mt-0.5 z-10">
            {/* Metal Strap Clamp */}
            <div className="w-5 h-2 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-xs shadow-xs border border-gray-400"></div>

            {/* Metal Swivel Ring */}
            <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-transparent -mt-1 shadow-inner"></div>

            {/* Chrome Swivel Hook / Lobster Clasp */}
            <div className="w-3 h-4.5 bg-gradient-to-r from-gray-300 via-white to-gray-400 rounded-t-xs rounded-b-sm border border-gray-400 shadow-sm flex items-center justify-center -mt-1">
              <div className="w-1 h-2.5 bg-gray-500 rounded-full"></div>
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
            className={`w-[260px] sm:w-[270px] lg:w-[275px] h-[375px] sm:h-[390px] lg:h-[400px] relative preserve-3d cursor-pointer group ${
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
              <div className="bg-gradient-to-r from-[#FF7A1A] to-[#FF6B00] pt-2 pb-2 px-3.5 text-white relative">
                {/* Punch-hole cutout slot for the lanyard clip */}
                <div className="w-11 h-2.5 bg-[#421700]/70 rounded-full mx-auto mb-1.5 border border-black/30 shadow-inner flex items-center justify-center">
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

              {/* CENTER VISUAL: Sleek Glowing Orange Emblem + Brand Punchlines */}
              <div className="px-4 py-1.5 flex flex-col items-center text-center my-auto">
                {/* Glowing Brand Emblem */}
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#FF6B00] via-[#FF8533] to-[#FFA066] p-[2px] shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-orange-50/70"></div>
                      <CalendarDays className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF6B00] stroke-[2.2] relative z-10" />
                    </div>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-base font-extrabold text-[#111827] tracking-tight">
                  EventHub
                </h3>

                {/* Bold Catchy Punchline 1 */}
                <p className="text-[12px] font-bold text-gray-900 leading-snug mt-1 max-w-[220px]">
                  "Where Campus Culture <span className="text-[#FF6B00]">Connects</span>."
                </p>

                {/* Catchy Punchline 2 */}
                <p className="text-[10px] text-gray-500 mt-1 max-w-[210px] leading-relaxed">
                  Discover upcoming events, collaborate with teams, and never miss out on campus action.
                </p>
              </div>

              {/* BOTTOM SECTION: Mini Metadata Grid, Barcode & "Flip for more" Pill */}
              <div className="px-3.5 pb-2.5 pt-2 bg-[#FBFBFC] border-t border-gray-100">
                {/* Metadata Grid */}
                <div className="grid grid-cols-3 gap-1 pb-1.5 border-b border-gray-200/60 font-mono text-[8px] text-gray-500 uppercase tracking-tighter">
                  <div>
                    <span className="block text-[7px] text-gray-400">PLATFORM</span>
                    <span className="font-bold text-gray-800 truncate block">EventHub</span>
                  </div>
                  <div>
                    <span className="block text-[7px] text-gray-400">ACCESS</span>
                    <span className="font-bold text-[#FF6B00] truncate block">All Campus</span>
                  </div>
                  <div>
                    <span className="block text-[7px] text-gray-400">PASS</span>
                    <span className="font-bold text-gray-800 truncate block">Official 2026</span>
                  </div>
                </div>

                {/* Barcode & Flip Indicator Row */}
                <div className="flex items-center justify-between pt-1.5">
                  {/* Decorative Barcode */}
                  <div className="flex items-center gap-[2px] opacity-80" title="Pass Barcode">
                    <div className="w-[2px] h-4 bg-gray-900"></div>
                    <div className="w-[1px] h-4 bg-gray-900"></div>
                    <div className="w-[3px] h-4 bg-gray-900"></div>
                    <div className="w-[1px] h-4 bg-gray-900"></div>
                    <div className="w-[2px] h-4 bg-gray-900"></div>
                    <div className="w-[1px] h-4 bg-gray-900"></div>
                    <div className="w-[3px] h-4 bg-gray-900"></div>
                    <div className="w-[2px] h-4 bg-gray-900"></div>
                    <div className="w-[1px] h-4 bg-gray-900"></div>
                    <div className="w-[2px] h-4 bg-gray-900"></div>
                    <div className="w-[1px] h-4 bg-gray-900"></div>
                    <div className="w-[3px] h-4 bg-gray-900"></div>
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
                  <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    HOST AN EVENT • EVENTHUB
                  </span>
                  
                  {/* Subtle Flip Back Pill */}
                  <span className="text-[9px] font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span>Front</span>
                    <RotateCcw className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="px-3.5 py-2.5 flex-1 overflow-y-auto space-y-3.5">
                
                {/* 1. HOSTABLE CAMPUS EVENTS (More Events Added) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9.5px] font-bold text-gray-800 uppercase tracking-tight flex items-center gap-1">
                      <CalendarDays className="w-3 h-3 text-[#FF6B00]" />
                      Hostable Campus Events
                    </span>
                    <span className="text-[7.5px] font-bold text-[#FF6B00] bg-orange-50 px-1.5 py-0.5 rounded-full border border-orange-200">
                      Live on Campus
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[9px] font-semibold text-gray-800">
                    {hostableEvents.map((evt) => {
                      const IconComp = evt.icon;
                      return (
                        <div
                          key={evt.id}
                          className="bg-gray-50 hover:bg-orange-50/70 border border-gray-100 hover:border-orange-200 rounded-lg px-2 py-1.5 flex items-center gap-2 transition-colors shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-md bg-white border border-gray-200/80 flex items-center justify-center flex-shrink-0 text-[#FF6B00] shadow-xs">
                            <IconComp className="w-3 h-3 stroke-[2.2]" />
                          </div>
                          <span className="truncate">{evt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. FOR CUSTOM EVENTS, CONTACT US (Generous Space & Divider) */}
                <div className="pt-2.5 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-gray-800 uppercase tracking-tight mb-2">
                    <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>For Custom Events, Contact Us:</span>
                  </div>

                  <div className="space-y-1.5">
                    {contactEmails.map((item) => (
                      <div
                        key={item.id}
                        className="px-2.5 py-1.5 rounded-xl bg-orange-50/70 border border-orange-100 hover:border-orange-300 transition-colors flex items-center justify-between group/contact"
                      >
                        <div className="overflow-hidden pr-1.5 flex-1 min-w-0">
                          <span className="text-[9.5px] font-bold text-gray-800 uppercase tracking-tight block leading-tight">
                            {item.name}
                          </span>
                          <span
                            className="text-[10.5px] font-semibold text-gray-700 truncate font-mono block select-all mt-0.5"
                            title={item.email}
                          >
                            {item.email}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleCopy(e, item.email, item.id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer flex-shrink-0 ${
                            copiedId === item.id
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                          title="Copy email"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* PROMINENT BUTTON: "Host an Event • Book a Call" */}
              <div className="p-2.5 bg-gray-50/80 border-t border-gray-100 flex flex-col items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardInteract?.();
                    setQuickDate(1);
                    setIsScheduleOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-[0.985] text-white font-bold text-[11px] shadow-float transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Host an Event • Book a Call</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <p className="text-[9px] text-gray-400 mt-1 text-center">
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
                <h4 className="text-sm font-bold">Host an Event • Book a Call</h4>
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
                  {/* Event Type Picker */}
                  <div>
                    <label className="font-semibold text-gray-700 text-[11px] block mb-1">
                      Select Event Type
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {hostableEvents.map((et) => {
                        const IconComp = et.icon;
                        return (
                          <button
                            key={et.id}
                            type="button"
                            onClick={() => setEventType(et.label)}
                            className={`py-2 px-2.5 rounded-xl border text-left font-semibold text-[10.5px] transition-colors flex items-center gap-2 cursor-pointer ${
                              eventType === et.label
                                ? 'bg-orange-50 border-[#FF6B00] text-[#FF6B00] font-bold shadow-xs'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <IconComp className="w-3.5 h-3.5 flex-shrink-0 text-[#FF6B00]" />
                            <span className="truncate">{et.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

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
                    <label className="font-semibold text-gray-700 text-[11px] block mb-1">Organizer / Your Name</label>
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
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Confirm Event Booking</span>
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
                    <h5 className="font-bold text-base text-gray-900">Event Host Request Booked!</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Calendar invite and onboarding link sent to <span className="font-semibold">{callerEmail}</span>.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-left font-mono text-[10px] space-y-1">
                    <div><span className="text-gray-400">Event Type:</span> <span className="font-bold text-[#FF6B00]">{eventType}</span></div>
                    <div><span className="text-gray-400">Date:</span> <span className="font-bold">{callDate}</span></div>
                    <div><span className="text-gray-400">Time:</span> <span className="font-bold">{callTime}</span></div>
                    <div><span className="text-gray-400">Developers:</span> <span className="font-bold text-gray-800">Shivam & Vikram</span></div>
                    <div className="pt-1.5 text-[9px] text-gray-500 font-sans border-t border-gray-200 mt-1">
                      Dispatched to: <span className="font-mono text-gray-700">shivamchy076@gmail.com</span> & <span className="font-mono text-gray-700">vikramsingh0007770@gmail.com</span>
                    </div>
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
