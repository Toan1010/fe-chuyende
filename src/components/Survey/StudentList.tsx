import { useEffect, useState } from "react";
import { SurveyAttend } from "../../interfaces/Survey.interface";
import axiosInstance from "../../configs/axiosConfigs";

export function StudentListPaticipate({ slug }: { slug: string }) {
  const [list, setList] = useState<SurveyAttend[]>([]);

  useEffect(() => {
    const fetchParticipates = async () => {
      try {
        const response = await axiosInstance.get(
          `/survey/student-list/${slug}`
        );
        setList(response.data.data.participates);
      } catch (error: any) {}
    };
    fetchParticipates();
  }, [slug]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 max-h-[300px] overflow-y-scroll">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 border text-left">ID</th>
            <th className="px-6 py-3 border text-left">
              Người thực hiện khảo sát
            </th>
            <th className="px-6 py-3 border text-left">Thời gian tham gia</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-3 border text-left whitespace-nowrap">
                {item.id}
              </td>
              <td className="px-6 py-3 border text-center">{item.name}</td>
              <td className="px-6 py-3 border text-center whitespace-nowrap">
                {item.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
