-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla login_db.catalogo_proveedor
CREATE TABLE IF NOT EXISTS `catalogo_proveedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proveedor_id` int(11) NOT NULL,
  `nombre_producto` varchar(150) NOT NULL,
  `descripcion` text,
  `costo` decimal(10,2) NOT NULL,
  `ubicacion` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `catalogo_proveedor_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.catalogo_proveedor: ~36 rows (aproximadamente)
/*!40000 ALTER TABLE `catalogo_proveedor` DISABLE KEYS */;
INSERT INTO `catalogo_proveedor` (`id`, `proveedor_id`, `nombre_producto`, `descripcion`, `costo`, `ubicacion`) VALUES
	(1, 1, 'Casco AGV K1', 'Talle M, negro mate', 1500.00, NULL),
	(2, 1, 'Chaqueta de Cuero V-Max', 'Protecciones CE Nivel 2', 2200.50, NULL),
	(3, 1, 'Filtro de Aceite K&N KN-204', 'Para motos japonesas', 90.00, NULL),
	(4, 1, 'Manillares de Aluminio ProTaper', 'Color dorado, 28mm', 450.00, NULL),
	(5, 1, 'Slider de Motor', 'Protección anti-caídas', 600.00, NULL),
	(6, 2, 'Kit de Arrastre D.I.D', 'Cadena, piñón y corona para Honda CB500', 950.00, NULL),
	(7, 2, 'Bujía NGK Iridium CR9EIX', 'Para motos de 4 tiempos', 85.50, NULL),
	(8, 2, 'Líquido Refrigerante Motocool', 'Botella de 1L, listo para usar', 75.00, NULL),
	(9, 2, 'Palanca de Freno Regulable', 'Aluminio CNC, color rojo', 180.00, NULL),
	(10, 2, 'Espejos Retrovisores Rizoma', 'Diseño deportivo', 350.00, NULL),
	(11, 3, 'Guantes Alpinestars SP-8', 'Cuero con protección de nudillos', 550.00, NULL),
	(12, 3, 'Intercomunicador Ejeas V6', 'Comunicación piloto-pasajero', 480.00, NULL),
	(13, 3, 'Maleta Givi Trekker 42L', 'Aluminio, sistema Monokey', 2800.00, NULL),
	(14, 3, 'Soporte de Celular con Cargador', 'Resistente al agua', 150.00, NULL),
	(15, 3, 'Candado de Disco con Alarma', 'Acero reforzado 110dB', 250.00, NULL),
	(16, 4, 'Llanta Pirelli Diablo Rosso II', 'Medida 180/55-17', 1250.50, NULL),
	(17, 4, 'Llanta Michelin Pilot Road 5', 'Medida 120/70-17', 1100.00, NULL),
	(18, 4, 'Llanta Metzeler Tourance', 'Doble propósito 150/70-18', 1400.00, NULL),
	(19, 4, 'Cámara de Goma Reforzada 21"', 'Para Enduro/Motocross', 120.00, NULL),
	(20, 4, 'Kit de Reparación de Pinchazos', 'Incluye parches y CO2', 95.00, NULL),
	(21, 5, 'Aceite Motul 7100 10W40', 'Sintético, botella de 1L', 110.00, NULL),
	(22, 5, 'Aceite Liqui Moly 20W50', 'Mineral, para motores de alto recorrido', 85.00, NULL),
	(23, 5, 'Limpia Cadena Motul C1', 'Aerosol 400ml', 65.00, NULL),
	(24, 5, 'Grasa para Cadena Motul C4', 'Aerosol 400ml, color blanco', 70.00, NULL),
	(25, 5, 'Aditivo para Gasolina Octane Booster', 'Aumenta el octanaje', 50.00, NULL),
	(26, 11, 'Espada Samurai', 'AÃ±o de la pera', 1000000.00, NULL),
	(27, 12, 'Asientos para Moto', 'CÃ³modos asientos y con diseÃ±os', 250.00, NULL),
	(28, 13, 'Asientos para sentarse', 'Color negro', 120.00, NULL),
	(29, 13, 'Cascos X', 'DiseÃ±os personalizados', 240.00, NULL),
	(30, 14, 'Casco', 'negro', 300.00, NULL),
	(31, 15, 'tanguita de raul', 'usada', 20000.00, NULL),
	(32, 16, 'tanguita de raul', 'usada', 150.00, NULL),
	(33, 17, 'boxer usado', 'usado de uriel', 50.00, NULL),
	(34, 18, 'Engine X-50', 'Power and speed', 2500.00, NULL),
	(35, 18, 'Engine X-100', 'Light Power', 1250.00, NULL),
	(36, 19, 'Balatas', 'livianas', 220.00, NULL);
/*!40000 ALTER TABLE `catalogo_proveedor` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contacto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla login_db.clientes: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`id`, `nombre`, `contacto`, `direccion`) VALUES
	(1, 'Uriel Teran', '3878237823', 'Piraí #65'),
	(2, 'Uziel', 'raulitoamor@gmail.com', '8vo anillo'),
	(3, 'John Smith', 'john23@gmail.com', 'Av. Busch 22'),
	(4, 'Adrian', 'adrian@gmail.com', 'Av Busch');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.compras
CREATE TABLE IF NOT EXISTS `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_compra` varchar(50) DEFAULT NULL,
  `proveedor_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_compra` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(50) NOT NULL DEFAULT 'Completada',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_compra` (`codigo_compra`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.compras: ~23 rows (aproximadamente)
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` (`id`, `codigo_compra`, `proveedor_id`, `total`, `fecha_compra`, `estado`) VALUES
	(1, 'COMPRA-1', 4, 4400.00, '2025-09-10 17:04:51', 'Anulada'),
	(2, 'COMPRA-2', 2, 360.00, '2025-09-10 17:05:16', 'Completada'),
	(3, 'COMPRA-3', 11, 6000000.00, '2025-09-10 17:08:17', 'Completada'),
	(4, 'COMPRA-4', 1, 25500.00, '2025-09-10 18:18:43', 'Completada'),
	(5, 'COMPRA-5', 1, 44010.00, '2025-09-10 18:19:05', 'Completada'),
	(6, 'COMPRA-6', 1, 1440.00, '2025-09-10 18:19:20', 'Completada'),
	(7, 'COMPRA-7', 1, 990.00, '2025-09-10 18:19:36', 'Completada'),
	(8, 'COMPRA-8', 1, 4950.00, '2025-09-10 18:19:49', 'Completada'),
	(9, 'COMPRA-9', 1, 10800.00, '2025-09-10 18:20:03', 'Completada'),
	(10, 'COMPRA-10', 2, 19171.50, '2025-09-10 18:20:50', 'Completada'),
	(11, 'COMPRA-11', 3, 48140.00, '2025-09-10 18:22:02', 'Completada'),
	(12, 'COMPRA-12', 4, 44571.00, '2025-09-10 18:22:48', 'Completada'),
	(13, 'COMPRA-13', 11, 8000000.00, '2025-09-10 18:23:21', 'Completada'),
	(14, 'COMPRA-14', 12, 2750.00, '2025-09-10 18:55:04', 'Completada'),
	(15, 'COMPRA-15', 12, 250.00, '2025-09-10 19:37:50', 'Anulada'),
	(16, 'COMPRA-16', 3, 8400.00, '2025-09-11 08:06:43', 'Anulada'),
	(17, 'COMPRA-17', 11, 5000000.00, '2025-09-11 08:10:32', 'Anulada'),
	(18, 'COMPRA-18', 14, 300.00, '2025-09-15 13:35:12', 'Anulada'),
	(19, 'COMPRA-19', 16, 150.00, '2025-09-15 15:19:44', 'Completada'),
	(20, 'COMPRA-20', 3, 550.00, '2025-09-15 16:27:07', 'Completada'),
	(21, 'COMPRA-21', 17, 50.00, '2025-09-15 22:11:51', 'Completada'),
	(22, 'COMPRA-22', 18, 6250.00, '2025-11-17 19:42:44', 'Completada'),
	(23, 'COMPRA-23', 19, 2200.00, '2025-11-18 19:50:14', 'Completada');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.detalle_compras
CREATE TABLE IF NOT EXISTS `detalle_compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compra_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `costo_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `compra_id` (`compra_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_compras_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`),
  CONSTRAINT `detalle_compras_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.detalle_compras: ~37 rows (aproximadamente)
/*!40000 ALTER TABLE `detalle_compras` DISABLE KEYS */;
INSERT INTO `detalle_compras` (`id`, `compra_id`, `producto_id`, `cantidad`, `costo_unitario`, `subtotal`) VALUES
	(1, 1, 1, 4, 1100.00, 4400.00),
	(2, 2, 2, 2, 180.00, 360.00),
	(3, 3, 3, 6, 1000000.00, 6000000.00),
	(4, 4, 4, 17, 1500.00, 25500.00),
	(5, 5, 5, 20, 2200.50, 44010.00),
	(6, 6, 6, 16, 90.00, 1440.00),
	(7, 7, 6, 11, 90.00, 990.00),
	(8, 8, 7, 11, 450.00, 4950.00),
	(9, 9, 8, 18, 600.00, 10800.00),
	(10, 10, 9, 11, 950.00, 10450.00),
	(11, 10, 10, 13, 85.50, 1111.50),
	(12, 10, 11, 12, 75.00, 900.00),
	(13, 10, 2, 12, 180.00, 2160.00),
	(14, 10, 12, 13, 350.00, 4550.00),
	(15, 11, 13, 11, 550.00, 6050.00),
	(16, 11, 14, 13, 480.00, 6240.00),
	(17, 11, 15, 11, 2800.00, 30800.00),
	(18, 11, 16, 12, 150.00, 1800.00),
	(19, 11, 17, 12, 250.00, 3000.00),
	(20, 11, 17, 1, 250.00, 250.00),
	(21, 12, 18, 12, 1250.50, 15006.00),
	(22, 12, 1, 12, 1100.00, 13200.00),
	(23, 12, 19, 10, 1400.00, 14000.00),
	(24, 12, 20, 11, 120.00, 1320.00),
	(25, 12, 21, 11, 95.00, 1045.00),
	(26, 13, 3, 8, 1000000.00, 8000000.00),
	(27, 14, 22, 11, 250.00, 2750.00),
	(28, 15, 22, 1, 250.00, 250.00),
	(29, 16, 15, 3, 2800.00, 8400.00),
	(30, 17, 3, 5, 1000000.00, 5000000.00),
	(31, 18, 23, 1, 300.00, 300.00),
	(32, 19, 24, 1, 150.00, 150.00),
	(33, 20, 13, 1, 550.00, 550.00),
	(34, 21, 25, 1, 50.00, 50.00),
	(35, 22, 26, 2, 2500.00, 5000.00),
	(36, 22, 27, 1, 1250.00, 1250.00),
	(37, 23, 28, 10, 220.00, 2200.00);
/*!40000 ALTER TABLE `detalle_compras` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.detalle_ventas
CREATE TABLE IF NOT EXISTS `detalle_ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_id` (`venta_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`),
  CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.detalle_ventas: ~19 rows (aproximadamente)
/*!40000 ALTER TABLE `detalle_ventas` DISABLE KEYS */;
INSERT INTO `detalle_ventas` (`id`, `venta_id`, `producto_id`, `cantidad`, `precio_unitario`, `subtotal`) VALUES
	(1, 1, 1, 1, 1650.00, 1650.00),
	(2, 2, 3, 5, 1500000.00, 7500000.00),
	(3, 3, 19, 7, 2100.00, 14700.00),
	(4, 3, 16, 2, 225.00, 450.00),
	(5, 4, 22, 4, 375.00, 1500.00),
	(6, 5, 4, 1, 2250.00, 2250.00),
	(7, 6, 3, 1, 1500000.00, 1500000.00),
	(8, 7, 1, 1, 1650.00, 1650.00),
	(9, 8, 24, 1, 225.00, 225.00),
	(10, 9, 4, 1, 2250.00, 2250.00),
	(11, 9, 18, 3, 1875.75, 5627.25),
	(12, 10, 4, 3, 2250.00, 6750.00),
	(13, 10, 1, 1, 1650.00, 1650.00),
	(14, 11, 2, 1, 270.00, 270.00),
	(15, 12, 13, 1, 825.00, 825.00),
	(16, 13, 25, 1, 75.00, 75.00),
	(17, 14, 27, 1, 1875.00, 1875.00),
	(18, 15, 28, 10, 330.00, 3300.00),
	(19, 16, 1, 1, 1650.00, 1650.00);
/*!40000 ALTER TABLE `detalle_ventas` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.devoluciones
CREATE TABLE IF NOT EXISTS `devoluciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_devolucion` varchar(50) DEFAULT NULL,
  `tipo_transaccion_original` varchar(20) NOT NULL,
  `id_transaccion_original` int(11) NOT NULL,
  `codigo_transaccion_original` varchar(50) DEFAULT NULL,
  `fecha_devolucion` datetime DEFAULT CURRENT_TIMESTAMP,
  `motivo` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_devolucion` (`codigo_devolucion`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.devoluciones: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `devoluciones` DISABLE KEYS */;
INSERT INTO `devoluciones` (`id`, `codigo_devolucion`, `tipo_transaccion_original`, `id_transaccion_original`, `codigo_transaccion_original`, `fecha_devolucion`, `motivo`) VALUES
	(1, 'DEV-1', 'Compra', 15, 'COMPRA-15', '2025-09-10 19:39:03', ''),
	(2, 'DEV-2', 'Venta', 3, 'VENTA-3', '2025-09-10 19:41:02', ''),
	(3, 'DEV-3', 'Compra', 1, 'COMPRA-1', '2025-09-10 19:41:15', ''),
	(4, 'DEV-4', 'Compra', 16, 'COMPRA-16', '2025-09-11 08:07:32', 'X'),
	(5, 'DEV-5', 'Compra', 17, 'COMPRA-17', '2025-09-11 08:11:00', 'Muy desafilada'),
	(6, 'DEV-6', 'Venta', 4, 'VENTA-4', '2025-09-11 08:13:54', ''),
	(7, 'DEV-7', 'Venta', 2, 'VENTA-2', '2025-09-15 13:32:20', ''),
	(8, 'DEV-8', 'Compra', 18, 'COMPRA-18', '2025-09-15 13:36:35', 'prod incorrecto'),
	(9, 'DEV-9', 'Venta', 13, 'Venta-13', '2025-09-15 22:15:12', 'producto sucio'),
	(10, 'DEV-10', 'Venta', 12, 'venta-12', '2025-09-16 08:30:06', ''),
	(11, 'DEV-11', 'Venta', 14, 'VENTA-14', '2025-11-17 19:47:47', 'Broken engine'),
	(12, 'DEV-12', 'Venta', 15, 'venta-15', '2025-11-18 19:52:11', 'balata fallada');
/*!40000 ALTER TABLE `devoluciones` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.facturas
CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `codigo_factura` varchar(50) DEFAULT NULL,
  `fecha_emision` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tasa_impuesto` decimal(5,2) NOT NULL DEFAULT '0.00',
  `descuento_global` decimal(10,2) NOT NULL DEFAULT '0.00',
  `subtotal_productos` decimal(10,2) NOT NULL,
  `total_adicionales` decimal(10,2) NOT NULL,
  `monto_impuestos` decimal(10,2) NOT NULL,
  `total_final` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_factura` (`codigo_factura`),
  KEY `FK_facturas_ventas` (`venta_id`),
  CONSTRAINT `FK_facturas_ventas` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla login_db.facturas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` (`id`, `venta_id`, `codigo_factura`, `fecha_emision`, `tasa_impuesto`, `descuento_global`, `subtotal_productos`, `total_adicionales`, `monto_impuestos`, `total_final`) VALUES
	(1, 2, 'FACT-1', '2025-09-15 14:07:45', 13.00, 0.00, 7500000.00, 0.00, 975000.00, 8475000.00),
	(2, 12, 'FACT-2', '2025-09-16 08:29:21', 13.00, 0.00, 825.00, 0.00, 107.25, 932.25),
	(3, 14, 'FACT-3', '2025-11-17 19:46:52', 13.00, 0.00, 1875.00, 0.00, 243.75, 2118.75);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.factura_items_adicionales
CREATE TABLE IF NOT EXISTS `factura_items_adicionales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `factura_id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT '1',
  `monto_unitario` decimal(10,2) NOT NULL,
  `tipo` enum('ADICION','DEDUCCION') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_items_facturas` (`factura_id`),
  CONSTRAINT `FK_items_facturas` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla login_db.factura_items_adicionales: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `factura_items_adicionales` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura_items_adicionales` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.listainventario
CREATE TABLE IF NOT EXISTS `listainventario` (
  `idproducto` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(50) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `detalles` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(32) DEFAULT NULL,
  `precioUnitario` double NOT NULL,
  `precioCompra` double DEFAULT NULL,
  `precioVenta` double DEFAULT NULL,
  `fechaCompra` date DEFAULT NULL,
  `fechaVentas` datetime DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  UNIQUE KEY `nombreProducto` (`nombreProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.listainventario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `listainventario` DISABLE KEYS */;
INSERT INTO `listainventario` (`idproducto`, `nombreProducto`, `cantidad`, `detalles`, `ubicacion`, `precioUnitario`, `precioCompra`, `precioVenta`, `fechaCompra`, `fechaVentas`, `categoria`) VALUES
	(1, 'Bugia', 15, 'Bugia nueva de caja', NULL, 200, 3000, 300, '2025-05-01', '2025-12-23 10:11:02', 'Electrónica'),
	(2, 'Llanta', 300, 'Llantas aro de 17 pulg', NULL, 20, 6000, 35, '2025-05-01', '2025-10-23 08:09:02', NULL);
/*!40000 ALTER TABLE `listainventario` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.loguin
CREATE TABLE IF NOT EXISTS `loguin` (
  `idloguin` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fcreacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  `idusua` int(11) DEFAULT NULL,
  PRIMARY KEY (`idloguin`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idusua` (`idusua`),
  CONSTRAINT `loguin_ibfk_1` FOREIGN KEY (`idusua`) REFERENCES `login`.`usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.loguin: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `loguin` DISABLE KEYS */;
INSERT INTO `loguin` (`idloguin`, `username`, `password_hash`, `email`, `fcreacion`, `activo`, `idusua`) VALUES
	(1, '', '', '', '2025-08-22 17:43:05', 1, NULL),
	(3, 'Uziel', '$2a$12$tIciNS3uyxPHPO0flVKEhuUwVw5fytb21b8SZVqRxThUGuwT0PdwO', 'uziel@email.com', '2025-09-05 08:44:19', 1, NULL);
/*!40000 ALTER TABLE `loguin` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.modificaciones_venta
CREATE TABLE IF NOT EXISTS `modificaciones_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_id` (`venta_id`),
  CONSTRAINT `modificaciones_venta_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.modificaciones_venta: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `modificaciones_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `modificaciones_venta` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medida` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio_venta` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `ubicacion` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla login_db.productos: ~28 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `codigo`, `nombre`, `categoria`, `medida`, `precio_venta`, `stock`, `ubicacion`) VALUES
	(1, 'PROD-1', 'Llanta Michelin Pilot Road 5', 'General', 'Unidad', 1650.00, 8, NULL),
	(2, 'PROD-2', 'Palanca de Freno Regulable', 'General', 'Unidad', 270.00, 13, NULL),
	(3, 'PROD-3', 'Espada Samurai', 'General', 'Unidad', 1500000.00, 13, NULL),
	(4, 'PROD-4', 'Casco AGV K1', 'General', 'Unidad', 2250.00, 12, NULL),
	(5, 'PROD-5', 'Chaqueta de Cuero V-Max', 'General', 'Unidad', 3300.75, 20, NULL),
	(6, 'PROD-6', 'Filtro de Aceite K&N KN-204', 'General', 'Unidad', 135.00, 27, NULL),
	(7, 'PROD-7', 'Manillares de Aluminio ProTaper', 'General', 'Unidad', 675.00, 11, NULL),
	(8, 'PROD-8', 'Slider de Motor', 'General', 'Unidad', 900.00, 18, NULL),
	(9, 'PROD-9', 'Kit de Arrastre D.I.D', 'General', 'Unidad', 1425.00, 11, NULL),
	(10, 'PROD-10', 'BujÃ­a NGK Iridium CR9EIX', 'General', 'Unidad', 128.25, 13, NULL),
	(11, 'PROD-11', 'LÃ­quido Refrigerante Motocool', 'General', 'Unidad', 112.50, 12, NULL),
	(12, 'PROD-12', 'Espejos Retrovisores Rizoma', 'General', 'Unidad', 525.00, 13, NULL),
	(13, 'PROD-13', 'Guantes Alpinestars SP-8', 'General', 'Unidad', 825.00, 12, 'P1/R17/B'),
	(14, 'PROD-14', 'Intercomunicador Ejeas V6', 'General', 'Unidad', 720.00, 13, NULL),
	(15, 'PROD-15', 'Maleta Givi Trekker 42L', 'General', 'Unidad', 4200.00, 11, NULL),
	(16, 'PROD-16', 'Soporte de Celular con Cargador', 'General', 'Unidad', 225.00, 12, NULL),
	(17, 'PROD-17', 'Candado de Disco con Alarma', 'General', 'Unidad', 375.00, 13, NULL),
	(18, 'PROD-18', 'Llanta Pirelli Diablo Rosso II', 'General', 'Unidad', 1875.75, 9, NULL),
	(19, 'PROD-19', 'Llanta Metzeler Tourance', 'General', 'Unidad', 2100.00, 10, NULL),
	(20, 'PROD-20', 'CÃ¡mara de Goma Reforzada 21"', 'General', 'Unidad', 180.00, 11, NULL),
	(21, 'PROD-21', 'Kit de ReparaciÃ³n de Pinchazos', 'General', 'Unidad', 142.50, 11, NULL),
	(22, 'PROD-22', 'Asientos para Moto', 'General', 'Unidad', 375.00, 11, NULL),
	(23, 'PROD-23', 'Casco', 'General', 'Unidad', 450.00, 0, 'P4/R24/D'),
	(24, 'PROD-24', 'Amortiguadores', 'General', 'Unidad', 225.00, 0, 'P3/R19/A'),
	(25, 'PROD-25', 'Balatas X-50', 'General', 'Unidad', 75.00, 1, 'P1/R17/D'),
	(26, 'PROD-26', 'Engine X-50', 'General', 'Unidad', 3750.00, 2, 'P2/R17/C'),
	(27, 'PROD-27', 'Engine X-100', 'General', 'Unidad', 1875.00, 1, 'P3/R16/B'),
	(28, 'PROD-28', 'Balatas', 'General', 'Unidad', 330.00, 10, 'P4/R14/B');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.producto_ubicaciones
CREATE TABLE IF NOT EXISTS `producto_ubicaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `zona` tinyint(3) unsigned NOT NULL,
  `rack` smallint(5) unsigned NOT NULL,
  `altura` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `etiqueta` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_producto_zra` (`producto_id`,`zona`,`rack`,`altura`),
  KEY `idx_producto_id` (`producto_id`),
  CONSTRAINT `fk_producto_ubicaciones_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla login_db.producto_ubicaciones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `producto_ubicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_ubicaciones` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.proveedores
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contacto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla login_db.proveedores: ~19 rows (aproximadamente)
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` (`id`, `nombre`, `contacto`) VALUES
	(1, 'Importadora "El Veloz"', 'Juan Pérez - 77711122'),
	(2, 'MotoTotal Repuestos', 'María Gutiérrez - 66655544'),
	(3, 'Accesorios Rider Pro', 'Carlos Roca - 70088899'),
	(4, 'Llantas Mundiales S.R.L.', 'Ana Soliz - 79900011'),
	(5, 'Lubricantes & Filtros Bolivia', 'Pedro Marques - 65544433'),
	(6, 'Frenos y Partes Racing', 'Lucía Choque - 71122233'),
	(7, 'Baterías "Eléctron"', 'Mario Durán - 68877766'),
	(8, 'Escapes "Ronco"', 'Sofia Beltrán - 76655544'),
	(9, 'Luces LED "Visión Nocturna"', 'Jorge Nuñez - 72233344'),
	(10, 'Plásticos y Carenados MotoForm', 'Raúl Vega - 61122233'),
	(11, 'Importadoras Raulito', 'Raulito - 75024337'),
	(12, 'Ivan Zuñiga', '75013006'),
	(13, 'Jesus Bautista', '27365299'),
	(14, 'uziel', '123'),
	(15, 'Importadora papuchino', 'importadoraX@gmail.com'),
	(16, 'Importadora Raul', 'raulits@gmail.com'),
	(17, 'Importadoras urinator', 'uri@gmail.com'),
	(18, 'Engine Importation', 'engine22@gmail.com'),
	(19, 'Importadora Balatas', 'balatas22@gmail.com');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `username`, `password`) VALUES
	(1, 'admin', '1234');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla login_db.ventas
CREATE TABLE IF NOT EXISTS `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_venta` varchar(50) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_venta` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(50) NOT NULL DEFAULT 'Completada',
  `estado_facturacion` varchar(20) NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_venta` (`codigo_venta`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla login_db.ventas: ~16 rows (aproximadamente)
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` (`id`, `codigo_venta`, `cliente_id`, `total`, `fecha_venta`, `estado`, `estado_facturacion`) VALUES
	(1, 'VENTA-1', NULL, 1650.00, '2025-09-10 17:06:51', 'Completada', 'Pendiente'),
	(2, 'VENTA-2', NULL, 7500000.00, '2025-09-10 17:08:42', 'Anulada', 'Facturada'),
	(3, 'VENTA-3', NULL, 15150.00, '2025-09-10 18:24:12', 'Anulada', 'Pendiente'),
	(4, 'VENTA-4', NULL, 1500.00, '2025-09-11 08:12:49', 'Anulada', 'Pendiente'),
	(5, 'VENTA-5', NULL, 2250.00, '2025-09-11 08:32:45', 'Completada', 'Pendiente'),
	(6, 'VENTA-6', NULL, 1500000.00, '2025-09-12 17:21:55', 'Completada', 'Pendiente'),
	(7, 'VENTA-7', 1, 1650.00, '2025-09-15 14:38:47', 'Completada', 'Pendiente'),
	(8, 'VENTA-8', 2, 225.00, '2025-09-15 15:44:38', 'Completada', 'Pendiente'),
	(9, 'VENTA-9', NULL, 7877.25, '2025-09-15 15:49:58', 'Completada', 'Pendiente'),
	(10, 'VENTA-10', NULL, 8400.00, '2025-09-15 16:21:25', 'Completada', 'Pendiente'),
	(11, 'VENTA-11', 2, 270.00, '2025-09-15 16:25:47', 'Completada', 'Pendiente'),
	(12, 'VENTA-12', 1, 825.00, '2025-09-15 16:27:38', 'Anulada', 'Facturada'),
	(13, 'VENTA-13', 2, 75.00, '2025-09-15 22:13:15', 'Anulada', 'Pendiente'),
	(14, 'VENTA-14', 3, 1875.00, '2025-11-17 19:44:22', 'Anulada', 'Facturada'),
	(15, 'VENTA-15', NULL, 3300.00, '2025-11-18 19:50:50', 'Anulada', 'Pendiente'),
	(16, 'VENTA-16', NULL, 1650.00, '2025-11-18 19:53:03', 'Completada', 'Pendiente');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
