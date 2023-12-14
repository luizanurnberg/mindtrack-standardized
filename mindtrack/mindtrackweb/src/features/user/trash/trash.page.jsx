import { useState, useEffect } from "react";
import { FiEdit3, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { Box, Button, Typography } from "@mui/material";
import SwipeDrawer from "../../../components/baselayout/swipe.drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme();

function TrashPage() {
  const [content, setContent] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
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
        const filteredcontent = data.filter(
          (note) => note.status === "Lixeira"
        );
        setContent(filteredcontent);
      } else {
        console.error("Erro ao buscar os itens da Lixeira:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar os itens da Lixeira:", error);
    }
  };

  async function handleDelete(noteId) {
    try {

      const response = await fetch(
        `http://localhost:8080/api/note/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Nota excluída permanentemente com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(
          "Ocorreu um erro ao excluir sua nota permanentemente, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao excluir sua nota permanentemente, tente novamente!" +
          error,
        {
          position: "bottom-right",
        }
      );
    }
  }

  async function handleRestore(noteId) {
    try {
      const novoStatus = "Criada";

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
        toast.success("Nota movida para notas com sucesso!", {
          position: "bottom-right",
        });
        window.location.reload();
      } else {
        toast.error(
          "Ocorreu um erro ao mover sua nota para a rotina de notas, tente novamente!",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao mover sua nota para a rotina de notas, tente novamente!" +
          error,
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
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Lixeira
          </Typography>
        </Box>
        <Box sx={{ mt: 3, width: "100%", maxWidth: 400 }}>
          {content.map((note) => (
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
              }}
            >
              <Typography>{note.content}</Typography>
              <Box>
                <Button onClick={() => handleRestore(note.id)}>
                  <FiRefreshCw />
                </Button>
                <Button onClick={() => handleDelete(note.id)}>
                  <FiTrash2 />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <SwipeDrawer />
      </Box>
    </ThemeProvider>
  );
}

export default TrashPage;
