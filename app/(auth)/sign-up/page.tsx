"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Dynamically import the ConfirmationUI component
const ConfirmationUI = dynamic(() => import("@/components/ConfirmationUI"), {
  ssr: false, // Ensures it's only loaded on the client
});

interface FormData {
  email: string;
  password: string;
  rePassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState, watch } = form;
  const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting } =
    formState;
  const pass = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        setConfirm(true);
      } else {
        if (response.status === 500) setError(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    if (confirm) {
      const timer = setTimeout(() => {
        router.push("/log-in");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [confirm, router]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div
        className={`${
          error ? "opacity-100" : "opacity-0"
        } dark:bg-[#FC4747] text-white focus:outline-none rounded-[6px] w-[279px] sm:w-[336px] h-[48px] font-medium uppercase text-center absolute top-4 flex items-center justify-center text-[14px] sm:text-[16px]`}
      >
        <h1>This account already exists</h1>
      </div>

      <div className="flex flex-col gap-[58.4px] sm:gap-[72.4px] lg:gap-[82.99px] justify-center items-center">
        <div className="w-[32px] h-[32px] cursor-pointer ">
          <svg
            className="fill-current text-[#650101] dark:text-[#FC4747]"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z" />
          </svg>
        </div>
        <div className="p-6 sm:p-8 bg-[#5A698F] dark:bg-[#161D2F] rounded-[10px] flex flex-col justify-center items-center">
          {confirm ? (
            <ConfirmationUI />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center"
              noValidate
            >
              {/* Form Fields and Input Components */}
              {/* ... */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
