import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import signupSceneImage from "../../assets/images/signup-scene.svg";
import { post } from "../../services/api";
import { IUser } from "../../types/User";

// Define validation schema using yup
const schema = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const response = await post("/account/register", {
        username: data.userName,
        email: data.email,
        password: data.password,
      });
      const { token } = response as IUser;
      if (token) {
        navigate("/auth/signedup");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 h-screen">
        <div className="lg:col-span-1 flex flex-col justify-center px-6 py-6 sm:max-w-sm sm:mx-auto lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-lg font-semibold leading-7 text-gray-900">
              Sign up
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              New bidders, as soon as you have submitted your information you
              will be eligible to bid in the auction.
            </p>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Name
                </label>
                <div className="mt-2">
                  <input
                    id="userName"
                    type="text"
                    {...register("userName")}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.userName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
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
                  Submit
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
          <img
            src={signupSceneImage}
            alt="Decorative Illustration"
            className="h-[420px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
