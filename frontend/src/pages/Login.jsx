import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service";
import useAuthStore from "../store/auth.store";

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      login(data.user, data.token);

      toast.success("Welcome!");

      navigate("/chat");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#202123]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#2d2d2d] rounded-xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-white">
          Login
        </h1>

        <input
          className="w-full p-3 rounded bg-[#444]"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="w-full p-3 rounded bg-[#444]"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 rounded p-3 text-white">
          Login
        </button>

        <p className="text-gray-400 text-center">
          Don't have an account?{" "}
          <Link
            className="text-blue-400"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;