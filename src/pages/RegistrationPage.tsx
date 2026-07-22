import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const nagivate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    othermessage: ""
  });
  const eyeVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleFormData = (id: string, value: string) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  }
  // console.log(registerData);
  const handleRegistrationSubmit = async () => {
    try {
      setLoading(true);

      const data = await registerUser({
        email: registerData.email,
        username: registerData.username,
        password: registerData.password,
      });

      if(data.success){
        sessionStorage.setItem("userId", data.user.userId)
        nagivate("/dashboard");
      }
      // console.log("Success:", data);

    } catch (error: any) {
      console.error("Registration Error:", error);

      setError((prev) => ({
        ...prev,
        othermessage: error.message
      }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" rounded shadow-md p-6 bg-linear-to-r from-white-500 to-blue-300">
        <h1 className="text-2xl font-bold mb-2 text-center">Welcome !</h1>
        <p className="text-black mb-4 text-center">Sign Up</p>
        <p className="text-red-500 text-[10px] text-center">{error.othermessage}</p>
        <form className="space-y-4">
          <div>
            <input
              placeholder="Enter Username"
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full shadow-sm sm:text-sm p-1 focus:ring-1 focus:ring-black focus:outline-none rounded-sm "
              value={registerData.username}
              onChange={(e) => handleFormData(e.target.id, e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Enter Email"
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full shadow-sm sm:text-sm p-1 focus:ring-1 focus:ring-black focus:outline-none rounded-sm "
              value={registerData.email}
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
              value={registerData.password}
              onChange={(e) => handleFormData(e.target.id, e.target.value)}
            />
            <button type="button" onClick={eyeVisibility}
              className="absolute inset-y-0 right-0 pr-3">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <input
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 block w-full shadow-sm sm:text-sm p-1 focus:ring-1 focus:ring-black focus:outline-none rounded-sm "
            value={registerData.confirmPassword}
            onChange={(e) => handleFormData(e.target.id, e.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={handleRegistrationSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-sm mt-1">Already have an account? <Link to="/" className="text-blue-500 hover:underline">Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPage