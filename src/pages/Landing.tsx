import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Layout, Palette, Target } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [plannerName, setPlannerName] = useState("");
  const [background, setBackground] = useState("default");
  const [goalDate, setGoalDate] = useState("");

  const handleCreatePlanner = () => {
    if (!plannerName.trim()) return;
    
    // Store planner settings in localStorage for now
    localStorage.setItem('plannerSettings', JSON.stringify({
      name: plannerName,
      background,
      goalDate
    }));
    
    navigate('/planner');
  };

  const backgroundOptions = [
    { value: "default", label: "پیش‌فرض", gradient: "gradient-hero" },
    { value: "sunset", label: "غروب آفتاب", gradient: "bg-gradient-to-br from-orange-500 to-pink-500" },
    { value: "ocean", label: "اقیانوس", gradient: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { value: "forest", label: "جنگل", gradient: "bg-gradient-to-br from-green-500 to-emerald-500" },
    { value: "purple", label: "بنفش", gradient: "bg-gradient-to-br from-purple-500 to-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Layout className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold">my planner</h1>
          </div>
          <p className="text-lg text-muted-foreground persian-text">
            برنامه‌ریز شخصی خود را بسازید
          </p>
        </div>

        {/* Create Planner Form */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="persian-text flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              ایجاد برنامه‌ریز جدید
            </CardTitle>
            <CardDescription className="persian-text">
              برنامه‌ریز خود را شخصی‌سازی کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Planner Name */}
            <div className="space-y-2">
              <Label htmlFor="plannerName" className="persian-text">نام برنامه‌ریز</Label>
              <Input
                id="plannerName"
                placeholder="مثال: برنامه‌ریز کاری من"
                value={plannerName}
                onChange={(e) => setPlannerName(e.target.value)}
                className="text-right"
              />
            </div>

            {/* Background Selection */}
            <div className="space-y-3">
              <Label className="persian-text flex items-center gap-2">
                <Palette className="w-4 h-4" />
                انتخاب پس‌زمینه
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {backgroundOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBackground(option.value)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      background === option.value 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-full h-12 rounded ${option.gradient} mb-2`}></div>
                    <span className="text-sm persian-text">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Date */}
            <div className="space-y-2">
              <Label htmlFor="goalDate" className="persian-text flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                تاریخ هدف (اختیاری)
              </Label>
              <Input
                id="goalDate"
                type="date"
                value={goalDate}
                onChange={(e) => setGoalDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground persian-text">
                تاریخی که می‌خواهید تسک‌هایتان تا آن زمان تمام شود
              </p>
            </div>

            {/* Create Button */}
            <Button 
              onClick={handleCreatePlanner}
              disabled={!plannerName.trim()}
              className="w-full h-12 text-lg persian-text"
            >
              ایجاد برنامه‌ریز
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;