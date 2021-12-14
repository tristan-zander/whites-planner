import { Typography, Card, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function Assignment({ id }) {
  const assignment = useSelector((state) => state.assignments[id]);

  const [due, setDue] = useState("");

  useEffect(() => {
    if (assignment.dueDate) {
      const dt = DateTime.fromISO(assignment.dueDate);

      const diff = dt
        .diffNow(["hours", "minutes", "days", "months", "years"])
        .toObject();

      // TODO: If we've passed the due date, say how many units past due.
      if (diff.years && diff.years > 0) {
        if (diff.months) setDue(`${diff.years} years, ${diff.months} months`);
        else setDue(`${diff.years} years`);
      } else if (diff.months && diff.months > 0) {
        setDue(`${diff.months} months`);
      } else if (diff.days && diff.days > 0) {
        if (diff.hours && diff.hours > 0)
          setDue(`${diff.days} days, ${diff.hours} hours`);
        else setDue(`${diff.days} days.`);
      } else if (diff.hours && diff.hours > 0) {
        if (diff.minutes && diff.minutes > 0)
          setDue(`${diff.hours} hours, ${diff.minutes} minutes`);
        else setDue(`${diff.hours} hours`);
      } else if (diff.minutes && diff.minutes > 0) {
        setDue(`${diff.minutes} minutes`);
      } else {
        setDue("Passed due");
      }
    }
  }, [assignment]);

  return (
    <Card>
      <Typography variant="h6">{assignment.name}</Typography>
      <Typography sx={{ fontWeight: 300 }}>{assignment.desc}</Typography>
      <Box sx={{ backgroundColor: "#888", borderRadius: 2 }}>{due}</Box>
    </Card>
  );
}
