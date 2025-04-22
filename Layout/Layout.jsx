import styles from '@/sass/Layout.module.scss';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { IoArrowBackOutline } from 'react-icons/io5';

function Layout({ children }) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <header className={styles.header}>
        {path != '/todos' ? (
          <button onClick={() => router.back()}>
            <IoArrowBackOutline fontSize="1.3rem" />
          </button>
        ) : (
          <span></span>
        )}
        <Link href="/add">Add New</Link>
      </header>

      {children}
    </>
  );
}

export default Layout;
