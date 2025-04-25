
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { profile, isLoading, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-full p-3">
                <User className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileItem label="First Name" value={profile.first_name || "-"} />
              <ProfileItem label="Last Name" value={profile.last_name || "-"} />
              <ProfileItem label="Email" value={profile.email} />
              <ProfileItem label="Email Domain" value={profile.email_domain || "-"} />
              <ProfileItem label="Phone" value={profile.phone || "-"} />
              <ProfileItem label="Age" value={profile.age ? profile.age.toString() : "-"} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ProfileItemProps {
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      <p className="font-medium">{value}</p>
      <Separator className="mt-2" />
    </div>
  );
};

export default ProfilePage;
