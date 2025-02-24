import React, { useContext } from 'react'
import { userContext } from '../context/user.context.jsx';

function Home() {
    const { user } = useContext(userContext);
  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default Home