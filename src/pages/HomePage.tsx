import React, { useState } from 'react';
import { Layout, Button, Modal, Typography, Empty, message, Radio, Card, Divider } from 'antd';
import { PlusOutlined, LeftOutlined, RightOutlined, FireOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import HabitForm from '../components/HabitForm';
import { useHabits } from '../hooks/useHabits';
import type { Habit, HabitFormData } from '../types/habit';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

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

  return (
    <>
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
              {!isToday && (
                <Button 
                  onClick={goToToday}
                  size="small"
                  style={{ 
                    marginTop: '8px',
                    fontSize: '12px',
                    height: '24px',
                    padding: '0 8px',
                    background: '#2c3c53',
                    border: 'none',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3d516a';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#2c3c53';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Hôm nay
                </Button>
              )}
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
            {/* Empty for spacing */}
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