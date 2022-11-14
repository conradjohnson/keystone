import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Register(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        name: formState.name,
       
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col pl-5 pt-5 h-96 w-3/5 rounded shadow-lg bg-purple-100 ml-72 mt-6">
      <div className="slide-in-bottom-h1">
      <div className="bounce-top-cards">
      <Link className="my-4 text-lg text-purple-800 font-bold leading-tight text-left" to="/login">← Go to Login</Link>
      </div>
      <div className="pl-60 mt-6">
      <h2 className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left slide-in-bottom-h1 bounce-top-cards">Register</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2 bounce-top-cards">
          <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left slide-in-bottom-h1 bounce-top-cards" htmlFor="firstName">Name: </label>
          <input
            placeholder="Full Name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
       
        <div className="flex-row space-between my-2 bounce-top-cards">
          <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left" htmlFor="email">Email: </label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2 bounce-top-cards">
          <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left" htmlFor="pwd">Password: </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 my-3 border-b-4 border-purple-700 hover:border-purple-500 rounded bounce-top-cards slide-in-bottom-h1" type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Register;
