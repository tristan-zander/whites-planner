import "@styles/globals.css";

import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { resetServerContext } from "react-beautiful-dnd";
import { Provider } from "react-redux";
import store from "../features/store";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterLuxon";

function Application({ Component, pageProps }) {
  resetServerContext();

  return (
    <CssBaseline>
      <ThemeProvider theme={createTheme()}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Provider store={store}>
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Head>
                <title>White&#39;s Planner</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <Header title="White's Planner" />
              <Box
                sx={{
                  height: "100%",
                }}
              >
                <Component {...pageProps} />
              </Box>
              <Footer />
            </Box>
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default Application;
