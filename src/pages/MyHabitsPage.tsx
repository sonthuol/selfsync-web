import { Typography, Card, Empty, Button, Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHabits } from '../hooks/useHabits';
import { useNavigate, Link } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

function MyHabitsPage() {
  const { habits } = useHabits();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
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
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 20, textAlign: 'center' }}>
              Danh sách thói quen
            </span>
          </div>
          <div style={{ flex: '0 0 48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Giữ layout cân đối */}
          </div>
        </div>
      </Header>

      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
        <div className="habit-container">
          <div className="habits-section">
            <div className="section-header">
              <Title level={4} style={{ marginBottom: '16px', color: '#1890ff', margin: 0 }}>
                Tất cả thói quen ({habits.length})
              </Title>
            </div>
            
            {habits.length > 0 ? (
              <div className="habits-list">
                {habits.map(habit => (
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
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Empty
                description="Chưa có thói quen nào"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.8)', 
                  padding: '48px', 
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              />
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default MyHabitsPage; 