import { Routes, Route } from "react-router-dom";
// import { Form } from "./CRUD/Pages/Form";
// import { UserList } from "./CRUD/Pages/UserList";
// import { Form } from "./Crud2/Components/Form";
// import { Userdata } from "./Crud2/Components/UserData";
// import { DetailPage } from "./Crud2/Components/DetailPage";
import Parent from "./UseContext/Parent";
import { SimpleForm } from "./SimpleForm/SimpleForm";
// import { Navbar } from "./Day8/Navbar";
// import { Cards } from "./Day8/Cards";
// import { Todo } from "./Day8/Todo";
// import { Home } from "./Day7/Home";
// // import { Cart } from "./Day7/Cart";
// import { Login } from "./Day7/Login";
// import { Signup } from "./Day7/Signup";

// import { ProtectedRoute } from "./Day7/ProtectedRoute";
// import { Suspense , lazy} from 'react';

// const Home = lazy(() => import('./Day7/Home'));
// const Cart = lazy(() => import('./Day7/Cart'));
// const Signup = lazy(() => import('./Day7/Signup'));
// const Login = lazy(() => import('./Day7/Login'));

// import ListingPage from "./UseContext/ListingPage";
// import { Form } from "./Formhandling/Form";
// import { Form2 } from "./Formhandling/Form2";

function App() {
  return (
//  <Form/>
      // <Routes>
      //   <Route path="/" element={<Form/>} />
      //   <Route path="/listing" element={<Form2 />} />
      // </Routes>


      <SimpleForm/>
       
    // <Routes>
    //   <Route path="/" element={<Form/>}/>
    //   <Route path='/form/:id' element={<Form/>}/>
    //   <Route path='/user-list' element={<UserList/>}/>
    // </Routes>

    // <Suspense fallback={<div>Loading...</div>}>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />

    //     <Route path="/" element={
    //       <ProtectedRoute>
    //         <Home />
    //       </ProtectedRoute>
    //     } />

    //     <Route path="/cart/:id" element={
    //       <ProtectedRoute>
    //         <Cart />
    //       </ProtectedRoute>
    //     } />
    //   </Routes>
    // </Suspense>


  //  <Cards/>
 

// {/* <Routes>
//   <Route path="/" element={<Form/>}/>
//   <Route path="/form/:id" element={<Form/>}/>
//   <Route path="/user-data" element={<Userdata/>}/>
//   <Route path="/detail/:id" element={<DetailPage/>}/>
// </Routes> */}


);
}

export default App;
