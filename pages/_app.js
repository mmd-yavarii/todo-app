import Layout from '@/components/layout/Layout';
import '../styles/global.scss';
import AlertProvider from '@/contexts/alertMessage/Alert';
import ConfirmProvider from '@/contexts/confirm/Confirm';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <AlertProvider>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </AlertProvider>
    </Layout>
  );
}
