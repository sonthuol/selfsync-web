import React, { useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import type { Habit, HabitFormData } from '../types/habit';

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
        name: habit.name,
        description: habit.description,
      });
    }
  }, [habit, form]);

  const handleSubmit = (values: HabitFormData) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
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