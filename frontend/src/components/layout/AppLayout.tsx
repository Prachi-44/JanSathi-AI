import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Landmark, LogOut, Moon, Search, Sun, UserCheck } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";

export function AppLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  // Dynamic Navigation Items
  const navItems = [
    { to: "/", label: "Home", hideIfAuth: true },
    { to: "/schemes", label: "Browse Schemes", alwaysShow: true },
    { to: "/dashboard", label: "Dashboard", requireAuth: true },
    { to: "/eligibility", label: "Eligibility Wizard", requireAuth: true },
    { to: "/admin", label: "Admin Console", requireAdmin: true },
  ];

  const visibleItems = navItems.filter((item) => {
    if (item.alwaysShow) return true;
    if (item.requireAdmin) return isAuthenticated && user?.is_admin;
    if (item.requireAuth) return isAuthenticated;
    if (item.hideIfAuth) return !isAuthenticated;
    return false;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur shadow-sm">
        {/* National Saffron border top bar for GovTech theme */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />
        
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Landmark className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold tracking-tight">JanSathi AI</span>
              <span className="block truncate text-[10px] text-muted-foreground font-semibold">National Scheme Platform</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary navigation">
            {visibleItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground border border-transparent hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-10 w-10 p-0 rounded-lg border shadow-sm" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5 ml-2 border-l pl-3.5">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-bold truncate max-w-[120px]">{user?.full_name}</span>
                  <span className="text-[9px] text-muted-foreground uppercase font-extrabold tracking-wide">
                    {user?.is_admin ? "Administrator" : "Citizen"}
                  </span>
                </div>
                <Button variant="ghost" className="h-9 px-3 text-destructive border hover:bg-destructive/10 rounded-lg text-xs" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1.5" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l pl-3 ml-1">
                <Link to="/login">
                  <Button variant="ghost" className="h-9 px-3 text-xs rounded-lg">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="h-9 px-3.5 text-xs rounded-lg shadow-sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden border-t pt-2" aria-label="Mobile navigation">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
