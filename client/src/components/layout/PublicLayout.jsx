import { Outlet } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

const PublicLayout = () => {
  return (
    // This creates the main container with the Vanta background
    <div className="flex flex-col min-h-screen">
      {/* --- The Header is now correctly included --- */}
      <PublicHeader />
      
      {/* This centers the content (the login/register card) */}
      <main className="flex-grow flex items-center justify-center p-4">
        <Outlet />
      </main>
      
      {/* --- The Footer is now correctly included --- */}
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;