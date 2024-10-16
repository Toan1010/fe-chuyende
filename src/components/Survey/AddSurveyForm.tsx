import { useState } from "react";
import { surveySchema } from "../../interfaces/Survey.interface";
import axiosInstance from "../../configs/axiosConfigs";

export default function AddSurveyForm() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [dueAt, setDueAt] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm for input[type="datetime-local"]
  });
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod schema
    const result = surveySchema.safeParse({
      name,
      list_question: questions,
      dueAt,
    });

    if (!result.success) {
      const errorMap: any = {};
      result.error.errors.forEach((err: any) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
      return;
    }

    try {
      const response = await axiosInstance.post("/survey/create/", {
        name,
        list_question: questions,
        dueAt,
      });
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Tên khảo sát</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 w-full"
          required
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className="mb-2">
        <label className="block mb-2">Câu hỏi</label>
        <div className="max-h-28 overflow-y-scroll">
          {questions.map((question, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="border p-1 w-full"
                placeholder={`Câu hỏi ${index + 1}`}
                required
              />
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => removeQuestion(index)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={addQuestion}
        >
          Thêm câu hỏi
        </button>
        {errors.list_question && (
          <p className="text-red-500">{errors.list_question}</p>
        )}
      </div>

      <div className="mb-2">
        <label className="block mb-2">Hạn chót</label>
        <input
          type="datetime-local"
          value={dueAt}
          onChange={(e) => setDueAt(e.target.value)}
          className="border p-1 w-full"
          required
        />
        {errors.dueAt && <p className="text-red-500">{errors.dueAt}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm khảo sát
      </button>
    </form>
  );
}
