import { useNavigate } from "react-router-dom";
import { useAuthCookies } from "../hooks/useToken";
import axios from "axios";
import { api_url } from "../configs/environments";

export default function Header() {
  const { getRefreshToken: authenticate, clearAuthTokens } = useAuthCookies();
  const navigate = useNavigate();
  const refreshToken: string = authenticate();
  const isLogin = Boolean(refreshToken);
  const handleLogout = async () => {
    try {
      await axios.post(`${api_url}/auth/logout`, { refreshToken });
      alert("Đăng xuất thành công!");
    } catch (error: any) {
      alert("Có lỗi xảy ra!");
    } finally {
      clearAuthTokens();
      navigate("/auth/login");
    }
  };
  return (
    <div className="overflow-hidden bg-[#fdf6e4] p-5 flex justify-between items-center border-b-2 w-full">
      <a href="/" className="font-bold text-2xl pl-4">
        Admin Manager
      </a>
      {isLogin ? (
        <div className="flex items-center">
          <button
            onClick={()=>handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
