import Link from "next/link";
import styles from "./index.module.scss";

const NavBar = () => {
  return (
    <div className="px-16 md:px-32 lg:px-64">
      <nav className={styles.main}>
        <Link href="/" className={styles.logo}>
          JobBoard
        </Link>
        <div className={styles.nav_middle}>
          {/* <Link href="/jobs">Jobs</Link> */}
          {/* <Link href="/companies">Companies</Link> */}
        </div>
        <div className={styles.nav_right}>
          <Link
            href="/login"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
            bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
            "
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </Link>
          <Link
            href="/register"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl transition-all focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
