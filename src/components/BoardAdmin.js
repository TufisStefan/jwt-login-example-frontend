import { useState, useEffect } from "react"
import eventBus from "../common/EventBus";
import UserService from "../services/user.service";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';

const BoardAdmin = () => {
    const [responseContent, setResponseContent] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseContent.totalElements - page * rowsPerPage);

    useEffect(() => {
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
    }, [page, rowsPerPage]);

    return (
        <Box
            textAlign={"center"}
            sx={{
                width: 800,
                height: 300,
            }}
            justifyContent="center"
        >
            <Typography
                variant="h4"
                mb={2}
            >Users</Typography>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hasLoaded && responseContent.content.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.roles.map(role => role.name).sort()[0]}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 40 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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
        </Box>
    );
}

export default BoardAdmin;



