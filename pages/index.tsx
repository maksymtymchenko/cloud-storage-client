import Head from "next/head";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cloud Storage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Cloud Storage</h1>
      </main>
    </>
  );
}
