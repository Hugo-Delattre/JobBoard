"use client";

import React, { useEffect, useState } from "react";
import { getProfileId } from "@/app/utils/auth";
import { useForm } from "react-hook-form";

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
  const [errorMessage, setErrorMessage] = useState("");
  

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
    <div className="collapse bg-base-200">
      {!("data" in userData) && <p>Chargement...</p>}
      {"data" in userData && isEditing && (
        // <div>Editing activated</div>
        <form
          className="p-4 flex gap-4 flex-col rounded"
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
                // setErrorMessage(json);
                console.log("error updating user");
                
              } 
            } catch (error) {
              console.log("error updating user:", error);
              
            }
            
          })}
        >
          <p>User ID: {userData.data.id}</p>
          <input
            type="hidden"
            value={userData.data.id}
            {...register("id", { required: true })}
          />
          <label>
            Email: 
            <input
              type="email"
              defaultValue={userData.data.email}
              {...register("email", { required: false })}
            />
          </label>
          <label>
            First name: 
            <input
              type="text"
              defaultValue={userData.data.firstName}
              {...register("firstName", { required: false })}
            />
          </label>
          <label>
            Last name: 
            <input
              type="text"
              defaultValue={userData.data.lastName}
              {...register("lastName", { required: false })}
            />
          </label>
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 leading-4 rounded-lg group
              bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
              "
            type="submit"
          >
            Save
          </button>
        </form>
      )}
      {"data" in userData && !isEditing && (
        <div>
          <div className="p-4 flex gap-4 flex-col">
            <p>User ID: {userData.data.id}</p>
            <p>Email: {userData.data.email}</p>
            <p>First name: {userData.data.firstName}</p>
            <p>Last name: {userData.data.lastName}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 leading-4 rounded-lg group
              bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
              "
            >
              {/* <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"> */}
              Edit
              {/* </span> */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
