import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const contentStyle = {
    backgroundColor: "#fff", // Cor de fundo branca
    padding: "20px",
    borderRadius: "8px",
    "padding-top": "40px",
    textAlign: "center",
    position: "relative", // Adicionado para posicionar o botão de fechar absolutamente
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
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
          Você tem certeza que gostaria de sair?
        </Typography>
        <Button variant="contained" color="primary" onClick={onLogout} sx={{ margin: "10px" }}>
          Sair
        </Button>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
