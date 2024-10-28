import { Course } from "../../interfaces/Course.interface";
import axiosInstance from "../../configs/axiosConfigs";

import "../../css/statusButton.css";
// @ts-ignore
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CourseRow({
  course,
  onDelete,
  handleEdit,
}: {
  course: Course;
  handleEdit: (id: string, slug: string) => void;
  onDelete: (id: string) => void; // Nhận hàm callback để xóa sinh viên từ component cha
}) {
  const [status, setStatus] = useState<boolean>(course.type);
  console.log(course);

  const handleStatusChange = async (id: string) => {
    try {
      let newStatus = !status;
      const response = await axiosInstance.put(`/course/update/${id}`, {
        status: !status,
      });
      setStatus(newStatus);
      alert(response.data.data);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm(
        "Bạn có chắc chắn muốn xóa khóa học này không?"
      );
      if (isConfirmed) {
        const response = await axiosInstance.delete(`/course/delete/${id}`);
        alert(response.data.data);
        onDelete(id); // Gọi hàm onDelete sau khi xóa thành công
      }
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <tr key={course.id}>
      <td className="px-4 py-1 border text-center">{course.id}</td>
      <td className="px-4 py-1 border flex items-center justify-center">
        <img
          src="logo192.png"
          alt={course.name}
          className="h-12 w-12 rounded-full"
        />
      </td>
      <td className="px-4 py-1 border text-left">{course.name}</td>
      <td className="px-4 py-1 border text-left">{course.topic.name}</td>
      <td className="px-4 py-1 border text-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={status}
            onChange={() => handleStatusChange(course.id)}
            className="toggle-checkbox"
          />
          <span className="ml-2 text-sm">Trả phí</span>
        </label>
      </td>
      <td className="px-4 py-1 border text-left">{course.studentCount}</td>
      <td className="px-4 py-2 border text-center">
        {new Date(course.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 border text-center">
        <div className="flex justify-center space-x-2">
          <Link
            to={`/course/${course.slug}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <EyeIcon className="h-5 w-5" />
          </Link>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => {
              handleEdit(course.id, course.slug);
            }}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteStudent(course.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
