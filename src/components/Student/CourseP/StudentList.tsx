import { useEffect, useState } from "react";
import { Student } from "../../../interfaces/Student.interface";
import { Course } from "../../../interfaces/Course.interface";
import SearchAndLimit from "../../SearchInput";
import Modal from "../../Modal";
import AddToCourseForm from "./AddStudentToCourse";
import axiosInstance from "../../../configs/axiosConfigs";
import Pagination from "../../Pagination";

export default function StudentList({ course }: { course: Course }) {
  const [list, setList] = useState<Student[]>([]);
  const [limit, setLimit] = useState(5);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/list-student/${course.id}`,
        {
          params: {
            limit ,
            page,
            key_name: search,
          },
        }
      );
      let data = response.data.data;
      setList(data.students); // sửa 'stundents' thành 'students'
      setTotalStudents(data.count);
      let ttPage = Math.ceil(data.count / limit);
      setTotalPages(ttPage);
    } catch (error: any) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddStudent = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-h-[410px] overflow-y-scroll">
      <h1 className="mb-2 font-bold text-xl">
        Tổng số sinh viên : {totalStudents}
      </h1>
      <div className="flex items-center justify-between">
        <SearchAndLimit
          search={search}
          setSearch={setSearch}
          limit={limit}
          setLimit={setLimit}
        />

        <div className="mb-4 flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddStudent} // Thêm sự kiện mở modal
          >
            Thêm Sinh viên
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"Thêm sinh viên vào khóa học"}
      >
        <AddToCourseForm course={course} onClose={closeModal} />
      </Modal>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Họ Tên</th>
            <th className="px-4 py-2 border">Tiến trình học</th>
            <th className="px-4 py-2 border">Ngày tham gia</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: any) => (
            <tr key={item.id}>
              <td className="px-4 py-1 border text-center">{item.id}</td>
              <td className="px-4 py-1 border text-left">{item.fullName}</td>
              <td className="px-4 py-1 border text-left">{item.process}</td>
              <td className="px-4 py-1 border text-left">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
