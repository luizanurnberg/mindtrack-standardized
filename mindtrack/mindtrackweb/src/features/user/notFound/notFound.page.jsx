import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Container, CssBaseline } from "@mui/material";
import NotFoundGif from "../notFound/gif/404.gif";
import React, { useEffect, useState } from "react";

const theme = createTheme();

function NotFoundPage() {

  const [setServerMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await await fetch(
          `http://localhost:8080/api/404`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          throw new Error("Página não encontrada");
        }
        const content = await response.text();
        setServerMessage(content);
      } catch (error) {
        console.error(error);
        setServerMessage("Erro ao carregar a página do servidor.");
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img
          src={NotFoundGif}
          alt="404 Not Found"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <Typography variant="h5" color="textSecondary" paragraph>
          PAGE NOT FOUND
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
        A página solicitada não pôde ser encontrada.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default NotFoundPage;
