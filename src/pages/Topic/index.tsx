import { useEffect, useState } from "react";
import { Topic } from "../../interfaces/Topic.interface";
import axiosInstance from "../../configs/axiosConfigs";
import SearchAndLimit from "../../components/SearchInput";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/Loading";
import AddTopicForm from "../../components/Topic/AddForm";
import { Link } from "react-router-dom";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import EditTopicForm from "../../components/Topic/EditForm";

export default function Page() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [totalTopics, setTotalTopics] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/topic/list", {
        params: {
          key_name: search,
        },
      });
      setTopics(response.data.data.topics);
      setTotalTopics(response.data.data.count);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = () => {
    setModalTitle("Thêm chủ đề");
    setModalContent(<AddTopicForm />);
    setIsModalOpen(true);
  };
  const handleEditTopic = (topic: Topic) => {
    setModalTitle("Thêm chủ đề");
    setModalContent(<EditTopicForm topic={topic} />);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, search]);

  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách bài kiểm tra</h1>

      <div className="flex items-center justify-between">
        <SearchAndLimit
          search={search}
          setSearch={setSearch}
          limit={limit}
          setLimit={setLimit}
        />
        <div className="mb-4 flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddTopic}
          >
            Thêm chủ đề
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative">
          <div className="max-h-[410px] overflow-y-scroll">
            <h1 className="mb-2 font-bold text-xl">
              Tổng số chủ đề : {totalTopics}
            </h1>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">STT</th>
                  <th className="px-4 py-2 border">Tên chủ đề</th>
                  <th className="px-4 py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, index) => (
                  <tr key={topic.id}>
                    <td className="px-4 py-1 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-1 border text-center">
                      {topic.name}
                    </td>
                    <td className="px-4 py-1 border text-center">
                      {" "}
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/topic/${topic.slug}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => {
                            handleEditTopic(topic);
                          }}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
