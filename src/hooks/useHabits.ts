import { useState, useEffect, useCallback } from 'react';
import type { Habit, HabitFormData, HabitFilter } from '../types/habit';

const STORAGE_KEY = 'habits';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filter, setFilter] = useState<HabitFilter>({});
  const [loading, setLoading] = useState(false);

  // Save habits to localStorage
  const saveHabits = useCallback((newHabits: Habit[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
  }, []);

  // Load habits from localStorage
  useEffect(() => {
    // Tạm thời xóa localStorage để test dữ liệu mẫu
    localStorage.removeItem(STORAGE_KEY);
    
    const savedHabits = localStorage.getItem(STORAGE_KEY);
    if (savedHabits) {
      try {
        const parsedHabits = JSON.parse(savedHabits);
        // Ensure all habits have completedDays array
        const validatedHabits = parsedHabits.map((habit: any) => ({
          ...habit,
          completedDays: habit.completedDays || [],
        }));
        setHabits(validatedHabits);
      } catch (error) {
        console.error('Error loading habits:', error);
      }
    } else {
      // Add sample data for testing full screen layout
      const sampleHabits: Habit[] = [
        {
          id: '1',
          name: 'Tập thể dục buổi sáng',
          description: 'Chạy bộ 30 phút mỗi sáng để khởi động ngày mới',
          type: 'good',
          frequency: 'daily',
          target: 30,
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Đọc sách',
          description: 'Đọc ít nhất 20 trang sách mỗi ngày',
          type: 'good',
          frequency: 'daily',
          target: 30,
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '3',
          name: 'Uống nước đủ',
          description: 'Uống 2 lít nước mỗi ngày',
          type: 'good',
          frequency: 'daily',
          target: 30,
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '4',
          name: 'Hút thuốc lá',
          description: 'Giảm số điếu thuốc hút mỗi ngày',
          type: 'bad',
          frequency: 'daily',
          target: 0,
          completedDays: ['2024-01-01', '2024-01-02'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '5',
          name: 'Học tiếng Anh',
          description: 'Học 30 phút tiếng Anh mỗi ngày',
          type: 'good',
          frequency: 'daily',
          target: 30,
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '6',
          name: 'Ăn fast food',
          description: 'Giảm ăn đồ ăn nhanh',
          type: 'bad',
          frequency: 'weekly',
          target: 0,
          completedDays: ['2024-01-01'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '7',
          name: 'Thiền định',
          description: 'Thiền 15 phút mỗi sáng',
          type: 'good',
          frequency: 'daily',
          target: 30,
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '8',
          name: 'Dọn dẹp nhà cửa',
          description: 'Dọn dẹp 30 phút mỗi ngày',
          type: 'good',
          frequency: 'daily',
          target: 30,
          completedDays: ['2024-01-01', '2024-01-02'],
          startDate: '2024-01-01',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ];
      setHabits(sampleHabits);
      saveHabits(sampleHabits);
    }
  }, [saveHabits]);

  // Create new habit
  const createHabit = useCallback((habitData: HabitFormData) => {
    setLoading(true);
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...habitData,
      completedDays: [],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    setLoading(false);
  }, [habits, saveHabits]);

  // Update habit
  const updateHabit = useCallback((id: string, habitData: HabitFormData) => {
    setLoading(true);
    const updatedHabits = habits.map(habit =>
      habit.id === id
        ? {
            ...habit,
            ...habitData,
            updatedAt: new Date().toISOString(),
          }
        : habit
    );
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    setLoading(false);
  }, [habits, saveHabits]);

  // Delete habit
  const deleteHabit = useCallback((id: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  }, [habits, saveHabits]);

  // Toggle day completion
  const toggleDayCompletion = useCallback((id: string, date: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        const completedDays = habit.completedDays || [];
        const isCompleted = completedDays.includes(date);
        const updatedCompletedDays = isCompleted
          ? completedDays.filter(d => d !== date)
          : [...completedDays, date];
        
        return {
          ...habit,
          completedDays: updatedCompletedDays,
          updatedAt: new Date().toISOString(),
        };
      }
      return habit;
    });
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  }, [habits, saveHabits]);

  // Check if today is completed
  const isTodayCompleted = useCallback((habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    return (habit.completedDays || []).includes(today);
  }, []);

  // Get current streak
  const getCurrentStreak = useCallback((habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let currentDate = new Date(today);
    const completedDays = habit.completedDays || [];
    
    while (completedDays.includes(currentDate.toISOString().split('T')[0])) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  }, []);

  // Get total completed days
  const getTotalCompletedDays = useCallback((habit: Habit) => {
    return (habit.completedDays || []).length;
  }, []);

  // Toggle habit active status
  const toggleHabitStatus = useCallback((id: string) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id
        ? {
            ...habit,
            isActive: !habit.isActive,
            updatedAt: new Date().toISOString(),
          }
        : habit
    );
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  }, [habits, saveHabits]);

  // Filter habits
  const filteredHabits = habits.filter(habit => {
    if (filter.search && !habit.name.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    if (filter.type && habit.type !== filter.type) {
      return false;
    }
    if (filter.frequency && habit.frequency !== filter.frequency) {
      return false;
    }
    if (filter.isActive !== undefined && habit.isActive !== filter.isActive) {
      return false;
    }
    return true;
  });

  // Reset filter
  const resetFilter = useCallback(() => {
    setFilter({});
  }, []);

  return {
    habits: filteredHabits,
    filter,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleDayCompletion,
    isTodayCompleted,
    getCurrentStreak,
    getTotalCompletedDays,
    toggleHabitStatus,
    setFilter,
    resetFilter,
  };
}; 