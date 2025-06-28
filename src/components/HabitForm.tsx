import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { Habit, HabitFormData } from '../types/habit';
import dayjs from 'dayjs';

interface HabitFormProps {
  habit?: Habit;
  onSubmit: (values: HabitFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const HabitForm: React.FC<HabitFormProps> = ({ habit, onSubmit, onCancel, loading = false }) => {
  const [form] = Form.useForm();
  const isEditing = !!habit;

  useEffect(() => {
    if (habit) {
      form.setFieldsValue({
        ...habit,
        startDate: dayjs(habit.startDate),
        endDate: habit.endDate ? dayjs(habit.endDate) : undefined,
      });
    }
  }, [habit, form]);

  const handleSubmit = (values: any) => {
    const formData: HabitFormData = {
      ...values,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate?.format('YYYY-MM-DD'),
    };
    onSubmit(formData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        type: 'good',
        frequency: 'daily',
        target: 1,
        startDate: dayjs(),
      }}
    >
      <Form.Item
        name="name"
        label="Tên thói quen"
        rules={[{ required: true, message: 'Vui lòng nhập tên thói quen!' }]}
      >
        <Input placeholder="Nhập tên thói quen..." />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={3} placeholder="Mô tả thói quen..." />
      </Form.Item>

      <Form.Item
        name="type"
        label="Loại thói quen"
        rules={[{ required: true, message: 'Vui lòng chọn loại thói quen!' }]}
      >
        <Select>
          <Select.Option value="good">Thói quen tốt</Select.Option>
          <Select.Option value="bad">Thói quen xấu</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="frequency"
        label="Tần suất"
        rules={[{ required: true, message: 'Vui lòng chọn tần suất!' }]}
      >
        <Select>
          <Select.Option value="daily">Hàng ngày</Select.Option>
          <Select.Option value="weekly">Hàng tuần</Select.Option>
          <Select.Option value="monthly">Hàng tháng</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="target"
        label="Mục tiêu"
        rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}
      >
        <InputNumber min={1} placeholder="Số lần mục tiêu" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="Ngày bắt đầu"
        rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="endDate" label="Ngày kết thúc (tùy chọn)">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={isEditing ? <EditOutlined /> : <PlusOutlined />}
          >
            {isEditing ? 'Cập nhật' : 'Tạo thói quen'}
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default HabitForm; 