
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";

const Header: React.FC = () => {
  const { isAuthenticated, profile, logout } = useAuth();

  return (
    <header className="border-b py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Auth<span className="text-primary">App</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:block text-sm">
                Welcome, <span className="font-medium">{profile?.first_name || 'User'}</span>
              </div>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
