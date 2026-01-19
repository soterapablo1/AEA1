
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  SUPERUSER = 'SUPERUSER'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: ApprovalStatus;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  checkIn: string;
  checkOut?: string;
  type: 'manual' | 'automatic';
  lat: number;
  lng: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'cancelled';
  creatorId: string;
  resources: string[];
}

export interface Project {
  id: string;
  title: string;
  abstract: string;
  goals: string;
  status: 'active' | 'completed' | 'archived';
  creatorId: string;
  members: string[]; // User IDs
}

export interface NewsReport {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  userId: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}
