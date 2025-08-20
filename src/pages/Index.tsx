import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "./Landing";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has current planner
    const currentPlanner = localStorage.getItem('currentPlanner');
    if (currentPlanner) {
      navigate('/planner');
    }
  }, [navigate]);

  return <Landing />;
};

export default Index;