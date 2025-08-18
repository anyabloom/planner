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
      bgColor: "bg-primary/10"
    },
    {
      title: "تکمیل شده",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "امروز",
      value: todayTasks,
      icon: Clock,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "درصد پیشرفت",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 shadow-soft border-0 gradient-card hover:shadow-medium transition-smooth">
          <div className="flex items-center gap-3">
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