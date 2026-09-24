"use client";

import React, { useRef, useEffect, useState } from "react";
import "./MembershipCard.css";

interface MembershipCardProps {
  member: {
    name: string;
    profilePhoto?: string | null;
    memberId: string;
    membershipType?: string;
  };
  animateEntrance?: boolean;
}

export function MembershipCard({ member, animateEntrance = false }: MembershipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch/mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation limits (subtle 3D effect)
    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (isMobile || !cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div className={`card-reveal-container flex items-center justify-center p-4 w-full h-full`}>
      <div 
        ref={cardRef}
        className={`eclipse-id-card ${animateEntrance ? 'card-animate-entrance' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {/* Abstract Background Waves */}
        <div className="card-wave-bg">
          <div className="wave-line"></div>
          <div className="wave-line"></div>
          <div className="wave-line"></div>
          <div className="wave-line"></div>
          <div className="wave-line"></div>
        </div>

        {/* Branding Header */}
        <div className="card-header">
          <div className="card-logo-placeholder">
            <img src="/icon.png" alt="Eclipse" className="card-logo-img" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              if (e.target && (e.target as any).parentNode) {
                ((e.target as any).parentNode as HTMLDivElement).innerText = 'E';
              }
            }} />
          </div>
          <div className="card-brand-text">
            <div className="brand-eclipse">ECLIPSE</div>
            <div className="brand-tech">TECH COMMUNITY</div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="decorative-x-group">
          <div className="decorative-x">X</div>
          <div className="decorative-x">X</div>
          <div className="decorative-x">X</div>
        </div>
        <div className="decorative-square"></div>

        {/* Profile Photo Area */}
        <div className="profile-photo-container">
          {member.profilePhoto ? (
            <img 
              src={member.profilePhoto} 
              alt={member.name} 
              className="profile-photo"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="profile-placeholder">
              {member.name ? member.name.charAt(0).toUpperCase() : 'E'}
            </div>
          )}
        </div>

        {/* Member Information */}
        <div className="member-info-section">
          <div className="member-label">{member.membershipType || "MEMBER"}</div>
          <div className="member-name">{member.name || "ECLIPSE MEMBER"}</div>
          <div className="member-id">ID No. : {member.memberId || "PENDING"}</div>
        </div>

        {/* Footer URL */}
        <div className="card-footer">
          <div className="website-url">www.csediatm.in</div>
        </div>
      </div>
    </div>
  );
}
