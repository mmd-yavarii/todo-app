import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './Calender.module.scss';
import { useRouter } from 'next/router';

function Calender() {
  const week = [];
  const now = new Date();
  const router = useRouter();
  const [selected, setSelected] = useState(now.toLocaleDateString());

  useEffect(() => {
    if (router.query.date) {
      setSelected(router.query.date);
    } else {
      setSelected('all');
    }
  }, [router.query.date]);

  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    week.push({
      date: date.toLocaleDateString(),
      day: date.getDay(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date,
    });
  }

  return (
    <div className={styles.calenderContainer}>
      <Link replace={true} className={selected == 'all' ? styles.selected : null} href={`/`}>
        All
      </Link>
      {week.map((i) => (
        <Link replace={true} key={i.date} className={i.date == selected ? styles.selected : null} href={`/?date=${i.date}`}>
          {i.dayName}
        </Link>
      ))}
    </div>
  );
}

export default Calender;
