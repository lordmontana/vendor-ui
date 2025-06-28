import axios from 'axios';
import type { LoaderDTO } from '../types/LoaderDTO';

const API_BASE = 'http://localhost:5001/api/suppliers';

export const getAllSuppliers = () => axios.get<LoaderDTO[]>(API_BASE);
export const getSupplierById = (id: string) => axios.get<LoaderDTO>(`${API_BASE}/${id}`);
export const addSupplier = (data: LoaderDTO) => axios.post(API_BASE, data);
export const updateSupplier = (data: LoaderDTO) => axios.put(API_BASE, data);
export const deleteSupplier = (id: string) => axios.delete(`${API_BASE}/${id}`);
