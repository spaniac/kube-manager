import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="logo">
          K8s Manager
        </Link>
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/cluster">Cluster</Link>
          <Link to="/namespaces">Namespaces</Link>
          {user && <Link to="/profile">Profile</Link>}
        </nav>
        {user && (
          <div className="user-menu">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button onClick={handleLogout} className="logout-button" type="button">
              Logout
            </button>
          </div>
        )}
      </header>
      <aside className="app-sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/cluster">Cluster Overview</Link>
            </li>
            <li>
              <Link to="/cluster/nodes">Nodes</Link>
            </li>
            <li>
              <Link to="/cluster/events">Events</Link>
            </li>
            <li>
              <Link to="/namespaces">Namespaces</Link>
            </li>
            <li>
              <Link to="/workloads">Workloads</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
