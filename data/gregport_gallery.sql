-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 26, 2017 at 04:17 AM
-- Server version: 5.5.51-38.2
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gregport_gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `artisans`
--

CREATE TABLE IF NOT EXISTS `artisans` (
  `idart` int(11) NOT NULL,
  `fullname` varchar(525) NOT NULL,
  `short` varchar(2000) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(525) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artisans`
--

INSERT INTO `artisans` (`idart`, `fullname`, `short`, `description`, `picture`, `email`) VALUES
(1, 'Gregory', 'dfffff', 'hhhhhhhh hhhhhh', '29.jpg', 'gregpiev@gmail.com'),
(2, 'Anita', 'aaaaaa', 'fffffffffffffffff fffffffffff fffffffffff', '29.jpg', 'gregpiev@gmail.com'),
(4, 'tttttttt', 'yyyyyyyyy', '', NULL, 'gregpiev@gmail.com'),
(6, 'Shy', 'tttt', '', NULL, 'gregpiev@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `idpage` int(11) NOT NULL,
  `topic` varchar(2000) NOT NULL,
  `content` text NOT NULL,
  `picture` varchar(525) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`idpage`, `topic`, `content`, `picture`) VALUES
(1, 'List of registered', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br>Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus  PageMaker including versions of Lorem Ipsum.', '29.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artisans`
--
ALTER TABLE `artisans`
  ADD PRIMARY KEY (`idart`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`idpage`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artisans`
--
ALTER TABLE `artisans`
  MODIFY `idart` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `idpage` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
