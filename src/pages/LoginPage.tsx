import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { useDispatch } from "react-redux";
import { setUserId } from "@/features/userDataSlice";

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState({
    email: "",
    password: "",
    othermessage: ""
  });

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const eyeVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleFormData = (id: string, value: string) => {
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
  const submitLoginData = async () => {
    try {
      setLoading(true);
      const response = await loginUser(loginData);
      if (response.success) {
        dispatch(setUserId(response.user.userId))
        sessionStorage.setItem("userId", response.user.userId)
        // console.log("Login successful:", response);
        navigate("/dashboard");
      }

    } catch (error: any) {
      console.error("Login Error:", error);
      setError((prev) => ({
        ...prev,
        othermessage: error.message
      }))
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="  rounded shadow-md p-6 bg-linear-to-r from-white-500 to-blue-300">
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome !</h1>
        <p className="text-black mb-4 text-center">Please log in to continue.</p>
        <form className="space-y-4">
          <div>
            <input
              placeholder="Enter Email"
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full shadow-sm sm:text-sm p-1 focus:ring-1 focus:ring-black focus:outline-none rounded-sm "
              value={loginData.email}
              onChange={(e) => handleFormData(e.target.id, e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 block w-full shadow-sm sm:text-sm p-1 focus:ring-1 focus:ring-black focus:outline-none rounded-sm "
              value={loginData.password}
              onChange={(e) => handleFormData(e.target.id, e.target.value)}
            />
            <button type="button" onClick={eyeVisibility}
              className="absolute inset-y-0 right-0 pr-3">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <p className="text-xs text-red-500">{error.othermessage}</p>
          <div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              onClick={submitLoginData}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-sm mt-1">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage