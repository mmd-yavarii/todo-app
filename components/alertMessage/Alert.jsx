import { RiErrorWarningFill } from 'react-icons/ri';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

import styles from './Alert.module.scss';
import { createContext, useContext, useEffect, useState } from 'react';

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('hello');
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    if (isVisible) {
      let timeout = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  return (
    <AlertContext.Provider value={{ setMessage, setIsError, setIsVisible }}>
      {children}

      {isVisible && (
        <div className={`${styles.container} ${isError ? styles.error : styles.success}`}>
          <div>
            {isError ? <RiErrorWarningFill fontSize="1.3rem" /> : <IoCheckmarkCircleSharp fontSize="1.3rem" />}
            {message}
          </div>

          <button onClick={() => setIsVisible(false)}>
            <RxCross2 fontWeight="900" fontSize="1.2rem" />
          </button>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const { setMessage, setIsError, setIsVisible } = useContext(AlertContext);

  function showAlert(message, isError) {
    setMessage(message);
    setIsError(isError);
    setIsVisible(true);
  }

  // how it works
  // const showAlert = useAlert();
  // showAlert('hello mmdy', true);

  return showAlert;
}
