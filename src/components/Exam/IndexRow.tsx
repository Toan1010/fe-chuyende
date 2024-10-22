import { Link } from "react-router-dom";
import axiosInstance from "../../configs/axiosConfigs";
import { Exam } from "../../interfaces/Exam.interface";
// @ts-ignore
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
export default function IndexRow({
  exam,
  handleEdit,
}: {
  exam: Exam;
  handleEdit: (exam: Exam) => void;
}) {
  const handleDelete = async (id: string) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn chắc chắn muốn xóa bài học này");
      if (!isConfirm) {
        return;
      }
      const response = await axiosInstance.delete(`/exam/delete/${id}`);
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <tr key={exam.id} className=" overflow-hidden">
      <td className="px-4 py-1 border text-center  h-7">{exam.id}</td>
      <td className="px-4 py-1 border h-7">{exam.name}</td>
      <td className="px-4 py-1 border h-7">{exam.course}</td>
      <td className="px-4 py-1 border h-7">{exam.studentDid}</td>
      <td className="px-4 py-1 border h-7">{exam.createdAt}</td>
      <td className="px-4 py-2 border text-center  h-7">
        <div className="flex justify-center space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <Link to={`/exam/${exam.id}`}>
              <EyeIcon className="h-5 w-5" />
            </Link>
          </button>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => {
              handleEdit(exam);
            }}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              handleDelete(exam.id);
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
