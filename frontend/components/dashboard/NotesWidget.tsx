"use client";

import { CheckSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase/auth";

export function NotesWidget() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);

  const fetchNotes = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';

      const res = await fetch(`${apiUrl}/notes`, { headers });
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();

    const __poll = setInterval(fetchNotes, 10000);
    
    return () => {
      clearInterval(__poll);
    };
  }, [user]);

  const displayNotes = notes.length > 0 ? notes : [
    { id: "1", title: "Landing Page For Website", description: "To get started on a landing page, could you provide a bit more detail about its purpose?", completed: false },
    { id: "2", title: "Fixing icons with dark backgrounds", description: "Use icons that are easily recognizable and straightforward. Avoid overly complex designs that might confuse users", completed: false },
    { id: "3", title: "Discussion regarding userflow improvement", description: "What's the main goal of the landing page? (e.g., lead generation, product )", completed: true }
  ];

  const toggleNote = async (id: string, currentStatus: boolean) => {
    if (!user || notes.length === 0) return; // Don't try to update mock data
    try {
      const token = await user.getIdToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
      
      await fetch(`${apiUrl}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !currentStatus })
      });
      // fetchNotes will be called via socket event automatically
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
      <div className="flex items-center gap-2 text-gray-900 font-bold mb-6">
        <CheckSquare className="w-5 h-5" />
        Notes
      </div>

      <div className="flex flex-col">
        {displayNotes.map((note, idx) => (
          <div key={note.id} className={`flex items-start gap-4 py-4 ${idx !== displayNotes.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <button 
              onClick={() => toggleNote(note.id, note.completed)}
              className={`mt-0.5 w-4 h-4 rounded-full border flex flex-shrink-0 items-center justify-center transition-colors ${note.completed ? 'bg-fuchsia-500 border-fuchsia-500' : 'border-gray-300 hover:border-gray-400'}`}
            >
              {note.completed && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </button>
            <div>
              <h4 className={`text-[13px] font-bold mb-1 ${note.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{note.title}</h4>
              <p className={`text-[11px] font-medium leading-relaxed ${note.completed ? 'text-gray-300' : 'text-gray-400'}`}>{note.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
