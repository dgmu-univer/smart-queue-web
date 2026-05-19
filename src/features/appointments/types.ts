export interface DegreeProgram {
  id: number;
  name: string;
  description: string;
}

export interface PeriodSettings {
  start_date: string;
  end_date: string;
}

export interface DegreeProgramsResponse {
  degreePrograms: DegreeProgram[];
  periodSettings: PeriodSettings;
}
