import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Clock, LogOut, Users, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

function truncatePrincipal(principal: string): string {
  if (principal.length <= 12) return principal;
  return `${principal.slice(0, 6)}…${principal.slice(-4)}`;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, principal, logout } = useAuth();
  const location = useLocation();

  // Extract room code from paths like /rooms/ABCD or /rooms/ABCD/history
  const roomMatch = location.pathname.match(/^\/rooms\/([^/]+)/);
  const roomCode = roomMatch ? roomMatch[1] : null;
  const isInRoom = roomCode !== null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to={isAuthenticated ? "/rooms" : "/"}
            className="flex items-center gap-2 transition-smooth hover:opacity-80"
            data-ocid="nav.home_link"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap
                className="w-4 h-4 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display font-semibold text-foreground tracking-tight text-sm sm:text-base">
              DecideRoom
            </span>
          </Link>

          {/* Nav actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Link to="/rooms" data-ocid="nav.rooms_link">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">My Rooms</span>
                </Button>
              </Link>
            )}

            {isAuthenticated && isInRoom && roomCode && (
              <Link
                to="/rooms/$code/history"
                params={{ code: roomCode }}
                data-ocid="nav.history_link"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </Button>
              </Link>
            )}

            {isAuthenticated && principal && (
              <div className="flex items-center gap-2">
                <span
                  className="hidden sm:block text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border"
                  title={principal.toText()}
                >
                  {truncatePrincipal(principal.toText())}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
