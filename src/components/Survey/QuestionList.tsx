import { SurveyQuestion } from "../../interfaces/Survey.interface";

export default function QuestionList({
  questions,
}: {
  questions: SurveyQuestion[];
}) {
  return (
    <table className="min-w-full bg-white border border-gray-200 max-h-[200px] overflow-y-scroll">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th className="px-4 py-2 border w-8/10">Câu hỏi</th>
          <th className="px-4 py-2 border w-1/10">Đồng ý</th>
          <th className="px-4 py-2 border w-1/10">Không đồng ý</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.id}>
            <td className="px-4 py-2 border w-8/10">{question.name}</td>
            <td className="px-4 py-2 border w-1/10 text-center">
              {question.yes}
            </td>
            <td className="px-4 py-2 border w-1/10 text-center">
              {question.no}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
