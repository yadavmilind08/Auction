import { Link } from "react-router-dom";
import signupSceneImage from "../../assets/images/signup-scene.svg";

const Signup = () => {
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
            <form action="#" method="POST" className="space-y-4">
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
                    name="userName"
                    type="text"
                    required
                    autoComplete="userName"
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
