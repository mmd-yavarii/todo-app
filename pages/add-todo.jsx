import { categories } from '@/helper/helper';
import { useState } from 'react';

import styles from '@/styles/AddTodoPage.module.scss';
import { useAlert } from '@/contexts/alertMessage/Alert';
import { BeatLoader } from 'react-spinners';

export default function AddTodo() {
  const showAlert = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
  });

  // change handler
  function changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // submit handler
  async function submitHandler(event) {
    event.preventDefault();
    if (!form.title) {
      showAlert('Please enter the necessary information', true);
      return;
    }

    setIsLoading(true);
    const response = await fetch('/api/add-todo', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    showAlert(result.message, result.status == 'fail');
    if (response.ok) {
      setForm({ title: '', description: '', category: '' });
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>Add New Todo</p>

        <input type="text" id="title" name="title" onChange={changeHandler} placeholder="Title" value={form.title} />

        <input type="text" id="description" name="description" onChange={changeHandler} placeholder="Description" value={form.description} />

        <select name="category" id="category" value={form.category} onChange={changeHandler}>
          <option value="">Select a category</option>
          {categories.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>

        <button type="submit"> {isLoading ? <BeatLoader color="#fff" size="10px" /> : 'Submit'}</button>
      </form>
    </div>
  );
}
