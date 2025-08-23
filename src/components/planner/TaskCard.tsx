import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, CheckCircle } from "lucide-react";

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

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateCompletionTime: (id: string, completionTime: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onUpdateCompletionTime }: TaskCardProps) => {
  const [showCompletionTime, setShowCompletionTime] = useState(false);
  const [completionTime, setCompletionTime] = useState(task.completionTime || "");
  const priorityColors = {
    high: 'destructive',
    medium: 'tertiary',
    low: 'accent'
  };

  const handleToggle = () => {
    if (!task.completed) {
      setShowCompletionTime(true);
    } else {
      onToggle(task.id);
    }
  };

  const handleSaveCompletionTime = () => {
    onUpdateCompletionTime(task.id, completionTime);
    onToggle(task.id);
    setShowCompletionTime(false);
  };

  return (
    <Card className="p-4 shadow-soft hover:shadow-medium transition-smooth border-0 gradient-card animate-fade-in hover-scale">
      <div className="flex items-start gap-3 rtl">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggle}
          className="mt-1"
        />
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium persian-text ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <Badge variant={priorityColors[task.priority] as any} className="text-xs">
              {task.priority === 'high' ? 'فوری' : task.priority === 'medium' ? 'متوسط' : 'عادی'}
            </Badge>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground persian-text">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{task.dueDate}</span>
                {task.dueTime && (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{task.dueTime}</span>
                  </>
                )}
              </div>
            )}
            {task.category && (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="persian-text">{task.category}</span>
              </div>
            )}
            {task.completed && task.completionTime && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Completed at: {task.completionTime}</span>
              </div>
            )}
          </div>

          {showCompletionTime && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <Label htmlFor="completionTime" className="text-sm">
                What time did you finish this task?
              </Label>
              <div className="flex gap-2">
                <Input
                  id="completionTime"
                  type="time"
                  value={completionTime}
                  onChange={(e) => setCompletionTime(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSaveCompletionTime}>
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    onToggle(task.id);
                    setShowCompletionTime(false);
                  }}
                >
                  Skip
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          حذف
        </Button>
      </div>
    </Card>
  );
};