DELETE FROM categorias_categoria; 
DELETE FROM productos_producto; 
DELETE FROM movimientos_movimiento; 

-- Reiniciar los contadores de autoincremento
DELETE FROM sqlite_sequence WHERE name='categorias_categoria'; 
DELETE FROM sqlite_sequence WHERE name='productos_producto'; 
DELETE FROM sqlite_sequence WHERE name='movimientos_movimiento'; 

-- =========================
-- CATEGORÍAS (30 categorías)
-- =========================
INSERT INTO categorias_categoria (nombre) VALUES 
('Electrónica'),
('Ropa'),
('Calzado'),
('Alimentos'),
('Bebidas'),
('Hogar'),
('Juguetes'),
('Libros'),
('Papelería'),
('Deportes'),
('Belleza'),
('Farmacia'),
('Automotriz'),
('Mascotas'),
('Jardinería'),
('Tecnología'),
('Videojuegos'),
('Música'),
('Fotografía'),
('Oficina'),
('Electrodomésticos'),
('Herramientas'),
('Joyería'),
('Relojes'),
('Muebles'),
('Decoración'),
('Camping'),
('Pesca'),
('Natación'),
('Ciclismo');

-- =========================
-- PRODUCTOS (60 productos)
-- =========================
INSERT INTO productos_producto (nombre, precio, precio_venta, cantidad, categoria_id, descripcion) VALUES 
-- Electrónica (6 productos)
('Laptop Lenovo', 500.00, 650.00, 10, 1, 'Laptop de uso general'),
('Smartphone Samsung', 300.00, 400.00, 15, 1, 'Teléfono inteligente Android'),
('Tablet iPad', 400.00, 520.00, 8, 1, 'Tablet Apple'),
('Auriculares Bluetooth', 50.00, 75.00, 25, 1, 'Audífonos inalámbricos'),
('Smartwatch', 120.00, 160.00, 12, 1, 'Reloj inteligente'),
('Cámara GoPro', 250.00, 320.00, 6, 1, 'Cámara deportiva'),

-- Ropa (6 productos)
('Camiseta Algodón', 8.00, 12.00, 50, 2, 'Camiseta básica de algodón'),
('Jeans Clásicos', 25.00, 35.00, 30, 2, 'Pantalones de mezclilla'),
('Chaqueta Deportiva', 45.00, 60.00, 20, 2, 'Chaqueta para deporte'),
('Vestido Casual', 35.00, 48.00, 15, 2, 'Vestido para diario'),
('Suéter de Lana', 28.00, 40.00, 25, 2, 'Suéter abrigado'),
('Shorts Deportivos', 15.00, 22.00, 40, 2, 'Shorts para ejercicio'),

-- Calzado (4 productos)
('Zapatillas Nike', 60.00, 85.00, 20, 3, 'Zapatillas deportivas'),
('Zapatos Formales', 80.00, 110.00, 12, 3, 'Zapatos de vestir'),
('Sandalias Verano', 20.00, 30.00, 35, 3, 'Sandalias cómodas'),
('Botas de Cuero', 90.00, 125.00, 8, 3, 'Botas resistentes'),

-- Alimentos (6 productos)
('Arroz 1kg', 1.20, 1.50, 100, 4, 'Arroz blanco'),
('Aceite de Oliva', 8.00, 12.00, 40, 4, 'Aceite extra virgen'),
('Pasta Espagueti', 1.50, 2.00, 80, 4, 'Pasta italiana'),
('Atún en Lata', 2.50, 3.50, 60, 4, 'Atún en agua'),
('Harina de Trigo', 1.80, 2.50, 45, 4, 'Harina para repostería'),
('Leche en Polvo', 12.00, 16.00, 25, 4, 'Leche descremada'),

-- Bebidas (4 productos)
('Agua Mineral 1L', 0.50, 0.80, 200, 5, 'Botella de agua mineral'),
('Jugo de Naranja', 2.00, 3.00, 50, 5, 'Jugo natural'),
('Refresco Cola', 1.20, 2.00, 100, 5, 'Bebida gaseosa'),
('Café Molido', 6.00, 9.00, 30, 5, 'Café premium'),

-- Hogar (4 productos)
('Sofá 3 plazas', 300.00, 450.00, 5, 6, 'Sofá cómodo para sala'),
('Mesa Centro', 120.00, 180.00, 8, 6, 'Mesa para living'),
('Lámpara LED', 25.00, 35.00, 20, 6, 'Lámpara moderna'),
('Cortinas Persianas', 45.00, 65.00, 12, 6, 'Cortinas decorativas'),

