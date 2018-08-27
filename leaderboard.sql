-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2017 at 07:10 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leaderboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `entry`
--

CREATE TABLE `entry` (
  `entryID` int(10) UNSIGNED NOT NULL,
  `player1` varchar(30) DEFAULT NULL,
  `player2` varchar(30) DEFAULT NULL,
  `date` varchar(60) DEFAULT NULL,
  `winner` varchar(30) DEFAULT NULL,
  `score` int(15) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `entry`
--

INSERT INTO `entry` (`entryID`, `player1`, `player2`, `date`, `winner`, `score`) VALUES
(19, 'Checkers', 'Chess', '2017/7/17/11:49', 'Checkers', 100),
(2, 'OSbjorn', 'JAmJAm', '2017/7/17/11:21', 'OSbjorn', 100),
(3, 'Ozzy', 'Jam', '2017/7/17/11:27', 'Ozzy', 100),
(4, 'Taliban', 'US', '2017/7/17/11:28', 'Taliban', 500),
(5, 'White', 'Black', '2017/7/17/11:30', 'White', 100),
(6, 'Osbjorn', 'Jam', '2017/7/17/11:31', 'Osbjorn', 100),
(7, 'Osbjorn', 'Osbjorn2', '2017/7/17/11:32', 'Osbjorn', 100),
(8, 'Ozzy', 'Unary', '2017/7/17/11:32', 'Ozzy', 700),
(9, 'Osbjorn', 'Erik', '2017/7/17/11:33', 'Osbjorn', 100),
(10, 'Osbjorn', 'Erik', '2017/7/17/11:33', 'Osbjorn', 1000),
(11, 'Erik', 'Bjorn', '2017/7/17/11:35', 'Erik', 100),
(12, 'Osbjron', 'Hammer', '2017/7/17/11:36', 'Osbjron', 100),
(13, 'n', 'm', '2017/7/17/11:38', 'n', 100),
(14, 'g', 'f', '2017/7/17/11:41', 'g', 100),
(15, 'Osbjorn', 'june', '2017/7/17/11:42', 'Osbjorn', 100),
(16, 'ew', 'ee', '2017/7/17/11:43', 'ew', 100),
(17, 'Erik', 'Uncle', '2017/7/17/11:44', 'Erik', 100),
(18, 'Osbjron', 'Issac', '2017/7/17/11:44', 'Osbjron', 100),
(20, 'First Place', 'Tester', '2017/7/17/11:52', 'First Place', 100),
(21, '1', '2', '2017/7/17/11:53', '1', 100),
(22, 'iSSAC', 'hAM', '2017/7/17/11:54', 'iSSAC', 100),
(23, 'test', 'kingly', '2017/7/17/11:55', 'test', 100),
(24, 'test', 'kingly', '2017/7/17/11:55', 'test', 100),
(25, 'Done', 'fisrtup', '2017/7/17/12:05', 'Done', 800);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entry`
--
ALTER TABLE `entry`
  ADD PRIMARY KEY (`entryID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entry`
--
ALTER TABLE `entry`
  MODIFY `entryID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
