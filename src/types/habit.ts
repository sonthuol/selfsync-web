export interface Habit {
  id: string;
  name: string;
  description?: string;
  type: 'good' | 'bad'; // good habit hoặc bad habit
  frequency: 'daily' | 'weekly' | 'monthly';
  target: number; // số ngày mục tiêu
  completedDays: string[]; // danh sách các ngày đã hoàn thành (YYYY-MM-DD)
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HabitFormData {
  name: string;
  description?: string;
  type: 'good' | 'bad';
  frequency: 'daily' | 'weekly' | 'monthly';
  target: number;
  startDate: string;
  endDate?: string;
}

export interface HabitFilter {
  type?: 'good' | 'bad';
  frequency?: 'daily' | 'weekly' | 'monthly';
  isActive?: boolean;
  search?: string;
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  completed: boolean;
  note?: string;
} 