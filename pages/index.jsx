import connectDb from '@/utils/connectDb';

export default function Home() {
  return <></>;
}

export async function getServerSideProps() {
  try {
    await connectDb();

    return {
      props: {},
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
