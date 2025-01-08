"use client";

import { useState, useRef } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/auth/authSlice";

interface FormLogin {
  email: string;
  password: string;
}

export function LoginPage() {
  const dispatch = useDispatch();
  const toast = useRef<Toast>(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmit = async (data: FormLogin) => {
    try {
      const response = await fetch("http://localhost:3000/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // Store tokens in localStorage for future authentication
        localStorage.setItem("token", result.tokens.access.token);
        localStorage.setItem("refreshToken", result.tokens.refresh.token);
  
        // Dispatch login action if you are using Redux
        dispatch(login(result));
  
        // Show success message
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful!",
          life: 3000,
        });
  
        // Redirect based on user type
        if (result.isNewUser) {
          window.location.href = "/edit-user-space";
        } else {
          window.location.href = "/";
        }
      } else {
        const errorResult = await response.json();
        toast.current?.show({
          severity: `${errorResult.code == 422 ? "warn" : "error"}`,
          summary: `${errorResult.code == 422 ? "Warning" : "Error"}`,
          detail: `Error: ${errorResult.message || "Failed to log in"}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred.",
        life: 3000,
      });
    }
  };
  

  return (
    <>
      <div className="flex flex-row justify-between">
        <Toast ref={toast} />
        <div className="relative w-4/12 bg-[url('/image/login.jpg')] bg-cover bg-no-repeat"></div>
        <section className="grid text-center h-screen w-9/12 items-center p-8">
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto max-w-[24rem] text-left"
            >
              <Typography variant="h3" color="blue-gray" className="mb-2">
                Sign In Music App
              </Typography>
              <div className="">
                <Button
                  variant="outlined"
                  size="lg"
                  className="mt-6 flex h-12 rounded-full items-center justify-center gap-2 normal-case"
                  fullWidth
                >
                  <img
                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                    alt="google"
                    className="h-6 w-6"
                  />{" "}
                  Sign In with Google
                </Button>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-full h-px my-8 bg-gray-300 border-0" />
                  <span className="absolute px-3 font-light text-gray-500 -translate-x-1/2 bg-white right-[21.5rem]">
                    or sign in with email
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Username or Email
                  </Typography>
                </label>
                <Input
                  crossOrigin={""}
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  placeholder="username or email"
                  className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("email", { required: "Email is required" })}
                  name="email"
                />
                {errors.email ? (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-6">
                <div className="flex flex-row justify-between">
                  <label htmlFor="password">
                    <Typography
                      variant="small"
                      className="block font-medium text-gray-900"
                    >
                      Password
                    </Typography>
                  </label>
                  <Typography
                    as="a"
                    href="#"
                    color="blue-gray"
                    variant="small"
                    className="font-light normal-case underline text-xs !mt-2"
                  >
                    Forgot?
                  </Typography>
                </div>
                <Input
                  crossOrigin={""}
                  size="lg"
                  placeholder="********"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                  type={passwordShown ? "text" : "password"}
                  icon={
                    <i onClick={togglePasswordVisiblity}>
                      {passwordShown ? (
                        <EyeIcon className="h-5 w-5 cursor-pointer" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                      )}
                    </i>
                  }
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password ? (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                ) : (
                  ""
                )}
              </div>
              <Button
                color="gray"
                size="lg"
                className="mt-6 normal-case rounded-full"
                type="submit"
                fullWidth
              >
                Sign In
              </Button>
              <Link href={"auth/register"}>
                <Typography
                  variant="small"
                  color="gray"
                  className="!mt-4 text-center font-normal"
                >
                  {"Don't have an account? "}
                  <span className="font-medium underline text-gray-900">
                    Sign Up
                  </span>
                </Typography>
              </Link>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
