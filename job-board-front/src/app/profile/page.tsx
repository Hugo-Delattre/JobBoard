"use client";

import React, { useEffect, useState } from "react";
import { getProfileId } from "@/app/utils/auth";

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

  useEffect(() => {
    const userId = getProfileId();
    setId(userId ? userId : "inconnu.");
    fetch(`http://localhost:8000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((error) => {
        console.log("error getting user data:", error);
      });
  }, []);

  return (
    <div>
      {!("data" in userData) && <p>Chargement...</p>}
      {"data" in userData && (
        <div>
          <p>User ID: {userData.data.id}</p>
          <p>Email: {userData.data.email}</p>
          <p>First name: {userData.data.firstName}</p>
          <p>Last name: {userData.data.lastName}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
