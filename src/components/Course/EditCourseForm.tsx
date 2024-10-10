import React, { useState, useEffect } from "react";
import axiosInstance from "../../configs/axiosConfigs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Topic } from "../../interfaces/Topic.interface";
import { EditFormProps } from "../../interfaces/Form.interface";

export default function EditCourseForm({ id, slug, onClose }: EditFormProps) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(false); // Checkbox quản lý kiểu course
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [topicsList, setTopicsList] = useState<Topic[]>([]); // Danh sách topics từ API

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

  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const response = await axiosInstance.get(`/course/${slug}`);
        let oldData = response.data.data;
        setName(oldData.name);
        setDescription(oldData.description);
        setType(oldData.type);

        const topicItem = topicsList.find(
          (topic) => topic.name === oldData.topic
        );
        console.log(topicItem, oldData.topic);

        if (topicItem) {
          setTopic(topicItem.id); // Gán id vào state topic
        } else {
          setTopic(""); // Nếu không tìm thấy, có thể thiết lập lại hoặc để trống
        }
      } catch (error: any) {
        console.log(error.message);

        alert("Không tìm thấy khóa học!");
      }
    };
    if (topicsList.length > 0) {
      fetchOldData(); // Gọi hàm chỉ khi topicsList đã được lấy
    }
  }, [topicsList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm("Xác nhận sửa khóa học!");
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
      const response = await axiosInstance.put(
        `/course/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

      <div className="mb-2 ">
        <label className="block mb-2">Mô Tả</label>
        <div className="max-h-[200px] overflow-y-scroll">
          <CKEditor
            editor={ClassicEditor}
            data={description}
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
