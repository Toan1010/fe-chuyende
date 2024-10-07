import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../configs/axiosConfigs";
import { api_url } from "../configs/environments";
import LoadingSpinner from "../components/Loading"; // Đảm bảo bạn đã tạo component LoadingSpinner

export interface User {
  fullName: string;
  email: string;
  course_permission: boolean;
  student_permission: boolean;
  exam_permission: boolean;
  role: "normal_admin" | "super_admin";
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUserInfo: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${api_url}/admin/my-info`);
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    } finally {
      setLoading(false); // Đảm bảo set loading là false sau khi fetch xong
    }
  };

  useEffect(() => {
    fetchUserInfo(); 
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Hiển thị spinner khi loading
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
