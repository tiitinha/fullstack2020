export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;