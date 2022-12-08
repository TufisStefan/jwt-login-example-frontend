import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PrescriptionService from "../services/perscription.service";
import PrescriptionItem from "./PrescriptionItem";

const Prescription = () => {
    const { username } = useParams();
    const [medicaments, setMedicaments] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [medicamentName, setMedicamentName] = useState("");

    const [prescriptionRows, setPrescriptionRows] = useState([{
        selectedMedicament: "",
        quantity: 0,
        interval: 0,
        timeOfDay: {
            morning: false,
            noon: false,
            evening: false
        },
        administrationEndDate: ""
    }])

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const changeMedicamentName = (event) => {
        setMedicamentName(event.target.value);
    }

    const addMedicament = () => {
        const medicament = {
            name: medicamentName
        }
        setMedicamentName("");
        PrescriptionService.addMedicament(medicament).then((response) => {
            console.log(response.status);
        }, (error) => {
            console.log(error.response);
        });
        setDialogOpen(false);
    }
    const submitPrescription = (e) => {
        e.preventDefault();
        const prescription = {
            username: username,
            prescriptionItems:
                prescriptionRows.map(row => {
                    const medicament =
                    {
                        name: row.selectedMedicament
                    }
                    const timeOfDayList = [];
                    for (const [key, value] of Object.entries(row.timeOfDay)) {
                        if (value) {
                            timeOfDayList.push(key.toUpperCase());
                        }
                    }
                    return {
                        medicament: medicament,
                        quantity: row.quantity,
                        timesOfDay: timeOfDayList,
                        daysBetweenAdministrations: row.interval,
                        administrationEndDate: row.administrationEndDate
                    }
                })
        }
        PrescriptionService.addPrescription(prescription)
            .then((response) => console.log(response), (error) => {
                console.log(error.response);
            });
    }

    const handleFormChange = (event, index) => {
        let data = [...prescriptionRows];
        data[index][event.target.name] = event.target.value;
        setPrescriptionRows(data);
    }

    const handleCheckboxChange = (event, index) => {
        let data = [...prescriptionRows];
        data[index].timeOfDay[event.target.name] = event.target.checked;
        setPrescriptionRows(data);
    }

    const handleDateChange = (event, index) => {
        const day = event.$D < 10 ? `0${event.$D}` : event.$D;
        const month = (event.$M + 1 < 10) ? `0${event.$M + 1}` : (event.$M + 1);
        const date = `${event.$y}-${month}-${day}`;
        let data = [...prescriptionRows];
        data[index].administrationEndDate = date;
        setPrescriptionRows(data);
    }

    const addPrescriptionRow = () => {
        let row = {
            selectedMedicament: "",
            quantity: 0,
            interval: 0,
            timeOfDay: {
                morning: false,
                noon: false,
                evening: false
            },
            administrationEndDate: ""
        }
        setPrescriptionRows([...prescriptionRows, row]);
    }

    const removePrescriptionRow = (index) => {
        let data = [...prescriptionRows];
        data.splice(index, 1);
        setPrescriptionRows(data);
    }

    useEffect(() => {
        PrescriptionService.getMedicaments().then((response) => {
            setMedicaments(response.data);
        },
            (error) => {
                const _content = error.message || error.toString();
                console.log(_content);
            });
    }, []);

    return (
        <Box
            textAlign={"center"}
            sx={{
                width: 1000
            }}
            justifyContent="center"
        >
            <Typography
                variant="h5"
                mb={2}>
                {`Prescription for ${username}`}
            </Typography>
            <form onSubmit={submitPrescription}>
                {prescriptionRows.map((row, index) => (
                    <div key={index}>
                        <PrescriptionItem
                            medicaments={medicaments}
                            selectedMedicament={row.selectedMedicament}
                            quantity={row.quantity}
                            interval={row.interval}
                            handleFormChange={handleFormChange}
                            handleCheckboxChange={handleCheckboxChange}
                            handleDateChange={handleDateChange}
                            index={index}
                            removeRow={removePrescriptionRow}
                            timeOfDay={row.timeOfDay}
                            administrationEndDate={row.administrationEndDate}
                        />
                    </div>
                ))}
            </form>
            <Box
                display="inline-flex"
                sx={{
                    marginTop: 3,
                }}>
                <Button sx={{ marginInline: 1 }} variant="contained" onClick={handleClickOpen}>Add Medicament</Button>
                <Button sx={{ marginInline: 1 }} variant="contained" onClick={addPrescriptionRow}>Add Item</Button>
                <Button sx={{ marginInline: 1 }} variant="contained" onClick={submitPrescription}>Submit</Button>
            </Box>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Add Medicament</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the name of the medicament you want to add.
                    </DialogContentText>
                    <TextField
                        value={medicamentName}
                        onChange={event => changeMedicamentName(event)}
                        autoFocus
                        margin="dense"
                        id="name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addMedicament}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Prescription;