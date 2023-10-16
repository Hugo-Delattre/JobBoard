"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/app/store/auth-store";
import { Advertisement } from "@/app/page";
import { getProfileId } from "@/app/utils/auth";

import styles from "./index.module.scss";

const Card = ({
  id,
  title,
  description,
  company,
  salary,
  working_hours,
  active,
  publish_date,
  images,
  location,
  type,
}: Advertisement) => {
  const { register, handleSubmit } = useForm();

  const shortDescription = description.slice(0, 70);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handlerRegister = async (data: any) => {
    const userId = getProfileId();
    if (!userId) {
      console.log(data);
      const res = await fetch("http://localhost:8000/applications", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log(json);
      setIsSubmitted(true);
      return;
    } else {
      console.log("userId", userId);
      data.applicant = userId;
      console.log(data);
      const res = await fetch("http://localhost:8000/applications", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log(json);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" className={styles.checkbox} />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{shortDescription}...</p>
        </div>
        <button className="cursor-pointer text-xs border-gray-50">
          Click to 
          <br />
          learn more
        </button>
      </div>
      <div className="collapse-content">
        <div className={styles.collapseContent}>
          <div className={styles.collapseContentLeft}>
            <p className="w-11/12">{description}</p>
            <p>Company: {company}</p>
            <p>Salary: {salary}$</p>
            <p>Working hours: {working_hours}</p>
            <p>Location: {location}</p>
            <p>Type: {type}</p>
            {/* <p>{active}</p> */}
            {/* <p>{publish_date}</p> */}
          </div>
          <div className={styles.collapseContentRight}>
            <button
              onClick={() => setIsApplying(!isApplying)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {!isApplying ? "Apply" : "Close"}
              </span>
            </button>
          </div>
        </div>
        {isApplying && (
          <div className={`${styles.collapseContent} ${styles.applyingForm}`}>
            <div className={styles.container}>
              {isLoggedIn && !isSubmitted && (
                <form
                  className="form-control w-full max-w-xs"
                  onSubmit={handleSubmit(handlerRegister)}
                >
                  <div>
                    <label htmlFor="resume">Resume:</label>
                    <input
                      type="text"
                      id="resume"
                      placeholder="Enter URL of your resume"
                      className="input input-bordered w-full max-w-xs"
                      {...register("resume", { required: true })}
                    />
                  </div>

                  <div>
                    <label htmlFor="resume">Message:</label>
                    <input
                      type="textarea"
                      id="resume"
                      placeholder="Enter your motivation letter"
                      className="input input-bordered w-full max-w-xs"
                      {...register("message", { required: true })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
                      Send application
                    </span>
                  </button>
                </form>
              )}

              {!isLoggedIn && !isSubmitted && (
                <>
                  <form
                    className="form-control w-full max-w-xs"
                    onSubmit={handleSubmit(handlerRegister)}
                  >
                    {/* <h1>Register</h1> */}
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", { required: true })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="resume">Resume:</label>
                      <input
                        type="text"
                        id="resume"
                        placeholder="Enter URL of your resume"
                        className="input input-bordered w-full max-w-xs"
                        {...register("resume", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="message">Message:</label>
                      <input
                        type="textarea"
                        id="resume"
                        placeholder="Enter your motivation letter"
                        className="input input-bordered w-full max-w-xs"
                        {...register("message", {
                          required: true,
                        })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
                        Send application
                      </span>
                    </button>
                  </form>
                  <p className="opacity-50">
                    Register to avoid filling your email each time.
                  </p>
                </>
              )}

              {isSubmitted && (
                <div className="text-center">
                  <p className="text-green-500">Application sent!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
