/* eslint-disable no-restricted-globals */
import { EyeIcon, TrashIcon } from "@heroicons/react/solid";
import { Survey } from "../../interfaces/Survey.interface";
import { Link } from "react-router-dom";
import axiosInstance from "../../configs/axiosConfigs";

export default function SurveyRow({ survey }: { survey: Survey }) {
  const handleDelete = async (id: string) => {
    try {
      const isConfirm = confirm("Xác nhận xóa bài khảo sát này ?");
      if (!isConfirm) {
        return;
      }
      const response = await axiosInstance.delete(
        `/survey/delete/${survey.id}`
      );
      alert(response.data.data);
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <tr key={survey.id}>
      <td className="px-4 py-1 border text-center">{survey.id}</td>
      <td className="px-4 py-1 border text-left">{survey.name}</td>
      <td className="px-4 py-1 border text-left">{survey.participated}</td>
      <td className="px-4 py-1 border text-center">{survey.dueAt}</td>
      <td className="px-4 py-1 border text-center">{survey.createdAt}</td>

      <td className="px-4 py-2 border text-center">
        <div className="flex justify-center space-x-2">
          <button className="text-green-500 hover:text-green-700">
            <Link to={`/survey/${survey.slug}`}>
              <EyeIcon className="h-5 w-5" />
            </Link>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(survey.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
