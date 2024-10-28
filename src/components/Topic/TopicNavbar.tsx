import React, { useState, useEffect } from "react";

interface CourseNavbarProps {
  onTabSelect: (tab: string) => void;
}

const TopicNavbar: React.FC<CourseNavbarProps> = ({ onTabSelect }) => {
  const [topicActiveTab, setActiveTab] = useState<string>("course");

  useEffect(() => {
    // Đọc giá trị topicActiveTab từ localStorage nếu có
    const savedTab = localStorage.getItem("topicActiveTab") || "courses";
    setActiveTab(savedTab);
    onTabSelect(savedTab); // Gọi onTabSelect với tab từ localStorage
  }, [onTabSelect]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabSelect(tab);
    // Lưu tab hiện tại vào localStorage
    localStorage.setItem("topicActiveTab", tab);
  };

  return (
    <nav className="my-4">
      <ul className="flex space-x-6 border-b-2 border-gray-300 pb-2">
        <li
          className={`cursor-pointer pb-2 transition-all ${
            topicActiveTab === "courses"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("courses")}
        >
          Khóa học
        </li>

        <li
          className={`cursor-pointer pb-2 transition-all ${
            topicActiveTab === "exams"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("exams")}
        >
          Bài kiểm tra
        </li>
      </ul>
    </nav>
  );
};

export default TopicNavbar;
