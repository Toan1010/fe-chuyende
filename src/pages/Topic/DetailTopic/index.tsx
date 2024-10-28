import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Topic } from "../../../interfaces/Topic.interface";
import axiosInstance from "../../../configs/axiosConfigs";
import LoadingSpinner from "../../../components/Loading";
import TopicInfo from "../../../components/Topic/TopicInfo";
import TopicNavbar from "../../../components/Topic/TopicNavbar";
import CourseTopic from "../../../components/Topic/CoursePart";
import ExamTopic from "../../../components/Topic/ExamPart";

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("courses");

  useEffect(() => {
    // Lấy tab mặc định từ localStorage nếu có, không thì mặc định là "questions"
    const defaultTab = localStorage.getItem("topicActiveTab") || "courses";

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/topic/${slug}`);
        setTopic(response.data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    // Set lại tab đang chọn từ localStorage
    setActiveTab(defaultTab);
    fetchCourse();
  }, [slug]);

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("topicActiveTab", tab); // Lưu tab đang chọn vào localStorage
  };

  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Chi Tiết Chủ đề</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : topic ? (
        <div className="relative">
          <TopicInfo topic={topic} />
          <TopicNavbar onTabSelect={handleTabSelect} />
          <div className="mt-6">
            {activeTab === "courses" && (
              <CourseTopic id={topic.id} />
            )}
            {activeTab === "exams" && (
              <ExamTopic id={topic.id} />
            )}
          </div>
        </div>
      ) : (
        <div>Khóa học không tồn tại!</div>
      )}
    </div>
  );
}
