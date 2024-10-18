import { Link } from "react-router-dom";
import LoginSceneImage from "../../assets/images/login-scene.svg";

const Login = () => {
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
            <form action="#" method="POST" className="space-y-6">
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
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
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
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
