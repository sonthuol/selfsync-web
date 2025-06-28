import React from 'react';
import { Card, Tag, Progress, Button, Space, Typography, Row, Col, Statistic, Switch } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FireOutlined,
  StopOutlined
} from '@ant-design/icons';
import type { Habit } from '../types/habit';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onToggleDay: (id: string, date: string) => void;
  onToggleStatus: (id: string) => void;
  isTodayCompleted: (habit: Habit) => boolean;
  getCurrentStreak: (habit: Habit) => number;
  getTotalCompletedDays: (habit: Habit) => number;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onEdit,
  onDelete,
  onToggleDay,
  onToggleStatus,
  isTodayCompleted,
  getCurrentStreak,
  getTotalCompletedDays,
}) => {
  const getTypeColor = (type: string) => {
    return type === 'good' ? '#52c41a' : '#ff4d4f';
  };

  const getTypeIcon = (type: string) => {
    return type === 'good' ? <TrophyOutlined /> : <StopOutlined />;
  };

  const getFrequencyText = (frequency: string) => {
    const frequencyMap = {
      daily: 'Hàng ngày',
      weekly: 'Hàng tuần',
      monthly: 'Hàng tháng',
    };
    return frequencyMap[frequency as keyof typeof frequencyMap] || frequency;
  };

  const getFrequencyIcon = (frequency: string) => {
    return <CalendarOutlined />;
  };

  const totalCompleted = getTotalCompletedDays(habit);
  const currentStreak = getCurrentStreak(habit);
  const todayCompleted = isTodayCompleted(habit);
  const progressPercent = Math.min((totalCompleted / habit.target) * 100, 100);
  const isCompleted = progressPercent >= 100;
  const isOverTarget = totalCompleted > habit.target;

  const getProgressStatus = () => {
    if (isCompleted) return 'success';
    if (isOverTarget) return 'exception';
    return 'active';
  };

  const getProgressColor = () => {
    if (isCompleted) return '#52c41a';
    if (isOverTarget) return '#ff4d4f';
    return habit.type === 'good' ? '#52c41a' : '#ff4d4f';
  };

  const handleTodayToggle = () => {
    const today = new Date().toISOString().split('T')[0];
    onToggleDay(habit.id, today);
  };

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #f0f0f0',
        overflow: 'hidden',
        position: 'relative',
      }}
      bodyStyle={{ padding: 20 }}
      actions={[
        <Button
          type={todayCompleted ? "primary" : "default"}
          icon={todayCompleted ? <CheckOutlined /> : <CloseOutlined />}
          onClick={handleTodayToggle}
          style={{ 
            color: todayCompleted ? '#fff' : (habit.type === 'good' ? '#52c41a' : '#ff4d4f'),
            borderColor: todayCompleted ? undefined : (habit.type === 'good' ? '#52c41a' : '#ff4d4f')
          }}
        >
          {todayCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </Button>,
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(habit)}
          style={{ color: '#1890ff' }}
        >
          Sửa
        </Button>,
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(habit.id)}
        >
          Xóa
        </Button>,
      ]}
    >
      {/* Header với icon và status */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 16 
      }}>
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ 
            margin: 0, 
            marginBottom: 8,
            color: '#262626',
            fontSize: 18,
            fontWeight: 600
          }}>
            {habit.name}
          </Title>
          
          <Space size={8} style={{ marginBottom: 12 }}>
            <Tag 
              color={getTypeColor(habit.type)}
              icon={getTypeIcon(habit.type)}
              style={{ 
                borderRadius: 6,
                fontWeight: 500,
                fontSize: 12
              }}
            >
              {habit.type === 'good' ? 'Thói quen tốt' : 'Thói quen xấu'}
            </Tag>
            
            <Tag 
              color={habit.isActive ? '#1890ff' : '#d9d9d9'}
              icon={getFrequencyIcon(habit.frequency)}
              style={{ 
                borderRadius: 6,
                fontWeight: 500,
                fontSize: 12
              }}
            >
              {getFrequencyText(habit.frequency)}
            </Tag>
          </Space>
        </div>
        
        <Switch
          checked={habit.isActive}
          onChange={() => onToggleStatus(habit.id)}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          style={{ marginLeft: 8 }}
        />
      </div>

      {/* Description */}
      {habit.description && (
        <div style={{ 
          marginBottom: 16,
          padding: 12,
          backgroundColor: '#fafafa',
          borderRadius: 8,
          border: '1px solid #f0f0f0'
        }}>
          <Text type="secondary" style={{ fontSize: 14, lineHeight: 1.5 }}>
            {habit.description}
          </Text>
        </div>
      )}

      {/* Progress Section */}
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16} style={{ marginBottom: 12 }}>
          <Col span={8}>
            <Statistic
              title="Đã hoàn thành"
              value={totalCompleted}
              valueStyle={{ 
                color: '#1890ff',
                fontSize: 20,
                fontWeight: 600
              }}
              prefix={<CheckOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Mục tiêu"
              value={habit.target}
              valueStyle={{ 
                color: '#52c41a',
                fontSize: 20,
                fontWeight: 600
              }}
              prefix={<TrophyOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Chuỗi hiện tại"
              value={currentStreak}
              valueStyle={{ 
                color: '#fa8c16',
                fontSize: 20,
                fontWeight: 600
              }}
              prefix={<FireOutlined />}
            />
          </Col>
        </Row>
        
        <Progress
          percent={progressPercent}
          status={getProgressStatus()}
          strokeColor={getProgressColor()}
          trailColor="#f0f0f0"
          strokeWidth={8}
          showInfo={false}
          style={{ marginBottom: 8 }}
        />
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Tiến độ: {Math.round(progressPercent)}%
          </Text>
          {isCompleted && (
            <Tag color="success" style={{ borderRadius: 4 }}>
              Hoàn thành! 🎉
            </Tag>
          )}
        </div>
      </div>

      {/* Date Information */}
      <div style={{ 
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        border: '1px solid #e9ecef'
      }}>
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>
                Bắt đầu
              </Text>
              <Text strong style={{ fontSize: 13 }}>
                {dayjs(habit.startDate).format('DD/MM/YYYY')}
              </Text>
            </div>
          </Col>
          {habit.endDate && (
            <Col span={12}>
              <div style={{ textAlign: 'center' }}>
                <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>
                  Kết thúc
                </Text>
                <Text strong style={{ fontSize: 13 }}>
                  {dayjs(habit.endDate).format('DD/MM/YYYY')}
                </Text>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </Card>
  );
};

export default HabitCard; 