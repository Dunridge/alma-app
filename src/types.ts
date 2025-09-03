export enum Status {
  PENDING = "Pending",
  REACHED_OUT = "Reached out",
}

export type Lead = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: File | null;
  message: string;
  status?: Status;
};
