import React from "react";
import Link from "next/link";

import styles from "./index.module.scss";

interface Card {
  title: string;
  description: string;
  company: string;
  salary?: number;
  working_hours: number;
  images?: string[];
  active?: boolean;
  publish_date?: Date;
  location: string;
  type: string;
}

const Card = ({
  title,
  description,
  company,
  salary,
  working_hours,
  active,
  publish_date,
  images,
  location,
  type
}: Card) => {
  
  const shortDescription = description.slice(0, 70);
  return (
    // <div className={styles.main}>
    //   <div className={styles.border}>
    //     <div className={styles.main_info}>
    //       <h3 className={styles.title}>{title}</h3>
    //       <p className={styles.description}>{description}</p>
    //     </div>
    //     <button>Learn more</button>
    //   </div>
    // </div>
    <div className="collapse bg-base-200">
      <input type="checkbox" className={styles.checkbox} />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{shortDescription}...</p>
        </div>
        <button className="cursor-pointer text-xs border-gray-50">
          Click
          <br /> to see
          <br />
          more
        </button>
      </div>
      <div className="collapse-content">
        <div className={styles.collapseContent}>
          <div className={styles.collapseContentLeft}>
            <p>{description}</p>
            <p>Company: {company}</p>
            <p>Salary: {salary}$</p>
            <p>Working hours: {working_hours}</p>
            <p>Location: {location}</p>
            <p>Type: {type}</p>
            {/* <p>{active}</p> */}
            {/* <p>{publish_date}</p> */}
            {/* <p>{publish_date}</p> */}
          </div>
          <div className={styles.collapseContentRight}>
            <Link
              href="/login"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Apply
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
