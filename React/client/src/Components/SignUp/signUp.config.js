import { z } from "zod";
import { toast } from "react-toastify";

export const schema = z
    .object({
        firstName: z.string().min(2, { message: "First name is too short" }),
        lastName: z.string().min(2, { message: "Last name is too short" }),
        email: z.string().email({ message: "Invalid email" }),
        password: z.string().min(12, {
            message: "Password is too short! Must be a minimum of 12 characters.",
        }),
        confirmPass: z.string().min(12, {
            message: "Password is too short! Must be a minimum of 12 characters.",
        }),
    })
    .refine((data) => data.password === data.confirmPass, {
        message: "Passwords do not match",
        path: ["confirmPass"],
    });


const host = import.meta.env.VITE_HOST;
const url = `${host}/user/register`;

export const handleSignUp = async (formData, navigate) => {
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
