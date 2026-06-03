import PropTypes from 'prop-types';

/**
 * UserProfile - Displays logged-in user info and a logout button.
 * 
 * Receives `username` and `onLogout` via PROP DRILLING from Navbar.
 */
export default function UserProfile({ username, onLogout }) {
  return (
    <div style={styles.container}>
      <div style={styles.avatar}>
        {username?.charAt(0)?.toUpperCase()}
      </div>
      <div style={styles.info}>
        <p style={styles.welcomeText}>Welcome,</p>
        <p style={styles.usernameText}>{username}</p>
      </div>
      <button onClick={onLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.15)',
    padding: '8px 16px',
    borderRadius: '10px',
    backdropFilter: 'blur(4px)',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#fff',
    color: '#764ba2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  welcomeText: {
    margin: 0,
    fontSize: '0.75rem',
    color: '#e0d4f5',
  },
  usernameText: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  logoutButton: {
    padding: '8px 14px',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.85rem',
  },
};
