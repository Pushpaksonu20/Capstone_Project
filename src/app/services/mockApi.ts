// Mock data for blood bank management system

export const mockBloodBanks = [
  { id: 'bb1', name: 'City Central Blood Bank', location: 'Downtown', totalDonors: 1250, status: 'Active' },
  { id: 'bb2', name: 'Community Health Blood Bank', location: 'Uptown', totalDonors: 850, status: 'Active' },
  { id: 'bb3', name: 'Regional Medical Blood Bank', location: 'Suburban Area', totalDonors: 650, status: 'Active' }
];

export const mockInventory = [
  { id: '1', bloodGroup: 'A+', quantity: 45, expiryDate: '2026-02-15', status: 'Normal' },
  { id: '2', bloodGroup: 'A-', quantity: 12, expiryDate: '2026-02-10', status: 'Normal' },
  { id: '3', bloodGroup: 'B+', quantity: 38, expiryDate: '2026-01-20', status: 'Expiring Soon' },
  { id: '4', bloodGroup: 'B-', quantity: 8, expiryDate: '2026-02-18', status: 'Low Stock' },
  { id: '5', bloodGroup: 'O+', quantity: 52, expiryDate: '2026-02-25', status: 'Normal' },
  { id: '6', bloodGroup: 'O-', quantity: 15, expiryDate: '2026-02-20', status: 'Normal' },
  { id: '7', bloodGroup: 'AB+', quantity: 6, expiryDate: '2026-01-15', status: 'Expiring Soon' },
  { id: '8', bloodGroup: 'AB-', quantity: 4, expiryDate: '2026-02-22', status: 'Low Stock' }
];

export const mockDonations = [
  { id: 'd1', donorId: '3', donorName: 'John Donor', bloodGroup: 'A+', date: '2026-01-05', status: 'Approved', testStatus: 'SAFE' },
  { id: 'd2', donorId: '4', donorName: 'Sarah Smith', bloodGroup: 'O+', date: '2026-01-04', status: 'Pending Test', testStatus: 'Pending' },
  { id: 'd3', donorId: '5', donorName: 'Mike Johnson', bloodGroup: 'B+', date: '2026-01-03', status: 'Approved', testStatus: 'SAFE' }
];

export const mockEmergencyRequests = [
  { id: 'er1', hospitalName: 'City Hospital', bloodGroup: 'O-', quantity: 5, priority: 'High', status: 'Pending', createdDate: '2026-01-06', isEmergency: true },
  { id: 'er2', hospitalName: 'General Medical Center', bloodGroup: 'A+', quantity: 3, priority: 'Medium', status: 'Approved', createdDate: '2026-01-05', isEmergency: false },
  { id: 'er3', hospitalName: 'Emergency Care Hospital', bloodGroup: 'AB+', quantity: 2, priority: 'High', status: 'Pending', createdDate: '2026-01-06', isEmergency: true }
];

export const mockEligibleDonors = [
  { id: 'd101', name: 'Robert Williams', bloodGroup: 'O-', phone: '+1-555-0101', lastDonation: '2025-11-06', isEligible: true },
  { id: 'd102', name: 'Emma Davis', bloodGroup: 'O-', phone: '+1-555-0102', lastDonation: '2025-10-15', isEligible: true },
  { id: 'd103', name: 'James Wilson', bloodGroup: 'O-', phone: '+1-555-0103', lastDonation: '2025-12-01', isEligible: true }
];

export const mockNotifications = [
  { id: 'n1', type: 'success', message: 'Your donation has been approved', date: '2026-01-05', isRead: false },
  { id: 'n2', type: 'info', message: 'Thank you for your donation', date: '2026-01-04', isRead: true },
  { id: 'n3', type: 'alert', message: 'Emergency blood request in your area', date: '2026-01-06', isRead: false }
];

export const mockSystemAnalytics = {
  monthlyDonations: [
    { month: 'Jul', donations: 145 },
    { month: 'Aug', donations: 158 },
    { month: 'Sep', donations: 142 },
    { month: 'Oct', donations: 175 },
    { month: 'Nov', donations: 162 },
    { month: 'Dec', donations: 188 },
    { month: 'Jan', donations: 95 }
  ],
  bloodSafety: [
    { name: 'SAFE', value: 92, color: '#10b981' },
    { name: 'UNSAFE', value: 8, color: '#ef4444' }
  ],
  expiredBlood: [
    { month: 'Jul', expired: 5 },
    { month: 'Aug', expired: 7 },
    { month: 'Sep', expired: 4 },
    { month: 'Oct', expired: 6 },
    { month: 'Nov', expired: 8 },
    { month: 'Dec', expired: 5 },
    { month: 'Jan', expired: 3 }
  ],
  emergencyRequests: 24,
  totalBloodBanks: 3,
  totalDonors: 2750,
  totalHospitals: 15
};

export const mockBankAnalytics = {
  donationsPerMonth: [
    { month: 'Jul', donations: 48 },
    { month: 'Aug', donations: 52 },
    { month: 'Sep', donations: 46 },
    { month: 'Oct', donations: 58 },
    { month: 'Nov', donations: 54 },
    { month: 'Dec', donations: 62 },
    { month: 'Jan', donations: 32 }
  ],
  wastage: [
    { category: 'Expired', value: 15, color: '#f59e0b' },
    { category: 'Unsafe', value: 5, color: '#ef4444' }
  ],
  bloodGroupUsage: [
    { group: 'O+', usage: 35 },
    { group: 'A+', usage: 28 },
    { group: 'B+', usage: 22 },
    { group: 'AB+', usage: 10 },
    { group: 'O-', usage: 18 },
    { group: 'A-', usage: 12 },
    { group: 'B-', usage: 8 },
    { group: 'AB-', usage: 5 }
  ],
  avgResponseTime: '2.5 hours'
};

export const mockBloodAvailability = [
  { bloodBank: 'City Central Blood Bank', bloodGroup: 'A+', status: 'Available' },
  { bloodBank: 'City Central Blood Bank', bloodGroup: 'A-', status: 'Available' },
  { bloodBank: 'City Central Blood Bank', bloodGroup: 'B+', status: 'Low' },
  { bloodBank: 'City Central Blood Bank', bloodGroup: 'O-', status: 'Not Available' },
  { bloodBank: 'Community Health Blood Bank', bloodGroup: 'A+', status: 'Available' },
  { bloodBank: 'Community Health Blood Bank', bloodGroup: 'O+', status: 'Available' }
];

// Mock API functions
export const mockApi = {
  login: async (username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { token: 'mock-jwt-token', role: 'DONOR' };
  },

  getBloodBanks: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBloodBanks;
  },

  getInventory: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockInventory;
  },

  getDonations: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDonations;
  },

  getEmergencyRequests: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEmergencyRequests;
  },

  getEligibleDonors: async (requestId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEligibleDonors;
  },

  getNotifications: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNotifications;
  },

  getSystemAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSystemAnalytics;
  },

  getBankAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBankAnalytics;
  },

  getBloodAvailability: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBloodAvailability;
  }
};
