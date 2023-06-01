import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import { useEffect, useState } from 'react';

function App() {
  const [authUser, setAuthUser] = useState('');

  useEffect(() => {
    // const getUser = JSON.parse(localStorage.getItem('token') || '{}');
    const getUser: string | null = localStorage.getItem('token');
    console.log(getUser);

    if (getUser) {
      setAuthUser(getUser);
    }
  }, []);

  if (authUser === '') return <AuthorizationPage />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/timeline"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
