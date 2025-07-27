import React, { useState } from 'react';

export default function AppForm() {
  const [form, setFrom] = useState({ name: '', email: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrom({ ...form, [name]: value }); // [name]은 동적인 키값
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>이름:</label>
      <input
        type='text'
        id='name'
        name='name'
        value={form.name} 
        /* value와 email에 form.name, form.email을 넣어줌으로써 input태그의 값이 바뀔때마다 리엑트에서 업데이트를 발생시킴 */
        onChange={handleChange}
      />
      <label htmlFor='email'>이메일:</label>
      <input
        type='email'
        id='email'
        name='email'
        value={form.email}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
