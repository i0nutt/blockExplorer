import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MyTable({data}) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {Object.entries( data ).map( ( [key,value] ) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell> {key}</TableCell>
                            <TableCell> {value}</TableCell>
                        </TableRow>
                    ) ) }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyTable;
