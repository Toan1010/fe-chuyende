import React, { useState } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import { AddExamFormProps } from "../../interfaces/Form.interface";

export default function AddExamForm({ onClose, courseId }: AddExamFormProps) {
  const [name, setName] = useState("");
  const [numberQuestion, setNumberQuestion] = useState(10); // Số lượng câu hỏi
  const [reDoTime, setReDoTime] = useState(0); // Số lần làm lại
  const [submitTime, setSubmitTime] = useState(10); // Thời gian làm bài (min là 10)
  const [passingQuestion, setPassingQuestion] = useState(1); // Số câu hỏi cần đúng để qua bài

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm("Xác nhận thêm bài thi!");
      if (!isConfirmed) {
        return;
      }

      const formData = {
        name,
        numberQuestion,
        reDoTime,
        submitTime,
        passingQuestion,
      };

      const response = await axiosInstance.post(
        `/exam/create/${courseId}`,
        formData
      );
      alert(response.data.data); // Hiển thị thông báo từ server
      onClose();
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
        <label className="block mb-2">Số Lượng Câu Hỏi</label>
        <input
          type="number"
          name="numberQuestion"
          value={numberQuestion}
          onChange={(e) => setNumberQuestion(Number(e.target.value))}
          required
          className="border p-1 w-full"
          min={10} // Đặt min là 10 cho input
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
          min={0} // reDoTime phải >= 0
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
          min={10} // Đặt min là 10 cho input
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
          min={1} // Đặt min là 1 cho input
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm Bài Thi
      </button>
    </form>
  );
}