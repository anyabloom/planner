import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Layout, Palette, Target } from "lucide-react";


const Landing = () => {
  const navigate = useNavigate();
  const [plannerName, setPlannerName] = useState("");
  const [background, setBackground] = useState("default");
  const [goalDate, setGoalDate] = useState("");
  const [savedPlanners, setSavedPlanners] = useState<any[]>([]);

  useEffect(() => {
    const planners = localStorage.getItem('savedPlanners');
    if (planners) {
      setSavedPlanners(JSON.parse(planners));
    }
  }, []);

  const handleCreatePlanner = () => {
    if (!plannerName.trim()) return;
    
    const newPlanner = {
      id: Date.now().toString(),
      name: plannerName,
      background,
      goalDate,
      createdAt: new Date().toISOString()
    };
    
    // Save to saved planners list
    const updatedPlanners = [...savedPlanners, newPlanner];
    localStorage.setItem('savedPlanners', JSON.stringify(updatedPlanners));
    
    // Set as current planner
    localStorage.setItem('currentPlanner', JSON.stringify(newPlanner));
    
    navigate('/planner');
  };

  const handleSelectPlanner = (planner: any) => {
    localStorage.setItem('currentPlanner', JSON.stringify(planner));
    navigate('/planner');
  };

  const handleDeletePlanner = (plannerId: string) => {
    const updatedPlanners = savedPlanners.filter(p => p.id !== plannerId);
    setSavedPlanners(updatedPlanners);
    localStorage.setItem('savedPlanners', JSON.stringify(updatedPlanners));
  };

  const getBackgroundClass = (bg: string) => {
    switch(bg) {
      case 'sunset': return 'bg-gradient-to-br from-orange-500 to-pink-500';
      case 'ocean': return '';
      case 'forest': return '';
      case 'purple': return 'bg-gradient-to-br from-purple-500 to-indigo-500';
      default: return '';
    }
  };

  const getBackgroundStyle = (bg: string) => {
    if (bg === 'ocean') {
      return {
        backgroundImage: `url(/lovable-uploads/e8dba7ff-7d4e-4f58-9c3c-e80c550879c7.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (bg === 'forest') {
      return {
        backgroundImage: `url(/lovable-uploads/46a7ea07-b1be-498a-a741-40c28059799d.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (bg === 'default') {
      return {
        backgroundImage: `url(/lovable-uploads/90f83d7d-be32-482d-aee4-7d698f927edf.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  };

  const backgroundOptions = [
    { value: "default", label: "صورتی", gradient: "", isImage: true },
    { value: "sunset", label: "غروب آفتاب", gradient: "bg-gradient-to-br from-orange-500 to-pink-500" },
    { value: "ocean", label: "اقیانوس", gradient: "", isImage: true },
    { value: "forest", label: "جنگل", gradient: "", isImage: true },
    { value: "purple", label: "بنفش", gradient: "bg-gradient-to-br from-purple-500 to-indigo-500" }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Saved Planners */}
          {savedPlanners.length > 0 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="persian-text flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  برنامه‌ریزهای من
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedPlanners.map((planner) => (
                  <div key={planner.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded ${getBackgroundClass(planner.background)}`}></div>
                      <div>
                        <h3 className="font-medium">{planner.name}</h3>
                        <p className="text-xs text-muted-foreground persian-text">
                          ایجاد شده: {new Date(planner.createdAt).toLocaleDateString('fa-IR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSelectPlanner(planner)}>
                        انتخاب
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeletePlanner(planner.id)}
                      >
                        حذف
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Create New Planner Form */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="persian-text flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                ایجاد برنامه‌ریزی جدید
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
                      <div 
                        className={`w-full h-12 rounded mb-2 ${option.gradient}`}
                        style={option.isImage ? {
                          backgroundImage: option.value === 'ocean' 
                            ? `url(/lovable-uploads/e8dba7ff-7d4e-4f58-9c3c-e80c550879c7.png)`
                            : option.value === 'forest'
                            ? `url(/lovable-uploads/46a7ea07-b1be-498a-a741-40c28059799d.png)`
                            : option.value === 'default'
                            ? `url(/lovable-uploads/90f83d7d-be32-482d-aee4-7d698f927edf.png)`
                            : '',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        } : {}}
                      ></div>
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
    </div>
  );
};

export default Landing;