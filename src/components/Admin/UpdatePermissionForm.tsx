/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { Admin } from "../../interfaces/Admin.interface";
import axiosInstance from "../../configs/axiosConfigs";

export default function UpdatePermissionForm({ admin }: { admin: Admin }) {
  const [coursePermission, setCoursePermission] = useState<boolean>(
    admin.course_permission
  );
  const [studentPermission, setStudentPermission] = useState<boolean>(
    admin.student_permission
  );
  const [examPermission, setExamPermission] = useState<boolean>(
    admin.exam_permission
  );

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const isConfirm = confirm("Xác nhận chỉnh sửa?");
      if (!isConfirm) {
        return;
      }
      const response = await axiosInstance.put(
        `/admin/update-permission/${admin.id}`,
        {
          course_permission: coursePermission,
          student_permission: studentPermission,
          exam_permission: examPermission,
        }
      );
      alert(response.data.data);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Họ Tên</label>
        <input
          type="text"
          value={admin.fullName}
          className="border p-1 w-full"
          disabled
        />
      </div>

      <div className="mb-2">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={admin.email}
          className="border p-1 w-full"
          disabled
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Permissions
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={coursePermission}
              onChange={(e) => setCoursePermission(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Course</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={studentPermission}
              onChange={(e) => setStudentPermission(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Student</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={examPermission}
              onChange={(e) => setExamPermission(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Exam</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sửa quyền hạn Quản trị viên
      </button>
    </form>
  );
}
