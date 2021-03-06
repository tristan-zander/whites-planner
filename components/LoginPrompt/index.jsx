import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import styles from "@components/LoginPrompt/LoginPrompt.module.css";

import {
  addError,
  setAccessToken,
  addUser,
  updateProfile,
} from "@features/context/contextSlice";
import { Client, Call, Function } from "faunadb";

import { Dialog, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addBoard } from "@features/boards/boardsSlice";
import { addAssignment } from "@features/assignments/assignmentsSlice";
import { addTaskList } from "@features/task_lists/taskListsSlice";
import { normalizeDbObject, normalizeRef } from "@features/normalize";

export default function LoginPrompt(props) {
  const dispatch = useDispatch();

  // TODO: See if the url has all the stuff from google redirect
  // Then Router.push('/')

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

    const fauna = new Client({
      secret: body.secret,
    });

    const data = await fauna
      .query(Call(Function("QueryInitialData")))
      .catch(console.error);

    if (data === undefined) {
      return;
    }

    console.debug(data);

    const { user, boards, assignments, taskLists } = data;

    const userData = {
      user: {
        ...normalizeDbObject(user),
        registeredSince: user.data.registeredSince.value,
      },
    };

    dispatch(addUser(userData));

    boards.data.forEach((board) => {
      const boardData = {
        ...normalizeDbObject(board),
        lists: board.data.lists.map((l) => {
          return normalizeRef(l);
        }),
      };
      console.debug(boardData);
      dispatch(addBoard(boardData));
    });

    assignments.data.forEach((d) => {
      const data = normalizeDbObject(d);

      dispatch(addAssignment(data));
    });

    taskLists.data.forEach((d) => {
      const data = normalizeDbObject(d);

      dispatch(addTaskList(data));
    });
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
