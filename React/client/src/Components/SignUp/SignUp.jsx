import Avatar from "@mui/material/Avatar";
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
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { defaultTheme } from "./SignUpTheme";
import { toast } from "react-toastify";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_HOST;
  const url = `${host}/user/register`;

  const schema = z
    .object({
      firstName: z.string().min(2, { message: "First name is too short" }),
      lastName: z.string().min(2, { message: "Last name is too short" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(12, { message: "Password is too short" }),
      confirmPass: z.string().min(12, { message: "Password is too short" }),
    })
    .refine((data) => data.password === data.confirmPass, {
      message: "Passwords do not match",
      path: ["confirmPass"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignUp = async (formData) => {
    console.log(isSubmitting);
    const { firstName, lastName, email, password } = formData;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMsg =
          data.message || "An error occurred, please try again later.";
        toast.error(errorMsg);
        return;
      }

      // If everything goes well, navigate to "/login"
      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred, please try again later.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            onSubmit={handleSubmit((formData) => handleSignUp(formData))}
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
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
                <MenuItem to="/login"  component={Link}  variant="body2">
                  Already have an account? Sign in
                </MenuItem>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
