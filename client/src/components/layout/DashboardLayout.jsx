import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../services/authService';
import { logout } from '../../store/slices/authSlice';
import { toast } from 'react-hot-toast';

const DashboardLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const isInstructor = userInfo && userInfo.role === 'instructor';
  const isAdmin = userInfo && userInfo.role === 'admin';

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // --- THIS IS THE GUARANTEED FIX: Correct color classes ---
  const activeLinkClass = 'flex items-center px-4 py-2 text-white bg-black/30 rounded-md';
  const inactiveLinkClass = 'flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-black/20 hover:text-white';
  // --- END OF GUARANTEED FIX ---

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with correct primary-dark color */}
      <aside className="w-64 flex-shrink-0 bg-primary-dark text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-white/20">
          <Link to="/">Learnify</Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          
          {/* Admin-Specific Panel */}
          {isAdmin && (
            <>
              <NavLink to="/instructor/dashboard" end className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>
                My Courses Dashboard
              </NavLink>
              <hr className="my-2 border-white/20" />
              <p className="px-4 pt-2 pb-2 text-xs font-semibold text-gray-400 uppercase">Admin Panel</p>
              <NavLink to="/admin/users" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>Manage Users</NavLink>
              <NavLink to="/admin/courses" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>Manage All Courses</NavLink>
              <NavLink to="/courses/create" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>Create Course</NavLink>
            </>
          )}

          {/* Instructor-Only Panel */}
          {isInstructor && !isAdmin && (
            <>
              <p className="px-4 pt-2 pb-2 text-xs font-semibold text-gray-400 uppercase">Instructor</p>
              <NavLink to="/instructor/dashboard" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>My Courses</NavLink>
              <NavLink to="/courses/create" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>Create Course</NavLink>
            </>
          )}

          {/* Student-Only Panel */}
          {!isInstructor && !isAdmin && (
            <>
              <p className="px-4 pt-2 pb-2 text-xs font-semibold text-gray-400 uppercase">Student</p>
              <NavLink to="/dashboard" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>My Courses</NavLink>
            </>
          )}

          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">General</p>
          <NavLink to="/courses" end className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>All Courses</NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>Profile</NavLink>
          
        </nav>
        <div className="px-2 py-4 border-t border-white/20">
          {/* Logout button with correct accent-red color */}
          <button
            onClick={logoutHandler}
            className="w-full flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-accent-red hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with correct primary-dark color */}
        <header className="bg-primary-dark shadow-sm h-16 flex justify-end items-center px-6 flex-shrink-0">
          <span className="font-semibold text-white">Welcome, {userInfo.name}! ({userInfo.role})</span>
        </header>
        <main 
          className="flex-1 overflow-y-auto p-6 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboard-background.jpg')" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;