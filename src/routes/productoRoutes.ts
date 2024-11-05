import { Router } from 'express';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/productController';

const router = Router();

router.get('/', obtenerProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;
