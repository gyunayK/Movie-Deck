import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./LoginTheme";

import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_HOST;
  const url = `${host}/user/login`;

  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(12, {
      message: "Password is too short! Must be a minimum of 12 characters.",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.user) {
        toast.success("Logged in successfully");
        localStorage.setItem("user", data.user);
        localStorage.setItem("userName", data.firstName);
        window.location.href = "/";
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: "10%",
          backgroundColor: "#fbfbfb",
          display: "flex",
          height: "100%",
          borderRadius: "10px",
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
              control={<Checkbox value="remember" color="primary" />}
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Button to="/signup" component={Link} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
