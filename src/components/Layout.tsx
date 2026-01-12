import { Link, useLocation } from "react-router-dom";
import { Bot, Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ArionkoderLogo } from "./ArionkoderLogo";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-primary/20 shadow-lg">
              <Bot size={18} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
               <span className="font-display font-bold">Trust OS</span>
               <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-normal bg-muted/50 px-2 py-0.5 rounded-full border border-border/50">
                  by Arionkoder <ArionkoderLogo height={12} className="opacity-80" />
               </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-foreground ${
                location.pathname === "/" ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              Patterns
            </Link>
            <Link
              to="#"
              className="text-muted-foreground/50 cursor-not-allowed"
            >
              AI Handbook (Soon)
            </Link>
            <Link
              to="#"
              className="text-muted-foreground/50 cursor-not-allowed"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12 animate-in fade-in duration-500">
        {children}
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Bot size={16} className="text-primary" />
                  <span className="font-display font-bold">Trust OS</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1">
                    by Arionkoder <ArionkoderLogo height={14} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs font-normal">
                A catalog of design patterns to build AI systems that users trust, understand, and rely on.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-16 text-sm">
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-foreground">Resources</h4>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Examples</Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Figma Kit</Link>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-foreground">Legal</h4>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center md:text-left text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Trust Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}