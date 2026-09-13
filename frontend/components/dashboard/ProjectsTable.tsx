"use client";

import { useState, useEffect } from "react";
import { ListTodo, Users, Search, MoreHorizontal, ChevronDown, MessageSquare, FileText } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";

export function ProjectsTable() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/api';

      const res = await fetch(`${apiUrl}/projects`, { headers });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();

    const __poll = setInterval(fetchProjects, 10000);
    
    return () => {
      clearInterval(__poll);
    };
  }, [user]);

  // Mock data fallback if Firestore is empty (for visual development as requested)
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: "1",
      name: "Help DStudio get more customers",
      assigneeName: "Phoenix Winters",
      assigneeAvatar: "https://i.pravatar.cc/150?u=1",
      status: "In Progress",
      comments: 7,
      attachments: 2
    },
    {
      id: "2",
      name: "Plan a trip",
      assigneeName: "Cohen Merritt",
      assigneeAvatar: "https://i.pravatar.cc/150?u=2",
      status: "Pending",
      comments: 10,
      attachments: 3
    },
    {
      id: "3",
      name: "Return a package",
      assigneeName: "Lukas Juarez",
      assigneeAvatar: "https://i.pravatar.cc/150?u=3",
      status: "Completed",
      comments: 5,
      attachments: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-fuchsia-100 text-fuchsia-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold">
            <ListTodo className="w-5 h-5" />
            My Projects
          </div>
          <button className="flex items-center gap-2 text-[12px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors border border-gray-200">
            This Week
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <button className="text-[12px] font-bold text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-1.5 rounded-full transition-colors border border-gray-200">
          See All
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-50 text-[12px] font-bold text-gray-500">
        <div className="col-span-6 flex items-center gap-2">
          <ListTodo className="w-4 h-4" />
          Task Name
        </div>
        <div className="col-span-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Assign
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Status
        </div>
      </div>

      {/* Table rows */}
      <div className="flex flex-col">
        {displayProjects.map((project, idx) => (
          <div key={project.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${idx !== displayProjects.length - 1 ? 'border-b border-gray-50' : ''}`}>
            {/* Task Name */}
            <div className="col-span-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                <ListTodo className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-gray-700">{project.name}</span>
              <div className="ml-auto flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                <div className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {project.comments || 0}</div>
                <div className="flex items-center gap-1"><FileText className="w-3 h-3" /> {project.attachments || 0}</div>
              </div>
            </div>
            
            {/* Assignee */}
            <div className="col-span-4 flex items-center gap-3">
              <img src={project.assigneeAvatar || "https://i.pravatar.cc/150"} alt={project.assigneeName} className="w-7 h-7 rounded-full object-cover bg-gray-100" />
              <span className="text-[13px] font-bold text-gray-900">{project.assigneeName || "Unassigned"}</span>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getStatusColor(project.status)}`}>
                {project.status || "Unknown"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
