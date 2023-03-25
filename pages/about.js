import Head from "next/head";

import styles from "@/styles/About.module.css";

import { Toolbar } from "@/components/toolbar";

const About = ({ person }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className="page-container">
        <Toolbar />
        <div className={styles.main}>
          <h1>Hello, I&prime;m</h1>
          <div className={styles.aboutSection}>
            <h2>{person.name}</h2>
            <h5>{person.position}</h5>
            <img src={person.image} alt="person" />
            <p>{person.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/yomche/about-fake-rest-api/about"
  );
  const person = await apiResponse.json();

  return {
    props: {
      person,
    },
  };
};

export default About;
