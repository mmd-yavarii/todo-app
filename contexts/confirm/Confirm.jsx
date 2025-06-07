import { createContext, useContext, useState } from 'react';
import styles from './Confirm.module.scss';

const ConfirmContext = createContext();

export default function ConfirmProvider({ children }) {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [resolveCallback, setResolveCallback] = useState(null);

  const cancel = () => {
    setShow(false);
    if (resolveCallback) resolveCallback(false);
  };

  const confirm = () => {
    setShow(false);
    if (resolveCallback) resolveCallback(true);
  };

  const confirmHandler = (isError, title, message) => {
    setIsError(isError);
    setTitle(title);
    setMessage(message);
    setShow(true);

    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  return (
    <ConfirmContext.Provider value={confirmHandler}>
      {show && (
        <div className={styles.back} onClick={cancel}>
          <div className={`${styles.container} ${isError ? styles.error : styles.success}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.message}>
              <h4>{title}</h4>
              <p>{message}</p>
            </div>

            <div className={styles.buttons}>
              <button onClick={cancel}>Cancel</button>
              <button className={`${styles.confirm} ${isError ? styles.error : styles.success}`} onClick={confirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);

  // how it works
  //   const confirm = useConfirm();
  //   async function handleDelete() {
  //     const userConfirmed = await confirm(false, 'Delete this item?', 'Are you sure?');
  //     console.log(userConfirmed);
  //   }
}
