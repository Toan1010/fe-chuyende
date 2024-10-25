/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import SearchAndLimit from "../../SearchInput";
import Modal from "../../Modal";
import axiosInstance from "../../../configs/axiosConfigs";
import Pagination from "../../Pagination";
import { ExamResult } from "../../../interfaces/Exam.interface";
import { EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function AttendList({ id }: { id: string }) {
  const [list, setList] = useState<ExamResult[]>([]);
  const [limit, setLimit] = useState(5);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchResult = async () => {
    try {
      const response = await axiosInstance.get(`/exam/list-attend/${id}`, {
        params: {
          limit,
          page,
          key_name: search,
        },
      });
      let data = response.data.data;
      setList(data.results);
      setTotalResults(data.count);
      let ttPage = Math.ceil(data.count / limit);
      setTotalPages(ttPage);
    } catch (error: any) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-h-[410px] overflow-y-scroll">
      <h1 className="mb-2 font-bold text-xl">
        Tổng số bài làm : {totalResults}
      </h1>
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
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 border">STT</th>
            <th className="px-4 py-2 border">Học sinh tham gia</th>
            <th className="px-4 py-2 border">Số câu trả lời đúng</th>
            <th className="px-4 py-2 border">Tham gia lúc</th>
            <th className="px-4 py-2 border">Nộp bài lúc</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: any, index: number) => (
            <tr key={item.id}>
              <td className="px-4 py-1 border text-center">
                {limit * (page - 1) + index + 1}
              </td>
              <td className="px-4 py-1 border text-left">
                <Link to={`/student/${item.student.id}`}>
                  {item.student.fullName}
                </Link>
              </td>
              <td className="px-4 py-1 border text-left">{item.correctAns}</td>
              <td className="px-4 py-1 border text-left">{item.createdAt}</td>
              <td className="px-4 py-1 border text-left">{item.submitAt}</td>

             
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
