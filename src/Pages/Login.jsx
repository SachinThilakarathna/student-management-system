import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#631a5c", color: "#ffffff" },
        progressStyle: { background: "#be1faf" },
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error("Invalid email or password.", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#be1faf", color: "#ffffff" },
        progressStyle: { background: "#631a5c" },
      });
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.warn("Please enter your email first!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#be1faf", color: "#ffffff" },
        progressStyle: { background: "#631a5c" },
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#631a5c", color: "#ffffff" },
        progressStyle: { background: "#be1faf" },
      });
    } catch (error) {
      toast.error("Failed to send reset email. Check email format!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#be1faf", color: "#ffffff" },
        progressStyle: { background: "#631a5c" },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('background.png')" }}>
      <ToastContainer />
      <div className="bg-transparent text-white border-2 border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
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
            {/* Forgot Password Link with Click Handler */}
            <button type="button" onClick={handleForgotPassword} className="hover:underline text-[#631a5c] font-medium">
              Forgot password?
            </button>
          </div>
          <button type="submit" className="w-full text-white py-2 rounded-lg hover:bg-[#be1faf] transition bg-[#631a5c]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
