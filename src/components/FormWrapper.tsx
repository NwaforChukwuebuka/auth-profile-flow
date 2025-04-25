
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 form-animation">
      <Card className={cn("shadow-md", className)}>
        <CardHeader>
          <CardTitle className="text-center text-2xl">{title}</CardTitle>
          {description && (
            <CardDescription className="text-center">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default FormWrapper;
