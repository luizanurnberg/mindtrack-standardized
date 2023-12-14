import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";

function Login() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      toast.error(
        "É necessário que todos os campos estejam preenchidos, tente novamente!",
        {
          position: "bottom-right",
        }
      );
    } else {
      try {
        const requestData = {
          email: data.get("email"),
          password: data.get("password"),
        };
        const formattedRequest = JSON.stringify(requestData);
        const res = await fetch(`http://localhost:8080/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formattedRequest,
        });
        const result = await res.json();
        if (res.status === 200) {
          const userId = result.id;
          navigate(`/home/${userId}`);
        } else {
          toast.error("Email ou senha não está correto, tente novamente!", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              width: "50px",
              height: "50px",
              marginTop: "-50px",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link component={RouterLink} to="/register">
                  {"Não possui uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
