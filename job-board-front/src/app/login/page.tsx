"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("Email: ", email);
  //   console.log("Password: ", password);
  //   console.log("Confirm Password: ", confirmPassword);
  // };

  return (
    <div className={styles.container}>
      <form
        className="form-control w-full max-w-xs"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await res.json();
          console.log(json);
        })}
      >
        {/* <h1>Register</h1> */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", { required: true, minLength: 5 })}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs"
            {...register("password", { required: true, minLength: 5 })}
          />
        </div>
        {/* <button type="submit">Register</button> */}

        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
            Register
          </span>
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
