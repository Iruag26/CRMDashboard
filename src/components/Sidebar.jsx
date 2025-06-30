import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaTasks,
  FaUsers,
  FaChartBar,
  FaUserCircle,
  FaUserPlus,     // <-- icon for Leads
} from 'react-icons/fa';
import './css/Sidebar.css';

/* All menu items in one place */
const menu = [
  { path: '/',        label: 'Dashboard', icon: <FaHome /> },
  { path: '/tasks',   label: 'Tasks',     icon: <FaTasks /> },
  { path: '/clients', label: 'Clients',   icon: <FaUsers /> },
  { path: '/leads',   label: 'Leads',     icon: <FaUserPlus /> },   // <-- new
  { path: '/reports', label: 'Reports',   icon: <FaChartBar /> },
  { path: '/profile', label: 'Profile',   icon: <FaUserCircle /> },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="crmsidebar"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ width: expanded ? '200px' : '60px' }}  /* only width is inline */
    >
      {menu.map(({ path, label, icon }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? 'sidebar-active' : ''}`
          }
        >
          <span className="sidebar-icon">{icon}</span>
          {expanded && <span className="sidebar-label">{label}</span>}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
