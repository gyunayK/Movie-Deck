import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { useForm } from "react-hook-form";

import { defaultTheme } from "./SignUpTheme";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema, handleSignUp } from "./signUp.config";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit((formData) =>
              handleSignUp(formData, navigate)
            )}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName")}
                />
              </Grid>
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName")}
                />
              </Grid>
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                />
              </Grid>
              {errors.email && <p className="error">{errors.email.message}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
              </Grid>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  {...register("confirmPass")}
                />
              </Grid>
              {errors.confirmPass && (
                <p className="error">{errors.confirmPass.message}</p>
              )}
            </Grid>

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              size="large"
              loadingIndicator={<CircularProgress size={35} color="primary" />}
            >
              Sign Up
            </LoadingButton>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button to="/login" component={Link} variant="body2">
                  Already have an account?&nbsp;&nbsp;
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bolder",
                      fontSize: "1.4em",
                    }}
                  >
                    Sign in
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
