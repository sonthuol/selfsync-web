import React from 'react';
import { Card, Input, Select, Button, Space, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { HabitFilter } from '../types/habit';

const { Search } = Input;

interface HabitFilterProps {
  filter: HabitFilter;
  onFilterChange: (filter: HabitFilter) => void;
  onReset: () => void;
}

const HabitFilter: React.FC<HabitFilterProps> = ({ filter, onFilterChange, onReset }) => {
  const handleSearch = (value: string) => {
    onFilterChange({ ...filter, search: value });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({ ...filter, type: value as 'good' | 'bad' | undefined });
  };

  const handleFrequencyChange = (value: string) => {
    onFilterChange({ ...filter, frequency: value as 'daily' | 'weekly' | 'monthly' | undefined });
  };

  const handleStatusChange = (value: boolean | undefined) => {
    onFilterChange({ ...filter, isActive: value });
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Card title="Bộ lọc" className="filter-card" style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Search
            placeholder="Tìm kiếm thói quen..."
            allowClear
            onSearch={handleSearch}
            defaultValue={filter.search}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Loại thói quen"
            allowClear
            style={{ width: '100%' }}
            onChange={handleTypeChange}
            value={filter.type}
          >
            <Select.Option value="good">Thói quen tốt</Select.Option>
            <Select.Option value="bad">Thói quen xấu</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Tần suất"
            allowClear
            style={{ width: '100%' }}
            onChange={handleFrequencyChange}
            value={filter.frequency}
          >
            <Select.Option value="daily">Hàng ngày</Select.Option>
            <Select.Option value="weekly">Hàng tuần</Select.Option>
            <Select.Option value="monthly">Hàng tháng</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder="Trạng thái"
            allowClear
            style={{ width: '100%' }}
            onChange={handleStatusChange}
            value={filter.isActive}
          >
            <Select.Option value={true}>Đang theo dõi</Select.Option>
            <Select.Option value={false}>Tạm dừng</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Đặt lại
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default HabitFilter; 