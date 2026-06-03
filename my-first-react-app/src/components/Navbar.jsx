import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

/**
 * Navbar - Top-level component that conditionally renders
 * either the LoginForm or UserProfile based on login status.
 * 
 * Demonstrates PROP DRILLING: username and onLogout are passed
 * through Navbar -> LoginForm/UserProfile without intermediate components reading them.
 */
export default function Navbar({ isLoggedIn, username, onLogout, onLogin }) {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <h1 style={styles.logo}>MyReactApp</h1>

        {isLoggedIn ? (
          // User is logged in → show profile info + logout button
          <UserProfile username={username} onLogout={onLogout} />
        ) : (
          // User is NOT logged in → show login form
          <LoginForm onLogin={onLogin} />
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    padding: '16px 24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  navContent: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },};