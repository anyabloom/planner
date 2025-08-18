import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";

interface PlannerStatsProps {
  totalTasks: number;
  completedTasks: number;
  todayTasks: number;
}

export const PlannerStats = ({ totalTasks, completedTasks, todayTasks }: PlannerStatsProps) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "کل تسک‌ها",
      value: totalTasks,
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/20",
      gradient: "gradient-primary"
    },
    {
      title: "تکمیل شده",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/20",
      gradient: "gradient-accent"
    },
    {
      title: "امروز",
      value: todayTasks,
      icon: Clock,
      color: "text-secondary",
      bgColor: "bg-secondary/20",
      gradient: "gradient-secondary"
    },
    {
      title: "درصد پیشرفت",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-tertiary",
      bgColor: "bg-tertiary/20",
      gradient: "gradient-tertiary"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 shadow-soft border-0 gradient-card hover:shadow-medium transition-smooth animate-fade-in hover-scale relative overflow-hidden">
          <div className={`absolute inset-0 ${stat.gradient} opacity-5`}></div>
          <div className="relative flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground persian-text">{stat.title}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};