import { Survey } from "../../interfaces/Survey.interface";

export default function SurveyInfo({ survey }: { survey: Survey }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Phần thông tin chung */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800">
              {survey.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Phần thông tin bổ sung */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Ngày tạo :</span>
          <span>{survey.createdAt}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">
            Số lượng người đã thực hiện :
          </span>
          <span className="text-gray-700">{survey.participated}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Ngày kết thúc :</span>
          <span className="text-gray-700">{survey.dueAt}</span>
        </div>
        <div className="flex gap-3">
          <span className="font-semibold text-gray-700">Tổng số câu hỏi :</span>
          <span className="text-gray-700">{survey.numberQuestion}</span>
        </div>
      </div>
    </div>
  );
}
