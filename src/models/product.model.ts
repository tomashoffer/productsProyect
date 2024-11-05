import mongoose, { Schema, Document } from 'mongoose';

export interface Producto extends Document {
    nombre: string;
    precio: number;
    stock: number;
}

const productoSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const ProductoModel = mongoose.model<Producto>('Producto', productoSchema);

export default ProductoModel;