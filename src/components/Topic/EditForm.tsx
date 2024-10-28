import { useState } from "react";
import { Topic } from "../../interfaces/Topic.interface";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axiosInstance from "../../configs/axiosConfigs";

export default function EditTopicForm({ topic }: { topic: Topic }) {
  const [name, setName] = useState(topic.name);
  const [description, setDescription] = useState(topic.description);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        description,
      };
      await axiosInstance.put(`/topic/update/${topic.id}`, formData);
      alert("Sửa chủ đề thành công!");
      window.location.reload();
    } catch (error: any) {
      alert(error?.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Tên chủ đề :</label>
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sửa chủ đề
      </button>
    </form>
  );
}
