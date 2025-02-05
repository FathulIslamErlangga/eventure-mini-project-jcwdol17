"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/components/contexts/AuthContexts";
import { GuardRole, ProtectedRoute } from "@/middlewares/auth.middleware";

const page = () => {
  const { user, logout } = useAuth();
  console.log(user?.data);
  return (
    <ProtectedRoute>
      {/* contoh Hanya user yang sudah login yang bisa akses */}
      <GuardRole allowedRole="CUSTOMER">
        {/* contoh Hanya user dengan role tertentu yang bisa akses  */}
        <section className="mx-auto py-64">
          {/* 
        ini get data user untuk mengambil data user sebelum klik profile dengan slug
      */}

          <h1 className="text-center font-semibolf">Get user</h1>
          {user && (
            <>
              <h1>{user?.data.profile?.name}</h1>
              <Image
                src="/dddd"
                alt=""
                className="mx-auto"
                width={100}
                height={100}
              />
              <span>{user?.data.email}</span>
              <span></span>
              <button onClick={logout}>logout</button>
            </>
          )}
        </section>
      </GuardRole>
    </ProtectedRoute>
  );
};

export default page;
