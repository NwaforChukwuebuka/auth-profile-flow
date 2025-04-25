
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/FormWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <FormWrapper 
        title="Welcome Back" 
        description="Sign in to your account to continue"
      >
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </FormWrapper>
    </div>
  );
};

export default LoginPage;
