import React from 'react';
import { Link } from 'react-router-dom';
import jsonRoutes from '@routes/jsonRoutes.json';
import styles from '@css/components/Counter.css';

type Props = {
  increment: () => void;
  decrement: () => void;
  counter: number;
};

export default function Counter(props: Props) {
  const { increment, decrement, counter } = props;

  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={jsonRoutes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={`counter ${styles.counter}`} data-tid="counter">
        {counter}
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={increment}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
        <button
          className={styles.btn}
          onClick={decrement}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-minus" />
        </button>
      </div>
    </div>
  );
}
