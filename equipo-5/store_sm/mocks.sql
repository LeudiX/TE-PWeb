DELETE FROM categorias_categoria; 
DELETE FROM productos_producto; 
DELETE FROM movimientos_movimiento; 

-- Reiniciar los contadores de autoincremento
DELETE FROM sqlite_sequence WHERE name='categorias_categoria'; 
DELETE FROM sqlite_sequence WHERE name='productos_producto'; 
DELETE FROM sqlite_sequence WHERE name='movimientos_movimiento'; 

-- =========================
-- CATEGORÍAS TECNOLÓGICAS (15 categorías)
-- =========================
INSERT INTO categorias_categoria (nombre) VALUES 
('Laptops y Computadoras'),
('Smartphones y Tablets'),
('Componentes de PC'),
('Periféricos'),
('Audio y Sonido'),
('Dispositivos Wearables'),
('Almacenamiento'),
('Redes y Conectividad'),
('Impresión y Escáneres'),
('Gaming'),
('Cámaras y Fotografía'),
('Software'),
('Accesorios Móviles'),
('Electrónica de Consumo'),
('Smart Home');

-- =========================
-- PRODUCTOS TECNOLÓGICOS (60 productos)
-- =========================
INSERT INTO productos_producto (nombre, precio, precio_venta, cantidad, categoria_id, descripcion) VALUES 
-- Laptops y Computadoras (8 productos)
('Laptop Gaming ASUS ROG', 1200.00, 1500.00, 8, 1, 'Laptop para gaming de alto rendimiento'),
('MacBook Air M2', 1000.00, 1250.00, 6, 1, 'Laptop ultra delgada Apple'),
('Dell XPS 13', 900.00, 1100.00, 10, 1, 'Laptop premium para trabajo'),
('Lenovo ThinkPad', 800.00, 950.00, 12, 1, 'Laptop empresarial durable'),
('HP Pavilion', 600.00, 750.00, 15, 1, 'Laptop para uso general'),
('Microsoft Surface Laptop', 1100.00, 1350.00, 7, 1, 'Laptop convertible premium'),
('Acer Nitro 5', 850.00, 1050.00, 9, 1, 'Laptop gaming económica'),
('Chromebook Samsung', 300.00, 380.00, 20, 1, 'Laptop para educación'),

-- Smartphones y Tablets (8 productos)
('iPhone 15 Pro', 1000.00, 1200.00, 15, 2, 'Flagship Apple'),
('Samsung Galaxy S24', 850.00, 1000.00, 18, 2, 'Smartphone Android premium'),
('Google Pixel 8', 700.00, 850.00, 12, 2, 'Smartphone con mejor cámara'),
('iPad Pro 12.9"', 1100.00, 1300.00, 8, 2, 'Tablet profesional'),
('Samsung Galaxy Tab S9', 650.00, 800.00, 10, 2, 'Tablet Android premium'),
('OnePlus 12', 750.00, 900.00, 14, 2, 'Smartphone performance'),
('Xiaomi Redmi Note 13', 250.00, 320.00, 25, 2, 'Smartphone económico'),
('iPad Air', 600.00, 750.00, 11, 2, 'Tablet versátil'),

-- Componentes de PC (6 productos)
('Procesador Intel i9', 500.00, 650.00, 8, 3, 'CPU de alto rendimiento'),
('Tarjeta Gráfica RTX 4080', 1200.00, 1500.00, 5, 3, 'GPU para gaming y diseño'),
('Memoria RAM 32GB DDR5', 150.00, 200.00, 20, 3, 'Kit de memoria de alta velocidad'),
('SSD NVMe 1TB', 100.00, 140.00, 25, 3, 'Disco sólido ultrarrápido'),
('Motherboard ASUS Z790', 300.00, 400.00, 12, 3, 'Placa base gaming'),
('Fuente de Poder 850W', 120.00, 160.00, 15, 3, 'Fuente certificada 80 Plus Gold'),

-- Periféricos (6 productos)
('Teclado Mecánico Razer', 120.00, 160.00, 18, 4, 'Teclado gaming mecánico'),
('Mouse Logitech MX Master', 80.00, 110.00, 22, 4, 'Mouse ergonómico profesional'),
('Monitor 27" 4K LG', 350.00, 450.00, 10, 4, 'Monitor UHD para trabajo'),
('Webcam Logitech C920', 70.00, 95.00, 15, 4, 'Webcam Full HD'),
('Auriculares Sony WH-1000XM5', 320.00, 400.00, 12, 5, 'Audífonos noise cancelling'),
('Micrófono Blue Yeti', 120.00, 160.00, 8, 5, 'Micrófono para streaming'),

