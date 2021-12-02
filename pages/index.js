/* eslint-disable react/no-unescaped-entities */
import Board from "@components/Board";

export default function Home() {
  return (
    <Board
      title="Homework"
      lists={[{ title: "To Do" }, { title: "Doing" }, { title: "Done" }]}
    ></Board>
  );
}
