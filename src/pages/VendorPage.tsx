import React, { useEffect, useState } from 'react';
import type { LoaderDTO } from '../types/LoaderDTO';
import {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
} from '../api/vendorApi';
import { VendorTable } from '../components/VendorTable';
import { VendorForm } from '../components/VendorForm';
import {
    Container,
    Typography,
    Alert,
    Paper
} from '@mui/material';

export const VendorPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<LoaderDTO[]>([]);
    const [editItem, setEditItem] = useState<LoaderDTO | undefined>();
    const [error, setError] = useState<string | null>(null);

    const loadSuppliers = async () => {
        try {
            setError(null);
            const response = await getAllSuppliers();
            setSuppliers(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load suppliers.');
        }
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleSave = async (data: LoaderDTO) => {
        try {
            const exists = suppliers.some(s => s.id === data.id);
            if (exists) {
                await updateSupplier(data);
            } else {
                await addSupplier(data);
            }
            await loadSuppliers();
            setEditItem(undefined);
        } catch (err) {
            console.error(err);
            setError('Failed to save supplier.');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSupplier(id);
            await loadSuppliers();
        } catch (err) {
            console.error(err);
            setError('Failed to delete supplier.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom>
                Suppliers
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                <VendorForm onSave={handleSave} initialData={editItem} />
            </Paper>

            <Paper elevation={3}>
                <VendorTable
                    suppliers={suppliers}
                    onEdit={setEditItem}
                    onDelete={handleDelete}
                />
            </Paper>
        </Container>
    );
};
