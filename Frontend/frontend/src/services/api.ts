import axios from 'axios';
import type { Product, ProductFormData } from '../types/product';

const API_URL = 'http://localhost:8080/products';

export const getProducts = async () => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (data: ProductFormData) => {
  const response = await axios.post<Product>(API_URL, data);
  return response.data;
};

export const updateProduct = async (id: string, data: ProductFormData) => {
  const response = await axios.put<Product>(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};