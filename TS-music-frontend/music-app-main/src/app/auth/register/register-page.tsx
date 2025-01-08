"use client";

import { useState, useRef } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export function RegisterPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown((cur) => !cur);

  const toast = useRef<Toast>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Watch the password fields
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: FormData) => {
    try {
      delete data.confirmPassword;
      const response = await fetch("http://localhost:3000/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //   reset();
        const result = await response.json();
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Account created successfully!",
          life: 3000,
        });
        window.location.href = "/auth";
      } else {
        const errorResult = await response.json();
        toast.current?.show({
          severity: `${errorResult.code == 422 ? "warn" : "error"}`,
          summary: `${errorResult.code == 422 ? "Warning" : "Error"}`,
          detail: `Error: ${errorResult.message || "Failed to create account"}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
                Sign Up
              </Typography>
              <div className="mb-6">
                <label htmlFor="name">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Username
                  </Typography>
                </label>
                <Input
                  label="Name"
                  crossOrigin={""}
                  id="name"
                  color="gray"
                  size="lg"
                  type="name"
                  value={formData.name}
                  placeholder="username"
                  className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("name", { required: "Name is required" })}
                  onChange={handleChange}
                  name="name"
                  error={!!errors.name}
                />
                {errors.name ? (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Email
                  </Typography>
                </label>
                <Input
                  crossOrigin={""}
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  value={formData.email}
                  placeholder="email"
                  className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  name="email"
                  onChange={handleChange}
                  error={!!errors.email}
                />
                {errors.email ? (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  onChange={handleChange}
                  error={!!errors.password}
                />
                {errors.password ? (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
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
                      Confirm Password
                    </Typography>
                  </label>
                </div>
                <Input
                  crossOrigin={""}
                  size="lg"
                  placeholder="Confirm Password"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                  type={confirmPasswordShown ? "text" : "password"}
                  icon={
                    <i onClick={toggleConfirmPasswordVisiblity}>
                      {confirmPasswordShown ? (
                        <EyeIcon className="h-5 w-5 cursor-pointer" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                      )}
                    </i>
                  }
                  value={formData.confirmPassword}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  //   name="password"
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword ? (
                  <p style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </p>
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
                Create an Account
              </Button>
              <Link href={"/auth"}>
                <Typography
                  variant="small"
                  color="gray"
                  className="!mt-4 text-center font-normal"
                >
                  {"have an account? "}
                  <span className="font-medium underline text-gray-900">
                    Sign In
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

export default RegisterPage;
