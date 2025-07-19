import AddTodoPage from '@/components/templates/AddTodoPage';
import { verifyToken } from '@/utils/auth';
import { useState } from 'react';

export default function AddTodo() {
    const [isLoading, setIsLoading] = useState(false);

    // add new todo handler
    async function addTodoHandler({ title, setTitle, description, setDescription }) {
        if (!title) {
            alert('fill in title input correctly');
            return;
        }
        setIsLoading(true);
        const response = await fetch('/api/add-todo', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) {
            setDescription('');
            setTitle('');
        }
        setIsLoading(false);
    }

    return <AddTodoPage addTodoHandler={addTodoHandler} isLoading={isLoading} />;
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const tokenVerification = verifyToken(token);
    if (!tokenVerification) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
