import React from "react";
import LearningProgress from "../../components/Dashboard/ProgressBar";
import CourseDistribution from "../../components/Dashboard/CourseDistribution";
import AverageCompletionTime from "../../components/Dashboard/TimeBar";
import RegistrationTimeline from "../../components/Dashboard/RegistrationTimeline";

const Home: React.FC = () => {
  const coursesData = [
    {
      id: 1,
      name: "JavaScript Cơ bản",
      progress: 70,
      students: 200,
      percentage: 30,
      averageCompletionDays: 30,
    },
    {
      id: 2,
      name: "Python Nâng cao",
      progress: 50,
      students: 150,
      percentage: 22.5,
      averageCompletionDays: 50,
    },
    {
      id: 3,
      name: "Node.js Cơ bản",
      progress: 90,
      students: 120,
      percentage: 18,
      averageCompletionDays: 20,
    },
    {
      id: 4,
      name: "ReactJS Toàn Tập",
      progress: 60,
      students: 80,
      percentage: 12,
      averageCompletionDays: 60,
    },
    {
      id: 5,
      name: "CSS Cho Người Mới",
      progress: 95,
      students: 50,
      percentage: 7.5,
      averageCompletionDays: 10,
    },
  ];
  const registrationsData = [
    { time: "Jan", count: 10 },
    { time: "Feb", count: 25 },
    { time: "Mar", count: 40 },
    { time: "Apr", count: 20 },
    { time: "May", count: 50 },
    { time: "Jun", count: 30 },
    { time: "Jun", count: 30 },
    { time: "Jun", count: 30 },
    { time: "Jun", count: 30 },
    { time: "Jun", count: 30 },
  ];

  return (
    <div className="flex-1 flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>{" "}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <LearningProgress courses={coursesData} />
        <CourseDistribution courses={coursesData} />
        <AverageCompletionTime courses={coursesData} />
        <RegistrationTimeline registrations={registrationsData} />
      </div>
    </div>
  );
};

export default Home;
