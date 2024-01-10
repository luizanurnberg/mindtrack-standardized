import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FormControl, InputLabel } from "@mui/material";

const NoteColorModal = ({ isOpen, onClose, noteId, color }) => {
  const [newColor, setNewColor] = useState("");

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
    paddingTop: "40px",
    textAlign: "center",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  async function handleColorChange(noteId, colorSelect) {
    const hexColor = colorSelect;

    try {
      const response = await fetch(
        `http://localhost:8080/api/note/color/${noteId}?color=${hexColor}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Nota editada com sucesso!", {
          position: "bottom-right",
        });
        onClose();
        window.location.reload();
      } else {
        toast.error("Ocorreu um erro ao editar a nota, tente novamente!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao editar a nota, tente novamente!" + error,
        {
          position: "bottom-right",
        }
      );
    }
  }

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
          Escolha sua cor
        </Typography>
        <FormControl sx={{ margin: '10px', paddingTop: '5px' }}>
          <InputLabel htmlFor="color-select">Selecione a Cor</InputLabel>
          <Select
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            inputProps={{
              name: 'color',
              id: 'color-select',
            }}
            sx={{ width: '200px' }}
          >
            <MenuItem value="" disabled>
              Selecione a Cor
            </MenuItem>
            <MenuItem value="Blue">Azul</MenuItem>
            <MenuItem value="Red">Vermelho</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={() => handleColorChange(noteId, newColor)}
        >
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default NoteColorModal;
