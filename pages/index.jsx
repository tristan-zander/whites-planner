/* eslint-disable react/no-unescaped-entities */
import Board from "@components/Board";
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

export default function Home() {
  const context = useSelector((state) => state.context);
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    // Note, this will cause errors with multiple boards.
    // Only if we redirect to /board/[id] will it be fixed.
    const primaryBoard = Object.keys(boards).filter(
      (id) => boards[id].primaryBoard
    )[0];
    setBoard(primaryBoard);
  }, [boards]);

  const [board, setBoard] = useState(null);

  return (
    <>
      {board ? <Board id={board}></Board> : null}
      {context.token !== undefined ? null : <LoginPrompt />}
    </>
  );
}
