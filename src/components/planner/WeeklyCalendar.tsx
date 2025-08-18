import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const WeeklyCalendar = () => {
  const today = new Date();
  const currentWeek = [];
  
  // Get current week days
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Monday start
  startOfWeek.setDate(today.getDate() + diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    currentWeek.push(day);
  }

  const persianDays = ['دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'];
  const persianMonths = [
    'ژانویه', 'فوریه', 'مارس', 'آپریل', 'مه', 'ژوئن',
    'ژوئیه', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
  ];

  return (
    <Card className="p-6 shadow-medium border-0 gradient-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold persian-text">برنامه هفتگی</h2>
        <Badge variant="outline" className="persian-text">
          {persianMonths[today.getMonth()]} {today.getFullYear()}
        </Badge>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {currentWeek.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString();
          
          return (
            <div
              key={index}
              className={`p-3 rounded-lg text-center transition-smooth cursor-pointer ${
                isToday
                  ? 'gradient-primary text-white shadow-soft'
                  : 'hover:bg-muted bg-card'
              }`}
            >
              <div className="text-xs font-medium persian-text mb-1">
                {persianDays[index]}
              </div>
              <div className={`text-lg font-semibold ${isToday ? 'text-white' : 'text-foreground'}`}>
                {day.getDate()}
              </div>
              
              {/* Sample tasks indicators */}
              <div className="mt-2 space-y-1">
                {index === 1 && (
                  <div className="w-full h-1 bg-destructive rounded-full opacity-60"></div>
                )}
                {index === 3 && (
                  <>
                    <div className="w-full h-1 bg-secondary rounded-full opacity-60"></div>
                    <div className="w-full h-1 bg-accent rounded-full opacity-60"></div>
                  </>
                )}
                {index === 5 && (
                  <div className="w-full h-1 bg-primary rounded-full opacity-60"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-destructive rounded-full"></div>
          <span className="persian-text">فوری</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-secondary rounded-full"></div>
          <span className="persian-text">متوسط</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-accent rounded-full"></div>
          <span className="persian-text">عادی</span>
        </div>
      </div>
    </Card>
  );
};