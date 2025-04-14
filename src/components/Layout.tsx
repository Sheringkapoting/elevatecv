
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} ElevateCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
