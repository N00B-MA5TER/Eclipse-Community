"use client";

import { useState, useEffect } from "react";
import { Send, BellRing, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/firebase/auth";

export default function BroadcastNotificationsPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");
  const [targetId, setTargetId] = useState("");
  const [type, setType] = useState("info");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Data for target selections (mocked or fetched if needed)
  const [events, setEvents] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchEvents();
      fetchTeams();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api'}/events`);
      if (res.ok) {
        const eventsData = await res.json();
        setEvents(eventsData);
      }
    } catch (e) {
      console.error("Failed to fetch events:", e);
    }
  };

  const fetchTeams = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api'}/teams`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const teamsData = await res.json();
        setTeams(teamsData);
      }
    } catch (e) {
      console.error("Failed to fetch teams:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = await user?.getIdToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/admin/broadcast`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, message, target, targetId, type })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to broadcast");
      }
      
      setSuccessMsg(data.message);
      setTitle("");
      setMessage("");
      setTargetId("");
      
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in- duration-500">
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center">
            <BellRing className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-2xl font-heading uppercase tracking-tight font-bold font-heading text-gray-900 tracking-tight">Broadcast Center</h1>
        </div>
        <p className="text-[13px] font-medium text-neutral-600 font-mono text-xs uppercase tracking-wider ml-[52px]">
          Send real-time alerts and notifications directly to users' in-app notification menu.
        </p>
      </div>

      <div className="bg-white rounded-none shadow-none border border-black border border-black overflow-hidden">
        
        {successMsg && (
          <div className="bg-green-50 p-4 border-b border-green-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-green-800">{successMsg}</p>
          </div>
        )}
        
        {errorMsg && (
          <div className="bg-red-50 p-4 border-b border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700">Notification Title</label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Venue Change for Hackathon"
              required
              className="h-12 bg-white/50 border-black focus-visible:ring-0-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700">Message Body</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your detailed message here..."
              required
              rows={4}
              className="w-full rounded-none bg-white/50 border border-black px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-0-500 transition-all resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700">Target Audience</label>
              <select 
                value={target}
                onChange={(e) => {
                  setTarget(e.target.value);
                  setTargetId("");
                }}
                className="w-full h-12 rounded-none bg-white/50 border border-black px-4 text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-0 focus:ring-0-500 transition-all"
              >
                <option value="all">Broadcast to All Users</option>
                <option value="event">Specific Event Registrants</option>
                <option value="team">Specific Team Members</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700">Alert Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-12 rounded-none bg-white/50 border border-black px-4 text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-0 focus:ring-0-500 transition-all"
              >
                <option value="info">General Info (Blue)</option>
                <option value="team_full">Important Alert (Purple)</option>
              </select>
            </div>
          </div>

          {target === 'event' && (
            <div className="space-y-2 animate-in fade-in slide-in-">
              <label className="text-[13px] font-bold text-gray-700">Select Event</label>
              <select 
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                required
                className="w-full h-12 rounded-none bg-white/50 border border-black px-4 text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-0 focus:ring-0-500 transition-all"
              >
                <option value="">-- Choose an event --</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.title}</option>
                ))}
              </select>
            </div>
          )}

          {target === 'team' && (
            <div className="space-y-2 animate-in fade-in slide-in-">
              <label className="text-[13px] font-bold text-gray-700">Select Team</label>
              <select 
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                required
                className="w-full h-12 rounded-none bg-white/50 border border-black px-4 text-[14px] font-medium text-gray-700 focus:outline-none focus:ring-0 focus:ring-0-500 transition-all"
              >
                <option value="">-- Choose a team --</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} (Code: {t.code})</option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-4 border-t border-black flex justify-end">
            <Button 
              type="submit" 
              disabled={loading}
              className="h-11 px-8 rounded-none bg-black text-white hover:bg-blue-700 text-white font-bold transition-colors gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Sending Broadcast...' : 'Send Broadcast'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
