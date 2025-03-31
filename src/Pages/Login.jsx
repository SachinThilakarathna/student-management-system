import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  useEffect(() => {
    window.history.pushState(null, null, null); // Disable back button
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const logLogin = async (email) => {
    try {
      const sanitizedEmail = email.replace(/[.#$[\]]/g, "_");
      const loginRef = ref(db, `AuditLogs/LoginLogoutLogs/log1/${sanitizedEmail}`);
      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0];
      const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

      const logEntry = {
        type: "login",
        details: "User logged in successfully",
        date: formattedDate,
        time: formattedTime,
      };

      await set(loginRef, logEntry);
    } catch (error) {
      console.error("Error logging login activity:", error);
      toast.error("Error logging login activity!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#be1faf", color: "#ffffff" },
        progressStyle: { background: "#631a5c" },
      });
    }
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

      // Log the login activity
      await logLogin(email);

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
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember Me
            </label>
            <button type="button" onClick={handleForgotPassword} className="hover:underline text-[#631a5c] font-medium">
              Forgot Password?
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