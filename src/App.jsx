import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Tasks     from './pages/Tasks';
import Clients   from './pages/Clients';
import Reports   from './pages/Reports';
import Profile   from './pages/Profile';
import Leads from './pages/Leads';

const PageWrapper = ({ children }) => (
  <div
    style={{
      marginLeft: '60px',   // collapsed width
      padding: '24px',
      minHeight: '100vh',
    }}
  >
    {children}
  </div>
);

function App() {
  return (
    <>
      <Sidebar />
      <PageWrapper>
        <Routes>
          <Route path="/"         element={<Dashboard />} />
          <Route path="/tasks"    element={<Tasks />} />
          <Route path="/clients"  element={<Clients />} />
          <Route path="/reports"  element={<Reports />} />
          <Route path="/profile"  element={<Profile />} />
          <Route path="/leads"  element={<Leads />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
