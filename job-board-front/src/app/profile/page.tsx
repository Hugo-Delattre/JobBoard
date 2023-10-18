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
    // profilePicture: number;
    // resume: number;
  };
}

const ProfilePage = () => {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState<UserData | {}>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableUserData, setEditableUserData] = useState<UserData | {}>({});
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const userId = getProfileId();
    setId(userId ? userId : "inconnu.");
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
        setEditableUserData(data);
      })
      .catch((error) => {
        console.log("error getting user data:", error);
      });
  }, [isEditing]);

  return (
    <div className="px-16 md:px-32 lg:px-64">
      {/* <h3 className="text-xl"> */}
      {/* Welcome to your profile page. */}
      {/* {userData && {userData}} */}
      {/* </h3> */}
      {/* <p className="mb-4">Feel free to edit your personal informations.</p> */}
      <div className="border border-white border-solid border-1 text-lg border rounded-lg ">
        {!("data" in userData) && (
          <div className="flex justify-center my-60">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {"data" in userData && isEditing && (
          <form
            className="flex flex-col rounded "
            onSubmit={handleSubmit(async (data) => {
              try {
                console.log("data", data);
                console.log("userData", userData.data);
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
                const json = await res.json;
                console.log("json", json);
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
                <div className="p-4 px-22 flex py-2 gap-4 flex-col justify-center md:flex-row items-center bg-slate-800 rounded-t-lg">
                  <Image
                    src="https://cdn.discordapp.com/attachments/1081136403137712150/1082991411340791958/TravelSquadDefaultUserImage.webp?ex=65423959&is=652fc459&hm=24958223005562882e48ab9037a3230c40bfd930b5085c0ebdc479d5100f1181&"
                    alt="profile picture"
                    width={200}
                    height={200}
                    className="filter brightness-0 invert"
                  />
                  <div>
                    <div>
                      <label>
                        First name:
                        <input
                          type="text"
                          defaultValue={userData.data.firstName}
                          {...register("firstName", { required: false })}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Last name:
                        <input
                          type="text"
                          defaultValue={userData.data.lastName}
                          {...register("lastName", { required: false })}
                        />
                      </label>
                    </div>
                    <label>
                      Email:
                      <input
                        type="email"
                        defaultValue={userData.data.email}
                        {...register("email", { required: false })}
                      />
                    </label>
                    {/* <p>User ID: {userData.data.id}</p>
                    <input
                      type="hidden"
                      value={userData.data.id}
                      {...register("id", { required: true })}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="border border-white border-solid rounded-b-lg bg-slate-800 flex justify-center py-2 bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
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
                <div className="p-4 px-22 flex gap-4 flex-col justify-center md:flex-row items-center bg-slate-800 rounded-t-lg">
                  <Image
                    src="https://cdn.discordapp.com/attachments/1081136403137712150/1082991411340791958/TravelSquadDefaultUserImage.webp?ex=65423959&is=652fc459&hm=24958223005562882e48ab9037a3230c40bfd930b5085c0ebdc479d5100f1181&"
                    alt="profile picture"
                    width={200}
                    height={200}
                    className="filter brightness-0 invert"
                  />
                  <div>
                    <p className="text-4xl mb-2 font-semibold">
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
              <div className="border border-white border-solid rounded-b-lg bg-slate-800 flex justify-center py-2 bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
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
