import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <header className={styles.header}></header>

      <main>{children}</main>
    </>
  );
}
