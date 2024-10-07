export interface Student {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  status: true;
  createdAt: Date;
}

export interface AddFormProps {
  onClose: () => void;
}
