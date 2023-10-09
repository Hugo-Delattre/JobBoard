import React from "react";

import styles from "./index.module.scss";

interface Card {
  title: string;
  description: string;
}

const Card = ({ title, description }: Card) => {
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
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <div className="">
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{description}</p>
        </div>
        <button className="cursor-pointer text-xs">See <br/>more</button>

        {/* <h4>{styles.title}</h4>
        <p>{styles.description}</p> */}
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  );
};

export default Card;
