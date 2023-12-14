import { Box } from "@mui/material";
import SwipeDrawer from "../../components/baselayout/swipe.drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useState } from "react";

const theme = createTheme();

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ display: "flex", width: "100%", maxHeight: "0vh" }}>
        <SwipeDrawer />
        <img
          src="https://www.valuehost.com.br/blog/wp-content/uploads/2023/09/valuesoftsistemas_valuehosthospedagem_image_577.jpeg.webp"
          alt="Imagem de fundo"
          style={{
            width: "750px",
            height: "100%",
            objectFit: "cover",
            marginTop: "100px",
            marginLeft: "100px",
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
