import { changeStatus } from '@/helper/helper';
import styles from '@/styles/Card.module.scss';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';

function Card({ title, status, createdAt, _id }) {
  const [isDone, setIsDone] = useState(status);

  return (
    <div className={styles.container}>
      <div className={isDone ? styles.selected : styles.status} onClick={() => changeStatus(isDone, setIsDone)}></div>

      <Link href={`/${_id}`}>
        <p>{title}</p>
        <p className={styles.time}>{moment(createdAt).fromNow()}</p>
      </Link>
    </div>
  );
}

export default Card;
