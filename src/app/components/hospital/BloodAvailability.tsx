import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Plus } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { toast } from 'sonner';

export const BloodAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<any[]>([]);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestForm, setRequestForm] = useState({
    bloodGroup: '',
    quantity: '',
    isEmergency: false
  });

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    const data = await mockApi.getBloodAvailability();
    setAvailability(data);
  };

  const handleSubmitRequest = () => {
    toast.success('Blood request submitted successfully!');
    setShowRequestDialog(false);
    setRequestForm({ bloodGroup: '', quantity: '', isEmergency: false });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string }> = {
      'Available': { className: 'bg-green-100 text-green-800 border-green-200' },
      'Low': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'Not Available': { className: 'bg-red-100 text-red-800 border-red-200' }
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
          <h1 className="text-3xl font-semibold text-gray-900">Blood Availability & Emergency Request</h1>
          <p className="text-gray-600 mt-1">Check availability and submit requests</p>
        </div>

        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Blood Request</DialogTitle>
              <DialogDescription>Request blood units from blood banks</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  id="bloodGroup"
                  className="w-full px-3 py-2 border rounded-md"
                  value={requestForm.bloodGroup}
                  onChange={(e) => setRequestForm({ ...requestForm, bloodGroup: e.target.value })}
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
                  value={requestForm.quantity}
                  onChange={(e) => setRequestForm({ ...requestForm, quantity: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emergency"
                  checked={requestForm.isEmergency}
                  onCheckedChange={(checked) => setRequestForm({ ...requestForm, isEmergency: checked as boolean })}
                />
                <label
                  htmlFor="emergency"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Emergency Request
                </label>
              </div>

              <Button onClick={handleSubmitRequest} className="w-full bg-red-600 hover:bg-red-700">
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blood Bank</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availability.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.bloodBank}</TableCell>
                    <TableCell>{item.bloodGroup}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">Privacy Protection</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>✗ Hospitals cannot see donor details</li>
            <li>✗ Hospitals cannot see exact blood unit counts</li>
            <li>✗ Hospitals cannot see blood test results</li>
            <li>✓ Only availability status is visible</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
