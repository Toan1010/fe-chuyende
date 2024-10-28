import { useEffect, useState } from "react";
import { Exam } from "../../interfaces/Exam.interface";
import axiosInstance from "../../configs/axiosConfigs";
import SearchAndLimit from "../SearchInput";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

export default function ExamTopic({ id }: { id: string }) {
  const [list, setList] = useState<Exam[]>([]);
  const [limit, setLimit] = useState(5);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchExam = async () => {
    try {
      const response = await axiosInstance.get(`/exam/list`, {
        params: {
          topic_id: id,
          limit,
          page,
          key_name: search,
        },
      });
      let data = response.data.data;
      setList(data.exams); // sửa 'stundents' thành 'students'
      setTotalStudents(data.count);
      let ttPage = Math.ceil(data.count / limit);
      setTotalPages(ttPage);
    } catch (error: any) {
      console.error("Error fetching students:", error);
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

  return (
    <div className="max-h-[410px] overflow-y-scroll">
      <h1 className="mb-2 font-bold text-xl">
        Tổng số khoá học thuộc chủ đề : {totalStudents}
      </h1>
      <div className="flex items-center justify-between">
        <SearchAndLimit
          search={search}
          setSearch={setSearch}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 border">STT</th>
            <th className="px-4 py-2 border">Tên bài thi</th>
            <th className="px-4 py-2 border">Chủ đề</th>
            <th className="px-4 py-2 border">Số học sinh đã làm</th>
            <th className="px-4 py-2 border">Ngày khởi tạo</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-1 border text-center">{item.id}</td>
              <td className="px-4 py-1 border text-left">
                <Link to={`/exam/${item.slug}`}>{item.name}</Link>
              </td>
              <td className="px-4 py-1 border text-left">{item.topic.name}</td>
              <td className="px-4 py-1 border text-left">{item.studentDid} </td>
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
