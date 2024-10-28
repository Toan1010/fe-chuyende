import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Exam } from "../../../interfaces/Exam.interface";
import axiosInstance from "../../../configs/axiosConfigs";
import LoadingSpinner from "../../../components/Loading";
import ExamInfo from "../../../components/Exam/ExamInfo";
import ExamNavbar from "../../../components/Exam/ExamNavbar";
import QuestionList from "../../../components/Exam/ExamQuestion/QuestionList";
import AttendList from "../../../components/Exam/AttendList/AttendList";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("questions");

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("examActiveTab", tab); // Lưu tab đang chọn vào localStorage
  };
  useEffect(() => {
    // Lấy tab mặc định từ localStorage nếu có, không thì mặc định là "lessons"
    const defaultTab = localStorage.getItem("examactiveTab") || "questions";

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/exam/detail/${id}`);
        setExam(response.data.data);
      } catch (err: any) {
        setError(err.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    // Set lại tab đang chọn từ localStorage
    setActiveTab(defaultTab);
    fetchCourse();
  }, [id]);
  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Chi Tiết Bài Thi</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : exam ? (
        <div className="relative">
          <ExamInfo exam={exam} />
          <ExamNavbar onTabSelect={handleTabSelect} />
          <div className="mt-6">
            {activeTab === "questions" && id && <QuestionList id={id} />}
            {activeTab === "students" && id && <AttendList id={exam.slug} />}
          </div>
        </div>
      ) : (
        <div> Bài thi không tồn tại!</div>
      )}
    </div>
  );
}
