import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "@/components/planner/TaskCard";
import { AddTaskForm } from "@/components/planner/AddTaskForm";
import { WeeklyCalendar } from "@/components/planner/WeeklyCalendar";
import { PlannerStats } from "@/components/planner/PlannerStats";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, Layout, ArrowLeft, Settings } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  dueTime?: string;
  category?: string;
  completedAt?: string;
  completionTime?: string;
}

const Planner = () => {
  const navigate = useNavigate();
  const [plannerSettings, setPlannerSettings] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'مطالعه کتاب برنامه‌نویسی',
      description: 'مطالعه فصل ۳ تا ۵ کتاب جاوااسکریپت',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      dueTime: '14:30',
      category: 'مطالعه'
    },
    {
      id: '2',
      title: 'تمرین ورزشی',
      description: 'دویدن در پارک به مدت ۳۰ دقیقه',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-18',
      dueTime: '07:00',
      category: 'سلامت'
    },
    {
      id: '3',
      title: 'جلسه کاری',
      description: 'بررسی پروژه جدید با تیم',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-19',
      dueTime: '10:00',
      category: 'کار'
    }
  ]);

  useEffect(() => {
    const planner = localStorage.getItem('currentPlanner');
    if (planner) {
      setPlannerSettings(JSON.parse(planner));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleNewPlanner = () => {
    localStorage.removeItem('currentPlanner');
    navigate('/');
  };

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([task, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateCompletionTime = (id: string, completionTime: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        completionTime,
        completedAt: new Date().toISOString()
      } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  }).length;

  if (!plannerSettings) {
    return null;
  }

  const getBackgroundClass = (bg: string) => {
    switch(bg) {
      case 'sunset': return '';
      case 'ocean': return '';
      case 'forest': return '';
      default: return '';
    }
  };

  const getBackgroundStyle = (bg: string) => {
    if (bg === 'sunset') {
      return {
        backgroundImage: `url(/lovable-uploads/a1f4d81b-12e9-4120-a0a2-df45a66c2506.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
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

  return (
    <div 
      className={`min-h-screen ${getBackgroundClass(plannerSettings.background)}`}
      style={getBackgroundStyle(plannerSettings.background)}
    >
      {/* Header */}
      <div className="bg-black/20 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNewPlanner}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              <span className="persian-text">برنامه‌ریز جدید</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 ml-2" />
              <span className="persian-text">تنظیمات</span>
            </Button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Layout className="w-8 h-8" />
              <h1 className="text-3xl font-bold">{plannerSettings.name}</h1>
            </div>
            <p className="text-white/90 persian-text">مدیریت آسان و هوشمند کارهای روزانه</p>
            {plannerSettings.goalDate && (
              <p className="text-white/80 persian-text mt-2">
                هدف: تکمیل تا {new Date(plannerSettings.goalDate).toLocaleDateString('fa-IR')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-8">
        {/* Stats */}
        <PlannerStats 
          totalTasks={tasks.length}
          completedTasks={completedTasks}
          todayTasks={todayTasks}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task Form */}
            <AddTaskForm onAddTask={addTask} />
            
            {/* Tasks List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold persian-text">لیست کارها</h2>
              </div>
              
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="persian-text">هنوز هیچ تسکی اضافه نکرده‌اید</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onUpdateCompletionTime={updateCompletionTime}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-white" />
                <h2 className="text-xl font-semibold persian-text text-white">تقویم</h2>
              </div>
              <WeeklyCalendar />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
