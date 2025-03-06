import { createBrowserRouter } from "react-router-dom";

import Banner from "./Pages/Banner";
import App from "./App";
import Home from "./Pages/Home";

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
        ]
    },
])
