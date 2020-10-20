import patientsData from '../data/patients';
import { NonSensitivePatient, NewPatientEntry, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatient = (patientId: string): Patient | null => {

    const patient = patientsData.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        ssn,
        dateOfBirth,
        gender,
        occupation,
        entries
    })).find(p => p.id === patientId);

    if (!patient) {
        return null;
    }

    return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newId = uuidv4();
    const newPatientEntry = {
        id: newId,
        ...entry
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addPatient,
    getPatient
};