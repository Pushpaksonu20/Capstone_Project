import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Droplets, AlertTriangle, Clock, AlertCircle } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { Badge } from '../ui/badge';

export const BloodBankAdminDashboard: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const inv = await mockApi.getInventory();
    const req = await mockApi.getEmergencyRequests();
    setInventory(inv);
    setRequests(req);
  };

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length;
  const expiringSoonCount = inventory.filter(i => i.status === 'Expiring Soon').length;
  const emergencyCount = requests.filter(r => r.status === 'Pending' && r.isEmergency).length;

  const stats = [
    { 
      title: 'Available Blood Groups', 
      value: inventory.length, 
      icon: Droplets, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      title: 'Low Stock Alerts', 
      value: lowStockCount, 
      icon: AlertTriangle, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
    { 
      title: 'Expiry Alerts', 
      value: expiringSoonCount, 
      icon: Clock, 
      color: 'bg-orange-100 text-orange-600' 
    },
    { 
      title: 'Emergency Requests', 
      value: emergencyCount, 
      icon: AlertCircle, 
      color: 'bg-red-100 text-red-600' 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Blood Bank Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage inventory and requests</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventory.filter(i => i.status === 'Low Stock').map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-900">{item.bloodGroup}</p>
                    <p className="text-sm text-gray-600">{item.quantity} units available</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-600 text-yellow-600">Low Stock</Badge>
                </div>
              ))}
              {inventory.filter(i => i.status === 'Low Stock').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No low stock items</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Soon */}
        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventory.filter(i => i.status === 'Expiring Soon').map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium text-gray-900">{item.bloodGroup}</p>
                    <p className="text-sm text-gray-600">Expires: {item.expiryDate}</p>
                  </div>
                  <Badge variant="outline" className="border-orange-600 text-orange-600">Expiring Soon</Badge>
                </div>
              ))}
              {inventory.filter(i => i.status === 'Expiring Soon').length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No expiring items</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.filter(r => r.isEmergency && r.status === 'Pending').map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{request.hospitalName}</p>
                  <p className="text-sm text-gray-600">
                    Blood Group: <span className="font-medium">{request.bloodGroup}</span> | 
                    Quantity: <span className="font-medium">{request.quantity} units</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{request.createdDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-600">{request.priority} Priority</Badge>
                  <Badge variant="outline" className="border-yellow-600 text-yellow-600">{request.status}</Badge>
                </div>
              </div>
            ))}
            {requests.filter(r => r.isEmergency && r.status === 'Pending').length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No pending emergency requests</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