-- Juguetes (4 productos)
('Muñeca Barbie', 15.00, 25.00, 30, 7, 'Muñeca clásica'),
('Carro a Control', 35.00, 50.00, 18, 7, 'Carro radiocontrol'),
('Lego Classic', 25.00, 38.00, 22, 7, 'Bloques de construcción'),
('Puzzle 1000pzs', 12.00, 18.00, 15, 7, 'Rompecabezas familiar'),

-- Libros (4 productos)
('Libro Python', 20.00, 30.00, 15, 8, 'Guía de programación en Python'),
('Novela Best Seller', 15.00, 22.00, 25, 8, 'Novela popular'),
('Diccionario Español', 18.00, 25.00, 10, 8, 'Diccionario completo'),
('Cuentos Infantiles', 10.00, 15.00, 20, 8, 'Libro para niños'),

-- Papelería (4 productos)
('Cuaderno Universitario', 2.00, 3.50, 100, 9, 'Cuaderno rayado'),
('Bolígrafos Pack', 3.00, 5.00, 80, 9, 'Pack de 10 bolígrafos'),
('Calculadora Científica', 12.00, 18.00, 15, 9, 'Calculadora avanzada'),
('Mochila Escolar', 25.00, 35.00, 20, 9, 'Mochila resistente'),

-- Deportes (4 productos)
('Balón de Fútbol', 25.00, 40.00, 12, 10, 'Balón oficial tamaño 5'),
('Raqueta Tenis', 45.00, 65.00, 8, 10, 'Raqueta profesional'),
('Pesas 5kg', 15.00, 22.00, 25, 10, 'Par de pesas'),
('Bicicleta Montaña', 200.00, 280.00, 6, 10, 'Bicicleta todo terreno'),

-- Belleza (4 productos)
('Perfume Dior', 80.00, 120.00, 8, 11, 'Perfume de lujo'),
('Kit Maquillaje', 35.00, 50.00, 15, 11, 'Set completo'),
('Crema Facial', 18.00, 25.00, 30, 11, 'Crema hidratante'),
('Secador Pelo', 40.00, 55.00, 10, 11, 'Secador profesional'),

-- Farmacia (4 productos)
('Paracetamol 500mg', 3.00, 5.00, 60, 12, 'Caja de 10 tabletas'),
('Vitamina C', 8.00, 12.00, 40, 12, 'Suplemento vitamínico'),
('Jarabe para la Tos', 6.00, 9.00, 25, 12, 'Jarabe natural'),
('Curitas', 2.00, 3.50, 100, 12, 'Caja de tiritas'),

-- Productos adicionales para completar 60
('Monitor 24"', 150.00, 200.00, 8, 16, 'Monitor Full HD'),
('Teclado Mecánico', 45.00, 65.00, 15, 16, 'Teclado gaming'),
('Impresora Láser', 180.00, 240.00, 5, 16, 'Impresora multifunción'),
('Router WiFi', 60.00, 85.00, 12, 16, 'Router dual band');

-- =========================
-- MOVIMIENTOS (120 movimientos)
-- =========================
-- Movimientos para Noviembre 2025 (80 movimientos)
INSERT INTO movimientos_movimiento (tipo, cantidad, producto_id, fecha) VALUES 
-- Producto 1 (Laptop Lenovo) - 6 movimientos
('entrada', 5, 1, '2025-11-05 10:00:00'),
('salida', 2, 1, '2025-11-07 14:00:00'),
('entrada', 3, 1, '2025-11-12 09:00:00'),
('salida', 1, 1, '2025-11-15 16:00:00'),
('entrada', 4, 1, '2025-11-20 11:00:00'),
('salida', 2, 1, '2025-11-25 14:30:00'),

-- Producto 2 (Smartphone Samsung) - 6 movimientos
('entrada', 10, 2, '2025-11-02 08:00:00'),
('salida', 3, 2, '2025-11-04 15:00:00'),
('entrada', 8, 2, '2025-11-10 10:00:00'),
('salida', 4, 2, '2025-11-14 17:00:00'),
('entrada', 6, 2, '2025-11-18 09:00:00'),
('salida', 2, 2, '2025-11-22 13:00:00'),

-- Producto 3 (Tablet iPad) - 4 movimientos
('entrada', 5, 3, '2025-11-03 11:00:00'),
('salida', 2, 3, '2025-11-08 14:00:00'),
('entrada', 3, 3, '2025-11-16 10:00:00'),
('salida', 1, 3, '2025-11-24 16:00:00'),

