import patients from '../data/patients';
import {NewPatientEntry, Patient, NonSensitivePatient, EntryWithoutId, Entry} from "../types";
import {v1 as uuid} from 'uuid'

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsExcludingSSN = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        }
    });
}

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);
    return patient || undefined;
};

const addPatient = (entry: NewPatientEntry): Patient => {
    console.log('add patient entry', entry)
    const newPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
}

const addMedicalEntry = (patientId: string, medEntry: EntryWithoutId): Entry => {
    const newMedicalEntry = {
        id: uuid(),
        ...medEntry
    } as Entry;

    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        throw new Error('Patient not found');
    }
    patient.entries?.push(newMedicalEntry);
    return newMedicalEntry;
}

export default {getPatients, getPatientsExcludingSSN, addPatient, getPatientById, addMedicalEntry}