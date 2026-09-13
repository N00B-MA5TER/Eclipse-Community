"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/auth";
import { UserCircle, Save } from "lucide-react";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [techSkills, setTechSkills] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/me`, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        const data = await res.json();
        
        if (res.ok) {
          setProfile(data);
          setName(data.name || user.displayName || "");
          setPhone(data.phone || "");
          setBio(data.bio || "");
          setCourse(data.course || "");
          setYear(data.year || "");
          setTechSkills(data.techSkills || "");
        } else {
          setError(data.error || "Failed to load profile");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const idToken = await user.getIdToken();
      // The register endpoint doubles as a profile update endpoint for existing users
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ name, phone, bio, course, year, techSkills })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto animate-in fade-in duration-500 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-heading uppercase tracking-tight font-heading font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider text-[14px]">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-black shadow-none border border-black p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-none blur-3xl pointer-events-none"></div>
        
        <form onSubmit={handleSave} className="relative z-10 max-w-lg">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-none text-sm font-medium border border-red-100">{error}</div>}
          {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-none text-sm font-medium border border-green-100">{success}</div>}

          <div className="flex items-center gap-6 mb-10">
            <div className="w-24 h-24 bg-blue-100 text-blue-700 rounded-none flex items-center justify-center text-3xl font-heading uppercase tracking-tight font-bold border-4 border-white shadow-none border border-black uppercase">
              {name ? name.charAt(0) : (user?.email?.charAt(0) || "U")}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{name || user?.displayName || "Your Name"}</h2>
              <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider text-sm">{profile?.role === 'admin' ? 'Administrator' : 'Participant'}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium text-[15px]"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">+</span>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium text-[15px]"
                  placeholder="Phone number (optional)"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Bio</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3.5 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium text-[15px] resize-none h-24"
                placeholder="Tell us a little bit about yourself"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Course / Degree</label>
                <input 
                  type="text" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium text-[15px]"
                  placeholder="e.g. B.Tech Computer Science"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Year of Study</label>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium text-[15px] bg-white"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Alumni / Professional">Alumni / Professional</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Tech Skills</label>
              <input 
                type="text" 
                value={techSkills}
                onChange={(e) => setTechSkills(e.target.value)}
                className="w-full px-4 py-3.5 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium text-[15px]"
                placeholder="e.g. React, Node.js, Python, Figma (comma separated)"
              />
              <p className="text-[11px] text-neutral-600 font-mono text-xs uppercase tracking-wider mt-2 ml-1">Separate skills with commas</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-black">
            <button 
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-black text-white hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 px-8 rounded-none transition-all shadow-none border border-black shadow-none border border-black-600/20 active:scale-95 text-[15px]"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
