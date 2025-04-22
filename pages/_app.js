import TodosProvider from '@/context/TodosProvider';
import Layout from '@/Layout/Layout';
import '@/sass/global.scss';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </Layout>
  );
}
