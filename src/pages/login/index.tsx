import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from "@/firebaseConfig";
import { GoogleSignInButton, FormSubmitButton } from "@/components/buttons/buttons";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  
  useEffect(() => {
  //   if(session.status === 'unauthenticated' && router.pathname !== '/login') {
  //     router.replace('/login');
  // }
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [router, session.status]);

  const validate = Yup.object({
    email: Yup.string()
      .email("Email is invalid!")
      .required("Email Required!"),
    password: Yup.string().required("Password Required!"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const notifySuccess = () => toast.success("The login is successful");
  const notifyError = () => toast.error("Your email or password is incorrect");
  
  const handleSubmit = async (values) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        notifyError();
      } else if (response?.url) {
        console.log( notifySuccess)
        notifySuccess();
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in");
    }
  };
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      notifySuccess();
      router.push("/");
    } catch (error: any) {
      console.error(error);
      notifyError();
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-300 to-blue-700 h-screen w-screen pt-40 px-5 md:px-0 md:pt-24">
      <h1 className="text-5xl text-white flex justify-center items-center">DEPRA</h1>
      <Formik initialValues={initialValues} validationSchema={validate} onSubmit={handleSubmit}>
        <div className="flex mt-10 justify-center items-center text-white">
          <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-2xl px-4 sm:px-8 py-6 mb-8 bg-gradient-to-br  from-cyan-600 to-indigo-700">
            <h1 className="text-3xl pb-4 text-center font-nunito">Log in</h1>
            <div className="flex text-lg font-extralight items-center justify-center gap-4">
              <h1 className="pb-4 flex justify-center">Still don&apos;t have an account?</h1>
              <Link className="mb-4 underline" href="/register" onClick={() => router.push("/register")}>Sign up</Link>
              {/* TODO: Fix push to '/register' 20.05.24 Max*/}
            </div>
            <InputField type="email" name="email" placeholder="Your email" />
            <InputField type="password" name="password" placeholder="Password" showPasswordToggle={true} />
            <div className="flex justify-center text-center"><p>or</p></div>
            <div className="flex my-5 justify-center items-center">
              <GoogleSignInButton onClick={handleGoogleSignIn} />
            </div>
            <FormSubmitButton onClick={handleSubmit}>Login</FormSubmitButton>
          </Form>
        </div>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
