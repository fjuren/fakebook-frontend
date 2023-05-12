import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';

function App() {
  const test = false; // placeholder. This should check if user loggin JWT token is still active. If not, take user to auth page. In auth page, take user to login page.
  if (test) return <AuthorizationPage />;

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
