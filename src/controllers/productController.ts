import { Request, Response } from 'express';
import * as productService from '../services/productService';

export async function obtenerProductos(req: Request, res: Response) {
    try {
        const productos = await productService.getAllProducts(); 
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener la lista de productos', error);
        res.status(500).json({ error: 'Error al obtener la lista de productos' });
    }
}

export async function crearProducto(req: Request, res: Response) {
    try {
        const nuevoProducto = await productService.crearProducto(req.body); 
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error creando el producto:', error);
        res.status(500).json({ error: 'Error creando el producto' });
    }
}

export async function actualizarProducto(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.actualizarProductoService(id, req.body);
        if (!updatedProduct) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error actualizando el producto:', error);
        res.status(500).json({ error: 'Error actualizando el producto' });
    }
}

export async function eliminarProducto(req: Request, res: Response) {
    try {
        const { id } = req.params; 
        const deletedProduct = await productService.eliminarProductoService(id);
        res.status(204).send(); 
    } catch (error) {
        console.error('Error eliminando el producto:', error);
        res.status(500).json({ error: 'Error eliminando el producto' });
    }
}