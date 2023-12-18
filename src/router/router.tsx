import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from 'pages/home/Home';
import WorkerDetails from 'pages/worker-details/WorkerDetails';
import NavBar from 'components/nav-bar/NavBar';

const routes = createBrowserRouter([
  {
    path: "/", 
      element: <NavbarWrapper/>,
      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/:id",
          element: <WorkerDetails/>
        },
      ]
  },
]);

function NavbarWrapper(){
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
};

export default routes;