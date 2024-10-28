import { useEffect, useState } from "react";
import { Course } from "../../interfaces/Course.interface";
import Pagination from "../../components/Pagination";
import SearchAndLimit from "../../components/SearchInput";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/Loading";
import CourseRow from "../../components/Course/Course.row";
import axiosInstance from "../../configs/axiosConfigs";
import AddCourseForm from "../../components/Course/AddCourseForm";
import EditCourseForm from "../../components/Course/EditCourseForm";

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/course/list", {
        params: {
          limit,
          page,
          key_name: search,
        },
      });
      setCourses(response.data.data.courses);
      setTotalCourses(response.data.data.count);
      let ttPage = Math.ceil(response.data.data.count / limit);
      setTotalPages(ttPage);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const handleDeleteCourse = (id: string) => {
    setTotalCourses(totalCourses - 1);
    setCourses((prevCourses) =>
      prevCourses.filter((Course) => Course.id !== id)
    );
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCourse = () => {
    setModalTitle("Thêm khóa học!");
    setModalContent(<AddCourseForm onClose={closeModal} />);
    setIsModalOpen(true);
  };

  const handleEditCourse = (id: string, slug: string) => {
    setModalTitle("Sửa thông tin khóa học!");
    setModalContent(
      <EditCourseForm id={id} slug={slug} onClose={closeModal} />
    );
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Khóa học</h1>

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
            onClick={handleAddCourse}
          >
            Thêm Khóa học
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
              Tổng số khóa học : {totalCourses}
            </h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Thumbnail</th>
                  <th className="px-4 py-2 border">Tên khóa học</th>
                  <th className="px-4 py-2 border">Danh mục</th>
                  <th className="px-4 py-2 border">Trạng thái</th>
                  <th className="px-4 py-2 border">Số học sinh tham gia</th>
                  <th className="px-4 py-2 border">Ngày tạo</th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <CourseRow
                    key={course.id}
                    course={course}
                    handleEdit={handleEditCourse}
                    onDelete={handleDeleteCourse}
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
