import Image from "next/image";
import Link from "next/link";
// import styles from "./page.module.css";

import Card from "./components/Card";
import { title } from "process";

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
    type: "CDI"
  },
];

export default function Home() {
  return (
    <main className="align-middle justify-between items-center">
      {/* <h2>Le job de vos rêves est à portée de clic</h2> */}
      <div className="flex gap-8 flex-col mb-8">
        {mockCardData.map((card) => {
          return (
            <Card
              key={card.id}
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

        {/* <Card
          title="Développeur web Next.js Express.js"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, unde."
        /> */}
        {/* <Card
          title="Ingénieur full stack JAVA"
          description="Passionné.e par le développement logiciel, vous détenez un Bac+5 avec au moins 1 an d’expérience réussie en développement web sur une stack JAVA, Spring, framework Javascript (Angular, Vue.js) ?"
        />
        <Card
          title="Développeur web Next.js Express.js"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, unde."
        />
        <Card
          title="Ingénieur full stack JAVA"
          description="Passionné.e par le développement logiciel, vous détenez un Bac+5 avec au moins 1 an d’expérience réussie en développement web sur une stack JAVA, Spring, framework Javascript (Angular, Vue.js) ?"
        />
        <Card title="titre3" description="test3" />
        <Card title="titre3" description="test3" />

        <Card title="titre3" description="test3" />

        <Card title="titre3" description="test3" />
        <Card title="titre3" description="test3" />
        <Card title="titre3" description="test3" />
        <Card title="titre3" description="test3" /> */}
      </div>
    </main>
  );
}
