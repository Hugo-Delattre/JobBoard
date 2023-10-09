import Image from "next/image";
import Link from "next/link";
// import styles from "./page.module.css";

import Card from "./components/Card";

export default function Home() {
  return (
    <main className="align-middle justify-between items-center">
      {/* <h2>Le job de vos rêves est à portée de clic</h2> */}
      <div className="flex gap-8 flex-col mb-8">
        <Card
          title="Développeur web Next.js Express.js"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, unde."
        />
        <Card
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
        <Card title="titre3" description="test3" />
      </div>
      
    </main>
  );
}
