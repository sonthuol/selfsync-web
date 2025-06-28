import React, { useState } from 'react';
import { Layout, Button, Modal, Typography, Row, Col, Empty, message, Popconfirm, Radio, Card, Space, Divider } from 'antd';
import { PlusOutlined, LeftOutlined, RightOutlined, FireOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import HabitForm from './components/HabitForm';
import { useHabits } from './hooks/useHabits';
import type { Habit, HabitFormData } from './types/habit';
import './App.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleDayCompletion,
    isTodayCompleted,
    getCurrentStreak,
    getTotalCompletedDays,
    toggleHabitStatus,
  } = useHabits();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

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

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalVisible(true);
  };

  const handleDeleteHabit = (id: string) => {
    deleteHabit(id);
    message.success('Xóa thói quen thành công!');
  };

  const handleToggleDay = (id: string, date: string) => {
    toggleDayCompletion(id, date);
    message.success('Đã cập nhật trạng thái!');
  };

  const handleToggleHabitStatus = (id: string) => {
    toggleHabitStatus(id);
    message.success('Đã cập nhật trạng thái thói quen!');
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#2c3c53', padding: '0 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }}>
        <div className="header-content">
          <div className="header-left">
            {/* Button đã được chuyển thành FAB */}
          </div>
          
          <div className="date-navigator">
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={goToPreviousDay}
              size="large"
              style={{ color: '#ffffff' }}
            />
            <div className="date-display">
              <Title level={3} style={{ margin: 0, textAlign: 'center', color: '#ffffff' }}>
                {dateDisplay}
              </Title>
              <Text style={{ fontSize: '16px', color: '#ffffff' }}>
                {isToday ? 'Hôm nay' : dayName}
              </Text>
            </div>
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={goToNextDay}
              size="large"
              style={{ color: '#ffffff' }}
            />
          </div>

          <div className="header-right">
            {!isToday && (
              <Button type="primary" onClick={goToToday}>
                Hôm nay
              </Button>
            )}
          </div>
        </div>
      </Header>

      <Content>
        <div className="habit-container">
          {/* Danh sách thói quen chưa hoàn thành */}
          <div className="habits-section">
            <div className="section-header">
              <Title level={4} style={{ marginBottom: '16px', color: '#1890ff', margin: 0 }}>
                Thói quen cần làm ({incompleteHabits.length})
              </Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddNew}
                size="middle"
              />
            </div>
            
            {incompleteHabits.length === 0 ? (
              <Empty
                description="Tất cả thói quen đã hoàn thành!"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  padding: '48px', 
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              />
            ) : (
              <div className="habits-list">
                {incompleteHabits.map(habit => (
                  <Card key={habit.id} className="habit-item">
                    <div className="habit-item-content">
                      <div className="habit-info">
                        <div className="habit-title-description">
                          <Title level={5} style={{ margin: 0 }}>
                            {habit.name}
                          </Title>
                        </div>
                      </div>
                      <div className="habit-actions">
                        <div className="habit-stats">
                          <Text type="secondary">
                            <FireOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                            {getCurrentStreak(habit.id)}
                          </Text>
                        </div>
                        <Radio
                          checked={false}
                          onChange={() => handleToggleDay(habit.id, selectedDateStr)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Danh sách thói quen đã hoàn thành */}
          {completedHabits.length > 0 && (
            <>
              <Divider />
              <div className="habits-section">
                <Title level={4} style={{ marginBottom: '16px', color: '#52c41a' }}>
                  Thói quen đã hoàn thành ({completedHabits.length})
                </Title>
                
                <div className="habits-list completed">
                  {completedHabits.map(habit => (
                    <Card key={habit.id} className="habit-item completed">
                      <div className="habit-item-content">
                        <div className="habit-info">
                          <div className="habit-title-description">
                            <Title level={5} style={{ margin: 0 }}>
                              {habit.name}
                            </Title>
                          </div>
                        </div>
                        <div className="habit-actions">
                          <div className="habit-stats">
                            <Text type="secondary">
                              <FireOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                              {getCurrentStreak(habit.id)}
                            </Text>
                          </div>
                          <Radio
                            checked={true}
                            onChange={() => handleToggleDay(habit.id, selectedDateStr)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
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
        >
          <HabitForm
            habit={editingHabit}
            onSubmit={editingHabit ? handleUpdateHabit : handleCreateHabit}
            onCancel={handleModalCancel}
            loading={loading}
          />
        </Modal>
      </Content>
    </Layout>
  );
}

export default App;
