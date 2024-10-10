import React, { useState, useEffect } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import { AddFormProps } from "../../interfaces/Form.interface"; // Thay thế cho Course interface
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Topic } from "../../interfaces/Topic.interface";

export default function AddCourseForm({ onClose }: AddFormProps) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(false); // Checkbox quản lý kiểu course
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [topicsList, setTopicsList] = useState<Topic[]>([]); // Danh sách topics từ API

  // Fetch topics từ API khi component mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axiosInstance.get("/topic/list"); // Gọi API để lấy danh sách topics
        setTopicsList(response.data.data.topics); // Cập nhật state cho topicsList
      } catch (error: any) {
        alert("Không thể lấy danh sách chủ đề!");
      }
    };
    fetchTopics();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm("Xác nhận thêm khóa học!");
      if (!isConfirmed) {
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("topic_id", topic);
      formData.append("description", description);
      formData.append("type", type ? "true" : "false");
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      const response = await axiosInstance.post(`/course/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.data);
      onClose();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Tên Khóa Học</label>
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
        <label className="block mb-2">Chủ Đề</label>
        <select
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="border p-1 w-full"
        >
          <option value="">Chọn chủ đề</option>
          {topicsList.map((topic: any) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Mô Tả</label>
        <div className="max-h-[200px] overflow-y-scroll">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            config={{
              toolbar: [
                "heading", // Header
                "|",
                "bold",
                "italic",
                "underline", // Text formatting
                "fontSize",
                "fontFamily", // Font options
                "bulletedList",
                "numberedList", // Lists
                "|",
                "link",
                "blockQuote",
                "insertTable", // Extra features
                "|",
                "undo",
                "redo", // Undo/redo
              ],
              fontSize: {
                options: [9, 11, 13, "default", 17, 19, 21],
              },
              fontFamily: {
                options: [
                  "default",
                  "Arial, Helvetica, sans-serif",
                  "Courier New, Courier, monospace",
                  "Georgia, serif",
                  "Lucida Sans Unicode, Lucida Grande, sans-serif",
                  "Tahoma, Geneva, sans-serif",
                  "Times New Roman, Times, serif",
                  "Trebuchet MS, Helvetica, sans-serif",
                  "Verdana, Geneva, sans-serif",
                ],
              },
            }}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Loại Khóa Học</label>
        <input
          type="checkbox"
          name="type"
          checked={type}
          onChange={(e) => setType(e.target.checked)}
          className="mr-2"
        />
        <span>Khóa học đặc biệt</span>
      </div>

      <div className="mb-2">
        <label className="block mb-2">Thumbnail</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="border p-1 w-full"
        />
      </div>
      {thumbnail && (
        <div className="mb-2">
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail Preview"
            className="max-w-[200px] max-h-[200px]"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm Khóa Học
      </button>
    </form>
  );
}
// export default {}
