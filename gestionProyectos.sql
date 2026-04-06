-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-04-2026 a las 18:34:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestionProyectos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `email`, `telefono`, `cargo`, `created_at`) VALUES
(1, 'Juan Pérez', 'juan.perez@empresa.com', '555-0101', 'Arquitecto', '2026-02-18 21:14:50'),
(2, 'María García', 'maria.garcia@empresa.com', '555-0102', 'Ingeniera Civil', '2026-02-18 21:14:50'),
(3, 'Carlos López', 'carlos.lopez@empresa.com', '555-0103', 'Supervisor de Obra', '2026-02-18 21:14:50'),
(4, 'Ana Martínez', 'ana.martinez@empresa.com', '555-0104', 'Diseñadora de Interiores', '2026-02-18 21:14:50'),
(5, 'Roberto Sánchez', 'roberto.sanchez@empresa.com', '555-0105', 'Jefe de Proyecto', '2026-02-18 21:14:50'),
(6, 'Juan Pérez', 'juan.perez@empresa.com', '555-0101', 'Arquitecto', '2026-02-18 21:15:08'),
(7, 'María García', 'maria.garcia@empresa.com', '555-0102', 'Ingeniera Civil', '2026-02-18 21:15:08'),
(8, 'Carlos López', 'carlos.lopez@empresa.com', '555-0103', 'Supervisor de Obra', '2026-02-18 21:15:08'),
(9, 'Ana Martínez', 'ana.martinez@empresa.com', '555-0104', 'Diseñadora de Interiores', '2026-02-18 21:15:08'),
(10, 'Roberto Sánchez', 'roberto.sanchez@empresa.com', '555-0105', 'Jefe de Proyecto', '2026-02-18 21:15:08'),
(11, 'Juan Pérez', 'juan.perez@empresa.com', '555-0101', 'Arquitecto', '2026-02-18 21:17:22'),
(12, 'María García', 'maria.garcia@empresa.com', '555-0102', 'Ingeniera Civil', '2026-02-18 21:17:22'),
(13, 'Carlos López', 'carlos.lopez@empresa.com', '555-0103', 'Supervisor de Obra', '2026-02-18 21:17:22'),
(14, 'Ana Martínez', 'ana.martinez@empresa.com', '555-0104', 'Diseñadora de Interiores', '2026-02-18 21:17:22'),
(15, 'Roberto Sánchez', 'roberto.sanchez@empresa.com', '555-0105', 'Jefe de Proyecto', '2026-02-18 21:17:22'),
(16, 'Juan Pérez', 'juan.perez@empresa.com', '555-0101', 'Arquitecto', '2026-02-18 21:20:47'),
(17, 'María García', 'maria.garcia@empresa.com', '555-0102', 'Ingeniera Civil', '2026-02-18 21:20:47'),
(18, 'Carlos López', 'carlos.lopez@empresa.com', '555-0103', 'Supervisor de Obra', '2026-02-18 21:20:47'),
(19, 'Ana Martínez', 'ana.martinez@empresa.com', '555-0104', 'Diseñadora de Interiores', '2026-02-18 21:20:47'),
(20, 'Roberto Sánchez', 'roberto.sanchez@empresa.com', '555-0105', 'Jefe de Proyecto', '2026-02-18 21:20:47'),
(21, 'Laura Torres', 'laura.torres@empresa.com', '555-0106', 'Coordinadora de Proyectos', '2026-02-18 21:20:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `prioridad` enum('baja','media','alta') NOT NULL DEFAULT 'media',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre`, `descripcion`, `fecha`, `prioridad`, `fecha_creacion`) VALUES
(29, 'Sistema de inventario', 'Desarrollo de un sistema CRUD para gestionar inventario en un taller', '2026-03-20', 'alta', '2026-03-16 12:41:20'),
(30, 'Gestión de clientes', 'Aplicación web para registrar y consultar clientes utilizando Node.js y MySQL', '2026-03-25', 'media', '2026-03-16 12:41:36'),
(31, 'Seguimiento de proyectos', 'Sistema para registrar proyectos académicos y controlar su avance', '2026-03-30', 'baja', '2026-03-16 12:41:49'),
(32, 'Proyecto 4', 'descripción', '2026-03-18', 'media', '2026-03-17 14:25:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_imagenes`
--

CREATE TABLE `proyecto_imagenes` (
  `id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `responsables`
--

CREATE TABLE `responsables` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `puesto` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','invitado','editor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`, `rol`) VALUES
(5, 'admin', 'admin123', 'admin'),
(6, 'ana', 'ana123', 'invitado'),
(9, 'paulina.solorzano', '$2b$10$.XrpBfujxL0UI5uaqWDW2erUZai06Tog9nzbgZCgfoXlNeDrwE5Ha', 'admin'),
(10, 'fernanda.leal', '$2b$10$xS9pJJgIW0Szfk8Y1AYI6OTSUybgnztmVoaXdGB7pQkwLgg4CP7b.', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyecto_imagenes`
--
ALTER TABLE `proyecto_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyecto_id` (`proyecto_id`);

--
-- Indices de la tabla `responsables`
--
ALTER TABLE `responsables`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `proyecto_imagenes`
--
ALTER TABLE `proyecto_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `responsables`
--
ALTER TABLE `responsables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `proyecto_imagenes`
--
ALTER TABLE `proyecto_imagenes`
  ADD CONSTRAINT `proyecto_imagenes_ibfk_1` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
