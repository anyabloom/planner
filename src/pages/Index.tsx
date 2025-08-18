import { useState } from "react";
import { TaskCard } from "@/components/planner/TaskCard";
import { AddTaskForm } from "@/components/planner/AddTaskForm";
import { WeeklyCalendar } from "@/components/planner/WeeklyCalendar";
import { PlannerStats } from "@/components/planner/PlannerStats";
import { Calendar, CheckSquare, Layout } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  category?: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'مطالعه کتاب برنامه‌نویسی',
      description: 'مطالعه فصل ۳ تا ۵ کتاب جاوااسکریپت',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'مطالعه'
    },
    {
      id: '2',
      title: 'تمرین ورزشی',
      description: 'دویدن در پارک به مدت ۳۰ دقیقه',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-18',
      category: 'سلامت'
    },
    {
      id: '3',
      title: 'جلسه کاری',
      description: 'بررسی پروژه جدید با تیم',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-19',
      category: 'کار'
    }
  ]);

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

  const completedTasks = tasks.filter(task => task.completed).length;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Layout className="w-8 h-8" />
            <h1 className="text-3xl font-bold persian-text">برنامه‌ریز من</h1>
          </div>
          <p className="text-white/90 persian-text">مدیریت آسان و هوشمند کارهای روزانه</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
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
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold persian-text">تقویم</h2>
              </div>
              <WeeklyCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
