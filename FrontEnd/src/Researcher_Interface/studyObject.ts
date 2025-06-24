export interface StudyObject {
  title: string;
  description: string;
  modules: string[];
  irbStatus: boolean;
  status: boolean;
  published: boolean;
  maxParticipants: number;
  creditValue: number;
  restrictions: string[];
  links: string[];
  department: string;
  primaryInvestigatorId: string;
}

export interface StudyParticipant {
  id: number;
  attendance: boolean;
  bumped: boolean;
  payment_amount: number;
}

export interface StudyEditorProps {
  existingStudy?: StudyObject;
  onSave: (studyObject: StudyObject) => void;
}
