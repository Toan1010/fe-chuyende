/* eslint-disable no-restricted-globals */
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Admin } from "../../interfaces/Admin.interface";
import { useState } from "react";
import axiosInstance from "../../configs/axiosConfigs";

export default function AdminRow({
  admin,
  onUpdate,
}: {
  admin: Admin;
  onUpdate: (admin: Admin) => void;
}) {
  const [status, setStatus] = useState<boolean>(admin.status);

  const handleStatusChange = async (id: string) => {
    try {
      let newStatus = !status;
      const response = await axiosInstance.put(`/admin/update-status/${id}`, {
        status: !status,
      });
      setStatus(newStatus);
      alert(response.data.data);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const isConfirm = confirm("Xác nhận xóa quản trị viên này ?");
      if (!isConfirm) {
        return;
      }
      const response = await axiosInstance.delete(`/admin/delete/${admin.id}`);
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Nếu role là super_admin thì gán tất cả các quyền là true
  const isSuperAdmin = admin.role === "super_admin";
  const coursePermission = isSuperAdmin ? true : admin.course_permission;
  const studentPermission = isSuperAdmin ? true : admin.student_permission;
  const examPermission = isSuperAdmin ? true : admin.exam_permission;

  return (
    <tr key={admin.id}>
      <td className="px-4 py-1 border text-center">{admin.id}</td>

      <td className="px-4 py-1 border text-left">{admin.fullName}</td>
      <td className="px-4 py-1 border text-left">{admin.email}</td>
      <td className="px-4 py-1 border text-left">{admin.role}</td>

      <td className="px-4 py-1 border text-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={status}
            onChange={() => handleStatusChange(admin.id)}
            className="toggle-checkbox"
          />
          <span className="ml-2 text-sm">Đã kích hoạt</span>
        </label>
      </td>

      <td className="px-4 py-1 border text-center">
        <div className="flex justify-around">
          <div
            className={`px-2 py-1 rounded ${
              coursePermission
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Course
          </div>
          <div
            className={`px-2 py-1 rounded ${
              studentPermission
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Student
          </div>
          <div
            className={`px-2 py-1 rounded ${
              examPermission
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Exam
          </div>
        </div>
      </td>

      <td className="px-4 py-2 border text-center">
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => onUpdate(admin)}
            className="text-blue-500 hover:text-blue-700"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(admin.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
