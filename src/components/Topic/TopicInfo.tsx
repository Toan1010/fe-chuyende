import { Topic } from "../../interfaces/Topic.interface";

export default function TopicInfo({ topic }: { topic: Topic }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex">
      {/* Phần thông tin chung */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-2">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800">
              {topic.name}
            </h2>
          </div>
        </div>
        {/* Phần mô tả có tính năng cuộn dọc */}
        <div className="flex-1">
          <div
            className=" max-h-32 overflow-y-scroll text-sm text-gray-600 p-2 border border-gray-200 rounded-md"
            dangerouslySetInnerHTML={{ __html: topic.description }}
          />
        </div>
      </div>
    </div>
  );
}
