"use client";

import { useState } from "react";
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
  workingHours,
  publishDate,
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

    if (userId) {
      const userResponse = await fetch(`http://localhost:8000/users/${userId}`)
      const { data: user } = await userResponse.json()
      const { firstName, lastName, email } = user

      await fetch("http://localhost:8000/applications", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          firstName,
          lastName,
          email
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSubmitted(true);
    } else {
      await fetch("http://localhost:8000/applications", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-gray-900 border border-white border-solid collapse border-1">
      <input type="checkbox" className={styles.checkbox} />
      <div className="flex justify-between text-xl font-medium collapse-title">
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{shortDescription}...</p>
        </div>
        <button className="text-xs cursor-pointer border-gray-50">
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
            <p>Location: {location}</p>
            <p>Type: {type}</p>
            <p>Working hours: {workingHours}</p>
            <p>Salary: {salary}$/h</p>
            <p>Published on: {new Date(publishDate).toDateString()}</p>
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
                  className="w-full max-w-xs form-control"
                  onSubmit={handleSubmit(handlerRegister)}
                >
                  <div>
                    <label htmlFor="message">Message:</label>
                    <input
                      type="textarea"
                      id="message"
                      placeholder="Enter your motivation letter"
                      className="w-full max-w-xs input input-bordered"
                      {...register("message", { required: true })}
                    />
                  </div>

                  <input type="hidden" value={id} {...register("advertisementId")} />

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
                    className="w-full max-w-xs form-control"
                    onSubmit={handleSubmit(handlerRegister)}
                  >
                    <div>
                      <label htmlFor="firstName">First name:</label>
                      <input
                        type="text"
                        id="text"
                        placeholder="Enter your first name"
                        className="w-full max-w-xs input input-bordered"
                        {...register("firstName", { required: true })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName">Last name:</label>
                      <input
                        type="text"
                        id="text"
                        placeholder="Enter your last name"
                        className="w-full max-w-xs input input-bordered"
                        {...register("lastName", { required: true })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full max-w-xs input input-bordered"
                        {...register("email", { required: true })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message">Message:</label>
                      <input
                        type="textarea"
                        id="message"
                        placeholder="Enter your motivation letter"
                        className="w-full max-w-xs input input-bordered"
                        {...register("message", {
                          required: true,
                        })}
                      />
                    </div>
                    <input type="hidden" value={id} {...register("advertisementId")} />
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
