/* eslint-disable react/no-unescaped-entities */
import Board from "@components/Board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtaskList } from "@features/task_lists/taskListsSlice";

export default function Home() {
  const assignments = useSelector((state) => state.assignments.value);
  const lists = useSelector((state) => state.taskLists.value);
  const dispatch = useDispatch();

  const [didLoad, setDidLoad] = useState(false);

  const testData = [
    {
      ref: {
        id: "1",
      },
      ts: 123123,
      title: "To Do",
      assignments: [
        { desc: "This is an assignments", id: "1" },
        { desc: "This is another assignments", id: "2" },
        { desc: "This is the last assignment", id: "3" },
      ],
    },
    {
      ref: {
        id: "2",
      },
      ts: 123123,
      title: "Doing",
      assignments: [
        { desc: "This is an assignments 2", id: "4" },
        { desc: "This is another assignments 2", id: "5" },
        { desc: "This is the last assignment 2", id: "6" },
      ],
    },
    {
      ref: {
        id: "3",
      },
      ts: 123123,
      title: "Done",
      assignments: [
        { desc: "This is an assignments 3", id: "7" },
        { desc: "This is another assignments 3", id: "8" },
        { desc: "This is the last assignment 3", id: "9" },
      ],
    },
  ];

  useEffect(() => {
    if (!didLoad) {
      console.debug("injecting test data");
      testData.forEach((l) => {
        dispatch(addtaskList(l));
      });
      setDidLoad(true);
    }
  }, [testData, didLoad]);

  console.debug(lists);

  return (
    <Board title="Homework" lists={lists} assignments={assignments}></Board>
  );
}
