-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-08-2022 a las 06:36:58
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gasistencias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumnos` int(20) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumnos`, `nombre`, `apellido`, `usuario`, `password`, `rol`) VALUES
(11, 'Hernan', 'Torres', 'ht@yahoo.com', '$2a$10$E01cJ7S7kExcRdMTg6aVMOJSmfiPmoL9os0JOzvYYFyXZp65yiENu', ''),
(12, 'Raul', 'Zam', 'RZ@gmail.com', '$2a$10$AN3dgU7FIVVET3KK0L5Io.VHOFxG1MXXLK25.oHUrciDsYae3CLYy', ''),
(14, 'tttttt', 'rrrrr', 'qw@qw', '$2a$10$vYn09amQH3kgqisYjynR2OD9uWIIZArMiZICl8W3PLYgrxTdIsI5.', 'alumno'),
(15, 'Malco', 'Grosso', 'malco@gmail.com', '$2a$10$UzbwhkwVK1ht2KRybncrOezEZCW5gR2DKhXeQ5Iq5l/N/KvKwabLi', 'alumno'),
(16, 'German', 'Ger', 'Ger@hotmail.com', '$2a$10$V55KAlVDJ6OqtSE3IZKPCeH6bl0nS9YJSxB71vLCUehIZ3nG6B6py', 'alumno'),
(17, 'b', 'b', 'b@b.com', '$2a$10$82OGQ1wagdsAvNjkMg7DjeEyfA6AnmJ0sk0S0aIW3xkgImeoQ931u', 'alumno'),
(18, 'c', 'c', 'c@c.com', '$2a$10$L1a0gDNjdETIJ1.E5tYckuHcvUleT9QqwZwjgER1whG6t3q9w033u', 'alumno'),
(19, 'd', 'd', 'd@d.com', '$2a$10$aN1ck4gVWwL6RagRC3PueOp..tY1KPBtCZSTopNR4IBeyMmXIHV9S', 'alumno'),
(20, 'e', 'e', 'e@e.com', '$2a$10$AJOPPLRnOA3A6sVHpTX0mOWHRKEYEhdKL.Rtd7iGV/aTFLc3.fQae', 'alumno'),
(21, 'f', 'f', 'f@f.com', '$2a$10$b46ZGtcXKmC6yl9DgKjAAuBbjg1DnzrD67wEqMUu5ucO32Z6QVER.', 'alumno'),
(22, 'g', 'g', 'g@g.com', '$2a$10$DXtA/XRmeXav3fR0.obsuuv.6yS1WD/kt9fOM7m2yr74p/VMV97a.', 'alumno'),
(23, 'h', 'h', 'h@h.com', '$2a$10$mOAYnD2hfL9r3ojvqr4m1eF1WwOstq14cU1j/hfSPTwXlay/zpRIa', 'alumno'),
(24, 'i', 'i', 'i@i.com', '$2a$10$qhH/CSBSk9f3/UWB4j3nBeHJH9vG6.hrXAMmY3Gu1Pr4EqOUsxF9O', 'alumno'),
(25, 'j', 'j', 'j@j.com', '$2a$10$MUkjJgkvMuhh5f5/UxFX/edxu/lKtJIPqMhYuIK/sL7IB7TD1g9fu', 'alumno'),
(26, 'k', 'k', 'k@k.com', '$2a$10$x1lOGpsX5pYIgxvTq0NwJuRQ8kkODlmRGZRDulRFXQUCx8LI9TMkK', 'alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `idAsistencia` int(20) NOT NULL,
  `alumID` int(20) NOT NULL,
  `horID` int(20) NOT NULL,
  `mateID` int(20) DEFAULT NULL,
  `presente` tinyint(1) NOT NULL,
  `fecha` date DEFAULT current_timestamp(),
  `hora` time NOT NULL DEFAULT current_timestamp(),
  `dictado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`idAsistencia`, `alumID`, `horID`, `mateID`, `presente`, `fecha`, `hora`, `dictado`) VALUES
(126, 15, 8, NULL, 1, '2022-07-19', '12:39:48', NULL),
(127, 15, 7, NULL, 1, '2022-07-19', '12:50:39', NULL),
(129, 15, 8, NULL, 1, '2022-07-18', '12:32:41', NULL),
(132, 15, 8, NULL, 1, '2022-07-21', '12:39:48', NULL),
(134, 18, 8, NULL, 0, '2022-07-18', '12:39:48', NULL),
(299, 15, 8, NULL, 0, '2022-07-28', '17:05:22', 1),
(300, 11, 8, NULL, 0, '2022-07-26', '01:04:00', 1),
(301, 17, 8, NULL, 0, '2022-07-26', '01:04:00', 1),
(302, 21, 8, NULL, 0, '2022-07-26', '01:04:00', 1),
(303, 22, 8, NULL, 0, '2022-07-26', '01:04:00', 1),
(304, 23, 8, NULL, 0, '2022-07-26', '06:40:00', 1),
(305, 24, 8, NULL, 0, '2022-07-28', '01:04:00', 1),
(306, 25, 8, NULL, 0, '2022-07-26', '01:04:00', 1),
(307, 17, 10, NULL, 0, '2022-07-26', '01:04:00', 1),
(308, 21, 10, NULL, 0, '2022-07-26', '01:04:00', 1),
(309, 22, 10, NULL, 0, '2022-07-26', '01:04:00', 1),
(310, 23, 10, NULL, 0, '2022-07-26', '01:04:00', 1),
(311, 26, 10, NULL, 0, '2022-07-26', '01:04:00', 1),
(331, 15, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(332, 11, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(333, 18, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(334, 17, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(335, 20, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(336, 21, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(337, 22, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(338, 23, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(339, 24, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(340, 25, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(341, 26, 7, NULL, 0, '2022-07-29', '01:00:00', 1),
(342, 15, 9, NULL, 0, '2022-07-29', '01:00:00', 1),
(343, 19, 9, NULL, 0, '2022-07-29', '01:00:00', 1),
(344, 21, 9, NULL, 0, '2022-07-29', '01:00:00', 1),
(345, 18, 11, NULL, 0, '2022-07-29', '01:00:00', 1),
(346, 17, 11, NULL, 0, '2022-07-29', '01:00:00', 1),
(347, 19, 11, NULL, 0, '2022-07-29', '01:00:00', 1),
(348, 21, 11, NULL, 0, '2022-07-29', '01:00:00', 1),
(349, 26, 11, NULL, 0, '2022-07-29', '01:00:00', 1),
(377, 15, 7, NULL, 1, '2022-08-01', '12:51:55', 1),
(378, 11, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(380, 17, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(381, 20, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(382, 21, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(383, 22, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(384, 23, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(385, 24, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(387, 26, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(390, 17, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(391, 21, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(392, 22, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(395, 25, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(397, 19, 9, NULL, 1, '2022-08-01', '15:37:36', 1),
(399, 18, 11, NULL, 0, '2022-08-01', '11:20:00', 1),
(402, 21, 11, NULL, 0, '2022-08-01', '11:20:00', 1),
(406, 18, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(408, 20, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(413, 25, 7, NULL, 0, '2022-08-01', '11:20:00', 1),
(415, 15, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(416, 11, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(420, 23, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(421, 24, 8, NULL, 0, '2022-08-01', '11:20:00', 1),
(423, 15, 9, NULL, 1, '2022-08-01', '15:35:51', 1),
(425, 21, 9, NULL, 0, '2022-08-01', '11:20:00', 1),
(427, 17, 11, NULL, 0, '2022-08-01', '11:20:00', 1),
(428, 19, 11, NULL, 0, '2022-08-01', '11:20:00', 1),
(430, 26, 11, NULL, 0, '2022-08-01', '11:20:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordinadores`
--

CREATE TABLE `coordinadores` (
  `idCoor` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coordinadores`
--

INSERT INTO `coordinadores` (`idCoor`, `nombre`, `apellido`, `usuario`, `password`, `rol`) VALUES
(7, 'alejo', 'sosa', 'alejoSosa@gmail.com', '$2a$10$zSqjuXpIaFHlAiGqrks1m..NnL/IJ5Mi9pnT/lXjdBjTjBBNP4H3u', 'coordinador'),
(8, 'Pipi', 'pepe', 'pipi@gmail.com', '$2a$10$/BZIYtvRwYcZZwP34kzR5eTut440VqOpqG.bKpO5MV3aRnDSjAPfS', 'coordinador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `idHorarios` int(20) NOT NULL,
  `materiasID` int(20) NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFin` time NOT NULL,
  `horaInicioAlt` time DEFAULT NULL,
  `horaFinAlt` time DEFAULT NULL,
  `lunes` varchar(20) DEFAULT NULL,
  `martes` varchar(20) DEFAULT NULL,
  `miercoles` varchar(20) DEFAULT NULL,
  `jueves` varchar(20) DEFAULT NULL,
  `viernes` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`idHorarios`, `materiasID`, `horaInicio`, `horaFin`, `horaInicioAlt`, `horaFinAlt`, `lunes`, `martes`, `miercoles`, `jueves`, `viernes`) VALUES
(7, 4, '12:50:00', '15:20:00', NULL, NULL, 'Lunes', NULL, 'Miercoles', NULL, 'Viernes'),
(8, 6, '12:30:00', '16:00:00', NULL, NULL, 'Lunes', 'Martes', NULL, 'Jueves', NULL),
(9, 9, '15:29:00', '18:00:00', NULL, NULL, 'Lunes', NULL, 'Miercoles', NULL, 'Viernes'),
(10, 11, '16:00:00', '20:00:00', NULL, NULL, NULL, 'Martes', 'Miercoles', 'Jueves', NULL),
(11, 13, '10:00:00', '13:00:00', NULL, NULL, 'Lunes', NULL, NULL, 'Jueves', 'Viernes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `idInscrip` int(20) NOT NULL,
  `alumnos_id` int(20) NOT NULL,
  `profesores_id` int(20) NOT NULL,
  `materias_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`idInscrip`, `alumnos_id`, `profesores_id`, `materias_id`) VALUES
(12, 15, 6, 6),
(15, 15, 5, 4),
(17, 11, 5, 4),
(18, 11, 6, 6),
(501, 15, 1, 9),
(502, 18, 7, 13),
(503, 18, 5, 4),
(504, 17, 1, 11),
(505, 17, 6, 6),
(506, 17, 5, 4),
(507, 17, 7, 13),
(508, 19, 1, 9),
(509, 19, 7, 13),
(510, 20, 5, 4),
(511, 21, 1, 9),
(512, 21, 1, 11),
(513, 21, 5, 4),
(514, 21, 6, 6),
(515, 21, 7, 13),
(516, 22, 1, 11),
(517, 22, 5, 4),
(518, 22, 6, 6),
(519, 23, 5, 4),
(520, 23, 1, 11),
(521, 23, 6, 6),
(522, 24, 6, 6),
(523, 24, 5, 4),
(524, 25, 5, 4),
(525, 25, 6, 6),
(526, 26, 1, 11),
(527, 26, 5, 4),
(528, 26, 7, 13),
(529, 15, 1, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMaterias` int(20) NOT NULL,
  `profeCargo` int(20) DEFAULT NULL,
  `nombreMateria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMaterias`, `profeCargo`, `nombreMateria`) VALUES
(4, 5, 'Matematica'),
(6, 6, 'Lengua'),
(9, 1, 'Laboratorio 2'),
(11, 1, 'Laboratorio 1'),
(12, 7, 'Web 1'),
(13, 7, 'Web 2'),
(14, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `idProfesores` int(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`idProfesores`, `nombre`, `apellido`, `usuario`, `password`, `rol`) VALUES
(1, 'Pedro', 'Blanco', 'peblanco@hotmail.com', '$2a$10$BB9M9KqlQHrNb2GY48jNjecWJthwbIMYEGrM9xeVVDNOrsQgcXDla', 'profesor'),
(4, 'Daniel', 'Perez', 'huehuehue@huehuehue.com', '$2a$10$dHAePgGmrZ2B7x6R1.2NZu8CL97pp1ECtSTG9qDIX2nIKL/QeP6U2', 'profesor'),
(5, 'Julian', 'Funes', 'jp@hotmail.com', '$2a$10$2YJey6huxqGETqahRtktMO7s9yyUMDUXmoybRQtD4M/LR6pCG/Wl6', 'profesor'),
(6, 'Sebastian', 'Gomez', 'asdasd@asdas.com', '$2a$10$lgqU/RDpqXxHKIuajJASOuFOVmcUT8q2k3Nf.Qi.HHxVkoJE1Z.m6', 'profesor'),
(7, 'Susana', 'Lummens', 'susanaL@gmail.com', '$2a$10$P1vGgo99bf15hZ0ylzx3BuIL/GR5Jz0AMZsApttrZbkhb0OS07pom', 'profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('4FumtpROJNRx6b-m4EOVLvon4QljqJlN', 1659976422, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('L2B6fx0nuJeMD6y7FDZvyptloCrOUfEO', 1660007869, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}'),
('TS1bwvNNKhlAq0AbkQ6kLn6XLBTNoM6K', 1660006254, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1}}');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumnos`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`idAsistencia`),
  ADD UNIQUE KEY `mateID` (`mateID`),
  ADD KEY `alumID` (`alumID`) USING BTREE,
  ADD KEY `horID` (`horID`) USING BTREE;

--
-- Indices de la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  ADD PRIMARY KEY (`idCoor`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`idHorarios`),
  ADD UNIQUE KEY `materiasID` (`materiasID`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`idInscrip`),
  ADD KEY `alumnos_id` (`alumnos_id`) USING BTREE,
  ADD KEY `profesores_id` (`profesores_id`) USING BTREE,
  ADD KEY `materias_id` (`materias_id`) USING BTREE;

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMaterias`),
  ADD KEY `profeCargo` (`profeCargo`) USING BTREE;

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`idProfesores`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumnos` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `idAsistencia` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=431;

--
-- AUTO_INCREMENT de la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  MODIFY `idCoor` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `idHorarios` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `idInscrip` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=530;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `idMaterias` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `idProfesores` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`alumID`) REFERENCES `inscripciones` (`alumnos_id`),
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`horID`) REFERENCES `horarios` (`idHorarios`),
  ADD CONSTRAINT `asistencias_ibfk_3` FOREIGN KEY (`mateID`) REFERENCES `horarios` (`materiasID`);

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`materiasID`) REFERENCES `materias` (`idMaterias`);

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`alumnos_id`) REFERENCES `alumnos` (`idAlumnos`),
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`materias_id`) REFERENCES `materias` (`idMaterias`),
  ADD CONSTRAINT `inscripciones_ibfk_3` FOREIGN KEY (`profesores_id`) REFERENCES `materias` (`profeCargo`);

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `materias_ibfk_1` FOREIGN KEY (`profeCargo`) REFERENCES `profesores` (`idProfesores`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
