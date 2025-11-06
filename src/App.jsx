import { Routes, Route } from "react-router-dom";
import { Home } from "./Day7/Home";
import { Cart } from "./Day7/Cart";
import { Login } from "./Day6/Login";
import { Signup } from "./Day7/Signup";
import { ProtectedRoute } from "./Day7/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={
          <ProtectedRoute>
          <Home />
          </ProtectedRoute>
          } />
        <Route path="/cart/:id" element={
          <ProtectedRoute>
          <Cart/> 
          </ProtectedRoute>
           }
        />
      </Routes>
    </>
  );
}

export default App;
