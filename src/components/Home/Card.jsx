import React, { useContext, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';

import Swal from 'sweetalert2'
import useCart from '../../hooks/useCart';
const Card = ({item}) => {
    
    const{user}=useContext(AuthContext)
     const[cart,refetch]=useCart()
       //console.log(cart);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

   
  //handleCartFunctionality
  const handleCart = (item) => {
    if (user && user.email) {
      const clickedItems = {
        menuItemId: item._id, 
        name: item.name,
        quantity: 1,
        image: item.image,
        price: item.price,
        email: user.email
      };
  
      fetch("https://foodi-backend-1.onrender.com/api/v1/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clickedItems) 
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (refetch) {
          refetch();
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Food added on the cart.',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.log(error);
        let errorMessage = 'An error occurred while adding food to the cart.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        });
      });
    } else {
      Swal.fire({
        title: 'Please login to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate('/signup', {state: {from: location}});
        }
      });
    }
  }
  
  
  

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div to={`/menu/${item._id}`} 
    className="card shadow-xl relative mr-5 md:my-5">
    <div
      className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
        isHeartFilled ? "text-rose-500" : "text-white"
      }`}
      onClick={handleHeartClick}
    >
      <FaHeart className="w-5 h-5 cursor-pointer" />
    </div>
    <Link to={`/menu/${item._id}`}>
      <figure>
        <img src={item.image} alt="" className="hover:scale-105 transition-all duration-300 md:h-72" />
      </figure>
    </Link>
    <div className="card-body">
     <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
      <p>Description of the item</p>
      <div className="card-actions justify-between items-center mt-2">
        <h5 className="font-semibold">
          <span className="text-sm text-red">$ </span> {item.price}
        </h5>
        <Link to ="/cart">
        <button  className="btn bg-green text-white"  onClick={()=>handleCart(item)}>Add to Cart </button>
        </Link>
      </div>
    </div>
  </div>
  );
};
  


export default Card
