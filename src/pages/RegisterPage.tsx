import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, User, Factory } from "lucide-react";
import { motion } from "framer-motion";

type Role = "buyer" | "manufacturer";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("buyer");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      navigate("/manufacturer/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-xl border border-border bg-card p-8 shadow-warm">
          <div className="mb-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold">Crafts Hub</span>
            </Link>
            <h1 className="font-display text-2xl font-bold">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join the artisan marketplace</p>
          </div>

          {/* Role Toggle */}
          <div className="mb-6 flex rounded-lg border border-border bg-muted p-1">
            <button
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                role === "buyer" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setRole("buyer")}
            >
              <User className="h-4 w-4" /> Buyer
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${
                role === "manufacturer" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setRole("manufacturer")}
            >
              <Factory className="h-4 w-4" /> Manufacturer
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">{role === "manufacturer" ? "Group / SHG Name" : "Full Name"}</Label>
              <Input id="name" placeholder={role === "manufacturer" ? "e.g. Lakshmi Self Help Group" : "Your name"} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            {role === "manufacturer" && (
              <>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Village, State" required />
                </div>
                <div>
                  <Label htmlFor="bio">About Your Group</Label>
                  <Textarea id="bio" placeholder="Tell us about your craft and group..." rows={3} />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Register as {role === "buyer" ? "Buyer" : "Manufacturer"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
