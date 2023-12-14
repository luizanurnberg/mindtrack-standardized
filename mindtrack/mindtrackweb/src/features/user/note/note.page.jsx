import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FiEdit3, FiTrash2, FiDroplet, FiSearch } from "react-icons/fi";
import SwipeDrawer from "../../../components/baselayout/swipe.drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NoteEditModal from "../../../components/modal/note-edit.modal";
import NoteColorModal from "../../../components/modal/note-color.modal";

const theme = createTheme();

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { userId } = useParams();
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [colorModalNoteId, setColorModalNoteId] = useState(null);
  const [colorModalColor, setColorModalColor] = useState(null);

  //edit
  const handleOpenModal = (noteId) => {
    setEditingNoteId(noteId);
    setIsModalOpen(true, noteId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //color
  const handleOpenModalColor = (noteId, color) => {
    setColorModalColor(color);
    setColorModalNoteId(noteId);
    setIsColorModalOpen(true, color, noteId);
  };

  const handleCloseColorModal = () => {
    setIsColorModalOpen(false);
  };

  

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/note/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const filteredNotes = data.filter((note) => note.status === "Criada");
        setNotes(filteredNotes);
      } else {
        console.error("Erro ao buscar as notas:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar as notas:", error);
    }
  };

  const handleAddNote = async () => {
    try {
      const currentDate = new Date();
      const noteData = {
        color: "pink",
        content: newNote,
        date: currentDate.toISOString(),
        userId: userId,
        status: "Criada",
      };

      const response = await fetch("http://localhost:8080/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const data = await response.json();
        setNotes([...notes, data]);
        setNewNote("");
        toast.success("Nota inserida com sucesso!", {
          position: "bottom-right",
        });
      } else {
        toast.error(
          "Ocorreu um erro ao criar as suas Notas, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar as suas Notas, tente novamente!" + error,
        {
          position: "bottom-right",
        }
      );
    }
  };

  async function handleDeleteNote(noteId) {
    try {
      const novoStatus = "Lixeira";

      const response = await fetch(
        `http://localhost:8080/api/note/status/${noteId}?status=${novoStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Nota movida para lixeira com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(
          "Ocorreu um erro ao mover sua nota para a lixeira, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao mover sua nota para a lixeira, tente novamente!" +
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
        fetchNotes();
      } else {
        const response = await fetch(
          `http://localhost:8080/api/note/content/${filterText}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.length > 0) {
          setNotes(data);
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
            label="Buscar Nota"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            sx={{ width: "100%", margin: "0 auto" }}
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
            Notas
          </Typography>
        </Box>
        <Box sx={{ width: "100%", maxWidth: 400, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Adicionar uma nota..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={handleAddNote}>
          Adicionar
        </Button>
        <Box sx={{ mt: 3, width: "100%", maxWidth: 400, maxHeight: "0vh" }}>
          {notes.map((note) => (
            <Box
              key={note.id}
              sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#" + note.color || "white",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography>{note.content}</Typography>
              <Box>
                <Button onClick={() => handleOpenModal(note.id)}>
                  <FiEdit3 />
                </Button>
                <Button onClick={() => handleOpenModalColor(note.id, note.color)}>
                  <FiDroplet />
                </Button>
                <Button onClick={() => handleDeleteNote(note.id)}>
                  <FiTrash2 />
                </Button>
              </Box>
              <NoteEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                noteId={editingNoteId}
              />
              <NoteColorModal
                isOpen={isColorModalOpen}
                onClose={handleCloseColorModal}
                noteId={colorModalNoteId}
                color={colorModalColor}
              />
            </Box>
          ))}
        </Box>
        <SwipeDrawer />
      </Box>
    </ThemeProvider>
  );
}

export default NotePage;
