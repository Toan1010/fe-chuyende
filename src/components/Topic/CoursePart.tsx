import { useEffect, useState } from "react";
import { Course } from "../../interfaces/Course.interface";
import axiosInstance from "../../configs/axiosConfigs";
import SearchAndLimit from "../SearchInput";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

export default function CourseTopic({ id }: { id: string }) {
  const [list, setList] = useState<Course[]>([]);
  const [limit, setLimit] = useState(5);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`/course/list`, {
        params: {
          topic_id: id,
          limit,
          page,
          key_name: search,
        },
      });
      let data = response.data.data;
      setList(data.courses); // sửa 'stundents' thành 'students'
      setTotalStudents(data.count);
      let ttPage = Math.ceil(data.count / limit);
      setTotalPages(ttPage);
    } catch (error: any) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
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
            <th className="px-4 py-2 border">Tên khóa học</th>
            <th className="px-4 py-2 border">Chủ đề</th>
            <th className="px-4 py-2 border">Loại khóa học</th>
            <th className="px-4 py-2 border">Số học sinh đang tham gia</th>
            <th className="px-4 py-2 border">Ngày khởi tạo</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-1 border text-center">
                {" "}
                {(page - 1) * limit + index + 1}
              </td>
              <td className="px-4 py-1 border text-left">
                <Link to={`/course/${item.slug}`}>{item.name}</Link>
              </td>
              <td className="px-4 py-1 border text-left">{item.topic.name}</td>
              <td className="px-4 py-1 border text-left">
                {item.type ? "Miễn phí" : "Trả phí"}
              </td>
              <td className="px-4 py-1 border text-left">
                {item.studentCount}
              </td>
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
