import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Tasks     from './pages/Tasks';
import Clients   from './pages/Clients';
import Reports   from './pages/Reports';
import Profile   from './pages/Profile';
import Leads     from './pages/Leads';

const PageWrapper = ({ children }) => (
  <div
    style={{
      marginLeft: '60px',   // width of collapsed sidebar
      padding: '24px',
      minHeight: '100vh',
    }}
  >
    {children}
  </div>
);

export default function App() {
  return (
    <>
      <Sidebar />
      <PageWrapper>
        <Routes>
          {/* default page when path === "/" */}
          <Route index element={<Dashboard />} />

          {/* other pages — NO leading slash */}
          <Route path="tasks"   element={<Tasks />} />
          <Route path="clients" element={<Clients />} />
          <Route path="leads"   element={<Leads />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />

          {/* catch-all fallback */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </PageWrapper>
    </>
  );
}
