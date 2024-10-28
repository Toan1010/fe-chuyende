import React, { useState, useEffect } from "react";

interface CourseNavbarProps {
  onTabSelect: (tab: string) => void;
}

const CourseNavbar: React.FC<CourseNavbarProps> = ({ onTabSelect }) => {
  const [activeTab, setActiveTab] = useState<string>("lessons");

  useEffect(() => {
    // Đọc giá trị activeTab từ localStorage nếu có
    const savedTab = localStorage.getItem("activeTab") || "lessons";
    setActiveTab(savedTab);
    onTabSelect(savedTab); // Gọi onTabSelect với tab từ localStorage
  }, [onTabSelect]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabSelect(tab);
    // Lưu tab hiện tại vào localStorage
    localStorage.setItem("activeTab", tab);
  };

  return (
    <nav className="my-4">
      <ul className="flex space-x-6 border-b-2 border-gray-300 pb-2">
        <li
          className={`cursor-pointer pb-2 transition-all ${
            activeTab === "lessons"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("lessons")}
        >
          Bài học
        </li>
        <li
          className={`cursor-pointer pb-2 transition-all ${
            activeTab === "exams"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("exams")}
        >
          Bài thi cùng chủ đề
        </li>
        <li
          className={`cursor-pointer pb-2 transition-all ${
            activeTab === "docs"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("docs")}
        >
          Tài liệu
        </li>
        <li
          className={`cursor-pointer pb-2 transition-all ${
            activeTab === "students"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("students")}
        >
          Sinh viên tham gia
        </li>
      </ul>
    </nav>
  );
};

export default CourseNavbar;
