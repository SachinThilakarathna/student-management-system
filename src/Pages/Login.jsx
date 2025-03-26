import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { auth } from "../firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function


  //pw icon
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  //login success notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#631a5c", // Dark Purple Background
          color: "#ffffff", // White Text
        },
        progressStyle: {
          background: "#be1faf", // Light Purple Progress Bar
        },
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error("Invalid email or password.", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#be1faf", // Light Purple Background for Errors
          color: "#ffffff", // White Text
        },
        progressStyle: {
          background: "#631a5c", // Dark Purple Progress Bar
        },
      });
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('background.png')" }}>
      <ToastContainer />
      <div className="bg-transparent text-white border-2 border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
              placeholder="Password"
              required
            />
            <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer">
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="hover:underline text-[#631a5c] font-medium">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg hover:bg-[#be1faf] transition bg-[#631a5c]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

