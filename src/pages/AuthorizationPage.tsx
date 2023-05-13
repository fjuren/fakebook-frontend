import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

export default function AuthorizationPage() {
  return (
    <>
      <h1>fakebook</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<SignupForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
