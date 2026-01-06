import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Eye } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import { toast } from 'sonner';

export const EmergencyRequests: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [eligibleDonors, setEligibleDonors] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const data = await mockApi.getEmergencyRequests();
    setRequests(data);
  };

  const handleViewDonors = async (request: any) => {
    setSelectedRequest(request);
    const donors = await mockApi.getEligibleDonors(request.id);
    setEligibleDonors(donors);
  };

  const handleApprove = (id: string) => {
    toast.success('Request approved successfully');
  };

  const handleReject = (id: string) => {
    toast.error('Request rejected');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Emergency Request Handling</h1>
        <p className="text-gray-600 mt-1">Manage blood requests from hospitals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.hospitalName}</TableCell>
                    <TableCell>{request.bloodGroup}</TableCell>
                    <TableCell>{request.quantity} units</TableCell>
                    <TableCell>
                      <Badge className={request.priority === 'High' ? 'bg-red-600' : 'bg-yellow-600'}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={request.status === 'Pending' ? 'border-yellow-600 text-yellow-600' : 'border-green-600 text-green-600'}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleViewDonors(request)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Donors
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Eligible Donors - {selectedRequest?.bloodGroup}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              {eligibleDonors.map((donor) => (
                                <div key={donor.id} className="p-3 bg-gray-50 rounded-lg">
                                  <p className="font-medium">{donor.name}</p>
                                  <p className="text-sm text-gray-600">Blood Group: {donor.bloodGroup}</p>
                                  <p className="text-sm text-gray-600">Phone: {donor.phone}</p>
                                  <p className="text-sm text-gray-600">Last Donation: {donor.lastDonation}</p>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        {request.status === 'Pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(request.id)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-600" onClick={() => handleReject(request.id)}>
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <p className="text-sm text-yellow-800">
            <strong>Privacy Note:</strong> Donor contact details are only visible to authorized blood bank administrators. Hospitals cannot view donor information directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
