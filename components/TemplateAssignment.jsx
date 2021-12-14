import { Close, Send } from "@mui/icons-material";
import { DateTimePicker } from "@mui/lab";
import { TextField, Typography, Card, Button, IconButton } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

// An assignment used as a template for creating new assignments.
export default function TemplateAssignment({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(null);

  const [validation, setValidation] = useState(null);

  function handleSubmit() {
    const trimmedTitle = title?.trim();
    // Validate input
    if (!trimmedTitle || trimmedTitle.length <= 0) {
      setValidation({ ...validation, title: "The title cannot be empty." });
      return;
    }

    let result = { name: trimmedTitle };

    const trimmedDescription = description?.trim().slice(0, 512);
    if (trimmedDescription) {
      result["description"] = trimmedDescription;
    }

    if (dateTime) {
      result["dueDate"] = dateTime;
    }

    onSubmit(result);
  }

  function handleClose() {
    onClose();
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", p: 1 }}>
      {onClose !== null ? (
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      ) : null}
      <TextField
        sx={{ m: 1 }}
        variant="standard"
        size="small"
        label="Title"
        onChange={async (e) => {
          const val = e.target.value;
          setTitle(val);
          if (!val || val.trim().length <= 0) {
            setValidation({
              ...validation,
              title: "The title cannot be empty",
            });
          } else {
            setValidation({ ...validation, title: null });
          }
        }}
        value={title}
        helperText={validation?.title}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        variant="standard"
        size="small"
        label="Description (Optional)"
        onChange={(e) => {
          const val = e.target.value?.trim();
          if (val && val.length > 512) {
            return;
          }
          setDescription(e.target.value);
        }}
        multiline
        value={description}
      ></TextField>
      <DateTimePicker
        renderInput={(props) => (
          <TextField sx={{ m: 1 }} size="small" {...props} />
        )}
        label="Due Date"
        value={dateTime}
        onChange={(val) => {
          setDateTime(val);
        }}
      />
      <Button sx={{ m: 1, height: 2 }} onClick={handleSubmit}>
        Submit
        <Send />
      </Button>
    </Card>
  );
}

TemplateAssignment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
