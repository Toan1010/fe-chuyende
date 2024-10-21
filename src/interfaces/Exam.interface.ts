import { Course } from "./Course.interface";

export interface Exam {
  id: string;
  name: string;
  passingQuestion: number;
  numberQuestion: number;
  reDoTime: number;
  submitTime: number;
  course: string;
  createdAt: Date;
  studentDid: number;
}

export interface ExamListProps {
  course: Course;
}
