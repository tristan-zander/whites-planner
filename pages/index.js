import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Box, Paper } from "@material-ui/core";

import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>White's Planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="White's Planner" />
      <main className={styles.main}>
        <Box
          className={styles.box}
          sx={{
            px: 8,
            py: 15,
            border: "1px dashed grey",
            display: "flex",
            flexGrow: 1,
          }}
        >
          <Paper sx={{
            height: 'auto'
          }}>
            <p className="description">
              Get started by editing <code>pages/index.js</code>
            </p>
          </Paper>
        </Box>
      </main>
      <Footer />
    </div>
  );
}
