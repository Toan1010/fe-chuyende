import React, { useState, useEffect } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { EditLessFormProps } from "../../interfaces/Form.interface";

export default function EditLessonForm({
  onClose,
  lessonId,
  course,
  lessons,
}: EditLessFormProps) {
  const [name, setName] = useState("");
  const [inCourse, setInCourse] = useState(""); // ID của bài học trong course
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null); // Video cho bài học
  const [oldVideoUrl, setOldVideoUrl] = useState<string | null>(null); // Đường dẫn video cũ

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axiosInstance.get(
          `/material/lesson/${course.slug}/${lessonId}`
        );
        const lessonData = response.data.data;
        setName(lessonData.name);
        setDescription(lessonData.description);
        setInCourse(lessonData.inCourse);
        setOldVideoUrl(lessonData.video); // Đường dẫn video hiện có
      } catch (error: any) {
        alert("Không tìm thấy bài học!");
      }
    };

    fetchLessonData();
  }, [lessonId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm("Xác nhận sửa bài học!");
      if (!isConfirmed) {
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("inCourse", inCourse); // Gửi ID bài học trong course
      if (video) {
        formData.append("video", video); // Thêm video nếu có thay đổi
      }

      const response = await axiosInstance.put(
        `/material/update-lesson/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      alert(response.data.data); // Hiển thị thông báo từ server
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2">Tên Bài Học</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-2">Mô Tả</label>
        <div className="max-h-[200px] overflow-y-scroll">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setDescription(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
                "|",
                "link",
                "undo",
                "redo",
              ],
            }}
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Thứ tự học (trước bài): </label>
        <select
          name="inCourse"
          value={inCourse}
          onChange={(e) => setInCourse(e.target.value)}
          required
          className="border p-1 w-full"
        >
          <option value={0}>Mặc định (vị trí hiện tại)</option>
          {lessons.map((lesson: any) => (
            <option key={lesson.id} value={lesson.inCourse}>
              {lesson.inCourse} {lesson.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Thêm Video</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleVideoChange}
          className="border p-1 w-full"
        />
      </div>
      {video ? (
        <div className="mb-2">
          <video
            src={URL.createObjectURL(video)}
            controls
            className="max-w-[300px] max-h-[300px]"
          />
        </div>
      ) : (
        oldVideoUrl && (
          <div className="mb-2">
            <video
              src={oldVideoUrl}
              controls
              className="max-w-[300px] max-h-[300px]"
            />
          </div>
        )
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sửa Bài Học
      </button>
    </form>
  );
}
