import { Course } from "../../interfaces/Course.interface";

export default function CourseInfo({ course }: { course: Course }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Phần thông tin chung */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <img
            src={"https://via.placeholder.com/150"}
            alt={`${course.name}'s thumbnail`}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800">
              {course.name}
            </h2>
          </div>
        </div>
        {/* Phần mô tả có tính năng cuộn dọc */}
        <div className="flex-1">
          <div
            className=" max-h-32 overflow-y-scroll text-sm text-gray-600 p-2 border border-gray-200 rounded-md"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
        </div>
      </div>

      {/* Phần thông tin bổ sung */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Trạng thái :</span>
          <span
            className={`${
              course.type ? "text-green-500" : "text-blue-500"
            } font-medium`}
          >
            {course.type ? "Trả phí" : "Miễn phí"}
          </span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Ngày tạo :</span>
          <span>{new Date(course.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Chủ đề :</span>
          <span className="text-gray-700">{course.topic.name}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">
            Số lượng học viên :
          </span>
          <span className="text-gray-700">{course.studentCount}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Tổng số bài học :</span>
          <span className="text-gray-700">{course.totalLesson}</span>
        </div>
      </div>
    </div>
  );
}
