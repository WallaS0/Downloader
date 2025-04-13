import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import CursorGlow from "@/components/ui/cursor-glow";
import AnimatedBackground from "@/components/ui/animated-background";
import FloatingNav from "@/components/FloatingNav";
import HomePage from "@/pages/home-page";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import FeaturesPage from "@/pages/features-page";
import FaqPage from "@/pages/faq-page";
import HowItWorksPage from "@/pages/how-it-works-page";
import { ProtectedRoute } from "./lib/protected-route";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@/hooks/use-auth";

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function Router() {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setLocation(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("pushstate", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("pushstate", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Switch location={location} key={location}>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <ProtectedRoute path="/profile" component={() => <ProfilePage />} />
          <Route path="/features">
            <FeaturesPage />
          </Route>
          <Route path="/faq">
            <FaqPage />
          </Route>
          <Route path="/how-it-works">
            <HowItWorksPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="app min-h-screen relative">
        {/* Animated background */}
        <AnimatedBackground className="opacity-20" />
        
        {/* Custom cursor effect - disabled on mobile */}
        <CursorGlow />
        
        {/* Floating Navigation */}
        <FloatingNav />
        
        {/* Main content */}
        <Router />
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
