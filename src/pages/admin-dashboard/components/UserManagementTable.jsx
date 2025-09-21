import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const UserManagementTable = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const itemsPerPage = 10;

  const mockUsers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      role: "donor",
      status: "active",
      bloodType: "O+",
      location: "Mumbai, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      joinDate: new Date(2024, 0, 15),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      donationCount: 12,
      verified: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      role: "donor",
      status: "active",
      bloodType: "A+",
      location: "Delhi, Delhi",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      joinDate: new Date(2024, 1, 22),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      donationCount: 8,
      verified: true
    },
    {
      id: 3,
      name: "Dr. Amit Patel",
      email: "amit.patel@hospital.com",
      role: "admin",
      status: "active",
      bloodType: "B-",
      location: "Ahmedabad, Gujarat",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      joinDate: new Date(2023, 11, 10),
      lastActive: new Date(Date.now() - 30 * 60 * 1000),
      donationCount: 0,
      verified: true
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      role: "user",
      status: "suspended",
      bloodType: "AB+",
      location: "Hyderabad, Telangana",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      joinDate: new Date(2024, 2, 5),
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      donationCount: 3,
      verified: false
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      role: "donor",
      status: "pending",
      bloodType: "O-",
      location: "Jaipur, Rajasthan",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      joinDate: new Date(2024, 8, 18),
      lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000),
      donationCount: 0,
      verified: false
    }
  ];

  const allUsers = users?.length > 0 ? users : mockUsers;

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'donor', label: 'Donor' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'banned', label: 'Banned' }
  ];

  const filteredUsers = allUsers?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers?.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    const allSelected = currentUsers?.every(user => selectedUsers?.includes(user?.id));
    if (allSelected) {
      setSelectedUsers(prev => prev?.filter(id => !currentUsers?.map(u => u?.id)?.includes(id)));
    } else {
      setSelectedUsers(prev => [...new Set([...prev, ...currentUsers.map(u => u.id)])]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-success/10',
      pending: 'text-warning bg-warning/10',
      suspended: 'text-error bg-error/10',
      banned: 'text-gray-600 bg-gray-100'
    };
    return colors?.[status] || colors?.pending;
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'text-secondary bg-secondary/10',
      moderator: 'text-primary bg-primary/10',
      donor: 'text-success bg-success/10',
      user: 'text-gray-600 bg-gray-100'
    };
    return colors?.[role] || colors?.user;
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-600">{filteredUsers?.length} users found</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <div className="flex items-center space-x-2">
              <Select
                options={roleOptions}
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Filter by role"
                className="w-32"
              />
              
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Filter by status"
                className="w-32"
              />
            </div>
          </div>
        </div>

        {selectedUsers?.length > 0 && (
          <div className="mt-4 flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
            <span className="text-sm text-gray-700">{selectedUsers?.length} users selected</span>
            <div className="flex items-center space-x-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('activate')}
                iconName="Check"
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('suspend')}
                iconName="Pause"
              >
                Suspend
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                iconName="Trash2"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={currentUsers?.length > 0 && currentUsers?.every(user => selectedUsers?.includes(user?.id))}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers?.map((user) => (
              <tr key={user?.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleSelectUser(user?.id)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {user?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white flex items-center justify-center">
                          <Icon name="Check" size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                      <div className="text-xs text-gray-400">{user?.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono font-medium text-primary">{user?.bloodType}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} className="text-primary" />
                    <span className="text-sm font-medium">{user?.donationCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{formatLastActive(user?.lastActive)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                    >
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers?.length)} of {filteredUsers?.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;