import { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  updateContext,
  addError,
  setAccessToken,
} from "@features/context/contextSlice";
import { Router } from "next/dist/client/router";
import {
  Client,
  CurrentIdentity,
  CurrentToken,
  HasCurrentIdentity,
  HasCurrentToken,
  Now,
  Get,
} from "faunadb";

export default function Login(props) {
  const [loading, setLoading] = useState("Loading...");

  const context = useSelector((state) => state.context.value);
  const dispatch = useDispatch();

  const [origin, setOrigin] = useState(null);

  const effect = useEffect(() => {
    if (typeof window !== undefined) {
      setOrigin(
        window.location.origin.toString() + "/.netlify/functions/google-auth"
      );
    }
  }, [origin]);

  const handleLoginSuccess = async (response) => {
    dispatch(
      updateContext({
        token: response.tokenObj,
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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,OPTIONS,DELETE",
      },
    });

    const checkIdentity = await fauna
      .query(CurrentToken())
      .catch(console.error);

    console.debug(checkIdentity);
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failure ", error);
    setLoading();
  };

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    dispatch(updateContext({ user: null, profile: null }));
  };

  const handleLogoutFailure = (error) => {
    console.log("Logout Failure ", error);
  };

  const handleRequest = () => {
    setLoading("Loading...");
  };

  const handleAutoLoadFinished = () => {
    setLoading();
  };

  return (
    <div>
      {context ? (
        <div>
          <GoogleLogout
            clientId="79968354707-16r3r368f80tqlfmiqq9ls5u06g1q5pi.apps.googleusercontent.com"
            onLogoutSuccess={handleLogoutSuccess}
            onFailure={handleLogoutFailure}
          />
          Authenticated! {JSON.stringify(context)}
        </div>
      ) : (
        <div>
          <h1>Login with Google</h1>
          <GoogleLogin
            clientId="79968354707-16r3r368f80tqlfmiqq9ls5u06g1q5pi.apps.googleusercontent.com"
            buttonText={loading}
            onRequest={handleRequest}
            onFailure={handleLoginFailure}
            onAutoLoadFinished={handleAutoLoadFinished}
            onSuccess={handleLoginSuccess}
            fetchBasicProfile={true}
            responseType="id_token"
            isSignedIn={true}
          />
        </div>
      )}
    </div>
  );
}
