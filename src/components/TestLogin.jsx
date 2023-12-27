import { Button, Input } from "@nextui-org/react";
import React from "react";

export const TestLogin = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-blue-700 w-[360px]">
        <div>
          <h1 className="text-center">berlaku.id</h1>
        </div>
        <form action="" className="py-[66px]">
          <div className="space-y-2">
            <Input label="email" />
            <Input label="password" />
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
