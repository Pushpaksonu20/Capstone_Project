import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bell, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { mockApi } from '../../services/mockApi';

export const DonorNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await mockApi.getNotifications();
    setNotifications(data);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Your personal updates and alerts</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.isRead ? '' : 'border-red-200 bg-red-50'}>
            <CardContent className="flex items-start gap-4 p-4">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
              </div>
              {!notification.isRead && (
                <Badge variant="outline" className="border-red-600 text-red-600">New</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <p className="text-sm text-blue-800">
            <strong>Privacy:</strong> Only you can see your notifications. Your donation status and test results remain confidential.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
