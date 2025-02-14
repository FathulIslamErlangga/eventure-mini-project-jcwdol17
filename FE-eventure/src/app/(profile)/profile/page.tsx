"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/components/contexts/AuthContexts";
import withAuth from "@/middlewares/auth.middleware";

const page = () => {
  const { auth } = useAuth();
  const { user } = auth;
  const logout = auth.logout;
  console.log(user?.data);
  return (
    <section className="mx-auto py-64">
      {/* 
        ini get data user untuk mengambil data user sebelum klik profile dengan slug
      */}

      <h1 className="text-center font-semibolf">Get user</h1>
      {user && (
        <>
          <h1>{user?.data.profile?.name}</h1>
          {user.data.profile?.imageProfile.map((image) => (
            <Image
              key={image.id}
              src={image.imageUrl}
              alt=""
              className="mx-auto"
              width={100}
              height={100}
            />
          ))}

          <span>{user?.data.email}</span>
          <span></span>
          <button onClick={logout}>logout</button>
        </>
      )}
    </section>
  );
};

export default withAuth(page, ["ORGANIZER"]);
