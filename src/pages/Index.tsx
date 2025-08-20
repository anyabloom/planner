import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "./Landing";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has planner settings
    const plannerSettings = localStorage.getItem('plannerSettings');
    if (plannerSettings) {
      navigate('/planner');
    }
  }, [navigate]);

  return <Landing />;
};

export default Index;