import { Outlet } from "react-router-dom";
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';

const AdminLayout = () => (
  <>
    <Navbar />
      <main className="min-h-[80vh]" >
        <Outlet />
      </main>
    <Footer />
  </>
);

export default AdminLayout;
