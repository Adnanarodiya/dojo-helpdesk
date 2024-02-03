"use client";

import AuthForm from "../AuthForm";

export default function Login() {
  const handleSubmit = async (
    e: { preventDefault: () => void },
    email: any,
    password: any
  ) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit} />
    </main>
  );
}
