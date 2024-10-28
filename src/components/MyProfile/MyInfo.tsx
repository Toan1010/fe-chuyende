import { useState } from "react";
import { useUser } from "../../hooks/UserContext";
import axiosInstance from "../../configs/axiosConfigs";


export default function PersonalInfoForm() {
  const { user } = useUser() as any;

  const [email, setEmail] = useState<string>(user.email);

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/admin/my-info/update`, {
        email,
      });
      alert(response.data.data.message)
    } catch (error: any) {
      alert("Có lỗi xảy ra, thay đổi thông tin không thành công!")
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold">Tên:</label>
        <p>{user.fullName}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Vai trò:</label>
        <p>{user.role}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Quyền:</label>
        <ul className="list-disc pl-5">
          {user.role === "super_admin" ? (
            <>
              <li>Quyền quản lý khóa học</li>
              <li>Quyền quản lý sinh viên</li>
              <li>Quyền quản lý kỳ thi</li>
            </>
          ) : (
            <>
              {user.course_permission && <li>Quyền quản lý khóa học</li>}
              {user.student_permission && <li>Quyền quản lý sinh viên</li>}
              {user.exam_permission && <li>Quyền quản lý kỳ thi</li>}
            </>
          )}
        </ul>
      </div>
      <form onSubmit={handleEmailChange} className="mt-4">
        <label className="block font-semibold">Email mới:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mt-1 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Cập nhật Email
        </button>
      </form>
    </div>
  );
}
