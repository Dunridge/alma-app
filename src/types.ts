export enum Status {
  PENDING = "Pending",
  REACHED_OUT = "Reached out",
}

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visaCategories: string[];
  resume: File | null;
  helpText: string;
  status: Status;
};
