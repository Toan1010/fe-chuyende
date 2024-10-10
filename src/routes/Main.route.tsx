import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/Main.Layout";
import { useAuthCookies } from "../hooks/useToken";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Admin";
import StudentDashboard from "../pages/Student";
import CourseDashboard from "../pages/Course";
import CourseDetail from "../pages/Course/DetailCourse.tsx";
import DetailStudent from "../pages/Student/DetailStudent";

const MainRoutes: React.FC = () => {
  const { getRefreshToken: authenticate } = useAuthCookies();
  const auth = authenticate();
  if (!auth) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/:id" element={<DetailStudent />} />
        <Route path="/course" element={<CourseDashboard />} />
        <Route path="/course/:slug" element={<CourseDetail />} />
        <Route path="/exam" element={<AdminDashboard />} />
        <Route path="/survey" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/*" element={<Navigate to="/" replace />} />{" "}
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
