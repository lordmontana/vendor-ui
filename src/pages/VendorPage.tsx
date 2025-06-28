import React, { useEffect, useState } from 'react';
import { LoaderDTO } from '../types/LoaderDTO';
import {
    getAllSuppliers, addSupplier, updateSupplier, deleteSupplier
} from '../api/vendorApi';
import { VendorTable } from '../components/VendorTable';
import { VendorForm } from '../components/VendorForm';
import { Container, Typography } from '@mui/material';

export const VendorPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<LoaderDTO[]>([]);
    const [editItem, setEditItem] = useState<LoaderDTO | undefined>();

    const loadSuppliers = async () => {
        const response = await getAllSuppliers();
        setSuppliers(response.data);
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleSave = async (data: LoaderDTO) => {
        const exists = suppliers.find(s => s.id === data.id);
        if (exists) {
            await updateSupplier(data.id, data);
        } else {
            await addSupplier(data);
        }
        await loadSuppliers();
        setEditItem(undefined);
    };

    const handleDelete = async (id: string) => {
        await deleteSupplier(id);
        await loadSuppliers();
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Supplier Management</Typography>
            <VendorForm onSave={handleSave} initialData={editItem} />
            <VendorTable suppliers={suppliers} onEdit={setEditItem} onDelete={handleDelete} />
        </Container>
    );
};
