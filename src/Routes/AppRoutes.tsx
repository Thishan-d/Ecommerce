import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import AdminLayout from "../Layouts/AdminLayout";

import Home from "../Pages/User/Home";
import CreateProduct from "../Pages/Admin/CreateProduct";
import ProductPage from "../Pages/User/ProductPage";
import CategoryDetails from "../Components/CategoryDetails";
// import Login from "../pages/auth/Login";
// import About from "../pages/About";
// import NotFound from "../pages/NotFound";
// import Cart from "../pages/user/Cart";
// import Payment from "../pages/user/Payment";
// etc...

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>

       <Route path="/" element={<Home />} />
      <Route path="/productDetail" element={<ProductPage />} />
      {/* <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} /> */}

      {/* other public/user pages */}
    </Route>
 
    {/* <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} /> */}

    <Route path="/admin" element={<AdminLayout />}>
    <Route path="createProduct" element={<CreateProduct />} />
    <Route path="categoryDetails" element={<CategoryDetails />} />
      {/* <Route path="products" element={<ManageProducts />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="edit/:id" element={<EditProduct />} /> */}
    </Route>

    {/* <Route path="*" element={<NotFound />} />  */}
  </Routes>
);

export default AppRoutes;
