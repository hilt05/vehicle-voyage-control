
import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for scheduled maintenance
const mockScheduledEvents = [
  {
    id: "1",
    vehicleName: "Toyota Camry",
    plateNumber: "ABC-1234",
    serviceType: "Oil Change",
    date: new Date(2025, 3, 25), // April 25, 2025
    time: "10:00",
    technician: "John Smith",
    location: "Main Garage",
  },
  {
    id: "2",
    vehicleName: "Honda Accord",
    plateNumber: "XYZ-5678",
    serviceType: "Brake Inspection",
    date: new Date(2025, 3, 27), // April 27, 2025
    time: "14:30",
    technician: "Sarah Johnson",
    location: "Downtown Workshop",
  },
  {
    id: "3",
    vehicleName: "Ford F-150",
    plateNumber: "DEF-9012",
    serviceType: "Tire Rotation",
    date: new Date(2025, 3, 30), // April 30, 2025
    time: "09:00",
    technician: "Mike Wilson",
    location: "North Service Center",
  },
  {
    id: "4",
    vehicleName: "Nissan Altima",
    plateNumber: "GHI-3456",
    serviceType: "Full Inspection",
    date: new Date(2025, 4, 2), // May 2, 2025
    time: "11:00",
    technician: "Jessica Brown",
    location: "Main Garage",
  },
  {
    id: "5",
    vehicleName: "Chevrolet Malibu",
    plateNumber: "JKL-7890",
    serviceType: "Filter Replacement",
    date: new Date(2025, 4, 5), // May 5, 2025
    time: "13:00",
    technician: "David Lee",
    location: "Downtown Workshop",
  },
];

// Helper function to get events for a specific day
const getEventsForDay = (date: Date) => {
  return mockScheduledEvents.filter(
    (event) => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
  );
};

// Service type colors for visualization
const serviceTypeColors: Record<string, string> = {
  "Oil Change": "bg-green-100 text-green-800 border-green-200",
  "Brake Inspection": "bg-amber-100 text-amber-800 border-amber-200",
  "Tire Rotation": "bg-blue-100 text-blue-800 border-blue-200",
  "Full Inspection": "bg-purple-100 text-purple-800 border-purple-200",
  "Filter Replacement": "bg-rose-100 text-rose-800 border-rose-200",
};

const ScheduleCalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Calculate days for the current month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  
  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth((current) => {
      const previousMonth = new Date(current);
      previousMonth.setMonth(current.getMonth() - 1);
      return previousMonth;
    });
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth((current) => {
      const nextMonth = new Date(current);
      nextMonth.setMonth(current.getMonth() + 1);
      return nextMonth;
    });
  };
  
  // Events for the selected date
  const selectedDateEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {daysInMonth.map((day) => {
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && 
            day.getDate() === selectedDate.getDate() && 
            day.getMonth() === selectedDate.getMonth() && 
            day.getFullYear() === selectedDate.getFullYear();
          
          const events = getEventsForDay(day);
          const hasEvents = events.length > 0;
          
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "h-24 p-1 border border-gray-200 relative flex flex-col items-start",
                isCurrentDay && "bg-blue-50",
                isCurrentMonth ? "text-gray-900" : "text-gray-400 bg-gray-50",
                isSelected && "ring-2 ring-blue-500",
                !isCurrentMonth && "opacity-50"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrentDay && "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                )}
              >
                {format(day, "d")}
              </span>
              
              <div className="flex flex-col w-full overflow-hidden mt-1 space-y-1">
                {hasEvents && events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs px-1 py-0.5 rounded truncate border",
                      serviceTypeColors[event.serviceType] || "bg-gray-100 text-gray-800 border-gray-200"
                    )}
                  >
                    {event.serviceType}
                  </div>
                ))}
                {events.length > 2 && (
                  <div className="text-xs text-blue-600 pl-1">
                    +{events.length - 2} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Selected day events detail */}
      {selectedDate && (
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="font-medium text-lg mb-3">
            Scheduled Maintenance for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          
          {selectedDateEvents.length === 0 ? (
            <p className="text-gray-500">No maintenance scheduled for this day.</p>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-grow">
                    <h4 className="font-medium flex items-center">
                      <span
                        className={cn(
                          "w-3 h-3 rounded-full mr-2",
                          serviceTypeColors[event.serviceType] ? 
                            serviceTypeColors[event.serviceType].split(" ")[0] : 
                            "bg-gray-300"
                        )}
                      ></span>
                      {event.vehicleName} ({event.plateNumber})
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">{event.serviceType}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" /> {event.time}
                      </span>
                      <span>{event.technician}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-2 flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendarView;
