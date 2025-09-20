--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category VALUES (1, 'Cameras');
INSERT INTO public.category VALUES (2, 'Cell Phones');
INSERT INTO public.category VALUES (3, 'Gaming');
INSERT INTO public.category VALUES (4, 'HeadPhone');
INSERT INTO public.category VALUES (5, 'Ipad');
INSERT INTO public.category VALUES (6, 'Storage, USB');


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (126, 'quannguyen1', 'hoangquan02072002@gmail.com', '$2b$10$RTp/plH6hNHd1xIG/lAzL.BEAn7p12LOkMap5BTA6XNePYQwg.mMe', 'admin', '2025-04-20 16:10:40.351', '2025-04-20 16:10:40.431513', true, NULL, NULL);
INSERT INTO public."user" VALUES (166, 'nguyen le', 'nguyenlehoangquan02072002@gmail.com', '$2b$10$0V9JbnLm90u/UzfhfXHMfey1aPfbMVmsAEEFMaZyZVGIcog7Km.3.', 'user', '2025-06-20 18:34:09.187', '2025-06-20 18:34:09.260613', true, NULL, NULL);


--
-- Data for Name: chat_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.chat_message VALUES (59, 'hello ', 'room_123', 126, '2025-06-20 18:36:18.387961', false, 166);
INSERT INTO public.chat_message VALUES (60, 'how are you?', 'room_123', 166, '2025-06-20 18:36:28.993723', false, 126);
INSERT INTO public.chat_message VALUES (61, 'test app', 'room_123', 126, '2025-06-20 18:36:35.185449', false, 166);
INSERT INTO public.chat_message VALUES (62, 'test app', 'room_123', 166, '2025-06-20 18:36:42.465513', false, 126);