-- Producto 4 (Auriculares Bluetooth) - 6 movimientos
('entrada', 15, 4, '2025-11-01 09:00:00'),
('salida', 5, 4, '2025-11-06 12:00:00'),
('entrada', 10, 4, '2025-11-11 08:00:00'),
('salida', 3, 4, '2025-11-17 15:00:00'),
('entrada', 12, 4, '2025-11-21 11:00:00'),
('salida', 4, 4, '2025-11-28 14:00:00'),

-- Producto 5 (Smartwatch) - 4 movimientos
('entrada', 8, 5, '2025-11-04 10:00:00'),
('salida', 3, 5, '2025-11-09 13:00:00'),
('entrada', 5, 5, '2025-11-19 09:00:00'),
('salida', 2, 5, '2025-11-26 16:00:00'),

-- Producto 6 (Cámara GoPro) - 4 movimientos
('entrada', 4, 6, '2025-11-07 08:00:00'),
('salida', 1, 6, '2025-11-13 14:00:00'),
('entrada', 3, 6, '2025-11-20 10:00:00'),
('salida', 1, 6, '2025-11-27 15:00:00'),

-- Producto 7 (Camiseta Algodón) - 6 movimientos
('entrada', 25, 7, '2025-11-02 09:00:00'),
('salida', 8, 7, '2025-11-05 16:00:00'),
('entrada', 20, 7, '2025-11-12 08:00:00'),
('salida', 12, 7, '2025-11-18 14:00:00'),
('entrada', 15, 7, '2025-11-22 10:00:00'),
('salida', 10, 7, '2025-11-29 17:00:00'),

-- Producto 8 (Jeans Clásicos) - 4 movimientos
('entrada', 15, 8, '2025-11-03 11:00:00'),
('salida', 5, 8, '2025-11-10 15:00:00'),
('entrada', 10, 8, '2025-11-17 09:00:00'),
('salida', 4, 8, '2025-11-24 13:00:00'),

-- Producto 9 (Chaqueta Deportiva) - 4 movimientos
('entrada', 12, 9, '2025-11-06 10:00:00'),
('salida', 3, 9, '2025-11-14 16:00:00'),
('entrada', 8, 9, '2025-11-21 11:00:00'),
('salida', 2, 9, '2025-11-28 14:00:00'),

-- Producto 10 (Zapatillas Nike) - 6 movimientos
('entrada', 10, 10, '2025-11-03 11:00:00'),
('salida', 3, 10, '2025-11-08 18:00:00'),
('entrada', 8, 10, '2025-11-15 09:00:00'),
('salida', 4, 10, '2025-11-19 16:00:00'),
('entrada', 6, 10, '2025-11-23 10:00:00'),
('salida', 2, 10, '2025-11-30 15:00:00'),

-- Producto 11 (Arroz 1kg) - 6 movimientos
('entrada', 50, 11, '2025-11-01 08:00:00'),
('salida', 20, 11, '2025-11-08 12:00:00'),
('entrada', 40, 11, '2025-11-14 07:00:00'),
('salida', 15, 11, '2025-11-20 11:00:00'),
('entrada', 30, 11, '2025-11-25 09:00:00'),
('salida', 25, 11, '2025-11-29 13:00:00'),

-- Producto 12 (Agua Mineral 1L) - 8 movimientos
('entrada', 100, 12, '2025-11-04 09:30:00'),
('salida', 40, 12, '2025-11-09 15:00:00'),
('entrada', 80, 12, '2025-11-11 08:30:00'),
('salida', 30, 12, '2025-11-16 14:00:00'),
('entrada', 60, 12, '2025-11-18 10:00:00'),
('salida', 25, 12, '2025-11-22 16:00:00'),
('entrada', 50, 12, '2025-11-26 09:00:00'),
('salida', 20, 12, '2025-11-30 12:00:00'),

-- Producto 13 (Sofá 3 plazas) - 2 movimientos
('entrada', 2, 13, '2025-11-06 13:00:00'),
('salida', 1, 13, '2025-11-20 17:00:00'),

-- Producto 14 (Muñeca Barbie) - 4 movimientos
('entrada', 15, 14, '2025-11-05 10:00:00'),
('salida', 5, 14, '2025-11-12 19:00:00'),
('entrada', 10, 14, '2025-11-19 11:00:00'),
('salida', 3, 14, '2025-11-26 15:00:00'),

