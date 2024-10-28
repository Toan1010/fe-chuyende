import { Course } from "./Course.interface";
import { Student } from "./Student.interface";
import { Topic } from "./Topic.interface";

export interface Exam {
  id: string;
  name: string;
  slug: string;
  passingQuestion: number;
  numberQuestion: number;
  reDoTime: number;
  submitTime: number;
  course: string;
  createdAt: string;
  updatedAt: string;
  studentDid: number;
  topic_id: string;
  topic: Topic;
}

export interface ExamQuestion {
  id: string;
  name: string;
  type: string;
  choice: string[];
  correctAns: string[];
}

export interface ExamResult {
  id: string;
  student: Student;
  correctAns: number;
  createdAt: string;
  submitAt: string;
}

export interface ExamListProps {
  course: Course;
}
