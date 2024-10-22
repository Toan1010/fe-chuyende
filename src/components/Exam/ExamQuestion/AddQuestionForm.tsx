import { useState } from "react";
import axiosInstance from "../../../configs/axiosConfigs";

export default function AddQuestionForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("radio"); // Mặc định là radio
  const [choices, setChoices] = useState<string[]>([]);
  const [correctAns, setCorrectAns] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/exam/add-question/${id}`, {
        name,
        type,
        choice: choices,
        correctAns,
      });
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index: number) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (value: string) => {
    if (type === "radio") {
      setCorrectAns([value]); // Nếu là radio, chỉ lưu một đáp án
    } else if (type === "checkbox") {
      if (correctAns.includes(value)) {
        setCorrectAns(correctAns.filter((ans) => ans !== value)); // Bỏ đáp án nếu đã chọn
      } else {
        setCorrectAns([...correctAns, value]); // Thêm đáp án nếu chưa chọn
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Tên câu hỏi</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 w-full"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block mb-2">Loại câu hỏi</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCorrectAns([]); // Reset đáp án đúng khi thay đổi loại câu hỏi
          }}
          className="border p-1 w-full"
        >
          <option value="radio">Single choice</option>
          <option value="checkbox">Multiple choice</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Lựa chọn</label>
        <div className="max-h-28 overflow-y-scroll">
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                className="border p-1 w-full"
                placeholder={`Lựa chọn ${index + 1}`}
                required
              />
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => removeChoice(index)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={addChoice}
        >
          Thêm lựa chọn
        </button>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Đáp án đúng</label>
        {type === "radio" ? (
          <select
            value={correctAns[0] || ""}
            onChange={(e) => handleCorrectAnswerChange(e.target.value)}
            className="border p-1 w-full"
            required
          >
            <option value="" disabled>
              Chọn đáp án đúng
            </option>
            {choices.map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex flex-col">
            {choices.map((choice, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={choice}
                  checked={correctAns.includes(choice)}
                  onChange={() => handleCorrectAnswerChange(choice)}
                />
                <span className="ml-2">{choice}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm câu hỏi
      </button>
    </form>
  );
}
