import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Building2, Users, Hospital, Plus } from 'lucide-react';
import { mockBloodBanks, mockApi } from '../../services/mockApi';
import { toast } from 'sonner';

export const SuperAdminDashboard: React.FC = () => {
  const [bloodBanks, setBloodBanks] = useState(mockBloodBanks);
  const [showAddBankDialog, setShowAddBankDialog] = useState(false);
  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [newBank, setNewBank] = useState({ name: '', location: '' });
  const [newAdmin, setNewAdmin] = useState({ username: '', email: '', bloodBankId: '' });

  useEffect(() => {
    loadBloodBanks();
  }, []);

  const loadBloodBanks = async () => {
    const data = await mockApi.getBloodBanks();
    setBloodBanks(data);
  };

  const handleAddBank = () => {
    toast.success('Blood Bank added successfully!');
    setShowAddBankDialog(false);
    setNewBank({ name: '', location: '' });
  };

  const handleAddAdmin = () => {
    toast.success('Blood Bank Admin created successfully!');
    setShowAddAdminDialog(false);
    setNewAdmin({ username: '', email: '', bloodBankId: '' });
  };

  const stats = [
    { 
      title: 'Total Blood Banks', 
      value: bloodBanks.length, 
      icon: Building2, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      title: 'Total Donors', 
      value: '2,750', 
      icon: Users, 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      title: 'Total Hospitals', 
      value: '15', 
      icon: Hospital, 
      color: 'bg-purple-100 text-purple-600' 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Super Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage blood banks and system overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Dialog open={showAddBankDialog} onOpenChange={setShowAddBankDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Blood Bank
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Blood Bank</DialogTitle>
              <DialogDescription>Create a new blood bank in the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Blood Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="Enter bank name"
                  value={newBank.name}
                  onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={newBank.location}
                  onChange={(e) => setNewBank({ ...newBank, location: e.target.value })}
                />
              </div>
              <Button onClick={handleAddBank} className="w-full bg-red-600 hover:bg-red-700">
                Add Blood Bank
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddAdminDialog} onOpenChange={setShowAddAdminDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <Plus className="w-4 h-4 mr-2" />
              Create Bank Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Blood Bank Admin</DialogTitle>
              <DialogDescription>Add a new administrator for a blood bank</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodBank">Assign to Blood Bank</Label>
                <select
                  id="bloodBank"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAdmin.bloodBankId}
                  onChange={(e) => setNewAdmin({ ...newAdmin, bloodBankId: e.target.value })}
                >
                  <option value="">Select blood bank</option>
                  {bloodBanks.map(bank => (
                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAddAdmin} className="w-full bg-red-600 hover:bg-red-700">
                Create Admin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Blood Banks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Banks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Total Donors</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bloodBanks.map((bank) => (
                  <TableRow key={bank.id}>
                    <TableCell className="font-medium">{bank.name}</TableCell>
                    <TableCell>{bank.location}</TableCell>
                    <TableCell>{bank.totalDonors}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {bank.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
