import { Course } from "./Course.interface";

export interface Exam {
  id: string;
  name: string;
  passingQuestion: number;
  numberQuestion: number;
  reDoTime: number;
  submitTime: number;
  course: string;
  createdAt: string;
  updatedAt: string;
  studentDid: number;
}

export interface ExamQuestion {
  id: string;
  name: string;
  type: string;
  choice: string[];
  correctAns: string[];
}

export interface ExamListProps {
  course: Course;
}
