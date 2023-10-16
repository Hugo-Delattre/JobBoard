"use client";

import Image from "next/image";
import Link from "next/link";
// import styles from "./page.module.css";

import Card from "./components/Card";
import { title } from "process";
import { useEffect, useState } from "react";

export interface Advertisement {
  id: number;
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

const mockCardData = [
  {
    id: 1,
    title: "Développeur web Next.js Express.js",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, unde.",
    company: "Google",
    salary: 30000,
    working_hours: 35,
    active: true,
    publish_date: new Date(),
    images: [
      "https://images.unsplash.com/photo-1622839686941-1a7b3c6a9a8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    ],
    location: "Paris",
    type: "CDI",
  },
  {
    id: 2,
    title: "Ingénieur full stack JAVA",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, unde.",
    company: "Google",
    salary: 30000,
    working_hours: 35,
    active: true,
    publish_date: new Date(),
    images: [
      "https://images.unsplash.com/photo-1622839686941-1a7b3c6a9a8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    ],
    location: "Bordeaux",
    type: "CDI",
  },
];

export default function Home() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/advertisements")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAdvertisements(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="align-middle justify-between items-center">
      {/* <h2>Le job de vos rêves est à portée de clic</h2> */}
      <div className="flex gap-8 flex-col mb-8">
        {advertisements.length === 0 && (
          <div className="flex justify-center my-60">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {advertisements.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              company={card.company}
              salary={card.salary}
              working_hours={card.working_hours}
              active={card.active}
              publish_date={card.publish_date}
              images={card.images}
              location={card.location}
              type={card.type}
            />
          );
        })}
      </div>
      <div className="flex gap-8 flex-col mb-8"></div>
    </main>
  );
}