-- Audio y Sonido (4 productos)
('Parlante JBL Flip 6', 100.00, 130.00, 20, 5, 'Parlante Bluetooth portátil'),
('Soundbar Samsung HW-Q600C', 350.00, 450.00, 7, 5, 'Barra de sonido Dolby Atmos'),
('Auriculares Inalámbricos Apple', 180.00, 230.00, 25, 5, 'AirPods con estuche'),
('Mixer DJ DDJ-400', 250.00, 320.00, 6, 5, 'Controlador DJ profesional'),

-- Dispositivos Wearables (4 productos)
('Apple Watch Series 9', 400.00, 500.00, 15, 6, 'Reloj inteligente Apple'),
('Samsung Galaxy Watch 6', 280.00, 350.00, 12, 6, 'Smartwatch Android'),
('Fitbit Charge 6', 150.00, 190.00, 18, 6, 'Tracker de actividad fitness'),
('Oculus Quest 3', 500.00, 650.00, 8, 6, 'Gafas de realidad virtual'),

-- Almacenamiento (4 productos)
('Disco Duro Externo 4TB', 90.00, 120.00, 16, 7, 'HDD externo para respaldo'),
('SSD Externo Samsung T7', 120.00, 160.00, 14, 7, 'SSD portátil USB-C'),
('Memoria USB 256GB', 25.00, 35.00, 30, 7, 'Pendrive alta velocidad'),
('Tarjeta SD 128GB', 20.00, 30.00, 40, 7, 'Memoria para cámaras'),

-- Redes y Conectividad (4 productos)
('Router WiFi 6 ASUS', 180.00, 230.00, 10, 8, 'Router gaming dual band'),
('Switch Gigabit Netgear', 60.00, 85.00, 15, 8, 'Switch 8 puertos'),
('Adaptador USB WiFi', 25.00, 35.00, 25, 8, 'Adaptador wireless AC'),
('Powerline TP-Link', 45.00, 60.00, 12, 8, 'Adaptador internet por enchufe'),

-- Impresión y Escáneres (4 productos)
('Impresora Multifunción HP', 150.00, 200.00, 8, 9, 'Impresora láser color'),
('Epson EcoTank L3210', 200.00, 260.00, 6, 9, 'Impresora con tanque de tinta'),
('Escáner Documentos Fujitsu', 180.00, 230.00, 5, 9, 'Escáner automático'),
('Plotter HP DesignJet', 1200.00, 1500.00, 3, 9, 'Plotter para planos'),

-- Gaming (4 productos)
('PlayStation 5', 500.00, 600.00, 8, 10, 'Consola de videojuegos'),
('Xbox Series X', 480.00, 580.00, 7, 10, 'Consola Microsoft'),
('Nintendo Switch OLED', 320.00, 380.00, 10, 10, 'Consola híbrida'),
('Volante Logitech G29', 250.00, 320.00, 6, 10, 'Volante force feedback'),

-- Cámaras y Fotografía (4 productos)
('Cámara Sony A7III', 1800.00, 2200.00, 4, 11, 'Cámara mirrorless full frame'),
('GoPro HERO12', 400.00, 500.00, 12, 11, 'Cámara deportiva 4K'),
('Lente Canon 50mm f/1.8', 120.00, 160.00, 15, 11, 'Lente prime económico'),
('DJI Mini 3 Pro', 700.00, 850.00, 6, 11, 'Dron con cámara 4K'),

-- Smart Home (4 productos)
('Google Nest Hub', 90.00, 120.00, 18, 15, 'Pantalla inteligente'),
('Amazon Echo Dot', 40.00, 55.00, 25, 15, 'Altavoz inteligente'),
('Bombilla Philips Hue', 25.00, 35.00, 30, 15, 'Bombilla inteligente RGB'),
('Cerradura Inteligente Yale', 120.00, 160.00, 8, 15, 'Cerradura con huella');

-- =========================
-- MOVIMIENTOS (120 movimientos)
-- =========================
-- Movimientos para Noviembre 2025 (80 movimientos)
INSERT INTO movimientos_movimiento (tipo, cantidad, producto_id, fecha) VALUES 
-- Producto 1 (Laptop Gaming ASUS ROG) - 6 movimientos
('entrada', 3, 1, '2025-11-05 10:00:00'),
('salida', 1, 1, '2025-11-07 14:00:00'),
('entrada', 2, 1, '2025-11-12 09:00:00'),
('salida', 1, 1, '2025-11-15 16:00:00'),
('entrada', 2, 1, '2025-11-20 11:00:00'),
('salida', 1, 1, '2025-11-25 14:30:00'),

