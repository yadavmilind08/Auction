import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import LoginSceneImage from "../../assets/images/login-scene.svg";
import { post } from "../../services/api";
import { IUser } from "../../types/User";
import { useAuth } from "../../hooks/useAuth";
import useUserStore from "../../store/useUserStore";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setErrorMessage(null);

    try {
      const response = await post("/account/login", {
        email: data.email,
        password: data.password,
      });

      const { token } = response as IUser;

      if (token) {
        login(token);
        setUser(response as IUser);
        navigate("/dashboard");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        <div className="lg:col-span-1 flex flex-col justify-center px-6 py-12 sm:max-w-sm sm:mx-auto lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-lg font-semibold leading-7 text-gray-900">
              Login
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Welcome back. Enter your credentials to access your account
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.email ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.password ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Continue
                </button>
              </div>
            </form>

            {errorMessage && (
              <p className="mt-4 text-center text-red-500 text-sm">
                {errorMessage}
              </p>
            )}

            <p className="mt-10 text-center text-sm text-gray-500">
              Don’t have an Account?{" "}
              <Link
                to="/auth/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-2 flex items-center justify-center">
          <img
            src={LoginSceneImage}
            alt="Login Scene Image"
            className="h-auto w-full max-h-[80vh] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
