/* eslint-disable react/no-unescaped-entities */
import MainBoard from "@components/Board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPrompt from "@components/LoginPrompt";
import { useGoogleLogin } from "react-google-login";
import {
  updateContext,
  addError,
  setAccessToken,
} from "@features/context/contextSlice";
import { Client as FaunaClient, CurrentToken } from "faunadb";
import { Fab } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

export default function Home() {
  const context = useSelector((state) => state.context);

  return (
    <>
      <MainBoard title="Homework"></MainBoard>
      {context.token !== undefined ? null : <LoginPrompt />}
    </>
  );
}
