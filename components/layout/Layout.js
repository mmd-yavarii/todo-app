import Link from 'next/link';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';

import { IoArrowBackSharp } from 'react-icons/io5';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        {router.asPath === '/' ? (
          <Link href="/add-todo">Add New Todo</Link>
        ) : (
          <button onClick={() => router.back()}>
            <IoArrowBackSharp fontSize="1.4rem" />
          </button>
        )}
      </header>

      <main>{children}</main>
    </>
  );
}
