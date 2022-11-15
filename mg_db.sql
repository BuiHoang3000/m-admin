-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2022 at 09:28 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mg_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(20) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `pid` varchar(20) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `useYn` varchar(5) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `deleted` varchar(5) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `pid`, `name`, `useYn`, `deleted`) VALUES
('a1', NULL, 'Category 1', 'Y', 'N'),
('a11', 'a1', 'Category 1-1', 'Y', 'N'),
('a12', 'a1', 'Category 1-2', 'N', 'N'),
('a2', NULL, 'Category 2', 'Y', 'N'),
('a22', 'a2', 'Category 2-2', 'Y', 'Y'),
('a23', 'a2', 'Category 2-3', 'N', 'N'),
('a24', 'a2', 'Category 2-4', 'N', 'N'),
('a241', 'a24', 'Category 2-4-1', 'N', 'N');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
