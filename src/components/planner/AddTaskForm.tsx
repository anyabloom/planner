import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (task: {
    title: string;
    description?: string;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
    dueTime?: string;
    category?: string;
  }) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description: description || undefined,
      priority,
      dueDate: dueDate || undefined,
      dueTime: dueTime || undefined,
      category: category || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority('medium');
    setDueDate("");
    setDueTime("");
    setCategory("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-soft hover:shadow-medium transition-smooth"
        size="lg"
      >
        <Plus className="w-5 h-5 ml-2" />
        افزودن تسک جدید
      </Button>
    );
  }

  return (
    <Card className="p-6 shadow-medium border-0 bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold persian-text text-foreground">تسک جدید</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="persian-text text-foreground">عنوان تسک</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان تسک را وارد کنید..."
            className="persian-text bg-background border-border focus:border-primary focus:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="persian-text text-foreground">توضیحات (اختیاری)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات اضافی..."
            className="persian-text bg-background border-border focus:border-primary focus:ring-primary/20"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="persian-text text-foreground">اولویت</Label>
            <Select value={priority} onValueChange={(value: 'high' | 'medium' | 'low') => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">فوری</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="low">عادی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="persian-text text-foreground">تاریخ انجام</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dueTime" className="persian-text text-foreground">ساعت انجام</Label>
            <Input
              id="dueTime"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="bg-background border-border focus:border-primary focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="persian-text text-foreground">دسته‌بندی</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="مثال: کار، شخصی، مطالعه..."
              className="persian-text bg-background border-border focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-soft hover:shadow-medium"
          >
            افزودن تسک
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 border-border hover:bg-muted hover:text-foreground"
          >
            لغو
          </Button>
        </div>
      </form>
    </Card>
  );
};