import Layout from '@/components/layout/Layout';
import '../styles/global.scss';
import AlertProvider from '@/components/alertMessage/Alert';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </Layout>
  );
}
