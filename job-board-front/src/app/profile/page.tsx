"use client";

import React, { useEffect, useState } from "react";
import { getProfileId } from "@/app/utils/auth";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { LiaEditSolid, LiaSaveSolid } from "react-icons/lia";

interface UserData {
  data: {
    // company: string;
    email: string;
    firstName: string;
    lastName: string;
    id: number;
    role: string;
    // gender: string;
    profilePicture: string;
    // resume: number;
  };
}

const ProfilePage = () => {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState<UserData | {}>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableUserData, setEditableUserData] = useState<UserData | {}>({});
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const userId = getProfileId();
    setId(userId ? userId : "inconnu.");
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setEditableUserData(data);
      })
      .catch((error) => {
        console.log("error getting user data:", error);
      });
  }, [isEditing]);

  return (
    <div className="px-8 mb-8 md:px-32 lg:px-64">
      <div className="text-lg border border-white border-solid rounded-lg border-1 ">
        {!("data" in userData) && (
          <div className="flex justify-center my-60">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {"data" in userData && isEditing && (
          <form
            className="flex flex-col rounded"
            onSubmit={handleSubmit(async (data) => {
              try {
                const res = await fetch(
                  `http://localhost:8000/users/${userData.data.id}`,
                  {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (res.ok) {
                  setIsEditing(false);
                  console.log("user updated successfully");
                } else {
                  console.log("error updating user");
                }
              } catch (error) {
                console.log("error updating user:", error);
              }
            })}
          >
            <div>
              <div>
                <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-t-lg px-22 md:flex-row bg-slate-800">
                  <Image
                    src={
                      userData.data.profilePicture
                        ? userData.data.profilePicture
                        : "https://cdn.discordapp.com/attachments/1081136403137712150/1082991411340791958/TravelSquadDefaultUserImage.webp?ex=65423959&is=652fc459&hm=24958223005562882e48ab9037a3230c40bfd930b5085c0ebdc479d5100f1181&"
                    }
                    alt="profile picture"
                    width={200}
                    height={200}
                    className={
                      userData.data.profilePicture
                        ? "rounded-full border-2 border-white border-solid mr-3"
                        : "filter brightness-0 invert"
                    }
                  />
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm">
                        First name:
                        <br />
                        <input
                          className="px-2 text-lg rounded-md bg-slate-900"
                          type="text"
                          defaultValue={userData.data.firstName}
                          {...register("firstName", { required: false })}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="text-sm">
                        Last name:
                        <br />
                        <input
                          type="text"
                          className="px-2 text-lg rounded-md bg-slate-900"
                          defaultValue={userData.data.lastName}
                          {...register("lastName", { required: false })}
                        />
                      </label>
                    </div>
                    <label className="text-sm">
                      Email:
                      <br />
                      <input
                        type="email"
                        className="px-2 text-lg rounded-md bg-slate-900"
                        defaultValue={userData.data.email}
                        {...register("email", { required: false })}
                      />
                      {errors.email && (
                        <span className="text-red-500">Email is required</span>
                      )}
                    </label>
                    <label className="text-sm">
                      Profile picture:
                      <br />
                      <input
                        type="text"
                        className="px-2 text-lg rounded-md bg-slate-900"
                        defaultValue={userData.data.profilePicture}
                        {...register("profilePicture", {
                          required: false,
                          pattern:
                            /\.(jpg|jpeg|png|gif|webp)(\?.*)?$|^https?:\/\/.+/i,
                        })}
                      />
                    </label>
                    {errors.profilePicture && (
                      <span className="text-xs text-red-500">
                        Profile picture must be a valid image URL
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center py-2 border border-white border-solid rounded-b-lg bg-slate-800 bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <button onClick={() => setIsEditing(true)} className="">
                  <LiaSaveSolid className="w-6 h-6" />
                </button>
              </div>
            </div>
          </form>
        )}
        {"data" in userData && !isEditing && (
          <div>
            <div>
              <div>
                <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-t-lg px-22 md:flex-row bg-slate-800">
                  <Image
                    src={
                      userData.data.profilePicture
                        ? userData.data.profilePicture
                        : "https://cdn.discordapp.com/attachments/1081136403137712150/1082991411340791958/TravelSquadDefaultUserImage.webp?ex=65423959&is=652fc459&hm=24958223005562882e48ab9037a3230c40bfd930b5085c0ebdc479d5100f1181&"
                    }
                    alt="profile picture"
                    width={200}
                    height={200}
                    className={
                      userData.data.profilePicture
                        ? "rounded-full border-2 border-white border-solid mr-3"
                        : "filter brightness-0 invert"
                    }
                  />
                  <div>
                    <p className="mb-2 text-4xl font-semibold">
                      {userData.data.firstName} {userData.data.lastName}
                    </p>

                    <p>Email: {userData.data.email}</p>
                    <p>User ID: {userData.data.id}</p>
                    <p>Role: {userData.data.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex justify-center py-2 border border-white border-solid rounded-b-lg bg-slate-800 bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <button onClick={() => setIsEditing(true)} className="">
                  <LiaEditSolid className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
