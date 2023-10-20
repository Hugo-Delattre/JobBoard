"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuthStore } from "../store/auth-store";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { login } = useAuthStore();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={styles.container}>
      <form
        className="form-control w-full max-w-xs bg-slate-800"
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);
            const res = await fetch("http://localhost:8000/users", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const json = await res.json();
            console.log("json", json);
            if (res.ok) {
              router.push("/login");
            } else {
              setErrorMessage(json);
            }
          } catch (error) {
            console.log("error creating user:", error);
          }
        })}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", { required: true, minLength: 5 })}
            required
          />
        </div>

        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="firstName"
            id="firstName"
            className="input input-bordered w-full max-w-xs"
            {...register("firstName", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="lastName"
            id="lastName"
            className="input input-bordered w-full max-w-xs"
            {...register("lastName", { required: true })}
          />
        </div>

        {/* <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="input input-bordered w-full max-w-xs"
            {...register("role", { required: true })}
            required
          >
            <option value="">Choose your role</option>
            <option value="user">Applicant</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        {/* <div>
          <label htmlFor="resume">Resume</label>
          <input
            type="text"
            id="resume"
            placeholder="Enter URL of your resume"
            className="input input-bordered w-full max-w-xs"
            {...register("resume", { required: false })}
          />
        </div> */}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full max-w-xs"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.email && (
          <div className="text-red-500">Please provide an email.</div>
        )}
        {errors.firstName && (
          <div className="text-red-500">Please provide your first name.</div>
        )}
        {errors.lastName && (
          <div className="text-red-500">Please provide your last name.</div>
        )}
        {errors.password && (
          <div className="text-red-500">Please provide a password.</div>
        )}
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
