import React, { useState, useEffect } from 'react';
import type { LoaderDTO } from '../types/LoaderDTO';
import { Button, TextField, Box } from '@mui/material';

interface Props {
    onSave: (supplier: LoaderDTO) => void;
    initialData?: LoaderDTO;
}

export const VendorForm: React.FC<Props> = ({ onSave, initialData }) => {
    const [supplier, setSupplier] = useState<LoaderDTO>({ id: '', name: '', region: '' });

    useEffect(() => {
        if (initialData) setSupplier(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(supplier);
        setSupplier({ id: '', name: '', region: '' });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField name="id" label="ID" value={supplier.id} onChange={handleChange} required />
            <TextField name="name" label="Name" value={supplier.name} onChange={handleChange} required />
            <TextField name="region" label="Region" value={supplier.region} onChange={handleChange} required />
            <Button type="submit" variant="contained">Save</Button>
        </Box>
    );
};
