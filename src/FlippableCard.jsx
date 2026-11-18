import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Bot,
  Calendar,
  Mail,
  Phone,
  Clock,
  Check,
  Copy,
  ChevronRight,
  X,
  CheckCircle2,
  Send,
  Plus,
  Edit2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  User,
  Building
} from 'lucide-react';

export default function FlippableCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Team contact emails (customizable)
  const [teamEmails, setTeamEmails] = useState([
    { id: 1, role: 'Event Operations', email: 'events@eventhub.edu' },
    { id: 2, role: 'AI Agent Support', email: 'ai-support@eventhub.edu' },
    { id: 3, role: 'Campus Partnerships', email: 'partner@eventhub.edu' },
  ]);

  const [copiedId, setCopiedId] = useState(null);
  const [editingEmails, setEditingEmails] = useState(false);
  const [newEmailRole, setNewEmailRole] = useState('');
  const [newEmailAddr, setNewEmailAddr] = useState('');

  // Schedule Call Modal States
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [callDate, setCallDate] = useState('');
  const [callTime, setCallTime] = useState('11:00 AM');
  const [callerName, setCallerName] = useState('');
  const [callerEmail, setCallerEmail] = useState('');
  const [callerCollege, setCallerCollege] = useState('');
  const [callTopic, setCallTopic] = useState('AI Chatbot Event Integration');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Time slots for picker
  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  // Quick date options
  const setQuickDate = (daysFromNow) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setCallDate(d.toISOString().split('T')[0]);
  };

  const handleCopyEmail = (e, email, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddEmail = (e) => {
    e.stopPropagation();
    if (!newEmailRole.trim() || !newEmailAddr.trim()) return;
    setTeamEmails((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: newEmailRole.trim(),
        email: newEmailAddr.trim(),
      },
    ]);
    setNewEmailRole('');
    setNewEmailAddr('');
  };

  const handleDeleteEmail = (e, id) => {
    e.stopPropagation();
    setTeamEmails((prev) => prev.filter((item) => item.id !== id));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingConfirmed(true);
    }, 800);
  };

  const resetScheduleForm = () => {
    setIsScheduleModalOpen(false);
    setBookingConfirmed(false);
    setCallerName('');
    setCallerEmail('');
    setCallerCollege('');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-3 sm:p-6">
      
      {/* 3D Perspective Card Container */}
      <div className="w-full max-w-[420px] sm:max-w-[460px] h-[520px] sm:h-[540px] perspective-1000">
        
        {/* Flippable Card Inner Element */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full h-full relative preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer group ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >

          {/* =========================================================
              FRONT SIDE (Clean & Minimal)
             ========================================================= */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#1E1E24] via-[#111827] to-[#0A0D14] text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl border border-white/10 overflow-hidden select-none">
            
            {/* Ambient Background Decorative Glow */}
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#FF6B00]/25 blur-3xl pointer-events-none group-hover:bg-[#FF6B00]/35 transition-all duration-500"></div>
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>

            {/* Subtle Grid / Star Mesh Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {/* Top Row: EventHub Brand Badge & AI Live Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              {/* EventHub Brand Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-[#FF6B00] flex items-center justify-center text-white">
                  <Calendar className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="font-extrabold text-sm tracking-tight text-white">
                  EventHub
                </span>
              </div>

              {/* AI Agent Status Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping"></span>
                <Bot className="w-3.5 h-3.5" />
                <span>AI Agent Active</span>
              </div>
            </div>

            {/* Center Content: AI Mascot Avatar + Bold Catchy Punchline */}
            <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
              
              {/* Glowing Holographic AI Icon / Avatar */}
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#FF6B00] via-[#FF8533] to-[#FFA066] p-[2px] shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-[#111827] rounded-[22px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent"></div>
                    <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF6B00] stroke-[1.8]" />
                    <Sparkles className="w-4 h-4 text-amber-300 absolute top-2 right-2 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Bold, Catchy Punchline (Clean & Punchy) */}
              <h2 className="text-[23px] sm:text-[26px] font-extrabold text-white leading-snug tracking-tight max-w-[340px]">
                Organize college events{' '}
                <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8A3D] to-[#FFA76B] bg-clip-text text-transparent">
                  100% stress-free
                </span>{' '}
                with our AI Agent Chatbot.
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-3 max-w-[300px] leading-relaxed">
                Autonomous hall booking, faculty approvals, and real-time student ticketing handled in seconds.
              </p>
            </div>

            {/* Bottom Row: Clean "Flip for more" Indicator / Button */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs">
              <span className="text-gray-400 text-[11px] sm:text-xs">
                Tap anywhere to flip card
              </span>

              {/* Small, clean "Flip for more" button */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 group-hover:bg-[#FF6B00] border border-white/20 group-hover:border-[#FF6B00] text-white text-xs font-semibold shadow-sm transition-all duration-300">
                <span>Flip for more</span>
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.2] group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </div>

          </div>


          {/* =========================================================
              BACK SIDE (Contact Info & Scheduling)
             ========================================================= */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[32px] sm:rounded-[36px] bg-[#FFFFFF] text-gray-900 p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* Header: Title & Flip Back Action */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                  <Calendar className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">EventHub Connect</h3>
                  <p className="text-[10px] text-gray-500">Contact & Demo Booking</p>
                </div>
              </div>

              {/* Small Flip Back Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-[#FF6B00] text-[11px] font-semibold transition-colors"
                title="Flip back to front"
              >
                <span>Front</span>
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Middle Section: Our Contact Info */}
            <div
              className="flex-1 overflow-y-auto py-3 space-y-3"
              onClick={(e) => e.stopPropagation()} // Prevent card flip when interacting with contacts
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                  Our Contact Info
                </span>

                <button
                  type="button"
                  onClick={() => setEditingEmails(!editingEmails)}
                  className="text-[11px] text-[#FF6B00] hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{editingEmails ? 'Done' : 'Customize'}</span>
                </button>
              </div>

              {/* Customizable Team Email List */}
              <div className="space-y-2">
                {teamEmails.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-2xl bg-[#F8F9FA] border border-gray-200/80 hover:border-orange-200 transition-colors flex items-center justify-between group/item"
                  >
                    <div className="overflow-hidden pr-2">
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight">
                        {item.role}
                      </div>
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {item.email}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Copy Email Button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyEmail(e, item.email, item.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          copiedId === item.id
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                        title="Copy email address"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Delete (when editing) */}
                      {editingEmails && teamEmails.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteEmail(e, item.id)}
                          className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200"
                          title="Remove this email"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline Custom Email Adder when in editing mode */}
              {editingEmails && (
                <div className="p-2.5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-orange-950">Add Team Contact</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Role (e.g. Dean Office)"
                      value={newEmailRole}
                      onChange={(e) => setNewEmailRole(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                    <input
                      type="email"
                      placeholder="email@college.edu"
                      value={newEmailAddr}
                      onChange={(e) => setNewEmailAddr(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 text-xs focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="w-full py-1.5 rounded-lg bg-[#FF6B00] text-white font-semibold text-xs hover:bg-[#EA5E00] flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Contact</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Section: Prominent "Contact / Schedule a Call" Button */}
            <div
              className="pt-3 border-t border-gray-100"
              onClick={(e) => e.stopPropagation()} // Prevent card flip on button click
            >
              <button
                type="button"
                onClick={() => {
                  setQuickDate(1); // default to tomorrow
                  setIsScheduleModalOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-[0.985] text-white font-semibold text-sm shadow-float transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 stroke-[2.2]" />
                <span>Contact / Schedule a Call</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
          SCHEDULE A CALL MODAL (Date & Time Picker Form)
         ========================================================= */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-view-fade">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-orange-500 via-[#FF6B00] to-amber-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Schedule an EventHub Call</h3>
                  <p className="text-xs text-orange-100">Pick a convenient date & time</p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetScheduleForm}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              {!bookingConfirmed ? (
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  {/* Topic Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Meeting Topic
                    </label>
                    <select
                      value={callTopic}
                      onChange={(e) => setCallTopic(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-[#F9FAFB] text-xs font-medium text-gray-800 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                    >
                      <option value="AI Chatbot Event Integration">🤖 AI Chatbot Event Integration</option>
                      <option value="Campus Fest Planning & Passes">🎟️ Campus Fest Planning & Passes</option>
                      <option value="College Administration Demo">🏫 College Administration Demo</option>
                      <option value="Hackathon Sponsorship & Setup">⚡ Hackathon Sponsorship & Setup</option>
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-gray-700">
                        Select Date
                      </label>
                      {/* Quick Date Pills */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setQuickDate(0)}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-gray-100 hover:bg-orange-100 text-gray-700 font-medium"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickDate(1)}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-gray-100 hover:bg-orange-100 text-gray-700 font-medium"
                        >
                          Tomorrow
                        </button>
                      </div>
                    </div>
                    <input
                      type="date"
                      required
                      value={callDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCallDate(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                    />
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Select Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setCallTime(slot)}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                            callTime === slot
                              ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-sm'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Caller Details */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Johnson"
                        value={callerName}
                        onChange={(e) => setCallerName(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@college.edu"
                          value={callerEmail}
                          onChange={(e) => setCallerEmail(e.target.value)}
                          className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          College / Org
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. RV College"
                          value={callerCollege}
                          onChange={(e) => setCallerCollege(e.target.value)}
                          className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-3.5 rounded-full bg-[#FF6B00] hover:bg-[#EA5E00] active:scale-[0.985] text-white font-semibold text-xs shadow-float transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Confirming Call Schedule...</span>
                        </>
                      ) : (
                        <>
                          <CalendarDays className="w-4 h-4" />
                          <span>Confirm Call Appointment</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-4 text-center space-y-4 animate-view-fade">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Call Scheduled!</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      A calendar invite and Google Meet link have been reserved for you.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#F8F9FA] rounded-2xl border border-gray-200 p-4 text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between border-b border-gray-200 pb-1.5">
                      <span className="text-gray-500">Topic</span>
                      <span className="font-semibold text-gray-900 truncate max-w-[180px]">{callTopic}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1.5">
                      <span className="text-gray-500">Date & Time</span>
                      <span className="font-semibold text-[#FF6B00]">{callDate} at {callTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1.5">
                      <span className="text-gray-500">Attendee</span>
                      <span className="font-semibold text-gray-900">{callerName} ({callerCollege})</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-gray-500">Meeting Link</span>
                      <span className="font-semibold text-blue-600">meet.google.com/evh-call</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetScheduleForm}
                    className="w-full py-3 rounded-full bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all"
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
