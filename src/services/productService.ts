import { v4 as uuidv4 } from 'uuid';
import ProductoModel, { Producto } from '../models/producto.model';

export async function getAllProducts(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const products = await ProductoModel.find()
        .skip(offset)
        .limit(limit);
    const total = await ProductoModel.countDocuments();
    return {
        count: total,
        rows: products,
    };
}

export async function crearProducto(productData: Omit<Producto, 'id'>) {
    const newProduct = new ProductoModel({
        id: uuidv4(),
        ...productData,
    });
    await newProduct.save();
    return newProduct;
}

export async function actualizarProductoService(productId: string, updatedData: Partial<Producto>) {
    const updatedProduct = await ProductoModel.findOneAndUpdate({ id: productId }, updatedData, { new: true });
    if (!updatedProduct) {
        throw new Error('Producto no existe');
    }
    return updatedProduct;
}

export async function buscarProductosPorNombre(name: string) {
    const products = await ProductoModel.find({
        nombre: { $regex: name, $options: 'i' },
    });
    return products;
}

export async function getProductById(id: string) {
    const product = await ProductoModel.findOne({ id });
    if (!product) {
        throw new Error('No se encontró un producto con el ID proporcionado');
    }
    return product;
}

export async function eliminarProductoService(productId: string) {
    const deletedProduct = await ProductoModel.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
        throw new Error('Producto no existe');
    }
    return deletedProduct;
}