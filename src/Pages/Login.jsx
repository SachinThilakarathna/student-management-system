import { useState } from "react";
// import '../Components/Link/aa.css'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"  style={{ backgroundImage: "url('background.png')" }}>
      <div className="bg-transparent text-white border-2 border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 "
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 "
              placeholder="Password"
              required
            />
            <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 cursor-pointer">
              {showPassword ? (
                <IoEyeOutline />
              ) : (
                <IoEyeOffOutline />
              )}
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
    </>
  );
}


export default Login







{/* <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('loginbackground.png')" }}> */}