--
-- Data for Name: device; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.device VALUES (99, 'Desktop', 'Chrome', '45.149.184.192', '2025-06-20 18:31:52.111', 126, '3eb5c1d97838713c1b9286916b950ab9', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0', 'Birmingham, GB');
INSERT INTO public.device VALUES (134, 'Desktop', 'Chrome', '45.149.184.192', '2025-06-20 18:34:15.201', 166, '3eb5c1d97838713c1b9286916b950ab9', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0', 'Birmingham, England, GB');
INSERT INTO public.device VALUES (137, 'Unknown Device', 'Unknown Browser', '0.0.0.0', '2025-09-07 09:48:48.675', 166, '54d4d05d0e998819c27cb4a23747cbe6', 'Unknown User Agent', 'Unknown Location');
INSERT INTO public.device VALUES (98, 'Desktop', 'Chrome', '45.149.184.192', '2025-06-18 03:28:12.311', 126, 'f86e6c5a84fd759668295db947a52313', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'Birmingham, GB');
INSERT INTO public.device VALUES (135, 'Unknown Device', 'Unknown Browser', '0.0.0.0', '2025-09-07 13:09:49.942', 126, '3fc63ba05804063acda12769dc8e1a8c', 'Unknown User Agent', 'Unknown Location');
INSERT INTO public.device VALUES (136, 'Unknown Device', 'Unknown Browser', '0.0.0.0', '2025-09-07 13:48:03.033', 166, '3fc63ba05804063acda12769dc8e1a8c', 'Unknown User Agent', 'Unknown Location');


--
-- Data for Name: mfa_otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mfa_otp VALUES (352, 'nguyenlehoangquan02072002@gmail.com', '17d2ca', '2025-05-14 15:48:19.944', '2025-05-14 15:38:19.94616', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (353, 'nguyenlehoangquan02072002@gmail.com', '9ffc89', '2025-05-14 15:53:38.76', '2025-05-14 15:43:38.763719', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (354, 'nguyenlehoangquan02072002@gmail.com', '418152', '2025-05-23 20:44:09.694', '2025-05-23 20:34:09.69783', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (355, 'nguyenlehoangquan02072002@gmail.com', '17a027', '2025-05-23 20:45:04.218', '2025-05-23 20:35:04.218651', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (356, 'hoangquan02072002@gmail.com', '35c675', '2025-05-24 02:09:27.834', '2025-05-24 01:59:27.846675', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (357, 'nguyenlehoangquan02072002@gmail.com', 'aa1748', '2025-05-25 02:53:15.614', '2025-05-25 02:43:15.623279', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (358, 'nguyenlehoangquan02072002@gmail.com', '203885', '2025-06-07 14:22:03.603', '2025-06-07 14:12:03.605899', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (359, 'nguyenlehoangquan02072002@gmail.com', '24c163', '2025-06-16 14:47:48.017', '2025-06-16 14:37:48.021058', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (360, 'nguyenlehoangquan02072002@gmail.com', '50ef8a', '2025-06-16 14:57:43.977', '2025-06-16 14:47:43.981379', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (361, 'nguyenlehoangquan02072002@gmail.com', 'ec3b94', '2025-06-16 14:59:14.222', '2025-06-16 14:49:14.222542', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (362, 'nguyenlehoangquan02072002@gmail.com', '940fb8', '2025-06-16 15:01:19.59', '2025-06-16 14:51:19.59188', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (363, 'nguyenlehoangquan02072002@gmail.com', '79189c', '2025-06-16 15:22:36.587', '2025-06-16 15:12:36.590342', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (364, 'nguyenlehoangquan02072002@gmail.com', '6b3c7b', '2025-06-16 15:22:41.699', '2025-06-16 15:12:41.699748', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (365, 'nguyenlehoangquan02072002@gmail.com', '84de25', '2025-06-16 15:24:26.271', '2025-06-16 15:14:26.27546', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (366, 'nguyenlehoangquan02072002@gmail.com', '19838c', '2025-06-16 15:27:30.073', '2025-06-16 15:17:30.074092', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (367, 'nguyenlehoangquan02072002@gmail.com', 'cd12a4', '2025-06-16 15:27:32.107', '2025-06-16 15:17:32.108193', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (368, 'hoangquan02072002@gmail.com', 'dca049', '2025-06-18 02:54:41.948', '2025-06-18 02:44:41.951252', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (369, 'hoangquan02072002@gmail.com', 'b7f374', '2025-06-18 03:01:13.709', '2025-06-18 02:51:13.710491', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (370, 'nguyenlehoangquan02072002@gmail.com', '1224eb', '2025-06-20 15:07:45.129', '2025-06-20 14:57:45.131381', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (371, 'nguyenlehoangquan02072002@gmail.com', '27e242', '2025-06-20 15:07:48.248', '2025-06-20 14:57:48.248378', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (372, 'nguyenlehoangquan02072002@gmail.com', 'f94f09', '2025-06-20 15:08:22.093', '2025-06-20 14:58:22.093569', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (373, 'nguyenlehoangquan02072002@gmail.com', 'cc2df9', '2025-06-20 15:10:25.903', '2025-06-20 15:00:25.904366', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (374, 'nguyenlehoangquan02072002@gmail.com', '328f68', '2025-06-20 15:11:06.773', '2025-06-20 15:01:06.774307', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (375, 'nguyenlehoangquan02072002@gmail.com', '01b7ab', '2025-06-20 15:11:09.266', '2025-06-20 15:01:09.267299', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (376, 'nguyenlehoangquan02072002@gmail.com', '1e5e5c', '2025-06-20 15:15:12.963', '2025-06-20 15:05:12.964156', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (377, 'nguyenlehoangquan02072002@gmail.com', '3fb1d1', '2025-06-20 15:15:15.712', '2025-06-20 15:05:15.713176', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (378, 'nguyenlehoangquan02072002@gmail.com', '856e41', '2025-06-20 15:15:42.488', '2025-06-20 15:05:42.488944', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (379, 'nguyenlehoangquan02072002@gmail.com', 'e6ebff', '2025-06-20 15:19:05.782', '2025-06-20 15:09:05.783274', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (380, 'nguyenlehoangquan02072002@gmail.com', '39a773', '2025-06-20 15:19:07.807', '2025-06-20 15:09:07.80765', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (381, 'nguyenlehoangquan02072002@gmail.com', 'af3d9b', '2025-06-20 15:22:49.088', '2025-06-20 15:12:49.0921', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (382, 'nguyenlehoangquan02072002@gmail.com', '846c18', '2025-06-20 15:22:50.077', '2025-06-20 15:12:50.078181', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (383, 'nguyenlehoangquan02072002@gmail.com', '8b38ae', '2025-06-20 15:23:28.489', '2025-06-20 15:13:28.490386', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (384, 'nguyenlehoangquan02072002@gmail.com', '165047', '2025-06-20 15:26:42.127', '2025-06-20 15:16:42.128438', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (385, 'nguyenlehoangquan02072002@gmail.com', 'de77a5', '2025-06-20 15:26:43.255', '2025-06-20 15:16:43.256426', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (386, 'nguyenlehoangquan02072002@gmail.com', '91450e', '2025-06-20 15:28:24.879', '2025-06-20 15:18:24.879856', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (387, 'nguyenlehoangquan02072002@gmail.com', '55f497', '2025-06-20 15:28:25.834', '2025-06-20 15:18:25.834916', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (388, 'nguyenlehoangquan02072002@gmail.com', 'a5f729', '2025-06-20 15:32:22.127', '2025-06-20 15:22:22.131497', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (389, 'nguyenlehoangquan02072002@gmail.com', '218ee9', '2025-06-20 15:32:23.077', '2025-06-20 15:22:23.07857', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (390, 'nguyenlehoangquan02072002@gmail.com', '0c6944', '2025-06-20 15:35:32.478', '2025-06-20 15:25:32.478638', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (391, 'nguyenlehoangquan02072002@gmail.com', 'aaf397', '2025-06-20 15:35:35.013', '2025-06-20 15:25:35.014177', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (392, 'nguyenlehoangquan02072002@gmail.com', '1f188c', '2025-06-20 15:37:09.966', '2025-06-20 15:27:09.966553', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (393, 'nguyenlehoangquan02072002@gmail.com', '983f69', '2025-06-20 15:37:12.008', '2025-06-20 15:27:12.00936', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (394, 'nguyenlehoangquan02072002@gmail.com', 'b372ce', '2025-06-20 15:42:44.067', '2025-06-20 15:32:44.06851', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (395, 'nguyenlehoangquan02072002@gmail.com', '02d568', '2025-06-20 15:45:29.1', '2025-06-20 15:35:29.104973', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (396, 'nguyenlehoangquan02072002@gmail.com', '06069f', '2025-06-20 15:47:23.686', '2025-06-20 15:37:23.68682', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (397, 'nguyenlehoangquan02072002@gmail.com', '140013', '2025-06-20 15:50:37.609', '2025-06-20 15:40:37.611617', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (398, 'nguyenlehoangquan02072002@gmail.com', 'ac5bdc', '2025-06-20 15:54:25.327', '2025-06-20 15:44:25.328461', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (399, 'nguyenlehoangquan02072002@gmail.com', '5e288c', '2025-06-20 16:10:56.846', '2025-06-20 16:00:56.851821', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (400, 'nguyenlehoangquan02072002@gmail.com', 'd37986', '2025-06-20 16:31:01.996', '2025-06-20 16:21:02.002311', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (401, 'nguyenlehoangquan02072002@gmail.com', '8e9c45', '2025-06-20 16:33:51.683', '2025-06-20 16:23:51.683808', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (402, 'nguyenlehoangquan02072002@gmail.com', '013282', '2025-06-20 16:33:53.59', '2025-06-20 16:23:53.590731', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (403, 'nguyenlehoangquan02072002@gmail.com', '034d34', '2025-06-20 16:39:10.149', '2025-06-20 16:29:10.149871', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (404, 'nguyenlehoangquan02072002@gmail.com', 'a87d7d', '2025-06-20 16:39:12.777', '2025-06-20 16:29:12.777845', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (405, 'nguyenlehoangquan02072002@gmail.com', '4b6cc7', '2025-06-20 16:42:37.169', '2025-06-20 16:32:37.17027', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (406, 'nguyenlehoangquan02072002@gmail.com', 'ca43af', '2025-06-20 16:42:39.155', '2025-06-20 16:32:39.156221', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (407, 'nguyenlehoangquan02072002@gmail.com', 'ec5553', '2025-06-20 17:16:44.587', '2025-06-20 17:06:44.591468', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (408, 'nguyenlehoangquan02072002@gmail.com', '87b14c', '2025-06-20 17:21:55.347', '2025-06-20 17:11:55.34866', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (409, 'nguyenlehoangquan02072002@gmail.com', '567c16', '2025-06-20 17:24:10.004', '2025-06-20 17:14:10.007252', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (410, 'nguyenlehoangquan02072002@gmail.com', 'c8a03e', '2025-06-20 17:24:12.017', '2025-06-20 17:14:12.019437', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (411, 'nguyenlehoangquan02072002@gmail.com', '34b339', '2025-06-20 17:25:39.159', '2025-06-20 17:15:39.166669', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (412, 'nguyenlehoangquan02072002@gmail.com', '28c672', '2025-06-20 17:25:41.482', '2025-06-20 17:15:41.487314', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (413, 'nguyenlehoangquan02072002@gmail.com', 'd45577', '2025-06-20 17:37:22.587', '2025-06-20 17:27:22.591271', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (414, 'nguyenlehoangquan02072002@gmail.com', 'c0f2e7', '2025-06-20 17:38:53.693', '2025-06-20 17:28:53.694121', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (415, 'nguyenlehoangquan02072002@gmail.com', '0fcec7', '2025-06-20 17:38:55.846', '2025-06-20 17:28:55.846505', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (416, 'nguyenlehoangquan02072002@gmail.com', '572b95', '2025-06-20 17:43:36.189', '2025-06-20 17:33:36.192978', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (417, 'nguyenlehoangquan02072002@gmail.com', '45c087', '2025-06-20 17:43:38.325', '2025-06-20 17:33:38.326412', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (418, 'nguyenlehoangquan02072002@gmail.com', '00bd95', '2025-06-20 17:47:43.511', '2025-06-20 17:37:43.514074', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (419, 'nguyenlehoangquan02072002@gmail.com', '32f712', '2025-06-20 17:47:45.977', '2025-06-20 17:37:45.978308', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (420, 'nguyenlehoangquan02072002@gmail.com', 'b2fd7e', '2025-06-20 17:51:50.438', '2025-06-20 17:41:50.438638', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (421, 'nguyenlehoangquan02072002@gmail.com', '182079', '2025-06-20 17:51:51.692', '2025-06-20 17:41:51.693203', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (422, 'nguyenlehoangquan02072002@gmail.com', 'e3f430', '2025-06-20 18:01:57.258', '2025-06-20 17:51:57.263612', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (423, 'nguyenlehoangquan02072002@gmail.com', '68de1e', '2025-06-20 18:01:59.617', '2025-06-20 17:51:59.619498', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (424, 'nguyenlehoangquan02072002@gmail.com', '885d39', '2025-06-20 18:09:14.896', '2025-06-20 17:59:14.899823', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (425, 'nguyenlehoangquan02072002@gmail.com', '0dc618', '2025-06-20 18:09:17.167', '2025-06-20 17:59:17.168225', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (426, 'nguyenlehoangquan02072002@gmail.com', 'e8ae1d', '2025-06-20 18:10:24.94', '2025-06-20 18:00:24.944226', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (427, 'nguyenlehoangquan02072002@gmail.com', '4a1630', '2025-06-20 18:10:27.617', '2025-06-20 18:00:27.619223', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (429, 'nguyenlehoangquan02072002@gmail.com', 'd43e06', '2025-06-20 18:39:35.618', '2025-06-20 18:29:35.619416', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (428, 'nguyenlehoangquan02072002@gmail.com', 'bf41b8', '2025-06-20 18:39:28.557', '2025-06-20 18:29:28.559287', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (431, 'nguyenlehoangquan02072002@gmail.com', 'ae5425', '2025-06-20 18:43:58.525', '2025-06-20 18:33:58.525643', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (430, 'nguyenlehoangquan02072002@gmail.com', 'a1b2cd', '2025-06-20 18:43:52.071', '2025-06-20 18:33:52.071698', 0, true, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (432, 'hoangquan02072002@gmail.com', '8eb6d6', '2025-09-04 23:02:43.316', '2025-09-04 22:52:43.318548', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (433, 'nguyenlehoangquan02072002@gmail.com', '15a5e3', '2025-09-04 23:05:06.871', '2025-09-04 22:55:06.872026', 0, false, NULL, NULL);
INSERT INTO public.mfa_otp VALUES (434, 'nguyenlehoangquan02072002@gmail.com', 'cadddf', '2025-09-07 09:57:39.98', '2025-09-07 09:47:39.982531', 0, false, NULL, NULL);


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."order" VALUES (51, 166, 'stripe', true, '2025-06-20 18:35:18.077', '398.6', 'hai', 'nguyen', 'user@example.com', 'moscow', 'moscow', '123456', '0772622203', 'moscow', 'Russia', 'PENDING');


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product VALUES (1, 'Фотоаппарат Sony Alpha ILCE-7RM5 Body', 'Высококачественная камера с разрешением 4K для создания профессионального контента', 398.60, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738675904/do%20an%20tot%20nghiep/product/Cameras/Canon%20EOS%20R6%20Mark%20II%20Bodyat%20Etoren%20%20%20270.990.00%20RUB.png');
INSERT INTO public.product VALUES (2, 'Экшн-камера AKASO BRAVE 7 серый', 'Надежная камера с длительным временем работы от аккумулятора для длительных путешествий', 15.99, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676214/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20AKASO%20BRAVE%207%20%D1%81%D0%B5%D1%80%D1%8B%D0%B9%20%20%20%2015.990.00%20RUB.png');
INSERT INTO public.product VALUES (3, 'IP камера TP-LINK Tapo C220', 'Камера с функцией HDR для получения ярких и детализированных изображений', 5.40, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676212/do%20an%20tot%20nghiep/product/Cameras/IP%20%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20TP-LINK%20Tapo%20C220%20%20%205.399.00%20RUB.png');
INSERT INTO public.product VALUES (4, 'Камера видеонаблюдения YI Outdoor Camera 1080p (YHS.3017)', 'Экспертная камера с продвинутыми настройками для ручного управления параметрами съемки', 4.90, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676212/do%20an%20tot%20nghiep/product/Cameras/%D0%9A%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%20YI%20Outdoor%20Camera%201080p%20%28YHS.3017%29%20%20%20%204.900.00%20%20RUB.png');
INSERT INTO public.product VALUES (5, 'Экшн-камера GoPro HERO13 Black', 'Камера с функцией таймлапса для создания захватывающих видеороликов о движении времени', 30.49, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738675906/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20GoPro%20HERO13%20Black%20%20%20%2030.490.00%20RUB.png');
INSERT INTO public.product VALUES (6, 'Фотоаппарат Canon EOS 2000D Kit', 'Мультифункциональная камера с возможностью съемки 360 градусов для погружения в реальность', 47.49, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738675905/do%20an%20tot%20nghiep/product/Cameras/%D0%A4%D0%BE%D1%82%D0%BE%D0%B0%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%20Canon%20EOS%202000D%20Kit%20%20%20%2047.490.00%20RUB.png');
INSERT INTO public.product VALUES (7, 'Canon EOS R6 Mark II Bodyat Etoren', 'Камера с функцией ночного видения для наблюдения в темное время суток', 270.99, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738675904/do%20an%20tot%20nghiep/product/Cameras/Canon%20EOS%20R6%20Mark%20II%20Bodyat%20Etoren%20%20%20270.990.00%20RUB.png');
INSERT INTO public.product VALUES (8, 'Беззеркальная камера Canon EOS R8 (+ RF 24-50mm f4.5-6.3 IS STM) 2000768074440', 'Умная камера с функцией распознавания лиц и автоматической настройкой света', 182.99, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676700/do%20an%20tot%20nghiep/product/Cameras/%D0%91%D0%B5%D0%B7%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20Canon%20EOS%20R8%20%28%2B%20RF%2024-50mm%20f4.5-6.3%20IS%20STM%29%202000768074440%20%20%20%20%20%20%20%20182.990.00%20RUB.png');
INSERT INTO public.product VALUES (9, 'Экшн-камера YI 4K Action Camera', 'Профессиональная камера с возможностью съемки в условиях низкой освещенности', 19.00, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676699/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20YI%204K%20Action%20Camera%20%20%20%2019.000.00%20RUB.png');
INSERT INTO public.product VALUES (10, 'Беззеркальный фотоаппарат Canon EOS R3 Body', 'Инновационная камера с искусственным интеллектом для улучшения качества съемки', 445.97, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676465/do%20an%20tot%20nghiep/product/Cameras/%D0%91%D0%B5%D0%B7%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%84%D0%BE%D1%82%D0%BE%D0%B0%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%20Canon%20EOS%20R3%20Body%20%20%20%20%20445.970.00%20rub.png');
INSERT INTO public.product VALUES (11, 'Экшн-камера Insta360 Ace Pro', 'Водонепроницаемая камера для подводной съемки с глубиной до 30 метров', 50.00, 10, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676698/do%20an%20tot%20nghiep/product/Cameras/%D0%AD%D0%BA%D1%88%D0%BD-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20Insta360%20Ace%20Pro%20%20%20%20%2050.000.00%20RUB.png');
INSERT INTO public.product VALUES (22, 'Смартфон Apple iPhone 12 128GB, зеленый', 'Долгое время автономной работы', 46.96, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675094/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2012%20128GB%2C%20%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9%20%20%20%2046.000.00%20RUB.png');
INSERT INTO public.product VALUES (28, 'Смартфон Apple iPhone 16 Pro Max, 256 ГБ, (Dual Nano-SIM), Desert Titanium', 'Стильный дизайн в современном исполнении', 120.50, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2016%20Pro%20Max%2C%20256%20%D0%93%D0%91%2C%20%28Dual%20Nano-SIM%29%2C%20Desert%20Titanium%20%20%20%20120.490.00%20RUB.png');
INSERT INTO public.product VALUES (42, 'Ноутбук GIGABYTE AORUS 16X 9KG (9KG-43UAC54SH)', 'Поддержка технологий ray tracing для реалистичной графики', 126.27, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696811/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20GIGABYTE%20AORUS%2016X%209KG%20%289KG-43UAC54SH%29%20%20%20%20126.260.00%20rub.png');
INSERT INTO public.product VALUES (55, 'Sony WH-1000X M5 Wireless NC Headphone Blackat Etoren', 'Сенсорное управление для удобства', 28.56, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744854/do%20an%20tot%20nghiep/product/headphone/Sony%20WH-1000X%20M5%20Wireless%20NC%20Headphone%20Blackat%20Etoren%20%20%20%2028.550.00%20rub.png');
INSERT INTO public.product VALUES (69, 'Планшет Apple iPad Air 6 11 M2 (2024) 128Gb Wi-Fi Space Gray (Серый космос) ', 'Сplit View для многозадачности', 59.00, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Air%206%2011%20M2%20%282024%29%20128Gb%20Wi-Fi%20Space%20Gray%20%28%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%29%20%20%20%20%20%20%20%20%20%20%20%20%2058.999.00%20rub.png');
INSERT INTO public.product VALUES (12, 'Беззеркальный фотоаппарат Canon EOS RP Body', 'Камера со сменными объективами для фотографов-любителей и профессионалов', 82.90, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676467/do%20an%20tot%20nghiep/product/Cameras/%D0%91%D0%B5%D0%B7%D0%B7%D0%B5%D1%80%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%84%D0%BE%D1%82%D0%BE%D0%B0%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%20Canon%20EOS%20RP%20Body%20%20%2082.900.00%20rub.png');
INSERT INTO public.product VALUES (13, 'Blackmagic Pocket Cinema Camera 6K Pro', 'Спортивная камера с широким углом обзора для экстремальных видов спорта', 255.00, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676464/do%20an%20tot%20nghiep/product/Cameras/Blackmagic%20Pocket%20Cinema%20Camera%206K%20Pro%20%20%20%20255.000.00%20rub.png');
INSERT INTO public.product VALUES (14, 'Видеокамера Blackmagic Pocket Cinema Camera 4K', 'Портативная камера с Wi-Fi для быстрой передачи фото и видео на смартфон', 172.66, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676464/do%20an%20tot%20nghiep/product/Cameras/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20Blackmagic%20Pocket%20Cinema%20Camera%204K%20%20%20172.660.00%20rub.png');
INSERT INTO public.product VALUES (15, 'FUJIFILM X-T30 II Mirrorless Camera with XC 15-45mm OIS PZ Lens Silver', 'Цифровая камера с функцией замедленной съемки для создания драматичных видеороликов', 139.99, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738676215/do%20an%20tot%20nghiep/product/Cameras/FUJIFILM%20X-T30%20II%20Mirrorless%20Camera%20with%20XC%2015-45mm%20OIS%20PZ%20Lens%20Silver%2C%20Fuji%20...%20%20%20%20%20139.990.00%20RUB.png');
INSERT INTO public.product VALUES (16, 'Nikon Z5 Body', 'Компактная камера с мощной системой стабилизации изображения для активного отдыха', 95.70, 20, 1, 'https://res.cloudinary.com/co-phan/image/upload/v1738675903/do%20an%20tot%20nghiep/product/Cameras/Nikon%20Z5%20Body%20%20%2095.700.00%20%20RUB.png');
INSERT INTO public.product VALUES (17, 'Apple iPhone 14 Pro Max, 1 ТБ, темно фиолетовый, eSIM ростест', 'Инновационный смартфон с передовыми технологиями', 169.99, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675737/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2014%20Pro%20Max%2C%201%20%D0%A2%D0%91%2C%20%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%20%D1%84%D0%B8%D0%BE%D0%BB%D0%B5%D1%82%D0%BE%D0%B2%D1%8B%D0%B9%2C%20eSIM%20%D1%80%D0%BE%D1%81%D1%82%D0%B5%D1%81%D1%82%20%20%20169.990.00%20%20RUB.png');
INSERT INTO public.product VALUES (18, 'Смартфоны iPhone 15 Apple MTP53QLA 6.1 128 ГБ 6 ГБ ОЗУ Зеленый', 'Яркий дисплей с широкими углами обзора', 65.97, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675577/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%D1%8B%20iPhone%2015%20Apple%20MTP53QLA%206.1%20128%20%D0%93%D0%91%206%20%D0%93%D0%91%20%D0%9E%D0%97%D0%A3%20%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9%20%20%2065.970.00%20%20RUB.png');
INSERT INTO public.product VALUES (19, 'Мобильный телефон Iphone 15 128Гб Желтый Mtp23Px A Apple', 'Мощный процессор для быстрой работы', 70.81, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675095/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%20Iphone%2015%20128%D0%93%D0%B1%20%D0%96%D0%B5%D0%BB%D1%82%D1%8B%D0%B9%20Mtp23Px%20A%20Apple%20%20%2070.810.00%20RUB.png');
INSERT INTO public.product VALUES (20, 'Apple iPhone 16 Pro Max 256 ГБ, пустынный титан', 'Прочный алюминиевый корпус премиум-класса', 133.92, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675578/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2016%20Pro%20Max%20256%20%D0%93%D0%91%2C%20%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D0%BD%D1%8B%D0%B9%20%D1%82%D0%B8%D1%82%D0%B0%D0%BD%20%20%20%20%20133.910.00%20RUB.png');
INSERT INTO public.product VALUES (21, 'iPhone 16 512GB White (MYEP3) • iPhone 16', 'Отличная камера для съемки в любых условиях', 123.51, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675094/do%20an%20tot%20nghiep/product/Cell%20Phones/iPhone%2016%20512GB%20White%20%28MYEP3%29%20%E2%80%A2%20iPhone%2016%20%20123.000.00%20RUB.png');
INSERT INTO public.product VALUES (27, 'iPhone 12 256GB White (MGJH3) • Айфон', 'Надежная система безопасности Face ID', 37.99, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/iPhone%2012%20256GB%20White%20%28MGJH3%29%20%E2%80%A2%20%D0%90%D0%B9%D1%84%D0%BE%D0%BD%2012%2037.990.00%20RUB.png');
INSERT INTO public.product VALUES (29, 'Смартфон Apple iPhone 16 Pro 256GB', 'Поддержка augmented reality (AR)', 115.40, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2016%20Pro%20256GB%20%20%20115.390.00%20RUB.png');
INSERT INTO public.product VALUES (30, 'Apple iphone 15 pro 128 go noir titane', 'Отличное качество сборки компонентов', 87.97, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738673946/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iphone%2015%20pro%20128%20go%20noir%20titane%20%2087.965.00%20RUB.png');
INSERT INTO public.product VALUES (32, 'Apple iPhone 16 Pro 128GB - Natural Titanium', 'product_descriptionГармоничное сочетание мощности и элегантности', 107.00, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738673946/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2016%20Pro%20128GB%20-%20Natural%20Titanium%20%20106.990.00%20RUB.png');
INSERT INTO public.product VALUES (33, 'Ноутбук Gigabyte G6 (MF-52KZ853SD) черный', 'Мощная производительность для современных игр', 92.20, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696819/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Gigabyte%20G6%20%28MF-52KZ853SD%29%20%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%20%2092.195.00%20rub.png');
INSERT INTO public.product VALUES (34, 'Ноутбук HP OMEN Gaming Laptop 16z', 'Дисплей с высокой частотой обновления (144Hz+)', 123.47, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696813/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20HP%20OMEN%20Gaming%20Laptop%2016z%20%20123.460.00%20rub.png');
INSERT INTO public.product VALUES (36, 'Ноутбук MSI Cyborg 15 A13VF-1615XRU 9S7-15K111-1615 15.6', 'Объемная память DDR5 для многозадачности', 131.24, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696809/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Cyborg%2015%20A13VF-1615XRU%209S7-15K111-1615%2015.6%20%20131.240.00%20rub.png');
INSERT INTO public.product VALUES (37, 'MSI RAIDERGE6814285 Raider GE68HX 14VIG-285US 16', 'Улучшенная система охлаждения для стабильной работы', 406.83, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696814/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/MSI%20RAIDERGE6814285%20Raider%20GE68HX%2014VIG-285US%2016%22%20406.828.00%20rub.png');
INSERT INTO public.product VALUES (23, 'Apple iPhone 16 - 128 Гб Розовый (Pink)', 'Быстрая зарядка за короткое время', 75.99, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738675094/do%20an%20tot%20nghiep/product/Cell%20Phones/Apple%20iPhone%2016%20-%20128%20%D0%93%D0%B1%20%D0%A0%D0%BE%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9%20%28Pink%29%20%20%2075.990.00.png');
INSERT INTO public.product VALUES (40, 'Игровой ноутбук MSI Vector 16 HX A14V, 16-дюймовый дисплей QHD+ 240 Гц, Intel', 'Быстрое SSD-хранилище для мгновенной загрузки', 256.00, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696288/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Vector%2016%20HX%20A14V%2C%2016-%D0%B4%D1%8E%D0%B9%D0%BC%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%B4%D0%B8%D1%81%D0%BF%D0%BB%D0%B5%D0%B9%20QHD%2B%20240%20%D0%93%D1%86%2C%20Intel%20%20%20%20%20255.999.00%20rub.png');
INSERT INTO public.product VALUES (58, 'Беспроводные наушники Sony WH-CH520 Черный', 'Активное шумоподавление (ANC) для тишины вокруг', 5.70, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744852/do%20an%20tot%20nghiep/product/headphone/%D0%91%D0%B5%D1%81%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D1%8B%D0%B5%20%D0%BD%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Sony%20WH-CH520%20%D0%A7%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%20%205.690%20rub.png');
INSERT INTO public.product VALUES (68, 'Планшет Apple iPad (2021) Wi-Fi 64Gb Серебристый', 'Продвинутая камера для фото и видеозвонков', 29.00, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282021%29%20Wi-Fi%2064Gb%20%D0%A1%D0%B5%D1%80%D0%B5%D0%B1%D1%80%D0%B8%D1%81%D1%82%D1%8B%D0%B9%20%20%20%20%2028.990.00%20rub.png');
INSERT INTO public.product VALUES (85, 'USB Флеш-накопитель Smartbuy Glossy 32GB, Синий', 'Безбатарейная работа благодаря питанию от порта', 350.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20%D0%A4%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20Smartbuy%20Glossy%2032GB%2C%20%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9%20%20%20%20%20350.00%20rub.png');
INSERT INTO public.product VALUES (24, 'Смартфон Apple iPhone 12 128Gb, синий', 'Удобное управление жестами', 29.49, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738674689/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2012%20128Gb%2C%20%D1%81%D0%B8%D0%BD%D0%B8%D0%B9%20%2029.490.00%20RUB.png');
INSERT INTO public.product VALUES (31, 'Смартфон Apple iPhone 15 Pro 128 ГБ белый титан', 'Быстрая работа с приложениями и играми', 86.99, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738673947/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2015%20Pro%20128%20%D0%93%D0%91%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%D1%82%D0%B8%D1%82%D0%B0%D0%BD%20%20%2086.980.00%20RUB.png');
INSERT INTO public.product VALUES (35, 'Ноутбук ASUS TUF Gaming F17 FX707ZC4-HX095 (90NR0GX1-M006F0) ', 'Высокоскоростной процессор последнего поколения', 92.99, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696816/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20ASUS%20TUF%20Gaming%20F17%20FX707ZC4-HX095%20%2890NR0GX1-M006F0%29%20%20%20%2092.990.00%20rub.png');
INSERT INTO public.product VALUES (46, 'Ноутбук HP EuropeOMEN Gaming Laptop 16-wd0009ci 81C38EAUUQ', 'Расширенные возможности кастомизации', 107.56, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696282/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20HP%20EuropeOMEN%20Gaming%20Laptop%2016-wd0009ci%2081C38EAUUQ%20%20%20%20%20107.556%20rub.png');
INSERT INTO public.product VALUES (51, 'Наушники Bose QuietComfort SE', 'Шумоизоляция для погружения в музыку', 34.00, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738745277/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Bose%20QuietComfort%20SE%20%20%20%2033.990.00%20rub.png');
INSERT INTO public.product VALUES (60, 'Razer Kraken V4 ', 'Быстрая зарядка для мгновенной энергии', 21.00, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744850/do%20an%20tot%20nghiep/product/headphone/Razer%20Kraken%20V4%20%20%20%2020.999%20rub.png');
INSERT INTO public.product VALUES (64, 'Планшет Apple iPad 10.2 Wi-Fi 256GB Silver', 'Легкий и компактный дизайн для переноски', 44.30, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%2010.2%20Wi-Fi%20256GB%20Silver%20%20%2044.290%2C00%20rub.png');
INSERT INTO public.product VALUES (74, 'Планшет Apple iPad Air 11 2024 128Gb Wi-Fi Space', 'Широкий доступ к millions приложений в App Store', 59.40, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738697454/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Air%2011%202024%20128Gb%20Wi-Fi%20Space%20%20%2059.390.00%20rub.png');
INSERT INTO public.product VALUES (79, '128Gb - Netac U505 USB 3.0 NT03U505N-128G-30BK ', 'Надёжная защита данных при использовании', 750.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/128Gb%20-%20Netac%20U505%20USB%203.0%20NT03U505N-128G-30BK%20%20%20%20%20%20%20750.00%20rub.png');
INSERT INTO public.product VALUES (90, 'Накопитель USB 2.0 16GB Silicon Power Helios 101', 'Автоматическое распознавание операционными системами', 309.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743867/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%9D%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20USB%202.0%2016GB%20Silicon%20Power%20Helios%20101%20%20%20%20%20309.00%20rub.png');
INSERT INTO public.product VALUES (25, 'Смартфон iPhone 11 Pro 256GB Apple', 'Защита от брызг и пыли', 34.43, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738674689/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20iPhone%2011%20Pro%20256GB%20Apple%20%20%2034.430.00%20RUB.png');
INSERT INTO public.product VALUES (39, 'Игровой ноутбук ASUS ROG Zephyrus G16 GU605MV-QP139 (90NR0IT3-M00600)', 'Дискретная видеокарта высокого класса', 150.00, 100, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696805/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20ASUS%20ROG%20Zephyrus%20G16%20GU605MV-QP139%20%2890NR0IT3-M00600%29%20%20%20%20%20149.990.00%20rub.png');
INSERT INTO public.product VALUES (57, 'Наушники Sennheiser HD 800 S ', 'Гибкая регулировка размера для идеального-fit', 125.70, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744851/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Sennheiser%20HD%20800%20S%20%20%20%20125.600%20rub.png');
INSERT INTO public.product VALUES (67, 'Apple iPad mini (2021) Wi-Fi + Cellular 64GB - tablet, Pink', 'Долгое время автономной работы от батареи', 43.89, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/Apple%20iPad%20mini%20%282021%29%20Wi-Fi%20%2B%20Cellular%2064GB%20-%20tablet%2C%20Pink%20%20%2043.880.00%20rub.png');
INSERT INTO public.product VALUES (86, 'Флешка HIKVision HS-USB-M210P 16G U3 16Gb', 'Защита паролем или шифрованием для конфиденциальности', 390.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%A4%D0%BB%D0%B5%D1%88%D0%BA%D0%B0%20HIKVision%20HS-USB-M210P%2016G%20U3%2016Gb%20%20390.00%20rub.png');
INSERT INTO public.product VALUES (26, 'Смартфон Apple iPhone 11 64GB White - белый', 'Широкие возможности для развлечений', 36.49, 10, 2, 'https://res.cloudinary.com/co-phan/image/upload/v1738674688/do%20an%20tot%20nghiep/product/Cell%20Phones/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%20Apple%20iPhone%2011%2064GB%20White%20-%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%2036.490.00.png');
INSERT INTO public.product VALUES (38, 'Ноутбук HP Victus 16-s1023dx, 16.1" IPS FHD, AMD Ryzen 7 8845HS, 16Gb, SSD 512Gb', 'Специальная клавиатура с подсветкой для геймеров', 149.93, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696807/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20HP%20Victus%2016-s1023dx%2C%2016.1%22%20IPS%20FHD%2C%20AMD%20Ryzen%207%208845HS%2C%2016Gb%2C%20SSD%20512Gb%20%20%20%20%20%20149.929.00%20rub.png');
INSERT INTO public.product VALUES (48, 'Ноутбук Acer Predator Helios 16, 2024 дюймов, 2,5K QHD, 240 Гц, Intel i9-14900HX', 'Оптимизированное программное обеспечение для гейминга', 259.00, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738695869/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Acer%20Predator%20Helios%2016%2C%202024%20%D0%B4%D1%8E%D0%B9%D0%BC%D0%BE%D0%B2%2C%202%2C5K%20QHD%2C%20240%20%D0%93%D1%86%2C%20Intel%20i9-14900HX%20...%20%20%20%20%20%20%20%20258.990.00%20RUB.png');
INSERT INTO public.product VALUES (49, 'Logitech G733 LightSpeed Wireless Blue', 'Высококачественное звучание с глубоким басом', 14.50, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738745280/do%20an%20tot%20nghiep/product/headphone/Logitech%20G733%20LightSpeed%20Wireless%20Blue%20%20%2014.490.00%20rub.png');
INSERT INTO public.product VALUES (59, 'Sennheiser Momentum 4 Black', 'Встроенное голосовое управление помощниками (Siri, Google Assistant)', 26.30, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744850/do%20an%20tot%20nghiep/product/headphone/Sennheiser%20Momentum%204%20Black%20%20%20%2026.290%20rub.png');
INSERT INTO public.product VALUES (66, 'Планшет Apple iPad Mini (2024) 128Gb, Wi-Fi, Purple (Пурпурный)', 'Поддержка Apple Pencil для рисования и заметок', 57.23, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Mini%20%282024%29%20128Gb%2C%20Wi-Fi%2C%20Purple%20%28%D0%9F%D1%83%D1%80%D0%BF%D1%83%D1%80%D0%BD%D1%8B%D0%B9%29%20%2057.230.00%20rub.png');
INSERT INTO public.product VALUES (76, 'Планшет Apple iPad (2021) 10.2" Wi-Fi 64Gb A2602 MK2K3CHA Серый космос', 'Цифровой помощник Siri для голосового управления', 32.00, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738697450/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282021%29%2010.2%22%20Wi-Fi%2064Gb%20A2602%20MK2K3CHA%20%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%20%20%20%2031.990.00%20rub.png');
INSERT INTO public.product VALUES (77, 'USB Флеш-накопитель SmartBuy Glossy Series 3.0 32GB', 'Компактное устройство для хранения данных', 471.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738744243/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20%D0%A4%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20SmartBuy%20Glossy%20Series%203.0%2032GB%20%20%20%20471.00%20rub.png');
INSERT INTO public.product VALUES (87, 'USB-флеш-накопитель ADATA 100, 32 ГБ, C906, USB 2,0', 'Стильный дизайн в различных цветовых решениях', 750.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB-%D1%84%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20ADATA%20100%2C%2032%20%D0%93%D0%91%2C%20C906%2C%20USB%202%2C0%20%20%20%20750%20rub.png');
INSERT INTO public.product VALUES (41, 'Ноутбук MSI Pulse 17 B13VGK-813XRU Core i7 13700H 16Gb SSD1Tb NVIDIA GeForce', 'Продвинутый звук с Surround Sound', 226.63, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696286/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Pulse%2017%20B13VGK-813XRU%20Core%20i7%2013700H%2016Gb%20SSD1Tb%20NVIDIA%20GeForce%20%20%20226.629.00%20rub.png');
INSERT INTO public.product VALUES (56, 'Beyerdynamic DT 770 PRO 250 Ohm Наушники', 'Поддержка кодеков высокого качества (aptX, LDAC)', 21.69, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744853/do%20an%20tot%20nghiep/product/headphone/Beyerdynamic%20DT%20770%20PRO%20250%20Ohm%20%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20%20%20%20%20%20%20%20%2021.688.00%20rub.png');
INSERT INTO public.product VALUES (70, 'Планшеты Apple iPad Air (2024) 11" Wi-Fi 256 ГБ, «серый космос»', 'Операционная система iPadOS с широкими возможностями', 98.00, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%D1%8B%20Apple%20iPad%20Air%20%282024%29%2011%22%20Wi-Fi%20256%20%D0%93%D0%91%2C%20%C2%AB%D1%81%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%C2%BB%20%20%20%2097.990.00%20rub.png');
INSERT INTO public.product VALUES (83, 'Накопитель USB 2.0 16GB Digma DGFUM016A20SR', 'Прочный корпус для защиты от механических повреждений', 290.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743869/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%9D%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20USB%202.0%2016GB%20Digma%20DGFUM016A20SR%20%20290.00%20rub.png');
INSERT INTO public.product VALUES (43, 'Игровой ноутбук Dell Alienware M16, 16-дюймовый дисплей QHD+ WVA 240 Гц, AMD', 'Многофункциональные порты для периферийных устройств', 307.80, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738695868/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Dell%20Alienware%20M16%2C%2016-%D0%B4%D1%8E%D0%B9%D0%BC%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%B4%D0%B8%D1%81%D0%BF%D0%BB%D0%B5%D0%B9%20QHD%2B%20WVA%20240%20%D0%93%D1%86%2C%20AMD%20...%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20307.802%20RUB.png');
INSERT INTO public.product VALUES (54, 'SteelSeries Arctis Nova 3', 'Долгое время работы от аккумулятора', 10.11, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738745275/do%20an%20tot%20nghiep/product/headphone/SteelSeries%20Arctis%20Nova%203%20%20%2010.108%20rub.png');
INSERT INTO public.product VALUES (72, 'Планшеты Apple iPad 10,9" (2022) Wi-Fi 64 ГБ, розовый', 'Быстрая работа с файлами через Files', 48.00, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738697458/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%D1%8B%20Apple%20iPad%2010%2C9%22%20%282022%29%20Wi-Fi%2064%20%D0%93%D0%91%2C%20%D1%80%D0%BE%D0%B7%D0%BE%D0%B2%D1%8B%D0%B9%20%20%20%2047.990.00%20rub.png');
INSERT INTO public.product VALUES (81, 'Netac USB Drive 16GB UM2 USB2.0 NT03UM2N-016G-20BK', 'Совместимость с большинством устройств через USB-порт', 450.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/Netac%20USB%20Drive%2016GB%20UM2%20USB2.0%20NT03UM2N-016G-20BK%20%20%20%20%20%20%20450.00%20rub.png');
INSERT INTO public.product VALUES (89, 'USB Флеш-накопитель Smartbuy STREAM 32GB, Желтый', 'Долгий срок службы при правильном использовании', 371.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20%D0%A4%D0%BB%D0%B5%D1%88-%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20Smartbuy%20STREAM%2032GB%2C%20%D0%96%D0%B5%D0%BB%D1%82%D1%8B%D0%B9%20%20%20%20%20371.00%20rub.png');
INSERT INTO public.product VALUES (44, 'https://res.cloudinary.com/co-phan/image/upload/v1738696286/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Pulse%2017%20B13VGK-813XRU%20Core%20i7%2013700H%2016Gb%20SSD1Tb%20NVIDIA%20GeForce%20%20%20226.629.00%20rub.png', 'Поддержка VR-устройств для виртуальной реальности', 358.61, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696285/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20MSI%20Stealth%2016%20AI%20Studio%20A1VHG-061RU%20Core%20Ultra%209%20185H%2032Gb%20SSD2Tb%20%20%20%20358.610.00%20rub.png');
INSERT INTO public.product VALUES (53, 'HyperX Cloud Stinger 2', 'Прочный и легкий дизайн для ежедневного использования', 5.00, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738745275/do%20an%20tot%20nghiep/product/headphone/HyperX%20Cloud%20Stinger%202%20%204.990%20rub.png');
INSERT INTO public.product VALUES (62, 'Наушники Bose QuietComfort 45, белый', 'Насадки разных размеров для максимального комфорта', 55.63, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744848/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20Bose%20QuietComfort%2045%2C%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%20%20%2055.630%20%20%20rub.png');
INSERT INTO public.product VALUES (63, 'Планшет Apple iPad Pro 12.9 (2022) 256GB Wi-Fi + Cellular Space Gray', 'Мощный процессор для быстрой работы с приложениями', 124.50, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Pro%2012.9%20%282022%29%20256GB%20Wi-Fi%20%2B%20Cellular%20Space%20Gray%20%20%20124.490.00%20%20rub.png');
INSERT INTO public.product VALUES (73, 'Планшет Планшет APPLE iPad Pro 11" (М4) Cellular 256GB Silver (MVW23NFA) 2024 ', 'Возможность использования как компьютера благодаря приложению Microsoft Office', 135.00, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738697456/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20APPLE%20iPad%20Pro%2011%22%20%28%D0%9C4%29%20Cellular%20256GB%20Silver%20%28MVW23NFA%29%202024%20%20%20%20%20%20%20%20%20%20%20%20%20%20134.999.00%20rub.png');
INSERT INTO public.product VALUES (78, 'USB 3.0 3.1 накопитель Smartbuy 128GB STREAM Red (SB128GBST-R3)', 'Лёгкость переноски благодаря маленькому размеру', 1.29, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%203.0%203.1%20%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20Smartbuy%20128GB%20STREAM%20Red%20%28SB128GBST-R3%29%20%20%20%20%20%201.293.00%20rub.png');
INSERT INTO public.product VALUES (88, 'USB Flash Drive 32Gb - Netac UM1 NT03UM1N-032G-32PN ', 'Поддержка современных стандартов (USB 3.0, USB-C)', 390.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743868/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%20Flash%20Drive%2032Gb%20-%20Netac%20UM1%20NT03UM1N-032G-32PN%20%20%20%20390%20rub.png');
INSERT INTO public.product VALUES (45, 'Lenovo Игровой ноутбук Loq 15arp9 15.6 R7-7435hs16gb512gb Ssdrtx 4060', 'Премиальные материалы корпуса с игровым дизайном', 124.82, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738696283/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/Lenovo%20%D0%98%D0%B3%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20Loq%2015arp9%2015.6%20R7-7435hs16gb512gb%20Ssdrtx%204060%20%20124.819.00%20rub.png');
INSERT INTO public.product VALUES (52, 'Наушники KOSS Porta Pro', 'Беспроводное подключение через Bluetooth', 5.00, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738745276/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20KOSS%20Porta%20Pro%20%20%204.999%20rub.png');
INSERT INTO public.product VALUES (71, 'Планшет Apple iPad (2021) 64Gb Wi-Fi Серый космос', 'Поддержка клавиатуры Magic Keyboard', 26.60, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738697460/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282021%29%2064Gb%20Wi-Fi%20%D0%A1%D0%B5%D1%80%D1%8B%D0%B9%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81%20%20%2026.500.00%20rub.png');
INSERT INTO public.product VALUES (82, 'Накопитель USB 2.0 8GB SmartBuy SB8GBCLU-K ', 'Различные объёмы памяти для любых потребностей', 305.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%9D%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20USB%202.0%208GB%20SmartBuy%20SB8GBCLU-K%20%20305.00%20rub.png');
INSERT INTO public.product VALUES (47, 'Ноутбук AORUS 16X Core i7-13650HX 8Gb SSD1Tb 16.0 RTX 4060 IPS QHD165Hz', 'Поддержка синхронизации RGB-подсветки', 153.00, 10, 3, 'https://res.cloudinary.com/co-phan/image/upload/v1738695872/do%20an%20tot%20nghiep/product/Gaming%2C%20VR/%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%20AORUS%2016X%20Core%20i7-13650HX%208Gb%20SSD1Tb%2016.0%20RTX%204060%20IPS%20QHD165Hz%20...%20%20%20%20152.990.00%20RUB.png');
INSERT INTO public.product VALUES (50, 'Гарнитура Logitech PRO X LIGHTSPEED', 'Комфортная посадка для длительного использования', 17.50, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738745278/do%20an%20tot%20nghiep/product/headphone/%D0%93%D0%B0%D1%80%D0%BD%D0%B8%D1%82%D1%83%D1%80%D0%B0%20Logitech%20PRO%20X%20LIGHTSPEED%20%20%20%20%2017.495.00%20rub.png');
INSERT INTO public.product VALUES (61, 'Наушники JBL TUNE 720BT Black', 'IP-защита от брызг и пыли для надежности', 7.00, 10, 4, 'https://res.cloudinary.com/co-phan/image/upload/v1738744849/do%20an%20tot%20nghiep/product/headphone/%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8%20JBL%20TUNE%20720BT%20Black%20%20%20%206.999%20%20rub.png');
INSERT INTO public.product VALUES (65, 'Планшет Apple iPad (2020) 32Gb Wi-Fi', 'Яркий Retina-дисплей с отличной цветопередачей', 31.16, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738741483/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20%282020%29%2032Gb%20Wi-Fi%20%20%20%20%20%2031.150.00%20rub.png');
INSERT INTO public.product VALUES (75, 'Планшет Apple iPad Mini (2021) 64Gb Wi-Fi Starlight', 'Отличное качество сборки и материалов', 39.50, 10, 5, 'https://res.cloudinary.com/co-phan/image/upload/v1738697452/do%20an%20tot%20nghiep/product/ipad/%D0%9F%D0%BB%D0%B0%D0%BD%D1%88%D0%B5%D1%82%20Apple%20iPad%20Mini%20%282021%29%2064Gb%20Wi-Fi%20Starlight%20%20%20%20%2039.490.00%20rub.png');
INSERT INTO public.product VALUES (80, 'Флешка Smartbuy Crown USB 2.0 32GB (SB32GBCRW-K)', 'Высокая скорость чтения и записи файлов', 650.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738744242/do%20an%20tot%20nghiep/product/Storage%2C%20USB/%D0%A4%D0%BB%D0%B5%D1%88%D0%BA%D0%B0%20Smartbuy%20Crown%20USB%202.0%2032GB%20%28SB32GBCRW-K%29%20%20%20%20%20650.00%20rub.png');
INSERT INTO public.product VALUES (84, 'USB 2.0 накопитель SmartBuy 4GB CLUE Burgundy (SB4GBCLU-BG)', 'Возможность создания загрузочных накопителей', 250.00, 10, 6, 'https://res.cloudinary.com/co-phan/image/upload/v1738743869/do%20an%20tot%20nghiep/product/Storage%2C%20USB/USB%202.0%20%D0%BD%D0%B0%D0%BA%D0%BE%D0%BF%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%20SmartBuy%204GB%20CLUE%20Burgundy%20%28SB4GBCLU-BG%29%20%20%20250.00%20rub.png');


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payment VALUES (35, 'stripe', 'paid', 51, '398.6');


--
-- Data for Name: paymentwithqrcode; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.review VALUES (2, 5, 'hello comment', 166, 2, '2025-09-05 12:45:16.03872', 'nguyen le hoang quan');
INSERT INTO public.review VALUES (3, 3, 'hoangquan', 166, 2, '2025-09-05 13:27:51.065871', 'quannguyen');
INSERT INTO public.review VALUES (4, 5, 'qweqweqwe', 166, 2, '2025-09-07 09:55:24.247267', 'qweqweq');


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 6, true);


--
-- Name: chat_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_message_id_seq', 62, true);


--
-- Name: device_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.device_id_seq', 137, true);


--
-- Name: mfa_otp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mfa_otp_id_seq', 434, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 1, false);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 51, true);


--
-- Name: order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_item_id_seq', 12, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_id_seq', 35, true);


--
-- Name: paymentwithqrcode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paymentwithqrcode_id_seq', 11, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 95, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 166, true);


--
-- PostgreSQL database dump complete
--

