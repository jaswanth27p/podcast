/* eslint-disable react/prop-types */
import { useState } from "react";

const Login = ({ onClose,type, isPopupVisible  }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Perform login logic here
    } else {
      // Perform registration logic here
      // You can access the values of `username`, `password`, `email`, and `mobile` for registration
    }
  };

  return (
    <div
      className={`fixed bg-gray-300 bg-opacity-70 inset-0 flex items-center justify-center z-50 ${
        isPopupVisible ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? type+" Login" : type+ " Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            />
          </div>
          {isLogin ? null : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold">
                  Mobile
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </>
          )}
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
