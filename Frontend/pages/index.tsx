import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar'
import {Hero} from '../components/Hero';
import Footer from '../components/Footer'
const Home: NextPage = () => {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  );
};

export default Home;
