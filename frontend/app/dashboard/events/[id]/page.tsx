"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { ArrowLeft, Calendar, Clock, Users, Component, User, X, CheckCircle, Copy } from "lucide-react";
import Link from "next/link";
import { ErrorState } from "@/components/ui/ErrorState";
import { getApiError } from "@/lib/api-errors";
import { useAuth } from "@/lib/firebase/auth";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeTeamCount, setRealTimeTeamCount] = useState<number | null>(null);
  const [realTimeRegisteredCount, setRealTimeRegisteredCount] = useState<number | null>(null);

  // Modal States
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  // Form States
  const [teamName, setTeamName] = useState("");
  const [maxMembers, setMaxMembers] = useState("4");
  const [joinTeamId, setJoinTeamId] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrorCode, setApiErrorCode] = useState<number | null>(null);

  // Participants Modal States
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [participantsData, setParticipantsData] = useState<any>(null);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participantsError, setParticipantsError] = useState("");

  // Individual Registration States
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Success States
  const [createdTeam, setCreatedTeam] = useState<any>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (!params.id) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';
        const res = await fetch(`${apiUrl}/events/${params.id}`);
        
        if (res.ok) {
          const eventData = await res.json();
          setEvent(eventData);
          setRealTimeTeamCount(eventData.teamCount || 0);
          setRealTimeRegisteredCount(eventData.trueParticipantCount !== undefined ? eventData.trueParticipantCount : (eventData.registeredCount || 0));
        } else {
          // Fallback mocks
          if (params.id === "1") {
            setEvent({ id: "1", title: "Intro to React Native", type: "workshop", date: "2026-08-25", time: "10:00 AM", status: "Upcoming", description: "Join us for an exciting hands-on workshop...", registeredCount: 42, teamCount: 0 });
          } else if (params.id === "2") {
            setEvent({ id: "2", title: "Global AI Hackathon 2026", type: "hackathon", date: "2026-09-10", time: "09:00 AM", status: "Registration Open", description: "Join developers worldwide...", registeredCount: 128, teamCount: 24 });
          } else {
            if (res.status === 404) {
              setApiErrorCode(404);
            } else {
              setApiErrorCode(res.status);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setApiErrorCode(500);
      } finally {
        setLoading(false);
      }
    };

    const fetchRegistrationStatus = async () => {
      try {
        if (!params.id || !user) return;
        const idToken = await user.getIdToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api'}/registrations/individual?eventId=${params.id}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setIsRegistered(true);
          }
        }
      } catch (error) {
        console.error("Error fetching registration status:", error);
      }
    };

    fetchEventData();
    fetchRegistrationStatus();

    const __poll = setInterval(fetchEventData, 10000);

    return () => {
      clearInterval(__poll);
    };
  }, [params.id, router, user]);

  const autoJoinAttempted = useRef(false);

  // Handle URL parameter for auto-join
  useEffect(() => {
    const teamToJoin = searchParams.get("joinTeam");
    if (teamToJoin) {
      setJoinTeamId(teamToJoin);
      setShowJoinTeam(true);
      
      if (user && !autoJoinAttempted.current) {
        autoJoinAttempted.current = true;
        submitJoinRequest(teamToJoin);
      }
    }
  }, [searchParams, user]);

  const handleIndividualRegistration = async () => {
    if (!user) return alert("You must be logged in to register.");
    
    setIsRegistering(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/registrations/individual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          eventId: params.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register");

      setIsRegistered(true);
      alert("Successfully registered for this event!");
      
      // Update local count for immediate feedback
      setEvent((prev: any) => ({ ...prev, registeredCount: (prev.registeredCount || 0) + 1 }));
      
    } catch (err: any) {
      alert(err.message || "Failed to register");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setError("You must be logged in to create a team.");
    
    setFormLoading(true);
    setError("");

    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          eventId: params.id,
          name: teamName,
          maxMembers: parseInt(maxMembers)
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create team");

      setCreatedTeam(data);
      
    } catch (err: any) {
      setError(err.message || "Failed to create team");
    } finally {
      setFormLoading(false);
    }
  };

  const submitJoinRequest = async (teamCode: string) => {
    if (!user) return setError("You must be logged in to join a team.");
    if (!teamCode) return setError("Please enter a valid Team Code.");
    
    setFormLoading(true);
    setError("");

    try {
      const idToken = await user.getIdToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/teams/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          code: teamCode.toUpperCase(),
          eventId: params.id
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to request join");

      alert("Join request sent successfully! Waiting for leader approval.");
      setShowJoinTeam(false);
      setJoinTeamId("");

      // Optionally, clear the search params from URL so it doesn't re-trigger on reload
      const url = new URL(window.location.href);
      url.searchParams.delete('joinTeam');
      window.history.replaceState({}, '', url.toString());

    } catch (err: any) {
      setError(err.message || "Failed to join team");
    } finally {
      setFormLoading(false);
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitJoinRequest(joinTeamId);
  };

  const handleOpenParticipants = async () => {
    if (!user) return alert("You must be logged in to view participants.");
    setShowParticipantsModal(true);
    setParticipantsLoading(true);
    setParticipantsError("");
    setParticipantsData(null);

    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/events/${params.id}/participants`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load participants");

      setParticipantsData(data);
    } catch (err: any) {
      setParticipantsError(err.message || "Failed to load participants");
    } finally {
      setParticipantsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (apiErrorCode) {
    const errorDef = getApiError(apiErrorCode);
    return (
      <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500 pb-12 relative">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-black font-bold mb-8 transition-colors text-[13px]">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <ErrorState
          statusCode={errorDef.statusCode}
          title={errorDef.title}
          message={errorDef.message}
          primaryAction={{
            label: "Go Back",
            onClick: () => router.back(),
          }}
          secondaryAction={{
            label: "Go Home",
            href: "/",
          }}
        />
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500 pb-12 relative">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-600 font-mono text-xs uppercase tracking-wider hover:text-black font-bold mb-8 transition-colors text-[13px]">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Main Event Card */}
      <div className="bg-white rounded-[2rem] border border-black shadow-none border border-black overflow-hidden relative mb-8">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-none blur-3xl -z-10 opacity-30 ${event.type === 'hackathon' ? 'bg-fuchsia-400' : 'bg-blue-400'} translate-x-1/2 -translate-y-1/2 pointer-events-none`}></div>
        
        <div className="p-6 md:p-14">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-1.5 rounded-none text-[12px] font-black uppercase tracking-widest ${event.type === 'hackathon' ? 'bg-fuchsia-100 text-fuchsia-700' : 'bg-blue-100 text-blue-700'}`}>
              {event.type}
            </span>
            <span className={`text-[12px] font-bold flex items-center gap-1.5 px-4 py-1.5 rounded-none ${event.status === 'Completed' ? 'bg-neutral-100 text-neutral-600 font-mono text-xs uppercase tracking-wider' : 'bg-green-50 text-green-600'}`}>
              <span className={`w-2 h-2 rounded-none ${event.status === 'Completed' ? 'bg-gray-400' : 'bg-green-500 animate-pulse'}`}></span>
              {event.status}
            </span>
          </div>

          <h1 className="text-4xl font-heading uppercase tracking-tight md:text-5xl font-heading uppercase tracking-tight font-black font-heading text-gray-900 mb-6 tracking-tight">
            {event.title}
          </h1>

          <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider text-[16px] leading-relaxed max-w-3xl mb-10 whitespace-pre-wrap">
            {event.description || "No description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-gray-700 font-medium bg-white/50 inline-flex p-2 pr-6 rounded-none border border-black">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-none shadow-none border border-black border border-black">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-gray-900">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{event.time || 'TBD'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple Registration Stats */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div 
            onClick={handleOpenParticipants}
            className="bg-white rounded-[2rem] border border-black p-6 md:p-8 shadow-none hover:border-blue-100 hover:bg-neutral-50 transition-all group cursor-pointer relative"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-none flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-black" />
            </div>
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Participants</p>
            <h3 className="text-4xl font-heading uppercase tracking-tight font-black text-gray-900">{event.trueParticipantCount !== undefined ? event.trueParticipantCount : (realTimeRegisteredCount !== null ? realTimeRegisteredCount : Math.max(0, event.registeredCount || 0))}</h3>
            <p className="text-[11px] font-bold text-blue-500 uppercase tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-8">View participants →</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-black p-6 md:p-8 shadow-none border border-black hover:border-fuchsia-100 hover:shadow-none border border-black transition-all group">
            <div className="w-12 h-12 bg-fuchsia-50 rounded-none flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Component className="w-6 h-6 text-fuchsia-600" />
            </div>
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Teams Registered</p>
            <h3 className="text-4xl font-heading uppercase tracking-tight font-black text-gray-900">{realTimeTeamCount !== null ? realTimeTeamCount : (event.teamCount || 0)}</h3>
          </div>
        </div>

        {/* Join CTA */}
        <div className="md:col-span-1 bg-[#0f172a] rounded-[2rem] border border-black p-6 md:p-8 shadow-none border border-black text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-none blur-2xl"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-xl font-bold mb-3 font-heading">Ready to participate?</h3>
            <p className="text-gray-400 text-[14px] mb-8 leading-relaxed">Join {realTimeRegisteredCount !== null ? realTimeRegisteredCount : Math.max(0, event.registeredCount || 0)} other participants in this event.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleIndividualRegistration} 
                disabled={isRegistered || isRegistering}
                className={`w-full font-bold py-3.5 rounded-none transition-all shadow-none border border-black shadow-none border border-black/10 active:scale-95 text-[14px] ${
                  isRegistered 
                    ? "bg-green-500 text-white cursor-not-allowed" 
                    : "bg-white text-gray-900 hover:bg-neutral-100"
                }`}
              >
                {isRegistering ? "Registering..." : isRegistered ? "Registered" : "Register Individually"}
              </button>
              <button onClick={() => setShowCreateTeam(true)} className="w-full bg-black text-white hover:bg-blue-700 text-white font-bold py-3.5 rounded-none transition-all shadow-none border border-black shadow-none border border-black-600/20 active:scale-95 text-[14px]">
                Create a Team
              </button>
              <button onClick={() => setShowJoinTeam(true)} className="w-full bg-transparent border border-black hover:bg-gray-800 text-gray-300 font-bold py-3.5 rounded-none transition-all active:scale-95 text-[14px]">
                Join a Team
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- MODALS --- */}

      {/* Create Team Modal */}
      {showCreateTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40  animate-in fade-in">
          <div className="bg-white rounded-none w-full max-w-md shadow-none border border-black overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-black flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 font-heading">Create a Team</h2>
              <button onClick={() => { setShowCreateTeam(false); setCreatedTeam(null); }} className="w-8 h-8 flex items-center justify-center rounded-none hover:bg-neutral-100 text-neutral-600 font-mono text-xs uppercase tracking-wider transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              {createdTeam ? (
                <div className="text-center animate-in slide-in-">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-none flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Team Created!</h3>
                  <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider text-[14px] mb-6">Share this unique link or code with your friends so they can join your team instantly.</p>
                  
                  <div className="bg-white rounded-none p-4 border border-black mb-6">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Team Code</p>
                    <div className="text-2xl font-heading uppercase tracking-tight font-black text-gray-900 tracking-widest break-all">
                      {createdTeam.code || createdTeam.id}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/dashboard/events/${event.id}?joinTeam=${createdTeam.id}`);
                      alert("Link copied to clipboard!");
                    }}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-none transition-all active:scale-95 text-[14px] flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Invite Link
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCreateTeam}>
                  {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-none border border-red-100">{error}</div>}
                  
                  <div className="mb-5">
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">Team Name</label>
                    <input 
                      type="text" 
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Neural Ninjas"
                      className="w-full px-4 py-3 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium"
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-[13px] font-bold text-gray-700 mb-2">Max Participants</label>
                    <select 
                      value={maxMembers}
                      onChange={(e) => setMaxMembers(e.target.value)}
                      className="w-full px-4 py-3 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-medium bg-white"
                    >
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members (Recommended)</option>
                      <option value="5">5 Members</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formLoading}
                    className="w-full bg-black text-white hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-none transition-all shadow-none border border-black shadow-none border border-black-600/20 active:scale-95 text-[15px]"
                  >
                    {formLoading ? "Creating..." : "Create Team"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Join Team Modal */}
      {showJoinTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40  animate-in fade-in">
          <div className="bg-white rounded-none w-full max-w-md shadow-none border border-black overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-black flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 font-heading">Join a Team</h2>
              <button onClick={() => { setShowJoinTeam(false); setJoinTeamId(""); setError(""); }} className="w-8 h-8 flex items-center justify-center rounded-none hover:bg-neutral-100 text-neutral-600 font-mono text-xs uppercase tracking-wider transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleJoinTeam}>
                {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-none border border-red-100">{error}</div>}
                
                <p className="text-neutral-600 font-mono text-xs uppercase tracking-wider text-[14px] mb-6">Enter the 6-character Team Code shared by your team leader to join their squad.</p>

                <div className="mb-8">
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">Team Code</label>
                  <input 
                    type="text" 
                    required
                    value={joinTeamId}
                    onChange={(e) => setJoinTeamId(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCD12"
                    maxLength={6}
                    className="w-full px-4 py-4 rounded-none border border-black focus:outline-none focus:ring-0 focus:ring-0-500/20 focus:border-[#00e599] transition-all font-black text-center text-2xl font-heading uppercase tracking-tight tracking-widest uppercase"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="w-full bg-gray-900 hover:bg-black disabled:opacity-50 text-white font-bold py-3.5 rounded-none transition-all shadow-none border border-black active:scale-95 text-[15px]"
                >
                  {formLoading ? "Joining..." : "Join Team Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {showParticipantsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 animate-in fade-in" onClick={() => setShowParticipantsModal(false)}>
          <div className="bg-white rounded-none w-full max-w-md max-h-[85vh] flex flex-col shadow-none border border-black overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-black flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900 font-heading">Participants</h2>
                {participantsData && !participantsLoading && !participantsError && (
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                    {participantsData.count} registered participants
                  </p>
                )}
              </div>
              <button aria-label="Close" onClick={() => setShowParticipantsModal(false)} className="w-8 h-8 flex items-center justify-center rounded-none hover:bg-neutral-100 text-neutral-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto overflow-x-hidden flex-1 bg-neutral-50/50">
              {participantsLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="animate-spin rounded-none h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Loading participants...</p>
                </div>
              ) : participantsError ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-none flex items-center justify-center mb-4">
                    <X className="w-6 h-6" />
                  </div>
                  <p className="text-gray-900 font-bold mb-2">Unable to load participants.</p>
                  <p className="text-gray-500 text-sm mb-6">{participantsError}</p>
                  <button onClick={handleOpenParticipants} className="px-6 py-2 bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors">
                    Try again
                  </button>
                </div>
              ) : participantsData?.participants?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-none flex items-center justify-center mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No participants yet</h3>
                  <p className="text-gray-500 text-sm">Be the first to register for this event!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {participantsData?.participants?.map((participant: any) => (
                    <div key={participant.uid} className="flex items-center gap-4 p-3 bg-white border border-black hover:border-blue-500 transition-colors group">
                      <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center shrink-0 border border-black/10">
                        <User className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-bold text-gray-900 truncate">
                          {participant.name}
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-wider mt-0.5 truncate">
                          {participant.type === 'team_member' ? (
                            <span className="text-fuchsia-600 bg-fuchsia-50 px-2 py-0.5">Team Member</span>
                          ) : (
                            <span className="text-blue-600 bg-blue-50 px-2 py-0.5">Individual</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
