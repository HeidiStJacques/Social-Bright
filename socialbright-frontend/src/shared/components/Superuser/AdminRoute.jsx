import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Update if you store auth elsewhere

const AdminRoute = ({ children }) => {
  const { user } = useAuth(); // Replace this if you're not using context

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
