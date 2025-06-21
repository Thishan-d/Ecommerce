import { Outlet } from "react-router-dom";
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';

const MainLayout = () => (
  <>
    <Navbar />
    <main className="min-h-[80vh] px-10">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
