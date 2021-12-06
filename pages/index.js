/* eslint-disable react/no-unescaped-entities */
import Board from "@components/Board";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtaskList } from "@features/task_lists/taskListsSlice";
import { addAssignment } from "@features/assignments/assignmentsSlice";

export default function Home() {
  const assignments = useSelector((state) => state.assignments.value);
  const lists = useSelector((state) => state.taskLists.value);
  const dispatch = useDispatch();

  const [didLoad, setDidLoad] = useState(false);

  const testLists = [
    {
      ref: {
        id: "1",
      },
      ts: 123123,
      title: "To Do",
      assignments: [{ id: "1" }, { id: "2" }, { id: "3" }],
    },
    {
      ref: {
        id: "2",
      },
      ts: 123123,
      title: "Doing",
      assignments: [{ id: "4" }, { id: "5" }, { id: "6" }],
    },
    {
      ref: {
        id: "3",
      },
      ts: 123123,
      title: "Done",
      assignments: [{ id: "7" }, { id: "8" }, { id: "9" }],
    },
  ];

  const testAssignments = testLists
    .map((l, i) => {
      return [
        {
          ref: {
            id: `${i * 3 + 1}`,
          },
          ts: 123123,
          title: "Do homework.",
          desc: "Description",
          dueDate: "unimplemented",
          classId: "unimplemented",
        },
        {
          ref: {
            id: `${i * 3 + 2}`,
          },
          ts: 123123,
          title: "Study for a bit.",
          desc: "Description",
          dueDate: "unimplemented",
          classId: "unimplemented",
        },
        {
          ref: {
            id: `${i * 3 + 3}`,
          },
          ts: 123123,
          title: "Prepare a presentaion.",
          desc: "Description",
          dueDate: "unimplemented",
          classId: "unimplemented",
        },
      ];
    })
    .flat();

  useEffect(() => {
    if (!didLoad) {
      console.debug("injecting test data");
      testLists.forEach((l) => {
        dispatch(addtaskList(l));
      });
      testAssignments.forEach((a) => {
        dispatch(addAssignment(a));
      });
      setDidLoad(true);
    }
  }, [testLists, didLoad, testAssignments]);

  return (
    <Board title="Homework" lists={lists} assignments={assignments}></Board>
  );
}
