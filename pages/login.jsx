import { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateContext, deleteContext } from "@features/context/contextSlice";
import { Router } from "next/dist/client/router";

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
    console.log(origin);
  }, [origin]);

  const handleLoginSuccess = async (response) => {
    console.log("Login Success ", response);
    dispatch(
      updateContext({
        token: response.tokenObj,
        profile: response.profileObj,
      })
    );

    const res = await fetch(
      `${window.location.origin}/.netlify/functions/google-auth?id_token=${response.tokenObj.id_token}`
    );

    console.debug(res);

    setLoading();
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failure ", error);
    setLoading();
  };

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    dispatch(deleteContext());
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
        <div>Authenticated! {JSON.stringify(context)}</div>
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
