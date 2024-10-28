/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import { EditExamFormProps } from "../../interfaces/Form.interface";
import { Topic } from "../../interfaces/Topic.interface";

export default function EditExamForm({ exam }: EditExamFormProps) {
  const [name, setName] = useState(exam.name || "");
  const [numberQuestion, setNumberQuestion] = useState(
    exam.numberQuestion || 10
  );
  const [reDoTime, setReDoTime] = useState(exam.reDoTime || 0);
  const [submitTime, setSubmitTime] = useState(exam.submitTime || 10);
  const [passingQuestion, setPassingQuestion] = useState(
    exam.passingQuestion || 1
  );
  const [topic, setTopic] = useState<string | undefined>(exam.topic.id);
  const [list, setList] = useState<Topic[]>([]);

console.log(exam);


  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axiosInstance.get("/topic/list");
        setList(response.data.data.topics || []);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };
    fetchTopics();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      alert("Vui lòng chọn chủ đề!");
      return;
    }
    if (submitTime < 10) {
      alert("Thời gian làm bài tối thiểu là 10 phút.");
      return;
    }
    if (numberQuestion < 10) {
      alert("Số lượng câu hỏi phải ít nhất là 10.");
      return;
    }
    if (passingQuestion <= 0) {
      alert("Số câu hỏi cần đúng phải là số dương.");
      return;
    }
    if (passingQuestion > numberQuestion) {
      alert("Số câu hỏi cần đúng không được lớn hơn số câu hỏi trong bài.");
      return;
    }

    try {
      const isConfirmed = confirm("Xác nhận sửa bài thi!");
      if (!isConfirmed) return;

      const formData = {
        name,
        topic_id: topic,
        numberQuestion,
        reDoTime,
        submitTime,
        passingQuestion,
      };

      const response = await axiosInstance.put(
        `/exam/update/${exam.id}`,
        formData
      );
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2">Tên Bài Thi</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>
      <div>
        <label className="block mb-2">Chủ Đề</label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="border p-1 w-full"
        >
          <option value="">Chọn chủ đề</option>
          {list.length > 0 ? (
            list.map((topicItem) => (
              <option key={topicItem.id} value={topicItem.id}>
                {topicItem.name}
              </option>
            ))
          ) : (
            <option disabled>Không có chủ đề nào</option>
          )}
        </select>
      </div>
      <div>
        <label className="block mb-2">Số Lượng Câu Hỏi</label>
        <input
          type="number"
          name="numberQuestion"
          value={numberQuestion}
          onChange={(e) => setNumberQuestion(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={10}
        />
      </div>
      <div>
        <label className="block mb-2">Số Lần Làm Lại (0: không giới hạn)</label>
        <input
          type="number"
          name="reDoTime"
          value={reDoTime}
          onChange={(e) => setReDoTime(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={0}
        />
      </div>
      <div>
        <label className="block mb-2">Thời Gian Làm Bài (phút)</label>
        <input
          type="number"
          name="submitTime"
          value={submitTime}
          onChange={(e) => setSubmitTime(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={10}
        />
      </div>
      <div>
        <label className="block mb-2">Số Câu Đúng Cần Để Qua Bài</label>
        <input
          type="number"
          name="passingQuestion"
          value={passingQuestion}
          onChange={(e) => setPassingQuestion(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={1}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sửa Bài Thi
      </button>
    </form>
  );
}