-- Producto 2 (MacBook Air M2) - 6 movimientos
('entrada', 4, 2, '2025-11-02 08:00:00'),
('salida', 2, 2, '2025-11-04 15:00:00'),
('entrada', 3, 2, '2025-11-10 10:00:00'),
('salida', 1, 2, '2025-11-14 17:00:00'),
('entrada', 2, 2, '2025-11-18 09:00:00'),
('salida', 1, 2, '2025-11-22 13:00:00'),

-- Producto 3 (Dell XPS 13) - 4 movimientos
('entrada', 5, 3, '2025-11-03 11:00:00'),
('salida', 2, 3, '2025-11-08 14:00:00'),
('entrada', 3, 3, '2025-11-16 10:00:00'),
('salida', 1, 3, '2025-11-24 16:00:00'),

-- Producto 4 (Lenovo ThinkPad) - 6 movimientos
('entrada', 8, 4, '2025-11-01 09:00:00'),
('salida', 3, 4, '2025-11-06 12:00:00'),
('entrada', 5, 4, '2025-11-11 08:00:00'),
('salida', 2, 4, '2025-11-17 15:00:00'),
('entrada', 4, 4, '2025-11-21 11:00:00'),
('salida', 1, 4, '2025-11-28 14:00:00'),

-- Producto 5 (HP Pavilion) - 4 movimientos
('entrada', 10, 5, '2025-11-04 10:00:00'),
('salida', 4, 5, '2025-11-09 13:00:00'),
('entrada', 6, 5, '2025-11-19 09:00:00'),
('salida', 2, 5, '2025-11-26 16:00:00'),

-- Producto 6 (Microsoft Surface Laptop) - 4 movimientos
('entrada', 4, 6, '2025-11-07 08:00:00'),
('salida', 1, 6, '2025-11-13 14:00:00'),
('entrada', 3, 6, '2025-11-20 10:00:00'),
('salida', 1, 6, '2025-11-27 15:00:00'),

-- Producto 7 (Acer Nitro 5) - 6 movimientos
('entrada', 6, 7, '2025-11-02 09:00:00'),
('salida', 2, 7, '2025-11-05 16:00:00'),
('entrada', 4, 7, '2025-11-12 08:00:00'),
('salida', 1, 7, '2025-11-18 14:00:00'),
('entrada', 3, 7, '2025-11-22 10:00:00'),
('salida', 1, 7, '2025-11-29 17:00:00'),

-- Producto 8 (Chromebook Samsung) - 4 movimientos
('entrada', 12, 8, '2025-11-03 11:00:00'),
('salida', 5, 8, '2025-11-10 15:00:00'),
('entrada', 8, 8, '2025-11-17 09:00:00'),
('salida', 3, 8, '2025-11-24 13:00:00'),

-- Producto 9 (iPhone 15 Pro) - 4 movimientos
('entrada', 8, 9, '2025-11-06 10:00:00'),
('salida', 3, 9, '2025-11-14 16:00:00'),
('entrada', 5, 9, '2025-11-21 11:00:00'),
('salida', 2, 9, '2025-11-28 14:00:00'),

-- Producto 10 (Samsung Galaxy S24) - 6 movimientos
('entrada', 10, 10, '2025-11-03 11:00:00'),
('salida', 3, 10, '2025-11-08 18:00:00'),
('entrada', 8, 10, '2025-11-15 09:00:00'),
('salida', 4, 10, '2025-11-19 16:00:00'),
('entrada', 6, 10, '2025-11-23 10:00:00'),
('salida', 2, 10, '2025-11-30 15:00:00'),

-- Producto 11 (Google Pixel 8) - 6 movimientos
('entrada', 8, 11, '2025-11-01 08:00:00'),
('salida', 3, 11, '2025-11-08 12:00:00'),
('entrada', 5, 11, '2025-11-14 07:00:00'),
('salida', 2, 11, '2025-11-20 11:00:00'),
('entrada', 4, 11, '2025-11-25 09:00:00'),
('salida', 1, 11, '2025-11-29 13:00:00'),

