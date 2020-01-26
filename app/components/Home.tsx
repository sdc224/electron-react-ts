import React from 'react';
import { Link } from 'react-router-dom';
import jsonRoutes from '@routes/jsonRoutes';
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={jsonRoutes.COUNTER}>to Counter</Link>
    </div>
  );
}
