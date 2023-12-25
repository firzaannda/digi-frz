"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      console.log(errorMessage);
      return;
    }
    console.log(message);
    router.push("/dashboard");
  }

  return (
    <div className="w-[360px] space-y-8">
      <div>
        <h3>Login</h3>
        <p>Welcome Back</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input placeholder="email" name="email" />
          <Input placeholder="password" type="password" name="password" />
          <Button className="w-full" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
