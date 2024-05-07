import React, { useContext, useState } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom"
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';

const Modal = () => {
     //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();
  const [errorMessage, seterrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);
  const navigate = useNavigate();
 // console.log(navigate);
  const location = useLocation();
  //console.log(location);
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email,password);
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        // console.log(user);
        alert("Login successful!");
        navigate(from, { replace: true });
        document.getElementById("my_modal_5").close()
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
      reset()  //  form fields are cleared after submission

  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios
          .post("https://foodi-backend-1.onrender.com/api/v1/user/create", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          })
          .catch((error) => console.log(error));
        document.getElementById("my_modal_5").close();
      })
      .catch((error) => console.log(error));
  };
  

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
             onSubmit={handleSubmit(onSubmit)}
          >
           <h3 className="font-bold text-lg">
           Please Login </h3>


            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>

            <p className="text-center my-2">
               Do not have an account? 
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
          <div className="text-center space-x-3 mb-5">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default Modal
