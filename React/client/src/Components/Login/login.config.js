import { styled } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";

import { z } from "zod";
import { toast } from "react-toastify";

export const WhiteCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.common.white,
    "&.Mui-checked": {
        color: theme.palette.common.white,
    },
}));


export const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(12, {
        message: "Password is too short! Must be a minimum of 12 characters.",
    }),
});


const host = import.meta.env.VITE_HOST;
const url = `${host}/user/login`;

export const handleLogin = async (formData) => {
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