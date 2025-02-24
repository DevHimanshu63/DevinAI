import { useState } from 'react'
import AppRoutes from './AppRoutes/AppRoutes'
import {UserProvider} from './context/user.context.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserProvider>
     <AppRoutes/>
    </UserProvider>
    </>
  )
}

export default App
