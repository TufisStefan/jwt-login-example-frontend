import { useState, useEffect } from "react"
import eventBus from "../../common/EventBus";
import DeleteIcon from '@mui/icons-material/Delete';
import MedicationIcon from '@mui/icons-material/Medication';
import UserService from "../../services/user.service";
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import AlertDialog from "./AlertDialog";
import { Link } from "react-router-dom";

const BoardAdmin = () => {
    const [responseContent, setResponseContent] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [username, setUsername] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async () => {
        await UserService.deleteUser(username);
        setDialogOpen(false);
        setPage(0);
        getUsers();
    }

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const getUsers = () => {
        UserService.getAdminBoard(page, rowsPerPage).then((response) => {
            setResponseContent(response.data);
            setHasLoaded(true);
        },
            (error) => {
                const _content = error.message || error.toString();
                setResponseContent(_content);
                if (error.response && error.status === 401) {
                    eventBus.dispatch("logout");
                }
            });
    }
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseContent.totalElements - page * rowsPerPage);

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage]);

    return (
        <Box
            textAlign={"center"}
            sx={{
                width: 1000,
                height: 400,
            }}
            justifyContent="center"
        >
            <Typography
                variant="h4"
                mb={2}
            >
                Patients
            </Typography>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hasLoaded && responseContent.content
                            .map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.username}
                                    </TableCell>
                                    <TableCell>
                                        {row.email}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/prescription/${row.username}`}>
                                            <IconButton
                                                aria-label="add-prescription"
                                            >
                                                <MedicationIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => { setUsername(row.username); handleOpenDialog(); }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 55 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <AlertDialog
                    handleCloseDialog={handleCloseDialog}
                    dialogTitle={"Confirm user delete"}
                    dialogText={"Are you sure you want to delete this user?"}
                    handleDelete={handleDelete}
                    open={dialogOpen}
                />
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={parseInt(responseContent.totalElements, 10)}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </TableContainer>
        </Box >
    );
}

export default BoardAdmin;
