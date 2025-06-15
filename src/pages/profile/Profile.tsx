import { useEffect, useState } from "react";
import { User, MapPin, ShoppingBag, ChevronRight } from "lucide-react";
import { ProfileSection } from "../../components/Profile/ProfileSection";
import { AddressSection } from "../../components/Profile/AddressSection";
import { OrdersSection } from "../../components/Profile/OrderSection";
import api from "../../requests/axiosConfig/api";
import { useAuth } from "../../context/user.context";
import { Avatar } from "@mui/material";

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  const menuItems = [
    { id: "profile", label: "Edit Profile", icon: User },
    { id: "address", label: "Manage Addresses", icon: MapPin },
    { id: "orders", label: "Order History", icon: ShoppingBag },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "address":
        return <AddressSection />;
      case "orders":
        return <OrdersSection />;
      default:
        return null;
    }
  };

  const [userData, setUserData] = useState<UserProfile>({});

  const fetchUser = async () => {
    const response = await api.get("/auth/profile", { withCredentials: true });
    setUserData(response.data.profile);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Header */}
        <div className="md:col-span-12 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {userData?.profilePicture ? (
                <img
                  src={userData?.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <Avatar sx={{ width: 96, height: 96 }}>
                  {user?.email[0].toUpperCase()}
                </Avatar>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Skill Link</h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="md:col-span-3">
          <nav className="bg-white rounded-lg shadow-sm">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition ${
                  activeTab === item.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 bg-white rounded-lg shadow-sm p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