-- Producto 15 (Libro Python) - 4 movimientos
('entrada', 10, 15, '2025-11-07 09:00:00'),
('salida', 3, 15, '2025-11-13 14:00:00'),
('entrada', 8, 15, '2025-11-21 10:00:00'),
('salida', 2, 15, '2025-11-28 16:00:00');

-- Movimientos para meses anteriores (40 movimientos)
INSERT INTO movimientos_movimiento (tipo, cantidad, producto_id, fecha) VALUES 
-- Octubre 2025
('entrada', 5, 16, '2025-10-15 10:00:00'),
('salida', 2, 16, '2025-10-20 14:00:00'),
('entrada', 8, 17, '2025-10-10 09:00:00'),
('salida', 3, 17, '2025-10-18 16:00:00'),
('entrada', 12, 18, '2025-10-05 11:00:00'),
('salida', 4, 18, '2025-10-12 18:00:00'),

-- Septiembre 2025
('entrada', 3, 19, '2025-09-12 09:00:00'),
('salida', 1, 19, '2025-09-18 16:00:00'),
('entrada', 6, 20, '2025-09-08 10:00:00'),
('salida', 2, 20, '2025-09-15 14:00:00'),
('entrada', 10, 21, '2025-09-20 08:00:00'),
('salida', 4, 21, '2025-09-25 17:00:00'),

-- Agosto 2025
('entrada', 4, 22, '2025-08-05 11:00:00'),
('salida', 2, 22, '2025-08-10 18:00:00'),
('entrada', 7, 23, '2025-08-15 09:00:00'),
('salida', 3, 23, '2025-08-22 15:00:00'),
('entrada', 5, 24, '2025-08-18 10:00:00'),
('salida', 2, 24, '2025-08-26 16:00:00'),

-- Julio 2025
('entrada', 2, 25, '2025-07-03 09:30:00'),
('salida', 1, 25, '2025-07-09 15:00:00'),
('entrada', 4, 26, '2025-07-12 08:00:00'),
('salida', 2, 26, '2025-07-20 14:00:00'),
('entrada', 3, 27, '2025-07-25 11:00:00'),
('salida', 1, 27, '2025-07-30 17:00:00'),

-- Junio 2025
('entrada', 10, 28, '2025-06-06 13:00:00'),
('salida', 5, 28, '2025-06-11 17:00:00'),
('entrada', 8, 29, '2025-06-15 10:00:00'),
('salida', 3, 29, '2025-06-22 15:00:00'),
('entrada', 6, 30, '2025-06-25 09:00:00'),
('salida', 2, 30, '2025-06-30 16:00:00'),

-- Mayo 2025
('entrada', 5, 31, '2025-05-10 08:00:00'),
('salida', 2, 31, '2025-05-17 14:00:00'),
('entrada', 4, 32, '2025-05-20 11:00:00'),
('salida', 1, 32, '2025-05-27 16:00:00'),

-- Abril 2025
('entrada', 3, 33, '2025-04-05 09:00:00'),
('salida', 1, 33, '2025-04-12 15:00:00'),
('entrada', 2, 34, '2025-04-18 10:00:00'),
('salida', 1, 34, '2025-04-25 17:00:00'),

-- Marzo 2025
('entrada', 8, 35, '2025-03-08 08:00:00'),
('salida', 3, 35, '2025-03-15 13:00:00'),
('entrada', 6, 36, '2025-03-22 11:00:00'),
('salida', 2, 36, '2025-03-29 16:00:00');

INSERT INTO movimientos_movimiento (tipo, cantidad, producto_id, fecha) VALUES 
-- Noviembre 2025 - Muchos más productos con movimientos
-- Producto 1 (Laptop Lenovo) - 6 movimientos
('entrada', 5, 1, '2025-11-05 10:00:00'),
('salida', 2, 1, '2025-11-07 14:00:00'),
('entrada', 3, 1, '2025-11-12 09:00:00'),
('salida', 1, 1, '2025-11-15 16:00:00'),
('entrada', 4, 1, '2025-11-20 11:00:00'),
('salida', 2, 1, '2025-11-25 14:30:00'),

-- Producto 2 (Smartphone Samsung) - 6 movimientos
('entrada', 10, 2, '2025-11-02 08:00:00'),
('salida', 3, 2, '2025-11-04 15:00:00'),
('entrada', 8, 2, '2025-11-10 10:00:00'),
('salida', 4, 2, '2025-11-14 17:00:00'),
('entrada', 6, 2, '2025-11-18 09:00:00'),
('salida', 2, 2, '2025-11-22 13:00:00'),

