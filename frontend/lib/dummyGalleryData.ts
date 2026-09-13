export type MediaType = 'image' | 'video' | 'document';

export interface GalleryItem {
  id: string;
  type: MediaType;
  url: string;
  title: string;
  event: string;
  section?: string;
  aspectRatio: 'square' | 'video' | 'portrait';
}

// These are the static local files placed in the public/zero-to-hackathon folder
export const LOCAL_GALLERY_DATA: GalleryItem[] = [
  // PHOTOS
  { id: 'p1', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.13.21 PM (1).jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  { id: 'p2', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.13.21 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'portrait' },
  { id: 'p3', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.13.25 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'p4', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.14.15 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  { id: 'p5', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.26 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'portrait' },
  { id: 'p6', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.30 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'p7', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.31 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  { id: 'p8', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.32 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'portrait' },
  { id: 'p9', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.33 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'p10', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.34 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  { id: 'p11', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 11.16.36 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'portrait' },
  { id: 'p12', type: 'image', url: '/zero-to-hackathon/photos/WhatsApp Image 2026-08-25 at 3.57.30 PM.jpeg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  
  // NEW PHOTOS
  { id: 'p13', type: 'image', url: '/zero-to-hackathon/photos/20260825_151418.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'p14', type: 'image', url: '/zero-to-hackathon/photos/20260825_154812.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  { id: 'p15', type: 'image', url: '/zero-to-hackathon/photos/20260826_154641.jpg', title: 'Guest Speaker', event: 'ZERO TO HACKATHON: BUILD AND BREAK', section: 'guest_speaker', aspectRatio: 'portrait' },
  { id: 'p16', type: 'image', url: '/zero-to-hackathon/photos/20260826_154657.jpg', title: 'Guest Speaker', event: 'ZERO TO HACKATHON: BUILD AND BREAK', section: 'guest_speaker', aspectRatio: 'video' },
  { id: 'p17', type: 'image', url: '/zero-to-hackathon/photos/20260826_154706.jpg', title: 'Guest Speaker', event: 'ZERO TO HACKATHON: BUILD AND BREAK', section: 'guest_speaker', aspectRatio: 'square' },
  { id: 'p18', type: 'image', url: '/zero-to-hackathon/photos/20260826_170311.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'portrait' },
  { id: 'p19', type: 'image', url: '/zero-to-hackathon/photos/20260826_170321.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'p20', type: 'image', url: '/zero-to-hackathon/photos/20260826_170456.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' },
  { id: 'p21', type: 'image', url: '/zero-to-hackathon/photos/20260826_171200.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'portrait' },
  { id: 'p22', type: 'image', url: '/zero-to-hackathon/photos/20260826_171206.jpg', title: 'Hackathon Moments', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },

  // VIDEOS
  { id: 'v1', type: 'video', url: '/zero-to-hackathon/videos/WhatsApp Video 2026-08-25 at 11.16.26 PM.mp4', title: 'Event Highlights', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'v2', type: 'video', url: '/zero-to-hackathon/videos/WhatsApp Video 2026-08-25 at 11.16.34 PM.mp4', title: 'Event Highlights', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  { id: 'v3', type: 'video', url: '/zero-to-hackathon/videos/20260826_171816.mp4', title: 'Event Highlights', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'video' },
  
  // WINNERS
  { id: 'w1', type: 'image', url: '/zero-to-hackathon/hands-on winners/b205234d-90a8-402f-94df-fede22f4a651.jpg', title: 'Hands-on Winners', event: 'ZERO TO HACKATHON: BUILD AND BREAK', aspectRatio: 'square' }
];
