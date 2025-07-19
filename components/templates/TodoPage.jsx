import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function TodoPage({ completed, _id, title, createdAt, description }) {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(completed);
    const [isLoading, setIsLoading] = useState(false);

    // change todo status handler
    useEffect(() => {
        fetch('/api/todo/change-status', {
            method: 'POST',
            body: JSON.stringify({ isCompleted, _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((error) => {
                alert('something is wrong with updating status');
                setIsCompleted(completed);
            });
    }, [isCompleted]);

    // delete todo handler
    async function deleteTodoHandler() {
        const confirmation = confirm('Are you sure ?');
        if (!confirmation) return;

        setIsLoading(true);
        const response = await fetch('/api/todo/delete-todo', {
            method: 'POST',
            body: JSON.stringify({ _id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) router.replace('/');
        setIsLoading(false);
    }

    return (
        <>
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setIsCompleted(!isCompleted)} className={isCompleted ? 'done' : 'pending '}></button>
                <h2>{title}</h2>
                <p>{moment(createdAt).fromNow()}</p>
            </div>

            <button onClick={deleteTodoHandler} style={{ margin: '10px' }}>
                {isLoading ? 'Loading ...' : 'delete this todo'}
            </button>

            {description && <p style={{ padding: '10px', marginTop: '10px', borderTop: '1px solid #ccc' }}>{description}</p>}
        </>
    );
}

export default TodoPage;
