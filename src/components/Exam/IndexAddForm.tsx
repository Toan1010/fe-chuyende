/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import SearchAndLimit from "../SearchInput";
import Pagination from "../Pagination";
import { Course } from "../../interfaces/Course.interface";

export default function AddExamFormWithCourseSelection({
  onClose,
}: {
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [numberQuestion, setNumberQuestion] = useState(10);
  const [reDoTime, setReDoTime] = useState(0);
  const [submitTime, setSubmitTime] = useState(10);
  const [passingQuestion, setPassingQuestion] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch danh sách khóa học
  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/course/list");
      const data = response.data.data.courses;
      setCourses(data || []);
    } catch (error) {
      console.log("Error fetching courses:", error);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Hàm xử lý khi chọn khóa học
  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  // Lọc danh sách khóa học dựa trên tìm kiếm
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // Phân trang
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );
  const totalPages = Math.ceil(filteredCourses.length / limit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitTime < 10) {
      alert("Thời gian làm bài tối thiểu là 10 phút.");
      return;
    }
    if (numberQuestion < 10) {
      alert("Số lượng câu hỏi phải ít nhất là 10.");
      return;
    }
    if (passingQuestion <= 0) {
      alert("Số câu hỏi cần đúng phải là số dương.");
      return;
    }
    if (passingQuestion > numberQuestion) {
      alert("Số câu hỏi cần đúng không được lớn hơn số câu hỏi trong bài.");
      return;
    }

    try {
      if (!selectedCourseId) {
        alert("Vui lòng chọn một khóa học.");
        return;
      }

      const isConfirmed = confirm("Xác nhận thêm bài thi!");
      if (!isConfirmed) {
        return;
      }

      const formData = {
        name,
        numberQuestion,
        reDoTime,
        submitTime,
        passingQuestion,
      };

      const response = await axiosInstance.post(
        `/exam/create/${selectedCourseId}`,
        formData
      );
      alert(response.data.data); // Hiển thị thông báo từ server
      onClose();
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form nhập dữ liệu bài thi */}
      <div>
        <label className="block mb-2">Tên Bài Thi</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block mb-2">Số Lượng Câu Hỏi</label>
        <input
          type="number"
          name="numberQuestion"
          value={numberQuestion}
          onChange={(e) => setNumberQuestion(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={10}
        />
      </div>

      <div>
        <label className="block mb-2">Số Lần Làm Lại (0: không giới hạn)</label>
        <input
          type="number"
          name="reDoTime"
          value={reDoTime}
          onChange={(e) => setReDoTime(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={0}
        />
      </div>

      <div>
        <label className="block mb-2">Thời Gian Làm Bài (phút)</label>
        <input
          type="number"
          name="submitTime"
          value={submitTime}
          onChange={(e) => setSubmitTime(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={10}
        />
      </div>

      <div>
        <label className="block mb-2">Số Câu Đúng Cần Để Qua Bài</label>
        <input
          type="number"
          name="passingQuestion"
          value={passingQuestion}
          onChange={(e) => setPassingQuestion(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={1}
        />
      </div>

      {/* Tìm kiếm và phân trang cho khóa học */}
      <div className="mt-4">
        <h3 className="font-bold mb-2">Chọn khóa học</h3>
        <SearchAndLimit
          search={search}
          setSearch={setSearch}
          limit={limit}
          setLimit={setLimit}
        />

        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Chọn</th>
              <th className="border px-4 py-2">Tên khóa học</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-100"
                onClick={() => handleSelectCourse(course.id)}
                style={{
                  backgroundColor:
                    selectedCourseId === course.id ? "#d3e1ff" : "",
                }}
              >
                <td className="border px-4 py-2">
                  <input
                    type="radio"
                    value={course.id}
                    checked={selectedCourseId === course.id}
                    onChange={() => handleSelectCourse(course.id)}
                  />
                </td>
                <td className="border px-4 py-2">{course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Thêm Bài Thi
      </button>
    </form>
  );
}
