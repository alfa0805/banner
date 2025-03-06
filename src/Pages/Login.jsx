import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone || !password) {
      return toast.error("Telefon raqami va parolni kiriting!");
    }

    setLoading(true);

    axios
      .post("https://api.fruteacorp.uz/auth/signin", {
        phone,
        password,
      })
      .then((res) => {
        // console.log(res?.data?.data?.refreshToken?.token);
        localStorage.setItem('accessToken',res?.data?.data?.accessToken?.token)
        toast.success("Muvaffaqiyatli o‘tildi");
        navigate("/home/banner");
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          err.response?.data?.message || "Xatolik yuz berdi. Qayta urinib ko‘ring"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[400px] bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          Kirish
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Telefon raqami
            </label>
            <input
              className="w-full p-2 border border-white bg-gray-700 text-white rounded-md"
              type="text"
              placeholder="+998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Parol
            </label>
            <input
              className="w-full p-2 border border-white bg-gray-700 text-white rounded-md"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              className="w-full text-white bg-blue-500 py-2 rounded-md hover:bg-blue-600"
              type="submit"
              disabled={loading}
            >
              {loading ? "Yuborilmoqda..." : "Kirish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
