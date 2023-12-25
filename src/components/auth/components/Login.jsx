"use client";
import { Button, Input } from "@nextui-org/react";

export const Login = () => {
  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log({ email, password });
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
          <Button className="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
