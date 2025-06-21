
import "./App.css";
// import NavBar from "./NavBar";
// import ThemeSelector from "./ThemeSelector";
// import Drawer from "./Drawer";
// import TestComponent from "./TestComponent";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </>
  );
}

export default App;
