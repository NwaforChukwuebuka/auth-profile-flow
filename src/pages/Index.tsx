
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="text-center max-w-2xl form-animation">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Authentication & Profile App
        </h1>
        <p className="text-xl text-muted-foreground mb-10">
          A complete authentication system with sign-up, login, and user profile management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {isAuthenticated ? (
            <Link to="/profile">
              <Button size="lg" className="text-base px-8">
                Go to Profile
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button size="lg" className="text-base px-6">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-base px-6">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            title="User Authentication"
            description="Secure signup and login with validation"
          />
          <FeatureCard
            title="Data Parsing"
            description="Automatic parsing of names and email domains"
          />
          <FeatureCard
            title="Profile Management"
            description="View and manage your user information"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <Card className="p-6">
      <h3 className="font-medium text-lg">{title}</h3>
      <Separator className="my-2" />
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default Index;
