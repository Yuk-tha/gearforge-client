import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-dark min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          My <span className="text-primary">Profile</span>
        </h1>

        <div className="glass rounded-2xl p-8">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center">
              <FaUser className="text-primary text-3xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <span className={`text-xs px-3 py-1 rounded-full ${
                user?.role === 'admin' ? 'bg-neon/20 text-neon' : 'bg-primary/20 text-primary'
              }`}>
                {user?.role === 'admin' ? '⚡ Admin' : '🎮 Customer'}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: <FaUser />, label: 'Full Name', value: user?.name },
              { icon: <FaEnvelope />, label: 'Email', value: user?.email },
              { icon: <FaShieldAlt />, label: 'Role', value: user?.role },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-surfaceLight rounded-xl p-4">
                <span className="text-primary">{item.icon}</span>
                <div>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/orders"
            className="block mt-6 text-center bg-primary hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;