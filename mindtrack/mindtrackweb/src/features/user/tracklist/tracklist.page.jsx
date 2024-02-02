import { useState, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import SwipeDrawer from "../../../components/baselayout/swipe.drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import TrackListEditModal from "../../../components/modal/tracklist-edit.modal";

function TracklistPage() {
  const [tracklists, setTracklists] = useState([]);
  const { userId } = useParams();
  const theme = createTheme();
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrackListId, setEditingTrackListId] = useState(null);

  async function handleAddCheckbox() {
    if (newTask.trim() !== "") {
      const newCheckbox = {
        id: Date.now(),
        statusCheckbox: false,
        content: newTask.trim(),
      };

      setTracklists((prevTracklists) => [...prevTracklists, newCheckbox]);
      setNewTask("");

      await handleAddTrackList(newCheckbox)
        .then(() => {})
        .catch((error) => {
          console.error("Error adding task to the database:", error);
        });
    }
  }

  useEffect(() => {
    fetchTracklists();
  }, []);

  const fetchTracklists = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/trackListItem/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const filteredTracklists = data.filter(
          (tracklist) => tracklist.status === "Criada"
        );
        setTracklists(filteredTracklists);
      } else {
        console.error(
          "Erro ao buscar as Listas de Reprodução:",
          response.status
        );
      }
    } catch (error) {
      console.error("Erro ao buscar as Listas de Reprodução:", error);
    }
  };

  async function handleAddTrackList(newCheckbox) {
    try {
      const currentDate = new Date();
      const trackListData = {
        content: newCheckbox.content,
        date: currentDate.toISOString(),
        userId: userId,
        statusCheckbox: false,
        status: "Criada",
      };

      const response = await fetch("http://localhost:8080/api/trackListItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackListData),
      });

      if (response.ok) {
        toast.success("Lista de Tarefa inserido com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(
          "Ocorreu um erro ao criar seus Lista de Tarefas, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar seus Lista de Tarefas, tente novamente!" +
          error,
        {
          position: "bottom-right",
        }
      );
    }
  }

  const handleDeleteTracklist = async (tracklistId) => {
    try {
      const newStatus = "Lixeira";

      const response = await fetch(
        `http://localhost:8080/api/trackListItem/status/${tracklistId}?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Lista movido para lixeira com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(
          "Ocorreu um erro ao mover sua Lista para a lixeira, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao mover sua Lista para a lixeira, tente novamente!" +
          error,
        {
          position: "bottom-right",
        }
      );
    }
  };

  const handleCheckboxChange = async (checkboxId, newCheckbox) => {
    try {
      setTracklists((prevTracklists) =>
        prevTracklists.map((checkbox) =>
          checkbox.id === checkboxId
            ? { ...checkbox, statusCheckbox: !checkbox.statusCheckbox }
            : checkbox
        )
      );

      const response = await fetch(
        `http://localhost:8080/api/trackListItem/checkbox/${checkboxId}?checkbox=${newCheckbox}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Lista atualizada com sucesso!", {
          position: "bottom-right",
        });
      } else {
        const errorMessage = await response.text();
        console.error("Erro ao atualizar o status da tarefa: ", errorMessage);
        toast.error("Erro ao atualizar o status da tarefa.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
      toast.error("Erro ao atualizar o status da tarefa.", {
        position: "bottom-right",
      });
    }
  };

  const handleOpenModal = (trackListId) => {
    console.log(trackListId);
    setEditingTrackListId(trackListId);
    setIsModalOpen(true, trackListId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            Lista de Tarefas
          </Typography>
        </Box>
        <Box sx={{ width: "100%", maxWidth: 400, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Adicionar uma Tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddCheckbox}
            sx={{ mt: 2 }}
          >
            Adicionar
          </Button>
        </Box>

        <Box sx={{ mt: 3, width: "100%", maxWidth: 400, maxHeight: "0vh" }}>
          {tracklists.map((checkbox) => (
            <Box
              key={checkbox.id}
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: checkbox.statusCheckbox
                  ? "lightblue"
                  : "white",
              }}
            >
              <input
                type="checkbox"
                checked={checkbox.statusCheckbox}
                onChange={(e) =>
                  handleCheckboxChange(checkbox.id, e.target.checked)
                }
              />
              <Typography>{checkbox.content}</Typography>
              <Box>
                <Button onClick={() => handleOpenModal(checkbox.id)}>
                  <FiEdit3 />
                </Button>
                <Button onClick={() => handleDeleteTracklist(checkbox.id)}>
                  <FiTrash2 />
                </Button>
              </Box>
              <TrackListEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                trackListId={editingTrackListId}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <SwipeDrawer />
    </ThemeProvider>
  );
}

export default TracklistPage;
