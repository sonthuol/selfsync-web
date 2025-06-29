import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './pages/HomePage';
import MyHabitsPage from './pages/MyHabitsPage';
import HabitDetailPage from './pages/HabitDetailPage';
import './App.css';

// Component chính với routing
function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myhabits" element={<MyHabitsPage />} />
          <Route path="/habit/:id" element={<HabitDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
