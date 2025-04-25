
import React from "react";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

export const RootLayout: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
};
