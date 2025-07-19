import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function TodoCard({ title, completed, createdAt, _id }) {
    const [isCompleted, setIsCompleted] = useState(completed);

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

    return (
        <div className="todo">
            <Link href={`/todo/${_id}`}>
                {title} <span>{moment(createdAt).fromNow()}</span>
            </Link>
            <button onClick={() => setIsCompleted(!isCompleted)} className={isCompleted ? 'done' : 'pending '}></button>
        </div>
    );
}

export default TodoCard;
