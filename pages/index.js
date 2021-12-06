/* eslint-disable react/no-unescaped-entities */
import Board from "@components/Board";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const assignments = useSelector((state) => state.assignments);
  const lists = useSelector((state) => state.taskLists);

  /*[
        {
          title: "To Do",
          assignments: [
            { desc: "This is an assignments", id: "1" },
            { desc: "This is another assignments", id: "2" },
            { desc: "This is the last assignment", id: "3" },
          ],
        },
        {
          title: "Doing",
          assignments: [
            { desc: "This is an assignments 2", id: "4" },
            { desc: "This is another assignments 2", id: "5" },
            { desc: "This is the last assignment 2", id: "6" },
          ],
        },
        {
          title: "Done",
          assignments: [
            { desc: "This is an assignments 3", id: "7" },
            { desc: "This is another assignments 3", id: "8" },
            { desc: "This is the last assignment 3", id: "9" },
          ],
        },
      ]}*/
  return (
    <Board title="Homework" lists={lists} assignments={assignments}></Board>
  );
}
