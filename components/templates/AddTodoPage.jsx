import { useState } from 'react';
import { PulseLoader } from 'react-spinners';

function AddTodoPage({ addTodoHandler, isLoading }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="add-todo">
            <p style={{ marginBottom: '20px', textAlign: 'center', fontWeight: '900' }}>Add new todo</p>

            <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={async () => addTodoHandler({ title, setTitle, description, setDescription })}>
                {isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'Add Todo'}
            </button>
        </div>
    );
}

export default AddTodoPage;
