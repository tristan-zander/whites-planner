import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateContext, deleteContext } from "@features/context/contextSlice";

export default function Login(props) {
  const [loading, setLoading] = useState("Loading...");

  const context = useSelector((state) => state.context.value);
  const dispatch = useDispatch();

  const handleLoginSuccess = (response) => {
    console.log("Login Success ", response);
    dispatch(
      updateContext({
        token: response.tokenObj,
        profile: response.profileObj,
      })
    );
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
            fetchBasicProfile={false}
            responseType="code"
            redirectUri={`http://${window.location.origin}/?completed_login=true`}
            isSignedIn={false}
          />
        </div>
      )}
    </div>
  );
}
