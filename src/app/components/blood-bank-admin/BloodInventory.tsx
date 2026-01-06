import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { toast } from 'sonner';

export const BloodInventory: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItem, setNewItem] = useState({ bloodGroup: '', quantity: '', expiryDate: '' });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const data = await mockApi.getInventory();
    setInventory(data);
  };

  const handleAddItem = () => {
    toast.success('Inventory item added successfully!');
    setShowAddDialog(false);
    setNewItem({ bloodGroup: '', quantity: '', expiryDate: '' });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string }> = {
      'Normal': { className: 'bg-green-100 text-green-800 border-green-200' },
      'Low Stock': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'Expiring Soon': { className: 'bg-orange-100 text-orange-800 border-orange-200' },
      'Expired': { className: 'bg-red-100 text-red-800 border-red-200' }
    };
    
    return (
      <Badge variant="outline" className={variants[status]?.className}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Blood Inventory</h1>
          <p className="text-gray-600 mt-1">Manage blood stock and expiry dates</p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Inventory
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Blood Inventory</DialogTitle>
              <DialogDescription>Add new blood units to inventory</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  id="bloodGroup"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newItem.bloodGroup}
                  onChange={(e) => setNewItem({ ...newItem, bloodGroup: e.target.value })}
                >
                  <option value="">Select blood group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (units)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                />
              </div>
              <Button onClick={handleAddItem} className="w-full bg-red-600 hover:bg-red-700">
                Add to Inventory
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Quantity (units)</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-lg">{item.bloodGroup}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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
