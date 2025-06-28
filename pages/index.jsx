import Card from '@/components/modules/Card';
import Todo from '@/models/Todos';
import connectDb from '@/utils/connectDb';

export default function Home({ todos }) {
  return (
    <>
      {todos.length ? todos.map((i) => <Card {...i} key={i._id} />) : <p style={{ marginTop: '100px', textAlign: 'center' }}>there's no todo yet</p>}
    </>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.query;

  try {
    await connectDb();

    let response = null;
    if (category) {
      response = await Todo.find({ category: category }).sort({ createdAt: -1 });
    } else {
      response = await Todo.find().sort({ createdAt: -1 });
    }
    return {
      props: {
        todos: JSON.parse(JSON.stringify(response)),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
