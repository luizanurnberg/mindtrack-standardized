import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FiEdit3, FiTrash2, FiDroplet } from "react-icons/fi";
import SwipeDrawer from "../../../components/baselayout/swipe.drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LabelEditModal from "../../../components/modal/label-edit.modal";

const theme = createTheme();

function LabelPage() {
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editinglabelId, setEditinglabelId] = useState(null);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/label/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const filteredlabels = data.filter(
          (label) => label.status === "Criada"
        );
        setLabels(filteredlabels);
      } else {
        console.error("Erro ao buscar as Etiquetas:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar as Etiquetas:", error);
    }
  };

  const handleAddLabel = async () => {
    try {
      const labelData = {
        name: newLabel,
        userId: userId,
        status: "Criada",
      };

      const response = await fetch("http://localhost:8080/api/label", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(labelData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLabels([...labels, data]);
        setNewLabel("");
        toast.success("Etiqueta inserida com sucesso!", {
          position: "bottom-right",
        });
      } else {
        toast.error(
          "Ocorreu um erro ao criar as suas Etiquetas, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar as suas Etiquetas, tente novamente!" + error,
        {
          position: "bottom-right",
        }
      );
    }
  };

  async function handleDeletelabel(labelId) {
    try {
      const novoStatus = "Lixeira";

      const response = await fetch(
        `http://localhost:8080/api/label/status/${labelId}?status=${novoStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Etiqueta movida para lixeira com sucesso!", {
          position: "bottom-right",
        });
      } else {
        toast.error(
          "Ocorreu um erro ao mover sua Etiqueta para a lixeira, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao mover sua Etiqueta para a lixeira, tente novamente!" +
          error,
        {
          position: "bottom-right",
        }
      );
    }
  }

  const handleOpenModal = (labelId) => {
    setEditinglabelId(labelId);
    setIsModalOpen(true, labelId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Etiquetas
          </Typography>
        </Box>
        <Box sx={{ width: "100%", maxWidth: 400, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Adicionar uma Etiqueta..."
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={handleAddLabel}>
          Adicionar
        </Button>
        <Box sx={{ mt: 3, width: "100%", maxWidth: 400, maxHeight: "0vh" }}>
          {labels.map((label) => (
            <Box
              key={label.id}
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <Typography>{label.name}</Typography>
              <Box>
                <Button onClick={() => handleOpenModal(label.id)}>
                  <FiEdit3 />
                </Button>
                <Button onClick={() => handleDeletelabel(label.id)}>
                  <FiTrash2 />
                </Button>
              </Box>
              <LabelEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                labelId={editinglabelId}
              />
            </Box>
          ))}
        </Box>
        <SwipeDrawer />
      </Box>
    </ThemeProvider>
  );
}

export default LabelPage;
