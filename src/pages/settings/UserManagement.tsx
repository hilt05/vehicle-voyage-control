
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Edit, Trash2, Lock, ShieldCheck, Shield, Eye } from "lucide-react";

const UserManagement = () => {
  // Example users data
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", lastLogin: "2025-04-20 14:30" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Staff", status: "Active", lastLogin: "2025-04-21 09:15" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "Viewer", status: "Active", lastLogin: "2025-04-19 11:45" },
    { id: 4, name: "Emily Williams", email: "emily.w@example.com", role: "Staff", status: "Inactive", lastLogin: "2025-03-15 16:20" },
    { id: 5, name: "Michael Brown", email: "michael.b@example.com", role: "Admin", status: "Active", lastLogin: "2025-04-22 08:10" }
  ];
  
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  // Get appropriate icon for role
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <ShieldCheck className="h-4 w-4 text-blue-600" />;
      case "Staff":
        return <Shield className="h-4 w-4 text-green-600" />;
      case "Viewer":
        return <Eye className="h-4 w-4 text-slate-600" />;
      default:
        return null;
    }
  };
  
  const filteredUsers = selectedRole 
    ? users.filter(user => user.role === selectedRole)
    : users;
    
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500 mt-1">Add and manage system users and their permissions</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card onClick={() => setSelectedRole(null)} className={`cursor-pointer transition-all hover:border-blue-200 ${selectedRole === null ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => setSelectedRole("Admin")} className={`cursor-pointer transition-all hover:border-blue-200 ${selectedRole === "Admin" ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.filter(u => u.role === "Admin").length}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => setSelectedRole("Staff")} className={`cursor-pointer transition-all hover:border-blue-200 ${selectedRole === "Staff" ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.filter(u => u.role === "Staff").length}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => setSelectedRole("Viewer")} className={`cursor-pointer transition-all hover:border-blue-200 ${selectedRole === "Viewer" ? 'border-blue-500 bg-blue-50' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Viewers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.filter(u => u.role === "Viewer").length}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedRole ? `${selectedRole} Users` : "All System Users"}
          </h2>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(user.role)}
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Lock className="h-4 w-4" />
                          <span className="sr-only">Reset Password</span>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
