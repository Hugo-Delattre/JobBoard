"use client";

import React from "react";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/app/store/auth-store";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";

const LoginPage = () => {
  const router = useRouter();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { login } = useAuthStore();

  const connect = () => {
    window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
    login();
  };

  return (
    <div className={styles.container}>
      <form
        className="w-full max-w-xs form-control bg-slate-800"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          try {
            const res = await fetch("http://localhost:8000/auth/login", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              const json = await res.json();
              connect(); //this connect function change global isLoggedIn zustand state to true and put id in local storage

              window.localStorage.setItem("id", json.id);
              await setCookie("id", json.id)

              if (json.role === "admin") {
                router.push("/admin");
              } else {
                router.push("/");
              }
            }
          } catch (error) {
            console.log("Error logging in:", error);
          }
        })}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="email"

            className="w-full max-w-xs input input-bordered"
            {...register("email", { required: true, minLength: 5 })}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="w-full max-w-xs input input-bordered"
            {...register("password", { required: true, minLength: 3 })}
          />
        </div>
        {errors.email && (
          <div className="text-red-500">Please enter an email.</div>
        )}
        {errors.password && (
          <div className="text-red-500">Please enter your password.</div>
        )}

        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
            Login
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
