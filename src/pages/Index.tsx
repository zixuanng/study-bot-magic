import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LandingHero } from "@/components/LandingHero";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  return <LandingHero />;
};

export default Index;
