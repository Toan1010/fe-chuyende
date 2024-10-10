import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Student } from "../../../interfaces/Student.interface";
import StudentInfo from "../../../components/Student/StudentInfo";
import axiosInstance from "../../../configs/axiosConfigs";
import LoadingSpinner from "../../../components/Loading";

const DetailStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const [student, setStudent] = useState<Student | null>(null); // State lưu thông tin sinh viên
  const [loading, setLoading] = useState<boolean>(true); // State loading
  const [error, setError] = useState<string | null>(null); // State error

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/student/detail/${id}`);
        setStudent(response.data.data); // Lưu dữ liệu sinh viên
      } catch (err) {
        setError((err as Error).message); // Cập nhật lỗi nếu có
      } finally {
        setLoading(false); // Tắt loading khi fetch hoàn thành
      }
    };

    fetchStudent();
  }, [id]); 

  return (
    <div className="flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Chi Tiết Sinh viên</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div> 
      ) : student ? (
        <div className="relative">
          <StudentInfo student={student} />
        </div>
      ) : (
        <div>Không tìm thấy sinh viên.</div> 
      )}
    </div>
  );
};

export default DetailStudent;
