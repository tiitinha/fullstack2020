import express from 'express';
import cors = require('cors');
import diagnosisService from './services/diagnosisService';
import patientService from './services/patientService';

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pinged');
});

app.get('/api/patients', (_req, res) => {
    res.status(200).send(patientService.getPatients());
});

app.get('/api/diagnoses', (_req, res) => {
    res.status(200).send(diagnosisService.getDiagnoses());
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});