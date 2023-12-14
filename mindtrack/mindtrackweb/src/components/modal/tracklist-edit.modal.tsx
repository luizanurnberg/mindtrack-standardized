
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TrackListEditModal = ({ isOpen, onClose, trackListId }) => {
  const [newContent, setNewContent] = useState("");

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const contentStyle = {
    backgroundColor: "#fff", 
    padding: "20px",
    borderRadius: "8px",
    "padding-top": "40px",
    textAlign: "center",
    position: "relative", 
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  const handleSave = () => {
    console.log(trackListId, newContent)
    handleEditTracklist(trackListId, newContent);
    onClose(); 
  };

  const handleEditTracklist = async (trackListId, newTrackList) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/trackListItem/content/${trackListId}?content=${newTrackList}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Lista editada com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error("Ocorreu um erro ao editar a lista, tente novamente!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao editar a lista, tente novamente!" + error,
        {
          position: "bottom-right",
        }
      );
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={modalStyle}
    >
      <Box sx={contentStyle}>
        <IconButton style={closeButtonStyle} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography id="modal-title" variant="h6" component="h2">
          Edite sua Lista
        </Typography>
        <TextField
          label="Novo conteúdo"
          variant="outlined"
          fullWidth
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          sx={{ margin: "10px", width: "90%" }}
        />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ margin: "10px" }}>
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default TrackListEditModal;
