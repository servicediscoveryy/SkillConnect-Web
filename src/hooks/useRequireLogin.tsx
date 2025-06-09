import { useAuth } from "../context/user.context";
import { useNavigate } from "react-router-dom";

export const useRequireLogin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const ensureLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }
    return true;
  };

  return ensureLogin;
};
