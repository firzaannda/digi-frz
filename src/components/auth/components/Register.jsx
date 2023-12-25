"use client";

import { Button, Input } from "@nextui-org/react";

export const Register = () => {
  async function handleSubmit(event) {
    event.preventDefault();

    const firstName = event.target.firstname.value;
    const lastName = event.target.lastname.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="w-[360px] space-y-8">
      <div>
        <h3>Register</h3>
        <p>Welcome!</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First Name" name="firstname" />
            <Input placeholder="Last Name" name="lastname" />
          </div>
          <Input placeholder="Username" name="username" />
          <Input placeholder="email" name="email" />
          <Input placeholder="password" type="password" name="password" />
          <Button color="primary" className="w-full" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
