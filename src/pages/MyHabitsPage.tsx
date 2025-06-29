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
      <Header style={{ 
        background: '#2c3c53', 
        padding: '0 24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%' 
        }}>
          <div className="header-content">
            <div className="header-left">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleGoBack}
                size="large"
                style={{ 
                  color: '#ffffff',
                  background: '#2c3c53',
                  border: 'none',
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
              />
            </div>
            
            <div className="date-navigator">
              <div className="date-display">
                <Title level={3} style={{ margin: 0, textAlign: 'center', color: '#ffffff' }}>
                  
                </Title>
              </div>
            </div>

            <div className="header-right">
              {/* Empty for spacing */}
            </div>
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