-- Producto 3 (Tablet iPad) - 4 movimientos
('entrada', 5, 3, '2025-11-03 11:00:00'),
('salida', 2, 3, '2025-11-08 14:00:00'),
('entrada', 3, 3, '2025-11-16 10:00:00'),
('salida', 1, 3, '2025-11-24 16:00:00'),

-- Producto 4 (Auriculares Bluetooth) - 6 movimientos
('entrada', 15, 4, '2025-11-01 09:00:00'),
('salida', 5, 4, '2025-11-06 12:00:00'),
('entrada', 10, 4, '2025-11-11 08:00:00'),
('salida', 3, 4, '2025-11-17 15:00:00'),
('entrada', 12, 4, '2025-11-21 11:00:00'),
('salida', 4, 4, '2025-11-28 14:00:00'),

-- Producto 5 (Smartwatch) - 4 movimientos
('entrada', 8, 5, '2025-11-04 10:00:00'),
('salida', 3, 5, '2025-11-09 13:00:00'),
('entrada', 5, 5, '2025-11-19 09:00:00'),
('salida', 2, 5, '2025-11-26 16:00:00'),

-- Producto 6 (Cámara GoPro) - 4 movimientos
('entrada', 4, 6, '2025-11-07 08:00:00'),
('salida', 1, 6, '2025-11-13 14:00:00'),
('entrada', 3, 6, '2025-11-20 10:00:00'),
('salida', 1, 6, '2025-11-27 15:00:00'),

-- Producto 7 (Camiseta Algodón) - 6 movimientos
('entrada', 25, 7, '2025-11-02 09:00:00'),
('salida', 8, 7, '2025-11-05 16:00:00'),
('entrada', 20, 7, '2025-11-12 08:00:00'),
('salida', 12, 7, '2025-11-18 14:00:00'),
('entrada', 15, 7, '2025-11-22 10:00:00'),
('salida', 10, 7, '2025-11-29 17:00:00'),

-- Producto 8 (Jeans Clásicos) - 4 movimientos
('entrada', 15, 8, '2025-11-03 11:00:00'),
('salida', 5, 8, '2025-11-10 15:00:00'),
('entrada', 10, 8, '2025-11-17 09:00:00'),
('salida', 4, 8, '2025-11-24 13:00:00'),

-- Producto 9 (Chaqueta Deportiva) - 4 movimientos
('entrada', 12, 9, '2025-11-06 10:00:00'),
('salida', 3, 9, '2025-11-14 16:00:00'),
('entrada', 8, 9, '2025-11-21 11:00:00'),
('salida', 2, 9, '2025-11-28 14:00:00'),

-- Producto 10 (Zapatillas Nike) - 6 movimientos
('entrada', 10, 10, '2025-11-03 11:00:00'),
('salida', 3, 10, '2025-11-08 18:00:00'),
('entrada', 8, 10, '2025-11-15 09:00:00'),
('salida', 4, 10, '2025-11-19 16:00:00'),
('entrada', 6, 10, '2025-11-23 10:00:00'),
('salida', 2, 10, '2025-11-30 15:00:00'),

-- Producto 11 (Arroz 1kg) - 6 movimientos
('entrada', 50, 11, '2025-11-01 08:00:00'),
('salida', 20, 11, '2025-11-08 12:00:00'),
('entrada', 40, 11, '2025-11-14 07:00:00'),
('salida', 15, 11, '2025-11-20 11:00:00'),
('entrada', 30, 11, '2025-11-25 09:00:00'),
('salida', 25, 11, '2025-11-29 13:00:00'),

-- Producto 12 (Agua Mineral 1L) - 8 movimientos
('entrada', 100, 12, '2025-11-04 09:30:00'),
('salida', 40, 12, '2025-11-09 15:00:00'),
('entrada', 80, 12, '2025-11-11 08:30:00'),
('salida', 30, 12, '2025-11-16 14:00:00'),
('entrada', 60, 12, '2025-11-18 10:00:00'),
('salida', 25, 12, '2025-11-22 16:00:00'),
('entrada', 50, 12, '2025-11-26 09:00:00'),
('salida', 20, 12, '2025-11-30 12:00:00'),

-- Producto 13 (Sofá 3 plazas) - 2 movimientos
('entrada', 2, 13, '2025-11-06 13:00:00'),
('salida', 1, 13, '2025-11-20 17:00:00'),

