import Todo from '@/models/Todos';
import connectDb from '@/utils/connectDb';
import moment from 'moment';

import styles from '@/styles/TodoDetails.module.scss';
import { useState } from 'react';
import { changeStatus } from '@/helper/helper';
import { useConfirm } from '@/contexts/confirm/Confirm';
import { useAlert } from '@/contexts/alertMessage/Alert';
import { useRouter } from 'next/router';

export default function TodoDetails({ info }) {
  const router = useRouter();
  const confirm = useConfirm();
  const showAlert = useAlert();
  const [status, setStatus] = useState(info.status);

  // delete a todo handler
  async function deleteHandler() {
    const confirmation = await confirm(true, 'Delete this item?', 'Are you sure?');
    if (!confirmation) return;
    try {
      const response = await fetch(`/api/delete-todo/${info._id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      showAlert(result.message, result.status === 'fail');
      if (result.status === 'success') router.replace('/');
    } catch (error) {
      showAlert(error.message, true);
    }
  }

  return (
    <>
      <div>
        <h1>{info.title} </h1>
        <p>{moment(info.createdAt).fromNow()}</p>
      </div>

      <div className={styles.btnContainer}>
        <button onClick={() => changeStatus(status, setStatus)}>{status ? 'Undo' : 'Do'}</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>

      <p>{info.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  try {
    await connectDb();
    const response = await Todo.find({}, { _id: 1 });

    const paths = response.map((i) => ({
      params: { todoId: i._id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context) {
  const { todoId } = context.params;

  try {
    await connectDb();
    const response = await Todo.findById(todoId);

    return {
      props: {
        info: JSON.parse(JSON.stringify(response)),
      },
      revalidate: 100,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
