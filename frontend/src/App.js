import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import StockItemsPage from "./pages/StockItemsPage";
import ProcurementPage from "./pages/ProcurementPage";
import PurchaseOrderPage from "./pages/PurchaseOrderPage";
import SlipView from "./pages/SlipView";
import AddProcurementForm from "./components/AddProcurementForm";
import StaffDashboard from "./pages/StaffDashboard";
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/stockitems"
            element={
              <PrivateRoute>
                <StockItemsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/procurements"
            element={
              <PrivateRoute>
                <ProcurementPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase-orders"
            element={
              <PrivateRoute>
                <PurchaseOrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/slip-view"
            element={
              <PrivateRoute>
                <SlipView />
              </PrivateRoute>
            }
          />

          {/* Add Procurement - Protected Route */}
          <Route
            path="/procurements/add"
            element={
              <PrivateRoute>
                <AddProcurementForm />
              </PrivateRoute>
            }
          />

          {/* Staff Dashboard - Only for Staff Role */}
          <Route
            path="/staffdashboard"
            element={
              <PrivateRoute>
                <StaffDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/register-user"
            element={
              <PrivateRoute>
                <RegisterUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
