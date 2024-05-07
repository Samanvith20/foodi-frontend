import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/Home/Signup";
import UserProfile from "../pages/Dashboard/UpdateProfile";
import Cart from "../pages/Menu/Cart";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/users";
import AddMenu from "../pages/Dashboard/admin/addMenu";
import ManageItems from "../pages/Dashboard/admin/ManageItems";
import UpdateMenu from "../pages/Dashboard/admin/updateMenu";
import Login from "../components/Home/Login";
import Payment from "../pages/Menu/Payment";
import Order from "../pages/Dashboard/Order";
import Contact from "../pages/Dashboard/Contact";
import ManageBookings from "../pages/Dashboard/ManageBookings";



const router= createBrowserRouter(
    [
        {
            path:"/",
            element:<Main/>,
            children:[
                {
                 path:"/",
                 element:<Home/>
            },
            {
                path:"/process-checkout",
                element:<Payment/>
            },
            {
                path:"/menu",
                element:<Menu/>
            },
            {
                path: "/order",
                element:<Order/>
              },
              {
                path:"/contact",
                element:<Contact/>
              },
            {
                path: "/update-profile",
                element: <UserProfile/>
              },
              {
                path:"/cart",
                element:<Cart/>
              }
        ]

    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    
    {
        path:"/dashboard",
        element:<Dashboardlayout/>,
        
        children:[
            {
                path: '',
          element: <Dashboard/>
        },
        
        {
            path: 'users', 
          element: <Users/>
        },
        {
            path: 'add-menu',
            element: <AddMenu/>
        },
        {
            path: "manage-items",
            element: <ManageItems/>
        },
        {
            path: "update-menu/:id",
            element: <UpdateMenu/>,
            loader: ({params}) => fetch(`https://foodi-backend-1.onrender.com/api/v1/menu/${params.id}`)
        },
        {
        path:"manage-Bookings",
        element:<ManageBookings/>
        }
        
    ]
        

        

        

    }

]
)
 export default router