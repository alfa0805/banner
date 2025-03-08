import { createBrowserRouter } from "react-router-dom";

import Banner from "./Pages/Banner";
import App from "./App";
import Home from "./Pages/Home";
import Boshs from "./Pages/Boshs";

export const Router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,    
    },
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:"/home/banner",
                element:<Banner/>
            },
            {
                path:"/home/bosh",
                element:<Boshs/>
            },
        ]
    },
])
