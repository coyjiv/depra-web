import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputField";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { FormSubmitButton } from "@/components/buttons/buttons";
import { AiFillMail } from "react-icons/ai";
import Checkbox from "@/components/Checkbox/Checkbox";

const RegistrationPage = () => {
    const router = useRouter();

    const validate = Yup.object({
        email: Yup.string()
            .email("Email is invalid!")
            .required("Email Required!"),
        password: Yup.string()
            .min(8, "Password must be minimum 8 digits!")
            .required("Password Required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password must match!")
            .required("Confirm password is required!"),
        checkbox: Yup.boolean().test(
            "is-checked",
            "Fill the checkbox to continue",
            (value) => value === true
        ),
    });

    const initialValues = {
        email: "",
        password: "",
        checkbox: false,
    };

    const notifySuccess = () => toast.success("Registration successful");
    const notifyError = (message: string) => toast.error(message);

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: values.email,
                createdAt: new Date(),
            });
            notifySuccess();
            router.push("/");
            // TODO: Fix redirect after registration + notifyError after inappropriate fields 20.05.24 Max
        } catch (error: any) {
            console.error(error);
            notifyError(error.message);
        }
    };

    return (
        <div className="bg-gradient-to-br from-sky-300 to-blue-700 font-custom h-screen w-screen pt-40 px-5 md:px-0 md:pt-24">
            <h1 className="text-5xl text-white flex justify-center items-center font-nunito">
                DEPRA
            </h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values, actions) => {
                    fetch("/api/auth/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: values.email,
                            password: values.password,
                        }),
                    })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                    actions.resetForm();
                    router.push("/api/auth/signin");
                    notifySuccess();
                }}
            >
                {(formik) => (
                    <div className="flex mt-10 justify-center items-center text-white">
                        <Form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-xl shadow-2xl px-4 sm:px-8 py-6 mb-8 bg-gradient-to-br from-cyan-600 to-indigo-700">
                            <h1 className="text-3xl pb-4 text-center font-nunito">
                                Register
                            </h1>
                            <InputField
                                type="email"
                                name="email"
                                placeholder="Your email"
                                icon={<AiFillMail />}
                            />
                            <InputField
                                type="password"
                                name="password"
                                placeholder="Password"
                                showPasswordToggle={true}
                            />
                            <InputField
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                showPasswordToggle={true}
                            />
                            <div className="flex justify-between gap-1 mt-12 mb-5">
                                <p className="text-sm">
                                    By checking this box, I agree to terms of
                                    the service
                                </p>
                                <Checkbox
                                    onChange={() =>
                                        formik.setFieldValue(
                                            "checkbox",
                                            !formik.values.checkbox
                                        )
                                    }
                                    checked={formik.values.checkbox}
                                    label=""
                                />
                            </div>
                            <FormSubmitButton onClick={handleSubmit}>Register</FormSubmitButton>
                        </Form>
                    </div>
                )}
            </Formik>
            <ToastContainer />
        </div>
    );
};

export default RegistrationPage;
