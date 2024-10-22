import React, { useState, useEffect } from "react";

interface CourseNavbarProps {
  onTabSelect: (tab: string) => void;
}

const ExamNavbar: React.FC<CourseNavbarProps> = ({ onTabSelect }) => {
  const [examActiveTab, setActiveTab] = useState<string>("questions");

  useEffect(() => {
    // Đọc giá trị examActiveTab từ localStorage nếu có
    const savedTab = localStorage.getItem("examActiveTab") || "questions";
    setActiveTab(savedTab);
    onTabSelect(savedTab); // Gọi onTabSelect với tab từ localStorage
  }, [onTabSelect]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabSelect(tab);
    // Lưu tab hiện tại vào localStorage
    localStorage.setItem("examActiveTab", tab);
  };

  return (
    <nav className="my-4">
      <ul className="flex space-x-6 border-b-2 border-gray-300 pb-2">
        <li
          className={`cursor-pointer pb-2 transition-all ${
            examActiveTab === "questions"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("questions")}
        >
          Danh sách câu hỏi
        </li>

        <li
          className={`cursor-pointer pb-2 transition-all ${
            examActiveTab === "students"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("students")}
        >
          Danh sách bài làm
        </li>
      </ul>
    </nav>
  );
};

export default ExamNavbar;
