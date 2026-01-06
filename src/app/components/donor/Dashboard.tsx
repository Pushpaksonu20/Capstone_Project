import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Droplet, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const DonorDashboard: React.FC = () => {
  const { user } = useAuth();

  const donationHistory = [
    { id: '1', date: '2026-01-05', status: 'Approved', testResult: 'SAFE' },
    { id: '2', date: '2025-10-15', status: 'Approved', testResult: 'SAFE' },
    { id: '3', date: '2025-07-20', status: 'Approved', testResult: 'SAFE' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Donor Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, {user?.fullName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Blood Group</CardTitle>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Droplet className="w-5 h-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-red-600">{user?.bloodGroup}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Last Donation</CardTitle>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">2026-01-05</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Eligibility Status</CardTitle>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-600">Eligible</Badge>
            <p className="text-xs text-gray-500 mt-2">Next eligible: 2026-04-05</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Test Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donationHistory.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">#{donation.id}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {donation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-600">{donation.testResult}</Badge>
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
