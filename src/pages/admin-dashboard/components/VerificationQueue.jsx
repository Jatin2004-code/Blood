import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VerificationQueue = ({ pendingVerifications = [] }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mockVerifications = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      bloodType: "O+",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      documents: ["Aadhar Card", "Medical Certificate"],
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      bloodType: "A+",
      phone: "+91 87654 32109",
      location: "Delhi, Delhi",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      documents: ["PAN Card", "Health Report"],
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      bloodType: "B-",
      phone: "+91 76543 21098",
      location: "Ahmedabad, Gujarat",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      documents: ["Driving License", "Blood Test Report"],
      submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: "pending",
      priority: "high"
    }
  ];

  const verifications = pendingVerifications?.length > 0 ? pendingVerifications : mockVerifications;

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev?.includes(id) 
        ? prev?.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentItems = getCurrentPageItems();
    const allSelected = currentItems?.every(item => selectedItems?.includes(item?.id));
    
    if (allSelected) {
      setSelectedItems(prev => prev?.filter(id => !currentItems?.map(item => item?.id)?.includes(id)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...currentItems.map(item => item.id)])]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    setSelectedItems([]);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10',
      medium: 'text-warning bg-warning/10',
      low: 'text-gray-600 bg-gray-100'
    };
    return colors?.[priority] || colors?.low;
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return verifications?.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(verifications?.length / itemsPerPage);
  const currentItems = getCurrentPageItems();

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Verification Queue</h3>
            <p className="text-sm text-gray-600">{verifications?.length} pending verifications</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={currentItems?.length === 0}
            >
              Select All
            </Button>
            {selectedItems?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                  iconName="Check"
                >
                  Approve ({selectedItems?.length})
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('reject')}
                  iconName="X"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {currentItems?.map((verification) => (
          <div key={verification?.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedItems?.includes(verification?.id)}
                onChange={() => handleSelectItem(verification?.id)}
                className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              
              <div className="flex-shrink-0">
                <Image
                  src={verification?.avatar}
                  alt={verification?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900">{verification?.name}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(verification?.priority)}`}>
                      {verification?.priority}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {verification?.bloodType}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {verification?.submittedAt?.toLocaleDateString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon name="Mail" size={14} />
                      <span>{verification?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon name="Phone" size={14} />
                      <span>{verification?.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon name="MapPin" size={14} />
                      <span>{verification?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon name="FileText" size={14} />
                      <span>{verification?.documents?.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                    >
                      Review
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageCircle"
                    >
                      Contact
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="success"
                      size="sm"
                      iconName="Check"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="X"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, verifications?.length)} of {verifications?.length} results
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

export default VerificationQueue;