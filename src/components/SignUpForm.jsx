import React from 'react'
import { useState } from 'react';

export default function SignUpForm({setToken}) {
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState ("");
    const [error, setError] = useState (null);

    async function handleSubmit (event){
        event.preventDefault();
        try {
            const res = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify ({
                    username, 
                    password,

                }),
            });
        
            const info = await res.json();
            console.log(info);
            setToken(info.token);
            setUsername ("");
            setPassword ("");
        } catch (err) {
            setError(err.message);
        }
    };

  return (
    <>
        <h2>SignUp</h2>
        {error && <p>{error}</p>}
        <form onSubmit = { handleSubmit }>
            <label>
               <input type='text' placeholder='username' minLength="8" value={username} onChange = {(event) => {
                    console.log(event.target.value);
                    setUsername (event.target.value);
                }}
                id = "user-name"
                />
            </label>
            <br />
            <label>
                <input type='text' placeholder='password' value={password} onChange = {(event) => {
                    console.log(event.target.value);
                    setPassword (event.target.value);
                }}
                id = "user-password"
                />
                <button type='submit'>Submit</button>
            </label>
        </form>
    </>
  );
  
}
