import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database"; // Correct import for v9+
import "react-toastify/dist/ReactToastify.css";

function LogoutLink() {
  const navigate = useNavigate();

  // Function to log logout activity
  const logLogout = async (email) => {
    try {
      const sanitizedEmail = email.replace(/[.#$[\]]/g, '_'); // Sanitize email for Firebase path
      const db = getDatabase(); // Initialize the database instance
      const logoutRef = ref(db, `AuditLogs/LoginLogoutLogs/log2/${sanitizedEmail}`);
      
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
      
      const logEntry = {
        type: "logout",
        details: "User logged out",
        date: formattedDate,
        time: formattedTime,
      };

      // Save logout log to Firebase
      await set(logoutRef, logEntry);
    } catch (error) {
      console.error("Error logging logout activity:", error);
      toast.error("Error logging logout activity!", {
        position: "top-center",
        autoClose: 2000,
        style: { background: "#be1faf", color: "#ffffff" },
        progressStyle: { background: "#631a5c" },
      });
    }
  };

  const handleLogout = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await logLogout(currentUser.email); // Log the logout activity
      }

      await signOut(auth);
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#631a5c",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#be1faf" },
      });

      setTimeout(() => navigate("/"), 2000); // Redirect after 2s
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: "#be1faf",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: "16px",
          padding: "15px",
          top: "70px",
        },
        progressStyle: { background: "#631a5c" },
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
      <ToastContainer />
    </div>
  );
}

export default LogoutLink;
