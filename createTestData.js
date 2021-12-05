const faunadb = require("faunadb");
const { Client, Get, Ref, Collection, Create, Select, TimeAdd, Now } = faunadb;

const client = new Client({
  secret: process.env.FAUNA_KEY,
  domain: "db.fauna.com",
  port: 443,
  scheme: "https",
});

const taskListTitles = ["To Do", "Doing", "Done"];

const classRefs = [
  Select(
    "ref",
    Create(Collection("Class"), {
      data: {
        name: "Freshmen Success",
        color: "red",
      },
    })
  ),
  Select(
    "ref",
    Create(Collection("Class"), {
      data: {
        name: "Biology",
        color: "green",
      },
    })
  ),
];

const assignmentRefs = classRefs.map((c) => {
  return [
    Select(
      "ref",
      Create(Collection("Assignment"), {
        data: {
          name: "Assignment 1",
          desc: "This is just for testing.",
          dueDate: TimeAdd(Now(), 1, "day"),
          class: c,
        },
      })
    ),
    Select(
      "ref",
      Create(Collection("Assignment"), {
        data: {
          name: "Assignment 2",
          desc: "This is just for testing.",
          dueDate: TimeAdd(Now(), 3, "hours"),
          class: c,
        },
      })
    ),
    Select(
      "ref",
      Create(Collection("Assignment"), {
        data: {
          name: "Assignment 3",
          desc: "This is just for testing.",
          dueDate: TimeAdd(Now(), 4, "half day"),
          class: c,
        },
      })
    ),
  ];
});

const taskListRefs = taskListTitles.map((title) => {
  return [
    Select(
      "ref",
      Create(Collection("TaskList"), {
        data: {
          name: title,
          assignments: assignmentRefs,
        },
      })
    ),
  ];
});

const boardRef = Select(
  "ref",
  Create(Collection("Board"), {
    data: {
      name: "Homework",
      lists: taskListRefs,
    },
  })
);

console.debug(
  client.query(
    Create(Collection("User"), {
      data: {
        name: "Galestrike Testdata",
        boards: [boardRef],
      },
    })
  )
);
