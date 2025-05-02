
import MaintenanceHistoryTable from "@/components/maintenance/MaintenanceHistoryTable";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const MaintenanceReport = () => {
  // Data for pie chart
  const statusData = [
    { name: "Completed", value: 124, color: "#4ade80" },
    { name: "Scheduled", value: 35, color: "#3b82f6" },
    { name: "Overdue", value: 12, color: "#ef4444" },
    { name: "Canceled", value: 8, color: "#94a3b8" },
  ];

  // Data for bar chart
  const monthlyData = [
    { month: "Jan", cost: 4200 },
    { month: "Feb", cost: 3800 },
    { month: "Mar", cost: 5100 },
    { month: "Apr", cost: 4600 },
    { month: "May", cost: 6200 },
    { month: "Jun", cost: 5400 },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Maintenance Report</h1>
        
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Services</CardTitle>
              <CardDescription>Last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">179</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Cost</CardTitle>
              <CardDescription>Last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">$24,380</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Cost</CardTitle>
              <CardDescription>Per service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$136</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overdue</CardTitle>
              <CardDescription>Services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">12</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Status Distribution</CardTitle>
              <CardDescription>Distribution of maintenance status</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Maintenance Costs</CardTitle>
              <CardDescription>Last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Cost"]} />
                  <Legend />
                  <Bar dataKey="cost" name="Maintenance Cost" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance History Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
            <CardDescription>Complete record of all maintenance services</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceHistoryTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceReport;
