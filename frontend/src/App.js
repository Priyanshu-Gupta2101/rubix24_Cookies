import { Route, Routes } from "react-router-dom";
import "./App.css";

//pages imported
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import BusinessRegistration from "./pages/BusinessRegistration";
import LoginPage from "./pages/LoginPage";
import VerificationSuccess from "./pages/VerificationSuccess";
import EmailVerification from "./pages/EmailVerification";
import AdminRoute from "./components/Routes/AdminRoute";
import Private from "./components/Routes/Private";
import ForgotPasssword from "./pages/ForgotPassword";
import CommunityPage from "./pages/CommunityPage";
import PageNotFound from "./pages/Pagenotfound";
import Mumbai from "./pages/Mumbai";
import Resto from "./pages/Resto";
import ComparePg from "./pages/ComparePg";
import Elephanta from "./pages/Elephanta";
import AdminDashboard from "./pages/AdminDasboard";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<UserRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/business" element={<BusinessRegistration />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/verify-success" element={<VerificationSuccess />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />

        <Route path="/mumbai" element={<Mumbai />} />
        <Route path="/elephanta" element={<Elephanta />} />
        <Route path="/resto" element={<Resto />} />

        <Route path="/tour" element={<Private />}>
          <Route path="business" element={<Dashboard />}></Route>
          <Route path="compare" element={<ComparePg />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/business/:businessId" element={<Dashboard />}></Route>

        <Route path="/community" element={<CommunityPage />}></Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
