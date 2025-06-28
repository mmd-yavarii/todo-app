import styles from '@/styles/Card.module.scss';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';

function Card({ title, status, createdAt, _id }) {
  const [isDone, setIsDone] = useState(status);

  // change todo's status handler
  async function changeStatus() {
    setIsDone(!isDone);
    try {
      const response = await fetch(`/api/change-status/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(!status),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setIsDone(!isDone);
      }
    } catch (error) {
      setIsDone(!isDone);
    }
  }

  return (
    <div className={styles.container}>
      <div className={isDone ? styles.selected : styles.status} onClick={changeStatus}></div>

      <Link href={`/${_id}`}>
        <p>{title}</p>
        <p className={styles.time}>{moment(createdAt).fromNow()}</p>
      </Link>
    </div>
  );
}

export default Card;
