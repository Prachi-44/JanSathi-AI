import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Landmark, Loader2, Lock, Mail } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Field, inputClassName } from "../components/ui/form-field";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      showToast({ title: "Validation Error", description: "Email and password are required.", variant: "error" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast({ title: "Welcome back!", description: "You have logged in successfully." });
      navigate("/dashboard");
    } catch (err: any) {
      showToast({
        title: "Login failed",
        description: err.response?.data?.detail || "Invalid email or password.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-soft">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Landmark className="h-6 w-6" />
            </span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Citizen Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your saved schemes and history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field label="Email Address">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  className={`${inputClassName} pl-10`}
                  placeholder="name@example.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Field>

            <Field label="Password">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  className={`${inputClassName} pl-10`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Field>

            <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              <span>Sign In</span>
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Register here
              </Link>
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Demo credentials: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">admin@jansathi.gov.in</span> / <span className="font-mono bg-muted px-1.5 py-0.5 rounded">admin123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
