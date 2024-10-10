import React, { useState } from "react";
import { AddFormProps } from "../../interfaces/Form.interface";
import axiosInstance from "../../configs/axiosConfigs";

export default function AddByExcelForm({ onClose }: AddFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Lấy file đầu tiên trong mảng
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      const response = await axiosInstance.post(
        "/student/create/bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Thiết lập header
          },
        }
      );
      alert(response.data.data.message);
      onClose();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Chọn File Excel</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          required
          onChange={handleFileChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm Dữ Liệu
      </button>
    </form>
  );
}
