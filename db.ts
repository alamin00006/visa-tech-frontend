import { User, AppointmentData, ChatMessage } from './types';

// --- Backend Persistence Simulation ---
// This acts as the database layer. In a real environment, this would call REST APIs.
// Here it uses LocalStorage to ensure data persists across reloads (Full Backend Experience).

const DB_KEYS = {
  USERS: 'apollo_db_users',
  APPOINTMENTS: 'apollo_db_appointments',
  MESSAGES: 'apollo_db_messages'
};

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DatabaseService {
  private users: User[] = [];
  private appointments: AppointmentData[] = [];
  private messages: ChatMessage[] = [];

  constructor() {
    this.load();
  }

  private load() {
    if (typeof window !== 'undefined') {
      this.users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
      this.appointments = JSON.parse(localStorage.getItem(DB_KEYS.APPOINTMENTS) || '[]');
      const defaultMsg = [{ id: '1', sender: 'admin', text: 'Welcome to Apollo Visa Tech! How can we help?', timestamp: Date.now() }];
      this.messages = JSON.parse(localStorage.getItem(DB_KEYS.MESSAGES) || JSON.stringify(defaultMsg));
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(this.users));
      localStorage.setItem(DB_KEYS.APPOINTMENTS, JSON.stringify(this.appointments));
      localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify(this.messages));
    }
  }

  // --- Auth API ---

  async login(email: string): Promise<User | null> {
    await delay(600);
    // Simple mock auth - normally would check password
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async register(user: User): Promise<User> {
    await delay(800);
    // Check if exists
    if (this.users.find(u => u.email === user.email)) {
      throw new Error("User already exists");
    }
    this.users.push(user);
    this.save();
    return user;
  }

  // --- Data API ---

  async getAppointments(): Promise<AppointmentData[]> {
    await delay(400);
    return [...this.appointments];
  }

  async submitAppointment(data: AppointmentData): Promise<AppointmentData> {
    await delay(1000); // Processing time
    this.appointments.push(data);
    this.save();
    return data;
  }

  async updateAppointment(id: string, updates: Partial<AppointmentData>): Promise<void> {
    await delay(300);
    this.appointments = this.appointments.map(a => a.id === id ? { ...a, ...updates } : a);
    this.save();
  }

  async deleteAppointment(id: string): Promise<void> {
    await delay(300);
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.save();
  }

  // --- User API ---

  async getAllUsers(): Promise<User[]> {
    await delay(300);
    return [...this.users];
  }

  // --- Chat API ---

  async getMessages(): Promise<ChatMessage[]> {
    return [...this.messages];
  }

  async sendMessage(msg: ChatMessage): Promise<void> {
    this.messages.push(msg);
    this.save();
  }
}

export const db = new DatabaseService();
