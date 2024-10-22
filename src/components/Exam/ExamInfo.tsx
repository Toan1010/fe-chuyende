import { Exam } from "../../interfaces/Exam.interface";

export default function ExamInfo({ exam }: { exam: Exam }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Phần thông tin chung */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800">
              {exam.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Phần thông tin bổ sung */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Khóa học :</span>
          <span>{exam.course}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Ngày tạo :</span>
          <span>{exam.createdAt}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Ngày cập nhật :</span>
          <span>{exam.updatedAt}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">
            Số câu hỏi trong bài thi:
          </span>
          <span className="text-gray-700">{exam.numberQuestion}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">
            Thời gian làm bài :
          </span>
          <span className="text-gray-700">{exam.submitTime} phút</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">
            Số lần được làm lại :
          </span>
          <span className="text-gray-700">{exam.reDoTime}</span>
        </div>
      </div>
    </div>
  );
}
