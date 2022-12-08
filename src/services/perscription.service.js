
import axiosService from "./axios.service";

const API_URL = "http://localhost:8080/prescription/"

const getMedicaments = () => {
    return axiosService.get(API_URL + "medicament/get-all");
}

const addPrescription = (prescription) => {
    return axiosService.post(API_URL + "add", prescription)
}

const addMedicament = (medicament) => {
    return axiosService.post(API_URL + "medicament/add", medicament)
}

const PrescriptionService = {
    getMedicaments,
    addPrescription,
    addMedicament
}

export default PrescriptionService;