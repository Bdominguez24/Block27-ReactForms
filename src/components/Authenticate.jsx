import React from 'react'
import { useState } from 'react';

export default function Authenticate({token}) {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick(){
        try{
            const res = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {"content-Type" : "application/json",
                authorization: `Bearer ${token}`,}
            });
            const info = await res.json();
            console.log(info);
            setSuccessMessage(info.message);
            setUsername(info.data.username);

        }catch(err)
        {setError(err.message)}
    }

  return (
    <>
    <h2>Authenticate</h2>
    {error && <p>{error}</p>}
    <button onClick={handleClick}>Authenticate Token</button>
    {successMessage && <p>{successMessage}</p>}
    {username && <p>the logged in user is {username}</p>}
    </>
  );
}
