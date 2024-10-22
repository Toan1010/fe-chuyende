import { useEffect, useState } from "react";

export default function StudentNavbar({
  onTabSelect,
}: {
  onTabSelect: (tab: string) => void;
}) {
  const [studentActiveTab, setstudentActiveTab] = useState<string>("courses");

  useEffect(() => {
    // Đọc giá trị studentActiveTab từ localStorage nếu có
    const savedTab = localStorage.getItem("studentActiveTab") || "courses";
    setstudentActiveTab(savedTab);
    onTabSelect(savedTab); // Gọi onTabSelect với tab từ localStorage
  }, [onTabSelect]);

  const handleTabClick = (tab: string) => {
    setstudentActiveTab(tab);
    onTabSelect(tab);
    // Lưu tab hiện tại vào localStorage
    localStorage.setItem("studentActiveTab", tab);
  };

  return (
    <nav className="my-4">
      <ul className="flex space-x-6 border-b-2 border-gray-300 pb-2">
        <li
          className={`cursor-pointer pb-2 transition-all ${
            studentActiveTab === "courses"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("courses")}
        >
          Khóa học đang tham gia
        </li>
        <li
          className={`cursor-pointer pb-2 transition-all ${
            studentActiveTab === "exams"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => handleTabClick("exams")}
        >
          Bài thi đã làm
        </li>
      </ul>
    </nav>
  );
}
