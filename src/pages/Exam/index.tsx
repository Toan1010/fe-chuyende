import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import SearchAndLimit from "../../components/SearchInput";
import { Exam } from "../../interfaces/Exam.interface";
import axiosInstance from "../../configs/axiosConfigs";
import LoadingSpinner from "../../components/Loading";

export default function Page() {
  const [exams, setExam] = useState<Exam[]>([]);
  const [totalExam, setTotalExam] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const handleAddSurvey = () => {
    setModalTitle("Thêm bài khảo sát");
    // setModalContent(<AddSurveyForm />);
    setIsModalOpen(true);
  };

  const fetchExam = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/exam/list", {
        params: {
          limit,
          page,
          key_name: search,
        },
      });
      setExam(response.data.data.surveys);
      setTotalExam(response.data.data.count);
      let ttPage = Math.ceil(response.data.data.count / limit);
      setTotalPages(ttPage);
    } catch (error) {
      console.error("Error fetching Surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, search]);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách bài kiểm tra</h1>

      <div className="flex items-center justify-between">
        <SearchAndLimit
          search={search}
          setSearch={setSearch}
          limit={limit}
          setLimit={setLimit}
        />
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
              Tổng số bài kiểm tra : {totalExam}
            </h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Tên bài kiểm tra</th>
                  <th className="px-4 py-2 border">Khóa học</th>
                  <th className="px-4 py-2 border">Số sinh viên đã tham gia</th>
                  <th className="px-4 py-2 border">Thời gian khởi tạo </th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/* {surveys.map((survey) => (
                  <SurveyRow key={survey.id} survey={survey} />
                ))} */}
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
