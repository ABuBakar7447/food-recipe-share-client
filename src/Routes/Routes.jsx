import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import AllRecipe from "../Pages/AllRecipe/AllRecipe";
import RecipeDetails from "../Pages/RecipeDetails/RecipeDetails";
import BuyCoin from "../Pages/BuyCoin/BuyCoin";
import Private from "./Private";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/addrecipe',
            element:<Private><AddRecipe></AddRecipe></Private>
        },
        {
            path:'/allrecipes',
            element:<AllRecipe></AllRecipe>
        },
        {
            path:'/allrecipes/details/:id',
            element:<Private><RecipeDetails></RecipeDetails></Private>
        },
        {
            path:'/buycoin',
            element:<BuyCoin></BuyCoin>
        },
      ]
    },
  ]);

export default router