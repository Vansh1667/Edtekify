import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './Components/SignIn'
import AdminPanel from './Components/AdminPanel'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </>
  )
}

export default App
