/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import {
  Box,
  Card,
  Paper,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";

import styles from "./index.module.css";

export default function Home() {
  return (
    <ThemeProvider theme={createTheme()}>
      <div className={styles.container}>
        <Head>
          <title>White's Planner</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header title="White's Planner" />
        <main className={styles.main}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              px: 2,
              py: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Paper
              sx={{
                height: "100%",
                py: 3,
                px: 2,
                borderRadius: 5,
                width: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
              variant="outlined"
            >
              <Card sx={{ p: 1, m: 1 }}>
                <Typography variant="h3" sx={{ alignSelf: "flex-start" }}>
                  Homework Board
                </Typography>
              </Card>
              <hr />
              <Card>
                <p className="description">
                  Get started by editing <code>pages/index.js</code>
                </p>
              </Card>
            </Paper>
          </Box>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
