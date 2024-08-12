import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root/Root";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard/Dashboard";
import FlashPage from "./pages/FlashPage/FlashPage";

function App() {
  const { loggedIn } = useSelector((state) => state.user);

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: loggedIn ? <Dashboard /> : <Home />,
          children: [{ path: "", element: <FlashPage /> }],
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
