import Head from "next/head";

import styles from "@/styles/Home.module.css";

import { Toolbar } from "@/components/toolbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>News App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page-container">
        <Toolbar />
        <div className={styles.main}>
          <h1>Next.js News App</h1>
          <h3>&laquo;Your one stop shop for the latest news articles&raquo;</h3>
        </div>
      </div>
    </>
  );
}
