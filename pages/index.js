import React, { useState } from 'react';
import Head from 'next/head'
import LoginForm from '../components/login-form'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  return (
    <div className="container">
      <Head>
        <title>Countless Cars | Home</title>
        <meta name="description" content="You have countless cars!" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Countless Cars</h1>

      <LoginForm 
        token={token}
        setToken={setToken}
        user={user}
        setUser={setUser}
      />
    </div>
  )
}
