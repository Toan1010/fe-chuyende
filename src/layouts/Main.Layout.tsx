import Header from "../components/Header";
import React from "react";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 ">
        <Sidebar />
        <main className="flex flex-1 m-5 bg-[#fffefc] border-2 rounded-md">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
