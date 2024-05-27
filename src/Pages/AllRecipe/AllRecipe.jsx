import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const AllRecipe = () => {
  const { user } = useAuth();
  const [reaction, setReaction] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const [userdetails, refetch] = useUserData();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: allrecipe = [] } = useQuery({
    queryKey: ["allrecipe"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allrecipe");
      const data = await res.json();
      return data;
    },
  });

  const handleReact = (value) => {
    console.log(value);
    // Checking if the value already exists
    const isReacted = reaction.includes(value);
    if (isReacted) {
      // If it exists, removing it from the array
      const updatedReaction = reaction.filter((id) => id !== value);
      setReaction(updatedReaction);
    } else {
      // If it doesn't exist,
      const updatedReaction = [...reaction, value];
      setReaction(updatedReaction);
    }
  };

  const handleFilterItem = (event) => {
    setFilterValue(event.target.value);
  };

  const handleRecipeDetailsAccess = (recipe) => {
    if (!user?.email) {
      Swal.fire({
        title: "Please login to order food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/", { state: { from: location } });
        }
      });
      return;
    }

    console.log(userdetails[0].email, userdetails[0].coin);
    const userpurchased = recipe.purchased_by.filter(
      (user) => user === userdetails[0].email
    );
    console.log(userpurchased);

    if (userdetails[0].email && userdetails[0].email === recipe.creatorEmail) {
      navigate(`details/${recipe._id}`, { state: { from: location } });
    } else if (user?.email && userdetails[0].email && userpurchased[0]) {
      console.log("meaw");
      navigate(`details/${recipe._id}`, { state: { from: location } });
    } else if (
      user?.email &&
      userdetails[0].email &&
      userdetails[0].coin >= 10
    ) {
      console.log("ok");
      Swal.fire({
        title: "Do you want to spend 10 coin to see the details page",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK, I Will",
      }).then((result) => {
        if (result.isConfirmed) {
          const coinData = {
            userEmail: userdetails[0].email,
            userCoin: 10,
            creatorEmail: recipe.creatorEmail,
            creatorCoin: 1,
          };

          axios
            .patch(`http://localhost:5000/recipedetails/${recipe._id}`, {
              coindata: coinData,
            })
            .then((data) => {
              console.log(data);
              refetch();
              navigate(`details/${recipe._id}`, { state: { from: location } });
            });
        }
      });
    } else if (
      user?.email &&
      userdetails[0].email &&
      userdetails[0].coin < 10
    ) {
      Swal.fire({
        title: "You have not enough coin to buy this video. Wants to buy coin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK, buy coin",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/buycoin", { state: { from: location } });
        }
      });
    } else {
      console.log("something went wrong");
    }
  };

  //     Swal.fire({
  //       title: 'Please login to order food',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Login Now'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate('/', { state: { from: location } });
  //       }
  //     });
  //     return;
  //   }

  //   console.log(userdetails[0].email, userdetails[0].coin);
  //   const userpurchased = recipe.purchased_by.filter(
  //     (user) => user === userdetails[0].email
  //   );
  //   console.log(userpurchased);

  //   if (userdetails[0].email && userpurchased[0]) {
  //     navigate(`details/${recipe._id}`, { state: { from: location } });
  //   } else if (userdetails[0].coin >= 10) {
  //     Swal.fire({
  //       title: "Do you want to spend 10 coin to see the details page",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "OK, I Will",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const coinData = {
  //           userEmail: userdetails[0].email,
  //           userCoin: 10,
  //           creatorEmail: recipe.creatorEmail,
  //           creatorCoin: 1,
  //         };

  //         axios
  //           .patch(`http://localhost:5000/recipedetails/${recipe._id}`, {
  //             coindata: coinData,
  //           })
  //           .then((data) => {
  //             console.log(data);
  //             refetch();
  //             navigate(`details/${recipe._id}`, { state: { from: location } });
  //           });
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "You have not enough coin to buy this video. Wants to buy coin?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "OK, buy coin",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate("/buycoin", { state: { from: location } });
  //       }
  //     });
  //   }
  // };

  const recipies = filterValue
    ? allrecipe.filter(
        (recipe) =>
          filterValue.toLowerCase() === recipe.category.toLowerCase() ||
          filterValue.toLowerCase() === recipe.country.toLowerCase() ||
          filterValue.toLowerCase() === recipe.recipeName.toLowerCase()
      )
    : allrecipe;

  const removedupliCateogry = [
    ...new Set(allrecipe.map((recipe) => recipe.category)),
  ];

  return (
    <div>
      <div className="w-3/4 mx-auto flex justify-evenly items-center my-16">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleFilterItem}
        >
          <option disabled selected value={"choose category"}>
            choose category?
          </option>
          {removedupliCateogry.map((recipe) => (
            <option key={recipe._id} value={recipe}>
              {recipe}
            </option>
          ))}
        </select>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search By Country"
            onChange={handleFilterItem}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search By Recipe Name"
            onChange={handleFilterItem}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="w-3/4 mx-auto grid grid-cols-3 gap-5">
        {recipies.map((recipe) => (
          <div
            className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300 my-5"
            key={recipe.key}
          >
            <div className="bg-white w-[400px] h-[520px] border-2 rounded-lg p-3 flex flex-col justify-start gap-5 items-center hover:shadow-2xl">
              <div>
                <img
                  src={recipe.recipeImage}
                  alt=""
                  className="w-[400px] h-[250px] object-cover rounded-lg"
                />
              </div>

              <div className="font-semibold h-[140px] text-start">
                <h2 className="font-bold text-2xl text-center my-3 text-yellow-600">
                  {recipe.recipeName}
                </h2>
                <p className="text-black">Creator By: {recipe.creatorEmail}</p>
                <p className="text-black">Recipe of: {recipe.country}</p>
                {recipe?.purchased_by.length > 0 ? (
                  <p className="text-black">
                    Purchased by: {recipe?.purchased_by.length}
                  </p>
                ) : (
                  <p className="text-black">Purchased by: 0</p>
                )}
              </div>

              <div className="flex justify-evenly w-full">
                <button
                  className="hover:text-black"
                  onClick={() => handleRecipeDetailsAccess(recipe)}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/yxczfiyc.json"
                    trigger="hover"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </button>

                <button className="" onClick={() => handleReact(recipe._id)}>
                  {reaction.includes(recipe._id) ? (
                    <lord-icon
                      src="https://cdn.lordicon.com/ulnswmkk.json"
                      trigger="hover"
                      colors="primary:#c71f16"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  ) : (
                    <lord-icon
                      src="https://cdn.lordicon.com/xyboiuok.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipe;
