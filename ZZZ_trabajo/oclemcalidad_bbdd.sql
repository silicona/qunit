-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-06-2018 a las 11:53:51
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `oclemcalidad_bbdd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cld_clientes`
--

CREATE TABLE `cld_clientes` (
  `id_cliente` int(11) NOT NULL,
  `empresa` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `cif` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nombre_responsable` varchar(255) NOT NULL,
  `email_lopd` varchar(50) NOT NULL,
  `sector` varchar(1) NOT NULL,
  `descripcion` text NOT NULL,
  `f_alta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` int(1) NOT NULL DEFAULT '1',
  `lopd` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cld_clientes`
--

INSERT INTO `cld_clientes` (`id_cliente`, `empresa`, `direccion`, `localidad`, `cp`, `telefono`, `cif`, `email`, `nombre_responsable`, `email_lopd`, `sector`, `descripcion`, `f_alta`, `activo`, `lopd`) VALUES
(1, 'miempresa', 'mi calle, 12', 'madrid', '28011', '666666666', '12345678Q', 'miemail@empresa.com', '', 'miemail_lopd@empresa.com', '1', '', '2018-06-10 00:03:30', 1, '1'),
(2, 'Empresa test', '', '', '', '', '', '', '', '', '', '', '2018-06-11 01:59:47', 1, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cld_lopd`
--

CREATE TABLE `cld_lopd` (
  `id_lopd` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `estru_electronica` varchar(10) NOT NULL,
  `estru_fisica` varchar(10) NOT NULL,
  `estru_acceso_digital` varchar(10) NOT NULL,
  `estru_acceso_fisico` varchar(10) NOT NULL,
  `estru_imagenes` varchar(1) NOT NULL,
  `estru_borrado` varchar(1) NOT NULL,
  `estru_propio` varchar(1) NOT NULL,
  `estru_servidores` varchar(10) NOT NULL,
  `estru_discos` varchar(10) NOT NULL,
  `estru_pendrives` varchar(10) NOT NULL,
  `estru_ordenadores` varchar(10) NOT NULL,
  `estru_mantenimiento` varchar(1) NOT NULL,
  `estru_backup` varchar(1) NOT NULL,
  `clientes_sino` varchar(1) NOT NULL,
  `clientes_identificacion` varchar(10) NOT NULL,
  `clientes_caracteristicas` varchar(10) NOT NULL,
  `clientes_academicos` varchar(10) NOT NULL,
  `clientes_bancarios` varchar(10) NOT NULL,
  `clientes_servicio` varchar(10) NOT NULL,
  `clientes_facturar` varchar(10) NOT NULL,
  `clientes_publicidad` varchar(10) NOT NULL,
  `clientes_post` varchar(10) NOT NULL,
  `clientes_tributaria` varchar(10) NOT NULL,
  `clientes_ss` varchar(10) NOT NULL,
  `clientes_bancos` varchar(10) NOT NULL,
  `clientes_seguridad` varchar(10) NOT NULL,
  `clientes_gestoria` varchar(10) NOT NULL,
  `clientes_otros` varchar(10) NOT NULL,
  `futuros_sino` varchar(10) NOT NULL,
  `futuros_identificacion` varchar(10) NOT NULL,
  `futuros_caracteristicas` varchar(10) NOT NULL,
  `futuros_academicos` varchar(10) NOT NULL,
  `futuros_propio` varchar(10) NOT NULL,
  `futuros_tercera` varchar(10) NOT NULL,
  `futuros_agencia` varchar(10) NOT NULL,
  `futuros_imprenta` varchar(10) NOT NULL,
  `futuros_exclusivo` varchar(10) NOT NULL,
  `empleados_sino` varchar(1) NOT NULL,
  `empleados_identificacion` varchar(10) NOT NULL,
  `empleados_caracteristicas` varchar(10) NOT NULL,
  `empleados_academicos` varchar(10) NOT NULL,
  `empleados_profesion` varchar(10) NOT NULL,
  `empleados_bancos` varchar(10) NOT NULL,
  `empleados_nomina` varchar(10) NOT NULL,
  `empleados_formacion` varchar(10) NOT NULL,
  `empleados_relacion` varchar(10) NOT NULL,
  `empleados_propio` varchar(10) NOT NULL,
  `empleados_tercera` varchar(10) NOT NULL,
  `empleados_gestion` varchar(1) NOT NULL,
  `empleados_mutua` varchar(1) NOT NULL,
  `empleados_formar` varchar(1) NOT NULL,
  `empleados_prevencion` varchar(1) NOT NULL,
  `candidatos_sino` varchar(1) NOT NULL,
  `candidatos_identificacion` varchar(10) NOT NULL,
  `candidatos_caracteristicas` varchar(10) NOT NULL,
  `candidatos_academicos` varchar(10) NOT NULL,
  `candidatos_profesion` varchar(10) NOT NULL,
  `candidatos_curriculum` varchar(10) NOT NULL,
  `candidatos_web` varchar(10) NOT NULL,
  `candidatos_form` varchar(10) NOT NULL,
  `candidatos_borrado` varchar(1) NOT NULL,
  `proveedores_sino` varchar(1) NOT NULL,
  `proveedores_identificacion` varchar(10) NOT NULL,
  `proveedores_bancos` varchar(10) NOT NULL,
  `proveedores_factura` varchar(10) NOT NULL,
  `proveedores_pedido` varchar(10) NOT NULL,
  `f_lopd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cld_usuarios`
--

CREATE TABLE `cld_usuarios` (
  `id_usuario` int(100) NOT NULL,
  `id_cliente` int(100) NOT NULL,
  `id_perfil` int(2) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `login` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `cal_ad` int(1) NOT NULL,
  `cal_tecnico` int(1) NOT NULL,
  `cal_cliente` int(1) NOT NULL,
  `valores_local` varchar(255) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cld_usuarios`
--

INSERT INTO `cld_usuarios` (`id_usuario`, `id_cliente`, `id_perfil`, `nombre`, `login`, `password`, `hash`, `cal_ad`, `cal_tecnico`, `cal_cliente`, `valores_local`, `activo`) VALUES
(1, 1, 1, 'Admin', 'admin', '1234', '$2a$08$FEQ9IGDX4gVE3m9Bk1EOc.xXEfkA39T5SI5i9DRiJETbNm6ssnysW', 1, 0, 0, '', 1),
(2, 1, 2, 'Técnico', 'tecnico', '1234', '', 0, 1, 0, '', 1),
(3, 1, 3, 'Cliente', 'cliente', '1234', '$2a$08$Lugi4DjGeUQjFo.9fncM0eqo6tKeMsjtkfn/83XpR8uRjuT5onIr2', 0, 0, 1, '', 1),
(4, 2, 3, 'Cliente2', 'cliente2', '1234', '', 0, 0, 1, '', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cld_clientes`
--
ALTER TABLE `cld_clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `cld_lopd`
--
ALTER TABLE `cld_lopd`
  ADD PRIMARY KEY (`id_lopd`);

--
-- Indices de la tabla `cld_usuarios`
--
ALTER TABLE `cld_usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cld_clientes`
--
ALTER TABLE `cld_clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `cld_lopd`
--
ALTER TABLE `cld_lopd`
  MODIFY `id_lopd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cld_usuarios`
--
ALTER TABLE `cld_usuarios`
  MODIFY `id_usuario` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
