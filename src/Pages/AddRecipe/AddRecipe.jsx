import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddRecipe = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { register, handleSubmit } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    // console.log(data)

    const formdata = new FormData();
    formdata.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((imgresponse) => {
        if (imgresponse.success) {
          const imgURL = imgresponse.data.display_url;

          const { name,category,recipeDetails,country,embeddedCode } = data;

          //   const menuItem = {
          //     name,
          //     recipe,

          //     category,
          //     image: imgURL,
          //   };

          const menuItem = {
            recipeName: name,
            recipeImage: imgURL,
            recipeDetails: recipeDetails,
            embeddedCode:embeddedCode,
            country: country,
            category: category,
            creatorEmail: user.email,
            watchCount: 0,
            purchased_by: [],
          };
          console.log(menuItem);

          axiosSecure.post('/recipeItems', menuItem)
          .then(data =>{
              if(data.data.insertedId){
                  Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Your Item has been added',
                      showConfirmButton: false,
                      timer: 1500
                    })
              }
          })
        }
      });
  };
  return (
    <div className="w-full">
      <div className="w-3/4 mx-auto p-8 m-8 bg-gray-200 font-semibold">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text text-black">Recipe Name*</span>
              </label>
              <input
                type="text"
                placeholder="Type Recipe Name"
                {...register("name", { required: true, maxLength: 120 })}
                className="input input-bordered w-full bg-white text-black"
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text text-black">
                  Your Youtube Video Embeded Code*
                </span>
              </label>
              <input
                type="text"
                placeholder="Type Recipe Name"
                {...register("embeddedCode", {
                  required: true,
                  maxLength: 120,
                })}
                className="input input-bordered w-full bg-white text-black"
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text text-black">Country*</span>
              </label>
              <input
                type="text"
                placeholder="Type Recipe Name"
                {...register("country", { required: true, maxLength: 120 })}
                className="input input-bordered w-full bg-white text-black"
              />
            </div>

            <div className="flex mt-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-black">Category*</span>
                </label>

                <select
                  defaultValue="Pick One"
                  {...register("category", { required: true })}
                  className="select select-bordered bg-white"
                >
                  <option disabled>Pick One</option>
                  <option className="font-semibold bg-white text-black">
                    soup
                  </option>
                  <option className="font-semibold bg-white text-black">
                    dessert
                  </option>
                  <option className="font-semibold bg-white text-black">
                    pizza
                  </option>
                  <option className="font-semibold bg-white text-black">
                    salad
                  </option>
                  <option className="font-semibold bg-white text-black">
                    drinks
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text text-black">Recipe Details*</span>
            </label>

            <textarea
              {...register("recipeDetails", { required: true })}
              className="textarea textarea-bordered h-24 bg-white text-black"
              placeholder="Type Recipe Details"
            ></textarea>
          </div>

          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text text-black">Item Image*</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input bg-white text-black file-input-bordered w-full max-w-xs"
            />
          </div>

          <input
            type="submit"
            className="mt-4 hover:bg-slate-700 hover:text-white btn btn-outline bg-slate-300 text-black border-[#BB8506] border-0 border-b-4"
            value="Add Item"
          />
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
