"use client";
import ModalForm from "@/components/auth/forgotPassword/modalFormEmail";
import { useAuth } from "@/components/contexts/AuthContexts";
import { LoginData } from "@/utils/interfaces/customInsterface";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import "@/css/authPage/signIn.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');

  // Validation schema using Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleChangeForgot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSendMailForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth.forgot(email);
  };

  useEffect(() => {
    if (auth.message) {
      const isErrorMessage =
        auth.message.toLowerCase().includes("error") ||
        auth.message.toLowerCase().includes("invalid") ||
        auth.message.toLowerCase().includes("wrong") ||
        auth.message.toLowerCase().includes("not found");

      if (isErrorMessage) {
        toast.error(auth.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsLoading(false);
      } else {
        toast.success(auth.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }, [auth.message]);

  useEffect(() => {
    // Redirect to profile when user is successfully logged in
    if (auth.user && auth.user.data && auth.user.data.slug) {
      router.push(`/eprofile/${auth.user.data.slug}`);
    }
  }, [auth.user, router]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="signin-page">
        <div className="signin-page-container">
          <div className="signin-title">
            <h2>Sign In</h2>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setIsLoading(true);
              try {
                await auth.login(values);
              } catch (error) {
                console.error('Login error', error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="eventure-form">
                <label className="input input-bordered border-[3px] border-[#04002D] flex items-center gap-2 p-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <Field 
                    type="email" 
                    name="email" 
                    className="grow"
                    placeholder="Email" 
                  />
                </label>
                  <ErrorMessage 
                    name="email" 
                    component="div" 
                    className="text-danger" 
                  />
                <label className="input input-bordered border-[#04002D] border-[3px] flex items-center gap-2 py-7 pl-7 pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Field 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    className="grow"
                    placeholder="Password" 
                  />
                  <button
                    className="btn-show-hide-pwd"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="12"
                        width="15"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="12"
                        width="13.5"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="#04002d"
                          d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                        />
                      </svg>
                    )}
                  </button>
                </label>
                  <ErrorMessage 
                    name="password" 
                    component="div" 
                    className="text-danger" 
                  />
                <button 
                  type="submit" 
                  className={`eventure-button ${
                  isLoading || isSubmitting ? "cursor-wait opacity-50" : ""
                }`}
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </Form>
            )}
          </Formik>
          <div className="w-full h-fit flex justify-between mt-5">
            <div className="signin-ask">
              <span>
                Don't have an account? <Link href="/signup">Sign Up</Link>
              </span>
            </div>
            <button className="border-none" onClick={auth.onClickModal}>
              Forgot Password
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <ModalForm
        isOpen={auth.isOpen}
        onClose={auth.onClickModal}
        handleChange={handleChangeForgot}
        handleSendMailForgot={handleSendMailForgot}
        message={auth.message}
        email={email}
      />
    </>
  );
};

export default SignIn;
