import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import styles from "@components/LoginPrompt/LoginPrompt.module.css";

import {
  updateContext,
  addError,
  setAccessToken,
  addFaunaClient,
  addUser,
  updateProfile,
} from "@features/context/contextSlice";
import { Client, Get, Collection, Documents } from "faunadb";

import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LoginPrompt(props) {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (response) => {
    dispatch(
      updateProfile({
        profile: response.profileObj,
      })
    );

    const res = await fetch(
      `${window.location.origin}/.netlify/functions/google-auth?id_token=${response.tokenObj.id_token}`
    ).catch(console.error);

    const body = await res.json().catch(console.error);

    if (res.status != 200) {
      dispatch(
        addError({
          error:
            "Could not finish login. The server failed to send a database access token.",
          message: body,
        })
      );
    }

    dispatch(setAccessToken({ token: body.secret }));

    console.debug(body.secret);

    const fauna = new Client({
      secret: process.env.NEXT_PUBLIC_FAUNADB_CLIENT_SECRET,
      headers: {
        Authorization: `Bearer ${body.secret}`,
      },
    });

    dispatch(addFaunaClient({ fauna }));

    const user = fauna
      .query(Get(Documents(Collection("User"))))
      .catch(console.error);
    if (user === null) {
      throw new Error("There was an issue getting your user.");
    }

    dispatch(addUser({ user }));
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failure ", error);
  };

  return (
    <Dialog open={true}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", m: 2 }}>
          Please log in to continue
        </Typography>
        <GoogleLogin
          clientId="79968354707-16r3r368f80tqlfmiqq9ls5u06g1q5pi.apps.googleusercontent.com"
          buttonText={"Login with Google"}
          onFailure={handleLoginFailure}
          onSuccess={handleLoginSuccess}
          fetchBasicProfile={true}
          responseType="id_token"
          isSignedIn={true}
          className={styles.googleButton}
        />
      </Box>
    </Dialog>
  );
}
