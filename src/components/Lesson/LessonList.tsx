import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import LoadingSpinner from "../Loading";
import LessonRow from "./Lesson.row";
import { Lesson, LessonListProps } from "../../interfaces/Lesson.interface";
import Modal from "../Modal";
import AddLessonForm from "./AddLessonForm";
import EditLessonForm from "./EditLessonForm";
import { Course } from "../../interfaces/Course.interface";

const LessonList: React.FC<LessonListProps> = ({
  course,
}: {
  course: Course;
}) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const handleAddLesson = () => {
    setModalTitle("Thêm bài học!");
    setModalContent(
      <AddLessonForm
        courseId={course.id}
        lessons={lessons}
        onClose={closeModal}
      />
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditLesson = (lessonId: string) => {
    setModalTitle("Sửa thông tin bài học!");
    setModalContent(
      <EditLessonForm
        course={course}
        lessons={lessons}
        lessonId={lessonId}
        onClose={closeModal}
      />
    );
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/material/list-lesson/${course.slug}`
        );
        setLessons(response.data.data.lessons);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [course.slug]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold ">
          Tổng số bài học: {lessons.length}
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddLesson}
        >
          Thêm bài học
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : lessons.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 max-h-[200px] overflow-y-scroll">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Tên bài học</th>
              <th className="px-4 py-2 border">Video</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody className="">
            {lessons.map((lesson: Lesson) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                handleEdit={handleEditLesson}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div>Chưa bài học nào!</div>
      )}
    </div>
  );
};

export default LessonList;
