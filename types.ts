export type Language = "en" | "bn";

export type UserRole = "guest" | "client" | "agency" | "admin";

export interface User {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  whatsapp?: string;
  location?: string; // For agencies
  role: UserRole;
  isLoggedIn?: boolean;
}

export interface AppointmentData {
  id: string;
  userId: string;
  userName: string;
  userType: "client" | "agency";
  portalUsername: string;
  portalPassword: string;
  securityQ1: string;
  securityA1: string;
  securityQ2: string;
  securityA2: string;
  securityQ3: string;
  securityA3: string;
  personCount: number;
  priority: "regular" | "fast"; // Added priority
  startDate: string;
  endDate: string;
  submittedAt: string;
  status: "pending" | "processing" | "completed";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  text: string;
  timestamp: number;
}
