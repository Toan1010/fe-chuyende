import axiosInstance from "../../configs/axiosConfigs";
import { api_url } from "../../configs/environments";
import { Lesson } from "../../interfaces/Lesson.interface";
// @ts-ignore
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
export default function LessonRow({
  lesson,
  handleEdit,
}: {
  lesson: Lesson;
  handleEdit: (id: string) => void;
}) {
  const isValidUrl = (description: string) => {
    try {
      new URL(description); // Kiểm tra nếu description là một URL hợp lệ
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn chắc chắn muốn xóa bài học này");
      if (!isConfirm) {
        return;
      }
      const response = await axiosInstance.delete(
        `/material/delete-lesson/${id}`
      );
      alert(response.data.data);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <tr key={lesson.id} className=" overflow-hidden">
      {/* Cột ID (ngắn nhất) */}
      <td className="px-4 py-1 border text-center w-1/12 h-7">
        {lesson.inCourse}
      </td>

      {/* Cột Tên bài học (gấp 4 lần ID) */}
      <td className="px-4 py-1 border w-4/12 h-7">{lesson.name}</td>

      {/* Cột Mô tả (dài nhất) */}
      <td className="px-4 py-1 border w-5/12 h-7 overflow-y-auto text-ellipsis">
        <div className="h-7 overflow-hidden">
          {isValidUrl(`${api_url}/videos/${lesson.context}`) ? (
            // Nếu description là URL, render thẻ <a> để link tới video
            <a
              href={`${api_url}/videos/${lesson.context}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <span dangerouslySetInnerHTML={{ __html: lesson.description }} />{" "}
            </a>
          ) : (
            // Nếu description không phải là URL, hiển thị bình thường
            <span dangerouslySetInnerHTML={{ __html: lesson.description }} />
          )}
        </div>
      </td>

      {/* Cột Hành động (gấp 2 lần ID) */}
      <td className="px-4 py-2 border text-center w-2/12 h-7">
        <div className="flex justify-center space-x-2">
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => {
              handleEdit(lesson.id);
            }}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              handleDelete(lesson.id);
            }}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
