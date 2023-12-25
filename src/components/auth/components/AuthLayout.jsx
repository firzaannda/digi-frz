import React from "react";

export const AuthLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <section className="bg-black" />
      <section className="flex justify-center items-center">{children}</section>
    </div>
  );
};
