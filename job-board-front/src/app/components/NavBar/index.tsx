"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/store/auth-store";
import { useRouter } from "next/navigation";
import ButtonLight from "../Buttons/ButtonLight";
import Button from "../Buttons/Button";


import styles from "./index.module.scss";

const NavBar = () => {
  const { isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();

  const disconnect = () => {
    window.localStorage.setItem("isLoggedIn", JSON.stringify(false));
    logout();
    window.localStorage.removeItem("id");
    router.push("/");
  };

  return (
    <div className="px-16 md:px-32 lg:px-64">
      <nav className={styles.main}>
        <Link href="/" className={styles.logo}>
          JobBoard
        </Link>
        <div className={styles.nav_middle}>
          {/* <Link href="/companies">Companies</Link> */}
        </div>
        {!isLoggedIn && (
          <div className={styles.nav_right}>
            <ButtonLight text="Login" url="/login" />

            {/* <Link
              href="/login"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
            bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
            "
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login
              </span>
            </Link> */}
            {/* <Button text="Register" url="/register" /> */}
            <Button text="Register" url="/register" />
            {/* <Link
              href="/register"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl transition-all focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Register
            </Link> */}
          </div>
        )}

        {isLoggedIn && (
          <div className={styles.nav_right}>
            <button
              onClick={disconnect}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 leading-4 rounded-lg group 
            bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
            "
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Disconnect
              </span>
            </button>
            <Button text="My Profile" url="/profile" />
            {/* <Link
              href="/profile"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl transition-all focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              My Profile
            </Link> */}
          </div>
        )}

        {/* {isLoggedIn && isAdmin && ()} */}
      </nav>
    </div>
  );
};

export default NavBar;
