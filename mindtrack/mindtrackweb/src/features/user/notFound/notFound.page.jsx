import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Container, CssBaseline } from "@mui/material";
import NotFoundGif from "../notFound/gif/404.gif";

const theme = createTheme();

function NotFoundPage() {
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
