import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./LoginTheme";

import { WhiteCheckbox, schema, handleLogin } from "./login.config";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleDemoUser = () => {
    const demoUser = {
      email: "hoge@hoge.com",
      password: "123123123123",
    };
    handleLogin(demoUser);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((formData) => handleLogin(formData))}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              {...register("email")}
              autoComplete="email"
              autoFocus
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              {...register("password")}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <FormControlLabel
              control={<WhiteCheckbox value="remember" />}
              label="Remember me"
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              size="large"
              loadingIndicator={<CircularProgress size={35} color="primary" />}
            >
              Log in
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleDemoUser}
              loading={isSubmitting}
              size="large"
              loadingIndicator={<CircularProgress size={35} color="primary" />}
            >
              Demo user
            </LoadingButton>

            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button to="/signup" component={Link} variant="body2">
                  Don't have an account?&nbsp;&nbsp;
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bolder",
                      fontSize: "1.4em",
                    }}
                  >
                    Sign Up
                  </span>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
