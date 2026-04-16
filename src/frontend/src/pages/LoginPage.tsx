import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Shield, Users, Vote, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const features = [
  {
    icon: Users,
    title: "Collaborative rooms",
    description:
      "Create a room and invite anyone with a short code. No accounts for guests.",
  },
  {
    icon: Vote,
    title: "Real-time voting",
    description:
      "Raise questions, let members vote yes or no, and see live results instantly.",
  },
  {
    icon: Shield,
    title: "Secure & decentralized",
    description: "Powered by the Internet Computer — your identity, your data.",
  },
];

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/rooms" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      data-ocid="login.page"
      className="min-h-[calc(100vh-3.5rem-3rem)] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-10">
        {/* Hero mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-elevated">
            <Zap
              className="w-8 h-8 text-primary-foreground"
              strokeWidth={2.5}
            />
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Group decisions, <span className="text-primary">made simple</span>
            </h1>
            <p className="text-muted-foreground text-lg font-body max-w-lg mx-auto leading-relaxed">
              Create a room, share the code, raise questions, and vote together
              — real-time, no friction.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-3 w-full max-w-xs"
        >
          <Button
            size="lg"
            className="w-full h-12 font-display font-semibold text-base gap-2 transition-smooth"
            onClick={login}
            disabled={isLoading}
            data-ocid="login.primary_button"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Sign in with Internet Identity
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground font-body">
            Works on any device — log in from multiple places at once
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="grid sm:grid-cols-3 gap-4 w-full"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 text-left flex flex-col gap-3 hover:border-primary/40 transition-smooth"
              data-ocid={`login.feature.${i + 1}`}
            >
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-semibold text-sm text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
