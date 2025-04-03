import { ReactNode } from "react";
import { useAuth } from "../context/user.context";
import { useNavigate } from "react-router-dom";

interface ProtectedComponentProps {
  children: ReactNode;
}

const ProtectedComponent = ({ children }: ProtectedComponentProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
