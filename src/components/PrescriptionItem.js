import { Box, TextField, MenuItem, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const PrescriptionItem = ({ medicaments, selectedMedicament, quantity, interval,
    handleFormChange, handleCheckboxChange, index, removeRow, timeOfDay,
    administrationEndDate, handleDateChange }) => {
    return (
        <Box
            sx={{
                marginTop: 5
            }}>
            <TextField
                sx={{
                    marginInline: 1
                }}
                id="select-medicament"
                select
                label="Medicament"
                style={{ minWidth: 100 }}
                name="selectedMedicament"
                value={selectedMedicament}
                onChange={event => handleFormChange(event, index)}
            >
                {medicaments.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                sx={{
                    marginInline: 1
                }}
                name="quantity"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                id="quantity-textfield"
                value={quantity}
                label="Quantity"
                onChange={event => handleFormChange(event, index)}
                variant="outlined"
                type="number"
                style={{ width: "100px" }}
            />
            <TextField
                sx={{
                    marginInline: 1
                }}
                name="interval"
                InputProps={{
                    inputProps: { min: 0 }
                }}
                id="interval-textfield"
                value={interval}
                onChange={event => handleFormChange(event, index)}
                variant="outlined"
                label="Intake Interval"
                type="number"
                style={{ width: "100px" }}
            />
            <Box sx={{
                display: "inline-block",
                marginInline: 1
            }}>
                <Typography variant="h6">
                    Time of day
                </Typography>
                <label>
                    <input
                        name="morning"
                        type="checkbox"
                        checked={timeOfDay.morning}
                        onChange={event => handleCheckboxChange(event, index)}
                    />
                    Morning
                </label>
                <label>
                    <input
                        name="noon"
                        type="checkbox"
                        checked={timeOfDay.noon}
                        onChange={event => handleCheckboxChange(event, index)}
                    />
                    Noon
                </label>
                <label>
                    <input
                        name="evening"
                        type="checkbox"
                        checked={timeOfDay.evening}
                        onChange={event => handleCheckboxChange(event, index)}
                    />
                    Evening
                </label>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Available until"
                    inputFormat="YYYY-MM-DD"
                    value={administrationEndDate}
                    onChange={event => handleDateChange(event, index)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <IconButton
                sx={{
                    marginInline: 1,
                }}
                onClick={() => removeRow(index)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}

export default PrescriptionItem