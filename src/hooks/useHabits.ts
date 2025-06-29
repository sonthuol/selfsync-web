import { useState, useEffect, useCallback } from 'react';
import type { Habit, HabitFormData } from '../types/habit';

const STORAGE_KEY = 'habits';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
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
          completedDays: [
            '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05',
            '2024-06-25', '2024-06-26', '2024-06-27', '2024-06-28', '2024-06-29',
            '2024-06-30', '2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04',
            '2024-07-05', '2024-07-06', '2024-07-07', '2024-07-08', '2024-07-09',
            '2024-07-10', '2024-07-11', '2024-07-12', '2024-07-13', '2024-07-14',
            '2024-07-15', '2024-07-16', '2024-07-17', '2024-07-18', '2024-07-19',
            '2024-07-20', '2024-07-21', '2024-07-22', '2024-07-23', '2024-07-24',
            '2024-07-25', '2024-07-26', '2024-07-27', '2024-07-28', '2024-07-29',
            '2024-07-30', '2024-08-01', '2024-08-02', '2024-08-03', '2024-08-04',
            '2024-08-05', '2024-08-06', '2024-08-07', '2024-08-08', '2024-08-09',
            '2024-08-10', '2024-08-11', '2024-08-12', '2024-08-13', '2024-08-14',
            '2024-08-15', '2024-08-16', '2024-08-17', '2024-08-18', '2024-08-19',
            '2024-08-20', '2024-08-21', '2024-08-22', '2024-08-23', '2024-08-24',
            '2024-08-25', '2024-08-26', '2024-08-27', '2024-08-28', '2024-08-29',
            '2024-08-30', '2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04',
            '2024-09-05', '2024-09-06', '2024-09-07', '2024-09-08', '2024-09-09',
            '2024-09-10', '2024-09-11', '2024-09-12', '2024-09-13', '2024-09-14',
            '2024-09-15', '2024-09-16', '2024-09-17', '2024-09-18', '2024-09-19',
            '2024-09-20', '2024-09-21', '2024-09-22', '2024-09-23', '2024-09-24',
            '2024-09-25', '2024-09-26', '2024-09-27', '2024-09-28', '2024-09-29',
            '2024-09-30', '2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04',
            '2024-10-05', '2024-10-06', '2024-10-07', '2024-10-08', '2024-10-09',
            '2024-10-10', '2024-10-11', '2024-10-12', '2024-10-13', '2024-10-14',
            '2024-10-15', '2024-10-16', '2024-10-17', '2024-10-18', '2024-10-19',
            '2024-10-20', '2024-10-21', '2024-10-22', '2024-10-23', '2024-10-24',
            '2024-10-25', '2024-10-26', '2024-10-27', '2024-10-28', '2024-10-29',
            '2024-10-30', '2024-11-01', '2024-11-02', '2024-11-03', '2024-11-04',
            '2024-11-05', '2024-11-06', '2024-11-07', '2024-11-08', '2024-11-09',
            '2024-11-10', '2024-11-11', '2024-11-12', '2024-11-13', '2024-11-14',
            '2024-11-15', '2024-11-16', '2024-11-17', '2024-11-18', '2024-11-19',
            '2024-11-20', '2024-11-21', '2024-11-22', '2024-11-23', '2024-11-24',
            '2024-11-25', '2024-11-26', '2024-11-27', '2024-11-28', '2024-11-29',
            '2024-11-30', '2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04',
            '2024-12-05', '2024-12-06', '2024-12-07', '2024-12-08', '2024-12-09',
            '2024-12-10', '2024-12-11', '2024-12-12', '2024-12-13', '2024-12-14',
            '2024-12-15', '2024-12-16', '2024-12-17', '2024-12-18', '2024-12-19',
            '2024-12-20', '2024-12-21', '2024-12-22', '2024-12-23', '2024-12-24',
            '2024-12-25', '2024-12-26', '2024-12-27', '2024-12-28', '2024-12-29',
            '2024-12-30', '2024-12-31', '2025-01-01', '2025-01-02', '2025-01-03',
            '2025-01-04', '2025-01-05', '2025-01-06', '2025-01-07', '2025-01-08',
            '2025-01-09', '2025-01-10', '2025-01-11', '2025-01-12', '2025-01-13',
            '2025-01-14', '2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18',
            '2025-01-19', '2025-01-20', '2025-01-21', '2025-01-22', '2025-01-23',
            '2025-01-24', '2025-01-25', '2025-01-26', '2025-01-27', '2025-01-28',
            '2025-01-29', '2025-01-30', '2025-01-31', '2025-02-01', '2025-02-02',
            '2025-02-03', '2025-02-04', '2025-02-05', '2025-02-06', '2025-02-07',
            '2025-02-08', '2025-02-09', '2025-02-10', '2025-02-11', '2025-02-12',
            '2025-02-13', '2025-02-14', '2025-02-15', '2025-02-16', '2025-02-17',
            '2025-02-18', '2025-02-19', '2025-02-20', '2025-02-21', '2025-02-22',
            '2025-02-23', '2025-02-24', '2025-02-25', '2025-02-26', '2025-02-27',
            '2025-02-28', '2025-03-01', '2025-03-02', '2025-03-03', '2025-03-04',
            '2025-03-05', '2025-03-06', '2025-03-07', '2025-03-08', '2025-03-09',
            '2025-03-10', '2025-03-11', '2025-03-12', '2025-03-13', '2025-03-14',
            '2025-03-15', '2025-03-16', '2025-03-17', '2025-03-18', '2025-03-19',
            '2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23', '2025-03-24',
            '2025-03-25', '2025-03-26', '2025-03-27', '2025-03-28', '2025-03-29',
            '2025-03-30', '2025-03-31', '2025-04-01', '2025-04-02', '2025-04-03',
            '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08',
            '2025-04-09', '2025-04-10', '2025-04-11', '2025-04-12', '2025-04-13',
            '2025-04-14', '2025-04-15', '2025-04-16', '2025-04-17', '2025-04-18',
            '2025-04-19', '2025-04-20', '2025-04-21', '2025-04-22', '2025-04-23',
            '2025-04-24', '2025-04-25', '2025-04-26', '2025-04-27', '2025-04-28',
            '2025-04-29', '2025-04-30', '2025-05-01', '2025-05-02', '2025-05-03',
            '2025-05-04', '2025-05-05', '2025-05-06', '2025-05-07', '2025-05-08',
            '2025-05-09', '2025-05-10', '2025-05-11', '2025-05-12', '2025-05-13',
            '2025-05-14', '2025-05-15', '2025-05-16', '2025-05-17', '2025-05-18',
            '2025-05-19', '2025-05-20', '2025-05-21', '2025-05-22', '2025-05-23',
            '2025-05-24', '2025-05-25', '2025-05-26', '2025-05-27', '2025-05-28',
            '2025-05-29', '2025-05-30', '2025-05-31', '2025-06-01', '2025-06-02',
            '2025-06-03', '2025-06-04', '2025-06-05', '2025-06-06', '2025-06-07',
            '2025-06-08', '2025-06-09', '2025-06-10', '2025-06-11', '2025-06-12',
            '2025-06-13', '2025-06-14', '2025-06-15', '2025-06-16', '2025-06-17',
            '2025-06-18', '2025-06-19', '2025-06-20', '2025-06-21', '2025-06-22',
            '2025-06-23', '2025-06-24', '2025-06-25', '2025-06-26', '2025-06-27',
            '2025-06-28', '2025-06-29'
          ],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Đọc sách',
          description: 'Đọc ít nhất 20 trang sách mỗi ngày',
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '3',
          name: 'Uống nước đủ',
          description: 'Uống 2 lít nước mỗi ngày',
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '4',
          name: 'Hút thuốc lá',
          description: 'Giảm số điếu thuốc hút mỗi ngày',
          completedDays: ['2024-01-01', '2024-01-02'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '5',
          name: 'Học tiếng Anh',
          description: 'Học 30 phút tiếng Anh mỗi ngày',
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '6',
          name: 'Ăn fast food',
          description: 'Giảm ăn đồ ăn nhanh',
          completedDays: ['2024-01-01'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '7',
          name: 'Thiền định',
          description: 'Thiền 15 phút mỗi sáng',
          completedDays: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04'],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: '8',
          name: 'Dọn dẹp nhà cửa',
          description: 'Dọn dẹp 30 phút mỗi ngày',
          completedDays: ['2024-01-01', '2024-01-02'],
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

  return {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleDayCompletion,
    getCurrentStreak,
  };
}; 