import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeNav() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Navigation logic: if user not logged in, go to /assessment first
  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/assessment', { state: { from: { pathname: path } } });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-background border-b border-border text-foreground px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        className="cursor-pointer text-2xl font-bold text-primary tracking-wide"
      >
        Gift in Grief
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 body-text">
        <button
          onClick={() => navigate('/')}
          className="hover:text-primary transition-colors"
        >
          Home
        </button>
        <button
          onClick={() => handleProtectedNavigation('/sessions')}
          className="hover:text-primary transition-colors"
        >
          Sessions
        </button>
        <button
          onClick={() => handleProtectedNavigation('/community')}
          className="hover:text-primary transition-colors"
        >
          Community
        </button>
        <button
          onClick={() => handleProtectedNavigation('/membership')}
          className="hover:text-primary transition-colors"
        >
          Membership
        </button>
        <button
          onClick={() => navigate('/subscribe')}
          className="hover:text-primary transition-colors"
        >
          Subscribe
        </button>

        {/* Auth Controls */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="silver-text">
              {user.user_metadata?.display_name || user.email.split('@')[0]}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}