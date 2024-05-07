import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
// import { uploadToCloudinary } from "../../../../../Backend/src/utils/cloudinary";


const AddMenu = () => {
  
  const { register, handleSubmit,reset } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
   const axiosSecure= useAxiosSecure()
   const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
  
      // Upload image to Cloudinary using "/menu/upload" route
      const response = await axiosSecure.post("/menu/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Set the image URL received from the backend
      const imageUrl = response.data.data;
      // console.log(imageUrl);
  
      console.log("Image uploaded successfully:", imageUrl);
  
      // If the image was uploaded successfully, construct the menu item object
      if (imageUrl) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price), 
          recipe: data.recipe,
          image: imageUrl
        };
  
        // Post menu item to your "/create" route
        const createMenuItemResponse = await axiosSecure.post('/menu/create', menuItem);
  
        if (createMenuItemResponse) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your item is inserted successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
     
    }
  };
  
    
  

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your recipe"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddMenu;