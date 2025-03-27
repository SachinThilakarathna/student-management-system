import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogoutLink() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#631a5c", // Dark Purple Background
          color: "#ffffff", // White Text
          borderRadius: "8px", // Rounded Corners
          fontSize: "16px", // Font Size
          padding: "15px", // Padding Inside Toast
          top: "70px",

        },
        progressStyle: {
          background: "#be1faf", // Light Purple Progress Bar
        },
      });

      setTimeout(() => navigate("/"), 2000); // Redirect after 2s
    } catch (error) {
      toast.error("Logout failed!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#be1faf", // Light Purple Background
          color: "#ffffff", // White Text
          borderRadius: "8px", // Rounded Corners
          fontSize: "16px", // Font Size
          padding: "15px", // Padding Inside Toast
          top: "70px",
        },
        progressStyle: {
          background: "#631a5c", // Dark Purple Progress Bar
        },
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="text-gray-100 hover:text-[#F6941F] transition duration-200 ease-in-out rounded-lg"
      >
        Logout
      </button>
      <ToastContainer/>

    </div>
  );
}

export default LogoutLink;
