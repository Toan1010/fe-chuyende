import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/Loading";
import { Survey, SurveyQuestion } from "../../../interfaces/Survey.interface";
import { useEffect, useState } from "react";
import SurveyInfo from "../../../components/Survey/SurveyInfo";
import axiosInstance from "../../../configs/axiosConfigs";
import SurveyNavbar from "../../../components/Survey/SurveyNavbar";
import QuestionList from "../../../components/Survey/QuestionList";
import { StudentListPaticipate } from "../../../components/Survey/StudentList";

export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("questions");

  useEffect(() => {
    // Lấy tab mặc định từ localStorage nếu có, không thì mặc định là "questions"
    const defaultTab = localStorage.getItem("surveyActiveTab") || "questions";

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/survey/${slug}`);
        setSurvey(response.data.data.survey);
        setQuestions(response.data.data.questions);
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
    localStorage.setItem("surveyActiveTab", tab); // Lưu tab đang chọn vào localStorage
  };
  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Chi Tiết Bài Khảo Sát</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : survey ? (
        <div className="relative">
          <SurveyInfo survey={survey} />
          <SurveyNavbar onTabSelect={handleTabSelect} />

          <div className="mt-6">
            {activeTab === "questions" && (
              <QuestionList questions={questions} />
            )}
            {activeTab === "students" && (
              <StudentListPaticipate slug={survey.slug} />
            )}
          </div>
        </div>
      ) : (
        <div>Khóa học không tồn tại!</div>
      )}
    </div>
  );
}
