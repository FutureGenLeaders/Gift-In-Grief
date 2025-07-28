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
    <nav className="bg-black border-b border-gray-800 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        className="cursor-pointer text-2xl font-['Playfair_Display'] font-bold text-gold tracking-wide"
      >
        Gift in Grief
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 font-['Inter']">
        <button
          onClick={() => navigate('/')}
          className="text-white hover:text-gold transition-colors"
        >
          Home
        </button>
        <button
          onClick={() => handleProtectedNavigation('/sessions')}
          className="text-white hover:text-gold transition-colors"
        >
          Sessions
        </button>
        <button
          onClick={() => handleProtectedNavigation('/community')}
          className="text-white hover:text-gold transition-colors"
        >
          Community
        </button>
        <button
          onClick={() => navigate('/membership')}
          className="text-white hover:text-gold transition-colors"
        >
          Membership
        </button>
        <button
          onClick={() => navigate('/subscribe')}
          className="text-white hover:text-gold transition-colors"
        >
          Subscribe
        </button>

        {/* Auth Controls */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-silver">
              {user.user_metadata?.display_name || user.email.split('@')[0]}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-silver transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-silver transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}