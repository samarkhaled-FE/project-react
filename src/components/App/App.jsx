import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "../MasterLayout/MasterLayout";
import About from "./../About/About";
import Movies from "./../Movies/Movies";
import Tvshows from "./../Tvshows/Tvshows";
import Register from "./../Register/Register";
import Login from "./../Login/Login";
import People from "./../People/People";
import Home from "./../Home/Home";
import Notfound from "./../Notfound/Notfound";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "movies", element: <Movies /> },
        { path: "tvshows", element: <Tvshows /> },
        { path: "register", element: <Register /> },
        { path: "people", element: <People /> },
        { path: "login", element: <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
