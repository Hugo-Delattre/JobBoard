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
        console.log(data.data);
        setAdvertisements(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="align-middle justify-between items-center">
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
    </main>
  );
}
