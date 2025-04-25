
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  touched,
  className,
  id,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const showError = touched && error;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={inputId}>{label}</Label>
        {showError && (
          <span className="text-xs text-destructive flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {error}
          </span>
        )}
      </div>
      <Input
        id={inputId}
        className={cn(
          showError && "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-invalid={showError ? "true" : "false"}
        {...props}
      />
    </div>
  );
};

export default FormInput;
