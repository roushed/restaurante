-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2024 a las 20:22:36
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
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergenos`
--

CREATE TABLE `alergenos` (
  `al_id` int(11) NOT NULL,
  `al_descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `alergenos`
--

INSERT INTO `alergenos` (`al_id`, `al_descripcion`) VALUES
(1, ' huevos'),
(2, ' arroz'),
(3, 'pescado'),
(4, ' pasta'),
(5, 'marisco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartas`
--

CREATE TABLE `cartas` (
  `ca_id` int(11) NOT NULL,
  `ca_nombre` varchar(40) NOT NULL,
  `ca_descripcion` varchar(250) NOT NULL,
  `ca_precioplato` float NOT NULL,
  `ca_tipoproducto` enum('primero','segundo','postre','bebida') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cartas`
--

INSERT INTO `cartas` (`ca_id`, `ca_nombre`, `ca_descripcion`, `ca_precioplato`, `ca_tipoproducto`) VALUES
(92, 'Helado de chocolate', 'Helado delicioso', 30, 'postre'),
(93, 'Pollo al Curry', 'Pollo bueno', 13, 'segundo'),
(94, 'Paella Valenciana', 'fsdfsd', 13, 'primero'),
(95, 'Spaguettis boloñesa', 'del bueno', 12, 'primero'),
(96, 'Pizza Margarita', 'estoy probando', 15, 'primero'),
(97, 'Entrecot de ternera', 'prueba numero 2', 12, 'segundo'),
(98, 'Cerveza', 'Este es un plato nuevo', 2, 'bebida'),
(99, 'Croquetas de pescado', 'Platito 8', 14, 'primero'),
(100, 'Emperador a la plancha', 'plato de 9', 18, 'segundo'),
(101, 'Tarta de manzana', 'weeee', 14, 'postre'),
(102, 'Pizza Margarita', 'de los mejores', 12, 'primero'),
(103, 'San Jacobo', 'muy bueno', 13, 'segundo'),
(104, 'Coca cola', 'fsdfsd', 3, 'bebida'),
(105, 'Chipirones al ajillo', 'deque', 35, 'segundo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartas_alergenos`
--

CREATE TABLE `cartas_alergenos` (
  `cal_id` int(11) NOT NULL,
  `cal_id_carta` int(11) NOT NULL,
  `cal_id_alergeno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cartas_alergenos`
--

INSERT INTO `cartas_alergenos` (`cal_id`, `cal_id_carta`, `cal_id_alergeno`) VALUES
(362, 97, 1),
(363, 97, 3),
(365, 99, 3),
(373, 105, 1),
(374, 105, 2),
(375, 105, 3),
(382, 103, 1),
(383, 103, 3),
(384, 101, 1),
(385, 101, 2),
(386, 101, 3),
(387, 98, 2),
(388, 104, 2),
(389, 94, 1),
(390, 94, 2),
(391, 95, 1),
(392, 100, 1),
(393, 102, 2),
(394, 102, 3),
(395, 96, 2),
(396, 96, 3),
(403, 92, 1),
(404, 92, 3),
(413, 93, 1),
(414, 93, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartas_menus`
--

CREATE TABLE `cartas_menus` (
  `cm_id` int(11) NOT NULL,
  `cm_id_cartas` int(11) NOT NULL,
  `cm_id_menus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cartas_menus`
--

INSERT INTO `cartas_menus` (`cm_id`, `cm_id_cartas`, `cm_id_menus`) VALUES
(157, 94, 39),
(161, 92, 55),
(164, 95, 58),
(167, 95, 39),
(180, 97, 39),
(189, 99, 63),
(190, 105, 63),
(191, 94, 63),
(192, 92, 63),
(193, 97, 63),
(199, 105, 58),
(200, 104, 58),
(203, 104, 55),
(204, 102, 55),
(205, 99, 55),
(206, 104, 60),
(207, 100, 60),
(221, 103, 60),
(222, 99, 69),
(223, 98, 69),
(224, 94, 69),
(225, 100, 69);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `c_nombre` varchar(20) NOT NULL,
  `c_apellidos` varchar(20) NOT NULL,
  `c_password` varchar(6) NOT NULL,
  `c_dni` varchar(11) NOT NULL,
  `c_fechanac` date NOT NULL,
  `c_email` varchar(40) NOT NULL,
  `c_telefono` varchar(11) NOT NULL,
  `c_direccion` varchar(25) NOT NULL,
  `c_rol` enum('admin','user') NOT NULL,
  `c_puntos` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`c_nombre`, `c_apellidos`, `c_password`, `c_dni`, `c_fechanac`, `c_email`, `c_telefono`, `c_direccion`, `c_rol`, `c_puntos`) VALUES
('pepe', 'gomez', '123456', '28473333P', '1996-01-12', 'admin@gmail.com', '654443234', 'fsdfsdfs', 'admin', '0'),
('Ana', 'Perez', '123456', '29212525H', '2023-01-27', 'ana@gmail.com', '654443232', 'fsff', 'user', '0'),
('Andres', 'Gomez', '123456', '29212525H', '2023-01-22', 'andres@gmail.com', '654334543', 'fdsfsd', 'user', '0'),
('Antonio', 'Gomez', '123456', '29212525H', '1960-01-15', 'antonio@gmail.com', '653448274', 'fdsfsdf', 'user', '0'),
('Josele', 'fdsfsd', '123456', '29212525H', '2023-01-21', 'josele@hotmail.com', '654443233', 'fdsfsd', 'user', '0'),
('Josue', 'Lomed', '123456', '29212525H', '1954-01-14', 'josue@hotmail.com', '654443432', 'fdsfsdf', 'user', '0'),
('kitty', 'Siret', '123456', '29212525H', '1994-04-18', 'kitty@gmail.com', '654443234', ' fsd fsdfsdf sdffs', 'user', '0'),
('Mariano', 'Perez', '123456', '29212525H', '2023-01-14', 'mariano@gmail.com', '654443234', 'fsdfsdfsd sdfsdf', 'user', '0'),
('juan', 'Gutierrez', '123456', '29212525H', '2023-01-27', 'meconio@gmail.com', '654443233', 'fsff', 'user', '0'),
('Mireia', 'Lerente', '123456', '29212525H', '1947-01-16', 'mireia@gmail.com', '657372837', 'fdsfsdf', 'user', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menus`
--

CREATE TABLE `menus` (
  `me_id` int(11) NOT NULL,
  `me_precio` float NOT NULL,
  `me_tipo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `menus`
--

INSERT INTO `menus` (`me_id`, `me_precio`, `me_tipo`) VALUES
(39, 5.03, 'Menu Happy'),
(55, 3, 'Menu Bequelair'),
(58, 12, 'Menu Holiday'),
(60, 21, 'Menu Infantil'),
(63, 70, 'Menu Oferta'),
(69, 20, 'Menu Especial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `mes_id` smallint(6) NOT NULL,
  `mes_disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`mes_id`, `mes_disponible`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `re_id` int(11) NOT NULL,
  `re_email` varchar(40) NOT NULL,
  `re_fechahora` datetime NOT NULL,
  `re_hora` time NOT NULL,
  `re_numpersonas` int(11) NOT NULL,
  `re_estado` enum('pendiente','anulado','terminado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`re_id`, `re_email`, `re_fechahora`, `re_hora`, `re_numpersonas`, `re_estado`) VALUES
(58, 'ana@gmail.com', '2024-01-24 00:00:00', '11:00:00', 9, 'anulado'),
(59, 'ana@gmail.com', '2024-01-25 00:00:00', '09:30:00', 10, 'pendiente'),
(60, 'andres@gmail.com', '2024-01-25 00:00:00', '09:30:00', 9, 'pendiente'),
(61, 'andres@gmail.com', '2024-01-25 00:00:00', '09:30:00', 4, 'pendiente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  ADD PRIMARY KEY (`al_id`);

--
-- Indices de la tabla `cartas`
--
ALTER TABLE `cartas`
  ADD PRIMARY KEY (`ca_id`);

--
-- Indices de la tabla `cartas_alergenos`
--
ALTER TABLE `cartas_alergenos`
  ADD PRIMARY KEY (`cal_id`),
  ADD KEY `cal_id_carta` (`cal_id_carta`),
  ADD KEY `cal_id_alergeno` (`cal_id_alergeno`);

--
-- Indices de la tabla `cartas_menus`
--
ALTER TABLE `cartas_menus`
  ADD PRIMARY KEY (`cm_id`),
  ADD KEY `cm_id_cartas` (`cm_id_cartas`),
  ADD KEY `cm_id_menus` (`cm_id_menus`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`c_email`);

--
-- Indices de la tabla `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`me_id`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`mes_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`re_id`),
  ADD KEY `re_email` (`re_email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  MODIFY `al_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cartas`
--
ALTER TABLE `cartas`
  MODIFY `ca_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `cartas_alergenos`
--
ALTER TABLE `cartas_alergenos`
  MODIFY `cal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=415;

--
-- AUTO_INCREMENT de la tabla `cartas_menus`
--
ALTER TABLE `cartas_menus`
  MODIFY `cm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT de la tabla `menus`
--
ALTER TABLE `menus`
  MODIFY `me_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `mes_id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `re_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cartas_alergenos`
--
ALTER TABLE `cartas_alergenos`
  ADD CONSTRAINT `ca_id_alergeno` FOREIGN KEY (`cal_id_alergeno`) REFERENCES `alergenos` (`al_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cal_id_carta` FOREIGN KEY (`cal_id_carta`) REFERENCES `cartas` (`ca_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cartas_menus`
--
ALTER TABLE `cartas_menus`
  ADD CONSTRAINT `id_carta` FOREIGN KEY (`cm_id_cartas`) REFERENCES `cartas` (`ca_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_menu` FOREIGN KEY (`cm_id_menus`) REFERENCES `menus` (`me_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `re_cli_email` FOREIGN KEY (`re_email`) REFERENCES `clientes` (`c_email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
