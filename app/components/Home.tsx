import React from 'react';
import { Link } from 'react-router-dom';
import jsonRoutes from '@routes/jsonRoutes.json';
import styles from '@componentsCSSStyles/Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <br />
      <Link to={jsonRoutes.DASHBOARD}>to Dashboard</Link>
    </div>
  );
}