-- Producto 12 (iPad Pro 12.9") - 8 movimientos
('entrada', 5, 12, '2025-11-04 09:30:00'),
('salida', 2, 12, '2025-11-09 15:00:00'),
('entrada', 4, 12, '2025-11-11 08:30:00'),
('salida', 1, 12, '2025-11-16 14:00:00'),
('entrada', 3, 12, '2025-11-18 10:00:00'),
('salida', 1, 12, '2025-11-22 16:00:00'),
('entrada', 2, 12, '2025-11-26 09:00:00'),
('salida', 1, 12, '2025-11-30 12:00:00'),

-- Producto 13 (Samsung Galaxy Tab S9) - 2 movimientos
('entrada', 6, 13, '2025-11-06 13:00:00'),
('salida', 2, 13, '2025-11-20 17:00:00'),

-- Producto 14 (OnePlus 12) - 4 movimientos
('entrada', 8, 14, '2025-11-05 10:00:00'),
('salida', 3, 14, '2025-11-12 19:00:00'),
('entrada', 5, 14, '2025-11-19 11:00:00'),
('salida', 2, 14, '2025-11-26 15:00:00'),

-- Producto 15 (Xiaomi Redmi Note 13) - 4 movimientos
('entrada', 15, 15, '2025-11-07 09:00:00'),
('salida', 6, 15, '2025-11-13 14:00:00'),
('entrada', 10, 15, '2025-11-21 10:00:00'),
('salida', 4, 15, '2025-11-28 16:00:00');

-- Movimientos para meses anteriores (40 movimientos)
INSERT INTO movimientos_movimiento (tipo, cantidad, producto_id, fecha) VALUES 
-- Octubre 2025
('entrada', 4, 16, '2025-10-15 10:00:00'),
('salida', 2, 16, '2025-10-20 14:00:00'),
('entrada', 6, 17, '2025-10-10 09:00:00'),
('salida', 3, 17, '2025-10-18 16:00:00'),
('entrada', 8, 18, '2025-10-05 11:00:00'),
('salida', 4, 18, '2025-10-12 18:00:00'),

-- Septiembre 2025
('entrada', 3, 19, '2025-09-12 09:00:00'),
('salida', 1, 19, '2025-09-18 16:00:00'),
('entrada', 5, 20, '2025-09-08 10:00:00'),
('salida', 2, 20, '2025-09-15 14:00:00'),
('entrada', 7, 21, '2025-09-20 08:00:00'),
('salida', 3, 21, '2025-09-25 17:00:00'),

-- Agosto 2025
('entrada', 4, 22, '2025-08-05 11:00:00'),
('salida', 2, 22, '2025-08-10 18:00:00'),
('entrada', 6, 23, '2025-08-15 09:00:00'),
('salida', 3, 23, '2025-08-22 15:00:00'),
('entrada', 5, 24, '2025-08-18 10:00:00'),
('salida', 2, 24, '2025-08-26 16:00:00'),

-- Julio 2025
('entrada', 3, 25, '2025-07-03 09:30:00'),
('salida', 1, 25, '2025-07-09 15:00:00'),
('entrada', 4, 26, '2025-07-12 08:00:00'),
('salida', 2, 26, '2025-07-20 14:00:00'),
('entrada', 3, 27, '2025-07-25 11:00:00'),
('salida', 1, 27, '2025-07-30 17:00:00'),

-- Junio 2025
('entrada', 8, 28, '2025-06-06 13:00:00'),
('salida', 4, 28, '2025-06-11 17:00:00'),
('entrada', 6, 29, '2025-06-15 10:00:00'),
('salida', 3, 29, '2025-06-22 15:00:00'),
('entrada', 5, 30, '2025-06-25 09:00:00'),
('salida', 2, 30, '2025-06-30 16:00:00'),

-- Mayo 2025
('entrada', 4, 31, '2025-05-10 08:00:00'),
('salida', 2, 31, '2025-05-17 14:00:00'),
('entrada', 3, 32, '2025-05-20 11:00:00'),
('salida', 1, 32, '2025-05-27 16:00:00'),

-- Abril 2025
('entrada', 5, 33, '2025-04-05 09:00:00'),
('salida', 2, 33, '2025-04-12 15:00:00'),
('entrada', 4, 34, '2025-04-18 10:00:00'),
('salida', 1, 34, '2025-04-25 17:00:00'),

-- Marzo 2025
('entrada', 6, 35, '2025-03-08 08:00:00'),
('salida', 3, 35, '2025-03-15 13:00:00'),
('entrada', 5, 36, '2025-03-22 11:00:00'),
('salida', 2, 36, '2025-03-29 16:00:00');