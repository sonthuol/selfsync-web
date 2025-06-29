export interface Habit {
  id: string;
  name: string;
  description?: string;
  completedDays: string[]; // danh sách các ngày đã hoàn thành (YYYY-MM-DD)
  createdAt: string;
  updatedAt: string;
}

export interface HabitFormData {
  name: string;
  description?: string;
} 