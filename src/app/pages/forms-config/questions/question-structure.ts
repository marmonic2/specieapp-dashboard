import { DataQuestionStructure } from './dataQuestionStructure';

export class QuestionStructure {
  nameQuestion: string;

  description: string;

  data: DataQuestionStructure[];

  required: boolean;

  widget_type: string;

  min: number;

  max: number;

  datatype: string;
}
