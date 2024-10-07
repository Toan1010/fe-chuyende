import { Student } from "../../interfaces/Student.interface";
import axiosInstance from "../../configs/axiosConfigs";

import "../../css/statusButton.css";
// @ts-ignore
import { EyeIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function StudentRow({
  student,
  onDelete,
}: {
  student: Student;
  onDelete: (id: number) => void; // Nhận hàm callback để xóa sinh viên từ component cha
}) {
  const [status, setStatus] = useState<boolean>(student.status);

  const handleStatusChange = async (id: number) => {
    try {
      let newStatus = !status;
      const response = await axiosInstance.put(`/student/change_status/${id}`, {
        status: !status,
      });
      setStatus(newStatus);
      alert(response.data.data);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm(
        "Bạn có chắc chắn muốn xóa sinh viên này không?"
      );
      if (isConfirmed) {
        const response = await axiosInstance.delete(`/student/delete/${id}`);
        alert(response.data.data);
        onDelete(id); // Gọi hàm onDelete sau khi xóa thành công
      }
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <tr key={student.id}>
      <td className="px-4 py-1 border text-center">{student.id}</td>
      <td className="px-4 py-1 border flex items-center justify-center">
        <img
          src="logo192.png"
          alt={student.fullName}
          className="h-12 w-12 rounded-full"
        />
      </td>
      <td className="px-4 py-1 border text-left">{student.fullName}</td>
      <td className="px-4 py-1 border text-left">{student.email}</td>
      <td className="px-4 py-1 border text-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={status}
            onChange={() => handleStatusChange(student.id)}
            className="toggle-checkbox"
          />
          <span className="ml-2 text-sm">{status ? "Active" : "Inactive"}</span>
        </label>
      </td>
      <td className="px-4 py-2 border text-center">
        {new Date(student.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 border text-center">
        <div className="flex justify-center space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteStudent(student.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
