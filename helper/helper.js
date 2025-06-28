const categories = [
  { value: 'work', id: 'cat_work' },
  { value: 'personal', id: 'cat_personal' },
  { value: 'study', id: 'cat_study' },
  { value: 'shopping', id: 'cat_shopping' },
  { value: 'health', id: 'cat_health' },
  { value: 'finance', id: 'cat_finance' },
  { value: 'home', id: 'cat_home' },
  { value: 'fitness', id: 'cat_fitness' },
  { value: 'travel', id: 'cat_travel' },
  { value: 'social', id: 'cat_social' },
  { value: 'other', id: 'cat_other' },
];

// change todo's status handler
async function changeStatus(state, setState) {
  setState(!state);
  try {
    const response = await fetch(`/api/change-status/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(!status),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      setState(!state);
    }
  } catch (error) {
    setState(!state);
  }
}

export { categories, changeStatus };
