import React from 'react';
import { LoaderDTO } from '../types/LoaderDTO';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    suppliers: LoaderDTO[];
    onEdit: (supplier: LoaderDTO) => void;
    onDelete: (id: string) => void;
}

export const VendorTable: React.FC<Props> = ({ suppliers, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Region</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.id}</TableCell>
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>{supplier.region}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(supplier)}><EditIcon /></IconButton>
                                <IconButton onClick={() => onDelete(supplier.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
