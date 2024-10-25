import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../hooks/UserContext";

const Sidebar = () => {
  const { user } = useUser() as any;

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleItemClick = () => {
    if (window.innerWidth <= 768) {
      // 768px tương ứng với md
      toggleSidebar();
    }
  };

  // Các menu theo từng quyền
  const menuItems = [
    { name: "Dashboard", path: "/", roles: ["normal_admin", "super_admin"] },
    { name: "Student", path: "/student", permission: "student_permission" },
    { name: "Course", path: "/course", permission: "course_permission" },
    { name: "Exam", path: "/exam", permission: "exam_permission" },
    { name: "Survey", path: "/survey", roles: ["normal_admin", "super_admin"] },
    { name: "Topic", path: "/topic", roles: ["super_admin"] },
    { name: "Admin", path: "/admin", roles: ["super_admin"] },
  ];

  const settingsItems = [{ name: "Profile", path: "/profile" }];

  const hasPermission = (item: any) => {
    if (!user) return false;

    if (user.role === "super_admin") return true;
    if (item.roles && item.roles.includes(user.role)) return true;
    if (item.permission && user[item.permission]) return true;
    return false;
  };
  return (
    <div className="border-r-2">
      {/* Nút mở sidebar trên màn hình nhỏ */}
      <button
        className="md:hidden p-2 text-2xl text-black font-extrabold absolute top-4"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`z-50 fixed top-0 left-0 h-full w-64 bg-[#fffefc] p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64`}
      >
        <h2 className="text-2xl font-bold mb-6">MENU</h2>
        <ul className="space-y-4">
          {menuItems
            .filter((item) => hasPermission(item))
            .map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block p-2 rounded text-lg font-bold hover:bg-blue-500 hover:text-white transition ${
                    location.pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={handleItemClick}
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
        <hr className="my-6 border-black" />
        <h2 className="text-2xl font-bold mb-6">SETTINGS</h2>
        <ul className="space-y-4">
          {/* Settings Items */}
          {settingsItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block p-2 rounded text-lg transition font-bold ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
                onClick={handleItemClick}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay khi sidebar mở trên màn hình nhỏ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
