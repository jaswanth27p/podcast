/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = ({ setPopupVisible, type, isPopupVisible }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    passwordError: false,
    userTypeError: false,
  });
  const userErrorMessage = `Please Login as ${type}`;

  const onClose = () => {
    setPopupVisible(false);
    setError({ ...error, userTypeError: false });
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const registerBeforeLogin = () => {
    alert("Please register before login");
    setIsLogin(false);
  };
  const validatePassword = (loggedInDetails) => {
    if (loggedInDetails.type === type) {
      loggedInDetails.password === password
        ? navigate("/user")
        : setError({ ...error, passwordError: true });
    } else {
      setError({ ...error, userTypeError: true });
      setUsername("");
      setPassword("");
      setEmail("");
    }
  };

  const validateRegisterLogin = (resData) => {
    const loggedInDetails =
      resData?.find((userData) => userData?.email === email) || null;
    if (isLogin) {
      // Perform login logic here
      loggedInDetails === null
        ? registerBeforeLogin()
        : validatePassword(loggedInDetails);
    } else {
      // Perform registration logic here
      // You can access the values of `username`, `password`, `email`, and `mobile` for registration
      const userData = {
        userName: username,
        password: password,
        email: email,
        type: type,
      };
      setUsername("");
      setPassword("");
      setEmail("");
      setIsLogin(true);
      loggedInDetails === null
        ? Axios.post(
            "http://localhost:4000/credentialRoute/create-credential",
            userData
          )
            .then((res) => {
              if (res.status === 200) alert("Registered successfully");
              else Promise.reject();
            })
            .catch((err) => alert(err))
        : alert("user already exists");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.get("http://localhost:4000/credentialRoute")
      .then((res) => {
        if (res.status === 200) {
          validateRegisterLogin(res.data);
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      className={`fixed bg-gray-300 bg-opacity-70 inset-0 flex items-center justify-center z-50 ${
        isPopupVisible ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? type + " Login" : type + " Register"}
        </h2>
        {error?.userTypeError && (
          <p className="text-red-500 text-sm">{userErrorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={isLogin ? email : username}
                onChange={(e) =>
                  isLogin
                    ? setEmail(e.target.value)
                    : setUsername(e.target.value)
                }
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error.passwordError && (
              <p className="text-red-500 text-sm">Incorrect Password</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="flex justify-around">
          <button
            onClick={handleToggleForm}
            className="bg-gray-300 hover-bg-gray-400 rounded p-2 mr-2"
          >
            {isLogin ? "Register" : "Login"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover-bg-gray-400 rounded p-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
