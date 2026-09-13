"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("workshop");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = await user?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/admin/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          type,
          date,
          time,
          description,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create event");
      }

      router.push("/admin/events");
    } catch (err: any) {
      console.error("Error creating event:", err);
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-gray-900 font-medium mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-100 text-black rounded-none flex items-center justify-center">
          <CalendarPlus className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-heading uppercase tracking-tight font-bold font-heading text-gray-900">Create New Event</h1>
          <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider">Add a new Workshop or Hackathon to the platform.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-none text-[13px] font-bold mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-none shadow-none border border-black border border-black space-y-6">
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-2">Event Title</label>
          <Input 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 bg-white border-black" 
            placeholder="e.g. Intro to React Native" 
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-2">Event Type</label>
          <div className="flex gap-4">
            <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-none border-2 cursor-pointer transition-all ${type === 'workshop' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-black hover:border-black'}`}>
              <input type="radio" name="type" value="workshop" checked={type === 'workshop'} onChange={() => setType('workshop')} className="hidden" />
              <span className="font-bold text-sm">Workshop</span>
            </label>
            <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-none border-2 cursor-pointer transition-all ${type === 'hackathon' ? 'border-fuchsia-600 bg-fuchsia-50 text-fuchsia-700' : 'border-black hover:border-black'}`}>
              <input type="radio" name="type" value="hackathon" checked={type === 'hackathon'} onChange={() => setType('hackathon')} className="hidden" />
              <span className="font-bold text-sm">Hackathon</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">Date</label>
            <Input 
              type="date" 
              required 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 bg-white border-black" 
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">Time</label>
            <Input 
              type="time" 
              required 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-12 bg-white border-black" 
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            required 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 rounded-none bg-white border border-black p-4 text-[13px] focus:outline-none focus:ring-0 focus:ring-0-500 focus:border-transparent transition-all resize-none" 
            placeholder="Details about the event..."
          ></textarea>
        </div>

        <div className="pt-4 border-t border-black flex justify-end gap-4">
          <Link href="/admin/dashboard" className="px-6 py-3 rounded-none font-bold text-neutral-600 font-mono text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors">
            Cancel
          </Link>
          <Button type="submit" disabled={loading} className="px-8 py-3 h-auto rounded-none bg-black text-white hover:bg-blue-700 text-white font-bold transition-colors">
            {loading ? 'Creating...' : 'Publish Event'}
          </Button>
        </div>

      </form>
    </div>
  );
}
