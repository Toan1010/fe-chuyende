import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Loading";
import axiosInstance from "../../configs/axiosConfigs";
import { Student } from "../../interfaces/Student.interface";
import Pagination from "../../components/Pagination";
import StudentRow from "../../components/Student/student.row";
import SearchAndLimit from "../../components/SearchInput";
import Modal from "../../components/Modal"; // Import Modal component
import AddStudentForm from "../../components/Student/AddStudentForm"; // Import AddStudentForm
import AddByExcelForm from "../../components/Student/AddByExcelForm"; // Import AddByExcelForm

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/student/list", {
        params: {
          limit,
          page,
          key_name: search,
        },
      });
      setStudents(response.data.data.students);
      setTotalStudents(response.data.data.count);
      let ttPage = Math.ceil(response.data.data.count / limit);
      setTotalPages(ttPage);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = (id: number) => {
    setTotalStudents(totalStudents - 1);
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  useEffect(() => {
    fetchStudents();
  }, [limit, page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImportFromFile = () => {
    setModalTitle("Nhập dữ liệu từ file");
    setModalContent(<AddByExcelForm onClose={closeModal} />);
    setIsModalOpen(true);
  };
  const handleAddStudent = () => {
    setModalTitle("Thêm Sinh viên");
    setModalContent(<AddStudentForm onClose={closeModal} />);
    setIsModalOpen(true);
  };
  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Sinh viên</h1>

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
            onClick={handleAddStudent}
          >
            Thêm Sinh viên
          </button>

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleImportFromFile}
          >
            Nhập dữ liệu từ file
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative">
          <div className="max-h-[410px] overflow-y-scroll">
            <h1 className="mb-2 font-bold text-xl">
              Tổng số sinh viên : {totalStudents}
            </h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Avatar</th>
                  <th className="px-4 py-2 border">Họ Tên</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Trạng thái</th>
                  <th className="px-4 py-2 border">Ngày tạo</th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    onDelete={handleDeleteStudent}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
