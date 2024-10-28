import React, { useState } from "react";
import PersonalInfoForm from "../../components/MyProfile/MyInfo";
import ChangePasswordForm from "../../components/MyProfile/ChangePasswordForm";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"info" | "changePassword">("info");

  return (
    <div className="flex flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Thông tin của tôi</h1>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("info")}
          className={`p-2 ${
            activeTab === "info" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
        >
          Thông tin cá nhân
        </button>
        <button
          onClick={() => setActiveTab("changePassword")}
          className={`p-2 ${
            activeTab === "changePassword"
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
        >
          Đổi mật khẩu
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "info" ? <PersonalInfoForm /> : <ChangePasswordForm />}
    </div>
  );
}
