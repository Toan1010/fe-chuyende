import { useState } from "react";
import { adminSchema } from "../../interfaces/Admin.interface";
import axiosInstance from "../../configs/axiosConfigs";

export default function AddAdminForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coursePermission, setCoursePermission] = useState(false);
  const [studentPermission, setStudentPermission] = useState(false);
  const [examPermission, setExamPermission] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const result = adminSchema.safeParse({
      fullName,
      email,
      password,
      course_permission: coursePermission,
      student_permission: studentPermission,
      exam_permission: examPermission,
    });

    if (!result.success) {
      const errorMap: any = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
      return;
    }
    try {
      const response = await axiosInstance.post("/admin/create/", {
        fullName,
        email,
        password,
        course_permission: coursePermission,
        student_permission: studentPermission,
        exam_permission: studentPermission,
      });
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Họ Tên</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border p-1 w-full"
          required
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
      </div>

      <div className="mb-2">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 w-full"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-2">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-1 w-full"
          required
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
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
        Thêm Quản trị viên
      </button>
    </form>
  );
}
