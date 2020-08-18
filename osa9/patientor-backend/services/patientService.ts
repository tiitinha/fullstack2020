import patientsData from '../data/patients';
import { NonSensitivePatient, NewPatientEntry, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
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
    addPatient
};