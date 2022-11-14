import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col pl-5 h-contain w-2/5 rounded shadow-lg bg-white ml-12">
      <div className="slide-in-bottom-h1">
        <div className="bounce-top-cards">
      <Link className="my-4 text-lg text-purple-800 font-bold leading-tight text-left" to="/register">← Go to Signup</Link></div>
      <div className="pl-5 mt-6">
      <div className="bounce-top-cards">
        <h2 className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left">Login</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2 bounce-top-cards">
            <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left slide-in-bottom-h1 bounce-top-cards" htmlFor="email">Email address: </label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2 bounce-top-cards">
            <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left" htmlFor="pwd">Password:  </label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 my-3 border-b-4 border-purple-700 hover:border-purple-500 rounded bounce-top-cards slide-in-bottom-h1" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
