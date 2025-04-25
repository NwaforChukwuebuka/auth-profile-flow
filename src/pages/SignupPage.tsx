
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/FormWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/; // Simplified phone validation

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  age: Yup.number()
    .min(13, "You must be at least 13 years old")
    .required("Age is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignupPage: React.FC = () => {
  const { signup, isLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const userData = {
        ...values,
        age: parseInt(values.age.toString(), 10),
      };
      await signup(userData);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <FormWrapper 
        title="Create an Account" 
        description="Sign up to get started with our service"
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name}
            touched={formik.touched.name}
            required
          />
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
            label="Phone"
            name="phone"
            type="tel"
            placeholder="1234567890"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.phone}
            touched={formik.touched.phone}
            required
          />
          <FormInput
            label="Age"
            name="age"
            type="number"
            placeholder="25"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.age}
            touched={formik.touched.age}
            required
            min="13"
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
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </FormWrapper>
    </div>
  );
};

export default SignupPage;
