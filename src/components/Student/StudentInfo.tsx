import { Student } from "../../interfaces/Student.interface";

export default function StudentInfo({ student }: { student: Student }) {
  return (
    <div className="flex items-center justify-between space-x-8 overflow-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center">
        <img
          src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTE2Ni1wLWwxZGJ1cTN2LnBuZw.png"
          alt={`${student.fullName}'s avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{student.fullName}</h2>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
      </div>

      {/* Trạng thái và Ngày tạo */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <span className="font-semibold">Trạng thái:</span>
          <span
            className={`ml-2 ${
              student.status ? "text-green-500" : "text-red-500"
            } font-medium`}
          >
            {student.status ? "Đã kích hoạt" : "Chưa kích hoạt"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold">Ngày tạo:</span>
          <span className="ml-2">
            {new Date(student.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
