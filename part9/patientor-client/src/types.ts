export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type EntryWithPickedItems = Pick<Entry, 'id' | 'date' | 'description' | 'diagnosisCodes'>

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries?: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface BaseEntry {
    id: string,
    date: string,
    description: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

export type Discharge = {
    date: string,
    criteria: string
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: Discharge
}

export type SickLeave = {
    startDate: string,
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: SickLeave
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;