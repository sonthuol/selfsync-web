import { useState, useEffect, useCallback } from 'react';
import type { Habit, HabitFormData } from '../types/habit';
import { habitService } from '../services/habitService';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);

  // Load habits từ API
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const data = await habitService.getAll();
      setHabits(data);
    } catch (error) {
      console.error('Error loading habits:', error);
      setHabits([]);
    }
    setLoading(false);
  };

  // Create new habit
  const createHabit = useCallback(async (habitData: HabitFormData) => {
    setLoading(true);
    await habitService.create(habitData);
    fetchHabits();
    setLoading(false);
  }, []);

  // Update habit
  const updateHabit = useCallback(async (id: string, habitData: HabitFormData) => {
    setLoading(true);
    await habitService.update(Number(id), habitData);
    fetchHabits();
    setLoading(false);
  }, []);

  // Delete habit
  const deleteHabit = useCallback(async (id: string) => {
    setLoading(true);
    await habitService.delete(Number(id));
    fetchHabits();
    setLoading(false);
  }, []);

  // Toggle day completion
  const toggleDayCompletion = useCallback(async (id: string, date: string) => {
    setLoading(true);
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    const isCompleted = habit.completedDays?.includes(date);
    if (isCompleted) {
      await habitService.uncompleteDay(Number(id), date);
    } else {
      await habitService.completeDay(Number(id), date);
    }
    fetchHabits();
    setLoading(false);
  }, [habits]);

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

export async function getHabits() {
  return habitService.getAll();
}

export async function getHabit(id: number) {
  return habitService.get(id);
}

export async function createHabit(data: any) {
  return habitService.create(data);
}

export async function updateHabit(id: number, data: any) {
  return habitService.update(id, data);
}

export async function deleteHabit(id: number) {
  return habitService.delete(id);
}

export async function completeDay(id: number, date: string) {
  return habitService.completeDay(id, date);
}

export async function uncompleteDay(id: number, date: string) {
  return habitService.uncompleteDay(id, date);
} 