-- Producto 14 (Muñeca Barbie) - 4 movimientos
('entrada', 15, 14, '2025-11-05 10:00:00'),
('salida', 5, 14, '2025-11-12 19:00:00'),
('entrada', 10, 14, '2025-11-19 11:00:00'),
('salida', 3, 14, '2025-11-26 15:00:00'),

-- Producto 15 (Libro Python) - 4 movimientos
('entrada', 10, 15, '2025-11-07 09:00:00'),
('salida', 3, 15, '2025-11-13 14:00:00'),
('entrada', 8, 15, '2025-11-21 10:00:00'),
('salida', 2, 15, '2025-11-28 16:00:00'),

-- Producto 16 (Monitor 24") - 4 movimientos
('entrada', 5, 16, '2025-11-08 10:00:00'),
('salida', 2, 16, '2025-11-15 14:00:00'),
('entrada', 3, 16, '2025-11-22 09:00:00'),
('salida', 1, 16, '2025-11-29 16:00:00'),

-- Producto 17 (Teclado Mecánico) - 6 movimientos
('entrada', 8, 17, '2025-11-04 11:00:00'),
('salida', 3, 17, '2025-11-09 15:00:00'),
('entrada', 6, 17, '2025-11-14 10:00:00'),
('salida', 2, 17, '2025-11-19 14:00:00'),
('entrada', 5, 17, '2025-11-24 09:00:00'),
('salida', 1, 17, '2025-11-30 17:00:00'),

-- Producto 18 (Impresora Láser) - 3 movimientos
('entrada', 3, 18, '2025-11-10 08:00:00'),
('salida', 1, 18, '2025-11-18 13:00:00'),
('entrada', 2, 18, '2025-11-25 10:00:00'),

-- Producto 19 (Router WiFi) - 4 movimientos
('entrada', 6, 19, '2025-11-05 09:00:00'),
('salida', 2, 19, '2025-11-12 15:00:00'),
('entrada', 4, 19, '2025-11-20 11:00:00'),
('salida', 1, 19, '2025-11-27 16:00:00'),

-- Producto 20 (Zapatos Formales) - 4 movimientos
('entrada', 8, 20, '2025-11-07 10:00:00'),
('salida', 3, 20, '2025-11-14 14:00:00'),
('entrada', 5, 20, '2025-11-21 09:00:00'),
('salida', 2, 20, '2025-11-28 15:00:00'),

-- Producto 21 (Aceite de Oliva) - 5 movimientos
('entrada', 20, 21, '2025-11-03 08:00:00'),
('salida', 8, 21, '2025-11-10 12:00:00'),
('entrada', 15, 21, '2025-11-17 09:00:00'),
('salida', 6, 21, '2025-11-22 14:00:00'),
('entrada', 10, 21, '2025-11-29 11:00:00'),

-- Producto 22 (Pasta Espagueti) - 6 movimientos
('entrada', 40, 22, '2025-11-02 07:00:00'),
('salida', 15, 22, '2025-11-09 11:00:00'),
('entrada', 30, 22, '2025-11-16 08:00:00'),
('salida', 12, 22, '2025-11-20 13:00:00'),
('entrada', 25, 22, '2025-11-24 10:00:00'),
('salida', 10, 22, '2025-11-30 16:00:00'),

-- Producto 23 (Atún en Lata) - 5 movimientos
('entrada', 30, 23, '2025-11-06 09:00:00'),
('salida', 12, 23, '2025-11-13 14:00:00'),
('entrada', 20, 23, '2025-11-19 10:00:00'),
('salida', 8, 23, '2025-11-23 15:00:00'),
('entrada', 15, 23, '2025-11-29 11:00:00'),

-- Producto 24 (Harina de Trigo) - 4 movimientos
('entrada', 25, 24, '2025-11-04 08:00:00'),
('salida', 10, 24, '2025-11-11 13:00:00'),
('entrada', 15, 24, '2025-11-18 09:00:00'),
('salida', 8, 24, '2025-11-26 14:00:00'),

-- Producto 25 (Jugo de Naranja) - 6 movimientos
('entrada', 30, 25, '2025-11-05 10:00:00'),
('salida', 12, 25, '2025-11-12 15:00:00'),
('entrada', 20, 25, '2025-11-16 11:00:00'),
('salida', 8, 25, '2025-11-21 16:00:00'),
('entrada', 15, 25, '2025-11-25 09:00:00'),
('salida', 6, 25, '2025-11-30 14:00:00');