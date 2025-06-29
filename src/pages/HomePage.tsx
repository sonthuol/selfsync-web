import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, Modal, Typography, Empty, message, Radio, Card, Divider, DatePicker, Checkbox } from 'antd';
import { PlusOutlined, LeftOutlined, RightOutlined, FireOutlined, UnorderedListOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import HabitForm from '../components/HabitForm';
import { useHabits } from '../hooks/useHabits';
import type { Habit, HabitFormData } from '../types/habit';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

dayjs.locale('vi');

const HomePage: React.FC = () => {
  const {
    habits,
    loading,
    createHabit,
    updateHabit,
    toggleDayCompletion,
    getCurrentStreak,
  } = useHabits();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateTriggerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        calendarRef.current && !calendarRef.current.contains(target) &&
        dateTriggerRef.current && !dateTriggerRef.current.contains(target)
      ) {
        setIsCalendarVisible(false);
      }
    };
    if (isCalendarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarVisible]);

  const handleCreateHabit = (values: HabitFormData) => {
    createHabit(values);
    setIsModalVisible(false);
    message.success('Tạo thói quen thành công!');
  };

  const handleUpdateHabit = (values: HabitFormData) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, values);
      setIsModalVisible(false);
      setEditingHabit(undefined);
      message.success('Cập nhật thói quen thành công!');
    }
  };

  const handleToggleDay = (id: string, date: string) => {
    toggleDayCompletion(id, date);
    message.success('Đã cập nhật trạng thái!');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingHabit(undefined);
  };

  const handleAddNew = () => {
    setEditingHabit(undefined);
    setIsModalVisible(true);
  };

  const goToPreviousDay = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'));
  };

  const goToNextDay = () => {
    setSelectedDate(selectedDate.add(1, 'day'));
  };

  const goToToday = () => {
    setSelectedDate(dayjs());
  };

  const selectedDateStr = selectedDate.format('YYYY-MM-DD');
  const isToday = selectedDate.isSame(dayjs(), 'day');
  const dateDisplay = selectedDate.format('DD/MM');
  const dayName = selectedDate.format('dddd');

  // Lọc thói quen đã hoàn thành và chưa hoàn thành
  const completedHabits = habits.filter(habit => 
    habit.completedDays && habit.completedDays.includes(selectedDateStr)
  );
  const incompleteHabits = habits.filter(habit => 
    !habit.completedDays || !habit.completedDays.includes(selectedDateStr)
  );

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      setIsCalendarVisible(false);
    }
  };

  const handleDateClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <>
      <Header style={{ background: 'transparent', padding: 0, boxShadow: 'none', border: 'none', marginBottom: 32, position: 'relative', zIndex: 10 }}>
        <div style={{
          width: '100%',
          maxWidth: 1200,
          margin: '32px auto 0 auto',
          background: '#2c3c53',
          borderRadius: 16,
          padding: '16px 0',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{ flex: '0 0 48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={goToPreviousDay}
              size="large"
              style={{
                color: '#b0b8c1',
                background: 'transparent',
                border: 'none',
                fontSize: 20,
                width: 40,
                height: 40,
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              ref={dateTriggerRef}
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', position: 'relative' }}
            >
              {isToday ? (
                <>
                  <CalendarOutlined style={{ color: '#ffffff', fontSize: 20, marginRight: 8 }} />
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>Hôm nay</span>
                </>
              ) : (
                <span style={{ color: '#b0b8c1', fontWeight: 500, fontSize: 20, textAlign: 'center' }}>
                  {selectedDate.format('DD/MM')}
                </span>
              )}
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                open={isCalendarVisible}
                onOpenChange={setIsCalendarVisible}
                inputReadOnly
                allowClear={false}
                variant="borderless"
                disabledDate={(current) => current && current > dayjs().endOf('day')}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 2
                }}
                classNames={{ popup: { root: 'custom-calendar-popup' } }}
              />
            </div>
          </div>
          <div style={{ flex: '0 0 48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isToday ? (
              <div style={{ width: 40, height: 40 }} />
            ) : (
              <Button
                type="text"
                icon={<RightOutlined />}
                onClick={goToNextDay}
                size="large"
                style={{
                  color: '#b0b8c1',
                  background: 'transparent',
                  border: 'none',
                  fontSize: 20,
                  width: 40,
                  height: 40,
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </div>
        </div>
      </Header>

      <Content>
        <div className="habit-container">
          {/* Danh sách thói quen chưa hoàn thành */}
          <div className="habits-section">
            <div className="section-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Title level={4} style={{ marginBottom: '16px', color: '#1890ff', margin: 0 }}>
                  Thói quen cần làm ({incompleteHabits.length})
                </Title>
                <Link 
                  to="/myhabits" 
                  style={{ 
                    fontSize: '16px', 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    fontWeight: 'normal',
                    background: '#2c3c53',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3d516a';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#2c3c53';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  <UnorderedListOutlined />
                </Link>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddNew}
                size="middle"
                style={{
                  background: '#2c3c53',
                  border: 'none',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3d516a';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 60, 83, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2c3c53';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {incompleteHabits.length === 0 ? (
              <Empty
                description="Tất cả thói quen đã hoàn thành!"
                style={{ 
                  background: '#3d516a', 
                  padding: '32px', 
                  borderRadius: '16px',
                  minHeight: '120px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff'
                }}
                imageStyle={{ height: 48 }}
              />
            ) : (
              <div className="habits-list">
                {incompleteHabits.map(habit => (
                  <Card key={habit.id} className="habit-item">
                    <div className="habit-item-content">
                      <Checkbox
                        checked={habit.completedDays?.includes(selectedDateStr)}
                        onChange={() => handleToggleDay(habit.id, selectedDateStr)}
                        className="custom-circle-checkbox"
                      />
                      <div className="habit-info">
                        <div className="habit-title-description">
                          <Link 
                            to={`/habit/${habit.id}`}
                            style={{ 
                              color: '#ffffff', 
                              textDecoration: 'none',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#1890ff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#ffffff';
                            }}
                          >
                            <Title level={5} style={{ margin: 0 }}>
                              {habit.name}
                            </Title>
                          </Link>
                        </div>
                      </div>
                      <div className="habit-actions">
                        <div className="habit-stats">
                          <Text type="secondary">
                            <FireOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                            {getCurrentStreak(habit)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Danh sách thói quen đã hoàn thành */}
          {completedHabits.length > 0 && (
            <div className="habits-section completed">
              <Title level={5} style={{ color: '#fff', margin: '24px 0 12px 0' }}>
                Thói quen đã hoàn thành ({completedHabits.length})
              </Title>
              <div className="habits-list">
                {completedHabits.map(habit => (
                  <Card key={habit.id} className="habit-item completed">
                    <div className="habit-item-content">
                      <Checkbox
                        checked={true}
                        disabled
                        className="custom-circle-checkbox"
                      />
                      <div className="habit-info">
                        <div className="habit-title-description">
                          <Link 
                            to={`/habit/${habit.id}`}
                            style={{ 
                              color: '#ffffff', 
                              textDecoration: 'none',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#1890ff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#ffffff';
                            }}
                          >
                            <Title level={5} style={{ margin: 0 }}>
                              {habit.name}
                            </Title>
                          </Link>
                        </div>
                      </div>
                      <div className="habit-actions">
                        <div className="habit-stats">
                          <Text type="secondary">
                            <FireOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                            {getCurrentStreak(habit)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty state khi không có thói quen nào */}
          {habits.length === 0 && (
            <Empty
              description="Chưa có thói quen nào"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)', 
                padding: '48px', 
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Button type="primary" onClick={handleAddNew}>
                Tạo thói quen đầu tiên
              </Button>
            </Empty>
          )}
        </div>

        <Modal
          title={editingHabit ? 'Chỉnh sửa thói quen' : 'Tạo thói quen mới'}
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={600}
          destroyOnHidden
          styles={{
            content: {
              background: '#2c3c53',
              color: '#ffffff',
              border: '1px solid #3d516a',
              borderRadius: '12px',
            },
            header: {
              background: '#2c3c53',
              borderBottom: '1px solid #3d516a',
              borderRadius: '12px 12px 0 0',
            },
            body: {
              background: '#2c3c53',
              color: '#ffffff',
            },
            mask: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }
          }}
        >
          <HabitForm
            habit={editingHabit}
            onSubmit={editingHabit ? handleUpdateHabit : handleCreateHabit}
            onCancel={handleModalCancel}
            loading={loading}
          />
        </Modal>
      </Content>
    </>
  );
};

export default HomePage; 