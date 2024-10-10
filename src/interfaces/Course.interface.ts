export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  topic: string;
  slug: string;
  type: boolean;
  createdAt: Date;
  studentCount: number;
  totalLesson: number
}
