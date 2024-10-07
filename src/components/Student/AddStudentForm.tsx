import React, { useState } from "react";
import { AddFormProps } from "../../interfaces/Student.interface";
import axiosInstance from "../../configs/axiosConfigs";

export default function AddStudentForm({ onClose }: AddFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null); // Thay đổi kiểu dữ liệu cho avatar
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm("Xác nhận thêm sinh viên!");
      if (!isConfirmed) {
        return;
      }

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (avatar) {
        formData.append("avatar", avatar); // Thêm file avatar vào FormData
      }
      const response = await axiosInstance.post(`/student/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Thiết lập header
        },
      });
      console.log(response.data);
      alert(response.data.data);
      onClose();
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Lấy file đầu tiên trong mảng
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block mb-2">Họ Tên</label>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-2">Avatar</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className="border p-1 w-full"
        />
      </div>
      {avatar && (
        <div className="mb-2">
          <img
            src={URL.createObjectURL(avatar)} // Tạo URL cho ảnh
            alt="Avatar Preview"
            className="max-w-[200px] max-h-[200px]"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm Sinh viên
      </button>
    </form>
  );
}
