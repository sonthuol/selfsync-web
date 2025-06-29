import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Statistic, Row, Col, Modal, message, Popconfirm } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, TrophyOutlined, FireOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHabits } from '../hooks/useHabits';
import { Habit } from '../types/habit';
import { ContributionCalendar } from 'react-contribution-calendar';
import HabitForm from '../components/HabitForm';

const { Title, Text, Paragraph } = Typography;

const HabitDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { habits, updateHabit, deleteHabit } = useHabits();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showMoreActivities, setShowMoreActivities] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (id && habits) {
      const foundHabit = habits.find(h => h.id === id);
      setHabit(foundHabit || null);
    }
  }, [id, habits]);

  if (!habit) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        color: '#ffffff'
      }}>
        <Text style={{ color: '#ffffff' }}>Không tìm thấy thói quen</Text>
      </div>
    );
  }

  const getCurrentStreak = (habit: Habit) => {
    if (!habit.completedDays || habit.completedDays.length === 0) return 0;
    
    const sortedDates = habit.completedDays.sort().reverse();
    
    let streak = 0;
    let currentDate = new Date();
    
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      const diffTime = Math.abs(currentDate.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        streak++;
        currentDate = date;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getLongestStreak = (habit: Habit) => {
    if (!habit.completedDays || habit.completedDays.length === 0) return 0;
    
    const sortedDates = habit.completedDays.sort();
    let longestStreak = 0;
    let currentStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    
    return Math.max(longestStreak, currentStreak);
  };

  const currentStreak = getCurrentStreak(habit);
  const longestStreak = getLongestStreak(habit);
  const totalCompletions = habit.completedDays?.length || 0;

  const handleEdit = () => {
    setEditingHabit(habit || undefined);
    setIsEditModalVisible(true);
  };

  const handleUpdateHabit = (values: { name: string; description?: string }) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, values);
      setIsEditModalVisible(false);
      setEditingHabit(undefined);
      message.success('Cập nhật thói quen thành công!');
    }
  };

  const handleDelete = () => {
    if (habit) {
      deleteHabit(habit.id);
      message.success('Đã xóa thói quen!');
      navigate('/');
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingHabit(undefined);
  };

  return (
    <>
      {/* Header ngoài cùng, full width, đồng bộ các trang khác */}
      <div style={{
        background: 'transparent',
        padding: 0,
        boxShadow: 'none',
        border: 'none',
        marginBottom: 32,
        position: 'relative',
        zIndex: 10,
      }}>
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
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')} 
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
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>
              Chi tiết thói quen
            </span>
          </div>
          <div style={{ flex: '0 0 96px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{
                color: '#ffffff',
                background: '#3d516a',
                border: '1px solid #4a5f7a',
                height: '40px',
                width: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4a5f7a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3d516a';
              }}
            />
            <Popconfirm
              title="Xóa thói quen"
              description="Bạn có chắc chắn muốn xóa thói quen này không?"
              onConfirm={handleDelete}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{
                  color: '#ffffff',
                  background: '#3d516a',
                  border: '1px solid #4a5f7a',
                  height: '40px',
                  width: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#4a5f7a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3d516a';
                }}
              />
            </Popconfirm>
          </div>
        </div>
      </div>
      {/* Nội dung chi tiết trong container */}
      <div style={{ 
        width: '100%',
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '24px',
        minHeight: '100vh'
      }}>
        {/* Habit Info Card */}
        <Card 
          style={{ 
            background: '#3d516a',
            border: '1px solid #2c3c53',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
          styles={{
            body: { padding: '24px' }
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <Title level={3} style={{ color: '#ffffff', marginBottom: '8px' }}>
              {habit.name}
            </Title>
            {habit.description && (
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                {habit.description}
              </Paragraph>
            )}
          </div>

          {/* Stats Grid */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title={<Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Chuỗi hiện tại</Text>}
                value={currentStreak}
                prefix={<FireOutlined style={{ color: '#ff6b6b' }} />}
                valueStyle={{ color: '#ffffff' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title={<Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Chuỗi dài nhất</Text>}
                value={longestStreak}
                prefix={<TrophyOutlined style={{ color: '#ffd93d' }} />}
                valueStyle={{ color: '#ffffff' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title={<Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Tổng lần hoàn thành</Text>}
                value={totalCompletions}
                prefix={<CalendarOutlined style={{ color: '#4ecdc4' }} />}
                valueStyle={{ color: '#ffffff' }}
              />
            </Col>
          </Row>
        </Card>

        {/* Calendar and Recent Activity Section */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {/* Calendar Section */}
            <Card 
              style={{ 
                background: '#3d516a',
                border: '1px solid #2c3c53',
                borderRadius: '12px',
                height: 'fit-content'
              }}
              styles={{
                body: { padding: '24px' }
              }}
            >
              <Typography.Title level={4} style={{ color: '#ffffff', marginBottom: '16px' }}>
                Lịch hoàn thành thói quen
              </Typography.Title>
              <div style={{ 
                width: isMobile ? '100%' : '1200px', 
                overflow: 'auto',
                maxWidth: '100%'
              }}>
                <ContributionCalendar
                  data={[habit.completedDays.reduce((acc, date) => {
                    acc[date] = { level: 4 };
                    return acc;
                  }, {} as Record<string, { level: number }>)]}
                  dateOptions={{
                    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
                    end: new Date().toISOString().split('T')[0],
                    daysOfTheWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                    startsOnSunday: true,
                    includeBoundary: true,
                  }}
                  styleOptions={{
                    theme: {
                      level0: '#2c3c53',
                      level1: '#3d516a', 
                      level2: '#1890ff',
                      level3: '#40a9ff',
                      level4: '#4ecdc4',
                    },
                    cx: isMobile ? 8 : 12,
                    cy: isMobile ? 8 : 12,
                    cr: isMobile ? 1 : 2,
                    textColor: '#ffffff',
                  }}
                  visibilityOptions={{
                    hideDescription: false,
                    hideMonthLabels: false,
                    hideDayLabels: false,
                  }}
                />
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            {/* Recent Activity */}
            <Card 
              style={{ 
                background: '#3d516a',
                border: '1px solid #2c3c53',
                borderRadius: '12px',
                height: 'fit-content'
              }}
              styles={{
                body: { padding: '24px' }
              }}
            >
              <Title level={4} style={{ color: '#ffffff', marginBottom: '16px' }}>
                Hoạt động gần đây
              </Title>
              {habit.completedDays && habit.completedDays.length > 0 ? (
                <div>
                  {habit.completedDays
                    .sort()
                    .reverse()
                    .slice(0, showAllActivities ? habit.completedDays.length : (showMoreActivities ? 14 : 4))
                    .map((date, index) => (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 0',
                          borderBottom: index < (showAllActivities ? habit.completedDays.length - 1 : (showMoreActivities ? 13 : 3)) ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                        }}
                      >
                        <span style={{ 
                          color: '#52c41a', 
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}>
                          ✓
                        </span>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {new Date(date).toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Text>
                      </div>
                    ))}
                  
                  {habit.completedDays.length > 4 && !showAllActivities && (
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                      <Button
                        type="text"
                        onClick={() => {
                          if (showMoreActivities) {
                            setShowAllActivities(true);
                          } else {
                            setShowMoreActivities(true);
                          }
                        }}
                        style={{
                          color: '#1890ff',
                          background: 'transparent',
                          border: 'none',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#40a9ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#1890ff';
                        }}
                      >
                        {showMoreActivities 
                          ? `Xem hết ${habit.completedDays.length} hoạt động` 
                          : `Xem thêm ${Math.min(10, habit.completedDays.length - 4)} hoạt động`
                        }
                      </Button>
                    </div>
                  )}

                  {showAllActivities && (
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                      <Button
                        type="text"
                        onClick={() => {
                          setShowAllActivities(false);
                          setShowMoreActivities(false);
                        }}
                        style={{
                          color: '#1890ff',
                          background: 'transparent',
                          border: 'none',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#40a9ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#1890ff';
                        }}
                      >
                        Thu gọn
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Chưa có hoạt động nào được ghi nhận
                </Text>
              )}
            </Card>
          </Col>
        </Row>

        {/* Edit Modal */}
        <Modal
          title="Chỉnh sửa thói quen"
          open={isEditModalVisible}
          onCancel={handleEditModalCancel}
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
              paddingTop: '20px',
            },
            mask: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }
          }}
        >
          <HabitForm
            habit={editingHabit}
            onSubmit={handleUpdateHabit}
            onCancel={handleEditModalCancel}
            loading={false}
          />
        </Modal>
      </div>
    </>
  );
};

export default HabitDetailPage; 