-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 11-06-2018 a las 05:24:11
-- Versión del servidor: 5.7.22-0ubuntu0.16.04.1
-- Versión de PHP: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(14, 'Empresa test', '', '', '', '', '', '', '', '', '', '', '2018-06-11 01:59:47', 1, '0');

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

--
-- Volcado de datos para la tabla `cld_lopd`
--

INSERT INTO `cld_lopd` (`id_lopd`, `id_cliente`, `estru_electronica`, `estru_fisica`, `estru_acceso_digital`, `estru_acceso_fisico`, `estru_imagenes`, `estru_borrado`, `estru_propio`, `estru_servidores`, `estru_discos`, `estru_pendrives`, `estru_ordenadores`, `estru_mantenimiento`, `estru_backup`, `clientes_sino`, `clientes_identificacion`, `clientes_caracteristicas`, `clientes_academicos`, `clientes_bancarios`, `clientes_servicio`, `clientes_facturar`, `clientes_publicidad`, `clientes_post`, `clientes_tributaria`, `clientes_ss`, `clientes_bancos`, `clientes_seguridad`, `clientes_gestoria`, `clientes_otros`, `futuros_sino`, `futuros_identificacion`, `futuros_caracteristicas`, `futuros_academicos`, `futuros_propio`, `futuros_tercera`, `futuros_agencia`, `futuros_imprenta`, `futuros_exclusivo`, `empleados_sino`, `empleados_identificacion`, `empleados_caracteristicas`, `empleados_academicos`, `empleados_profesion`, `empleados_bancos`, `empleados_nomina`, `empleados_formacion`, `empleados_relacion`, `empleados_propio`, `empleados_tercera`, `empleados_gestion`, `empleados_mutua`, `empleados_formar`, `empleados_prevencion`, `candidatos_sino`, `candidatos_identificacion`, `candidatos_caracteristicas`, `candidatos_academicos`, `candidatos_profesion`, `candidatos_curriculum`, `candidatos_web`, `candidatos_form`, `candidatos_borrado`, `proveedores_sino`, `proveedores_identificacion`, `proveedores_bancos`, `proveedores_factura`, `proveedores_pedido`, `f_lopd`) VALUES
(1, 13, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:02:35'),
(2, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:02:35'),
(3, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:03:38'),
(4, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:13:13'),
(5, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:21:15'),
(6, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:21:34'),
(7, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:22:45'),
(8, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:24:42'),
(9, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:26:37'),
(10, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 16:36:31'),
(11, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:43:18'),
(12, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:43:57'),
(13, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:46:38'),
(14, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:47:10'),
(15, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:49:30'),
(16, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:50:50'),
(17, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:51:37'),
(18, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:52:11'),
(19, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:53:20'),
(20, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:54:04'),
(21, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:54:28'),
(22, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:56:11'),
(23, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:57:26'),
(24, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:58:03'),
(25, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:59:04'),
(26, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 17:59:37'),
(27, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:00:22'),
(28, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:02:05'),
(29, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:02:52'),
(30, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:04:23'),
(31, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:07:10'),
(32, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:08:02'),
(33, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:10:28'),
(34, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:11:00'),
(35, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:12:27'),
(36, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:17:47'),
(37, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:21:59'),
(38, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:22:52'),
(39, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:23:27'),
(40, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:24:16'),
(41, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:24:32'),
(42, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:24:58'),
(43, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:25:13'),
(44, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:25:49'),
(45, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:28:41'),
(46, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:29:24'),
(47, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 18:32:35'),
(48, 1, 'checked', 'checked', 'checked', 'checked', '1', '0', '1', '0', '0', '0', '0', '0', '0', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', '1', '1', '1', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', 'checked', '2', '1', 'checked', 'checked', 'checked', 'checked', '2018-06-10 19:10:53');

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
(1, 1, 1, 'Admin', 'admin', '1234', '$2a$08$c/0G0uWxxMk8..kYGkN1OON7bs8yx85c4rhVRsWPXmdYscsT6hlNm', 1, 0, 0, '', 1),
(2, 1, 2, 'Técnico', 'tecnico', '1234', '', 0, 1, 0, '', 1),
(3, 1, 3, 'Cliente', 'cliente', '1234', '$2a$08$Lugi4DjGeUQjFo.9fncM0eqo6tKeMsjtkfn/83XpR8uRjuT5onIr2', 0, 0, 1, '', 1);

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
  MODIFY `id_lopd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT de la tabla `cld_usuarios`
--
ALTER TABLE `cld_usuarios`
  MODIFY `id_usuario` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
