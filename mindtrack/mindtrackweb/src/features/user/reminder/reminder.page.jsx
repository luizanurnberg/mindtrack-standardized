import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FiEdit3, FiTrash2, FiDroplet, FiSearch } from "react-icons/fi";
import SwipeDrawer from "../../../components/baselayout/swipe.drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import ReminderEditModal from "../../../components/modal/reminder-edit.modal";

const theme = createTheme();

function ReminderPage() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const { userId } = useParams();
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState(null);

  const getFormattedDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reminder/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const filteredReminders = data.filter(
          (reminder) => reminder.status === "Criada"
        );
        setReminders(filteredReminders);
      } else {
        console.error("Erro ao buscar os Lembretes:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar os Lembretes:", error);
    }
  };

  const handleAddReminder = async () => {
    try {
      const currentDate = new Date();
      const reminderData = {
        content: newReminder,
        date: currentDate.toISOString(),
        userId: userId,
        status: "Criada",
      };

      const response = await fetch("http://localhost:8080/api/reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reminderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setReminders([...reminders, data]);
        setNewReminder("");
        toast.success("Lembrete inserido com sucesso!", {
          position: "bottom-right",
        });
      } else {
        toast.error(
          "Ocorreu um erro ao criar seus Lembretes, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar seus Lembretes, tente novamente!" + error,
        {
          position: "bottom-right",
        }
      );
    }
  };

  async function handleDeleteReminder(reminderId) {
    try {
      const newStatus = "Lixeira";

      const response = await fetch(
        `http://localhost:8080/api/reminder/status/${reminderId}?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Lembrete movido para lixeira com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(
          "Ocorreu um erro ao mover seu Lembrete para a lixeira, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao mover seu Lembrete para a lixeira, tente novamente!" +
          error,
        {
          position: "bottom-right",
        }
      );
    }
  }

  async function handleSearch(filterText) {
    try {
      if (!filterText) {
        toast.error("Campo de busca não foi preenchido!", {
          position: "bottom-right",
        });
        fetchReminders();
      } else {
        const response = await fetch(
          `http://localhost:8080/api/reminder/date/${filterText}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.length > 0) {
          setReminders(data);
          toast.success("Notas encontradas com sucesso!", {
            position: "bottom-right",
          });
        } else {
          toast.error("Não foi possível encontrar a nota, tente novamente!", {
            position: "bottom-right",
          });
        }
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao buscar as notas, tente novamente!" + error,
        {
          position: "bottom-right",
        }
      );
    }
  }

  const handleOpenModal = (reminderId) => {
    console.log(reminderId);
    setEditingReminderId(reminderId);
    setIsModalOpen(true, reminderId);
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
          marginLeft: "-45%",
          height: "45vh",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            label="Buscar Lembretes Criados na Data"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setFilterText(getFormattedDate())}>
                    <EventIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "160%", margin: "0 auto" }}
          />
          <Button
            variant="contained"
            sx={{ ml: 1, width: "150px", height: "55px" }}
            onClick={() => handleSearch(filterText)}
          >
            <FiSearch />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "30vh",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Lembretes
          </Typography>
        </Box>
        <Box sx={{ width: "100%", maxWidth: 400, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Adicionar um Lembrete..."
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setNewReminder(getFormattedDate())}
                  >
                    <EventIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button variant="contained" onClick={handleAddReminder}>
          Adicionar
        </Button>
        <Box sx={{ mt: 3, width: "100%", maxWidth: 400, maxHeight: "0vh" }}>
          {reminders.map((reminder) => (
            <Box
              key={reminder.id}
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
              <Typography>{reminder.content}</Typography>
              <Box>
                <Button onClick={() => handleOpenModal(reminder.id)}>
                  <FiEdit3 />
                </Button>
                <Button onClick={() => handleDeleteReminder(reminder.id)}>
                  <FiTrash2 />
                </Button>
              </Box>
              <ReminderEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                reminderId={editingReminderId}
              />
            </Box>
          ))}
        </Box>
        <SwipeDrawer />
      </Box>
    </ThemeProvider>
  );
}

export default ReminderPage;
