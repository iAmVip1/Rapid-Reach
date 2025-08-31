import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaPhone, FaTrash, FaEye, FaEdit, FaUser, FaEnvelope, FaBuilding, FaCircle, FaSearch, FaFilter, FaHospital, FaMapMarkerAlt, FaCalendar, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DashHospital() {
  const { currentUser } = useSelector((state) => state.user);
  const [hospitalPosts, setHospitalPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Fetch hospital posts
  useEffect(() => {
    const fetchHospitalPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/post/get?category=Hospital');
        const data = await res.json();
        console.log('Hospital API Response:', data); // Debug log
        
        if (res.ok) {
          // Handle the correct data structure: { success: true, count: number, data: array }
          const posts = data.data || [];
          setHospitalPosts(posts);
          console.log('Hospital posts found:', posts.length); // Debug log
        } else {
          console.log('Failed to fetch hospital posts:', data);
        }
      } catch (error) {
        console.log('Error fetching hospital posts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalPosts();
  }, []);

  // Mock online users for demo (replace with real socket implementation)
  useEffect(() => {
    // Simulate online users - replace with actual socket implementation
    const mockOnlineUsers = hospitalPosts.slice(0, 2).map(post => post.userRef);
    setOnlineUsers(mockOnlineUsers);
  }, [hospitalPosts]);

  const isOnlineUser = (userId) => {
    return onlineUsers.includes(userId);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this hospital post? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/post/delete/${postId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          setHospitalPosts(hospitalPosts.filter(post => post._id !== postId));
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleUpdateStatus = async (postId, newStatus) => {
    const statusText = newStatus === 'approved' ? 'approve' : 'reject';
    if (window.confirm(`Are you sure you want to ${statusText} this hospital post?`)) {
      try {
        const res = await fetch(`/api/post/update/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });
        const data = await res.json();
        if (res.ok) {
          // Update the post in the local state
          setHospitalPosts(hospitalPosts.map(post => 
            post._id === postId ? { ...post, status: newStatus } : post
          ));
          alert(`Post ${statusText}d successfully!`);
        } else {
          alert(data.message || 'Failed to update status');
        }
      } catch (error) {
        console.log('Error updating status:', error.message);
        alert('Failed to update status');
      }
    }
  };

  const handleCallHospital = (post) => {
    // Implement call functionality
    alert(`Calling ${post.departmentName}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter posts based on search and status filter
  const filteredPosts = hospitalPosts.filter(post => {
    const matchesSearch = post.departmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hospital posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hospital Management</h1>
          <p className="text-gray-600">Manage all hospital posts and their services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaHospital className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalPosts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Online Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{onlineUsers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaBuilding className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(hospitalPosts.map(post => post.category)).size}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaEnvelope className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">{hospitalPosts.filter(post => post.userMail).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospitals by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                            src={post.imageUrls?.[0] || 'https://via.placeholder.com/48x48?text=H'}
                            alt={post.departmentName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.departmentName}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FaCalendar className="w-3 h-3 mr-1" />
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.phoneNumber1}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FaEnvelope className="w-3 h-3 mr-1" />
                        {post.userMail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <FaMapMarkerAlt className="w-3 h-3 mr-1 text-red-500" />
                        {post.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaCircle className={`w-3 h-3 mr-2 ${isOnlineUser(post.userRef) ? 'text-green-500' : 'text-gray-400'}`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status || 'pending')}`}>
                          {post.status || 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Link to={`/post/${post._id}`}>
                          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                            <FaEye className="w-3 h-3 mr-1" />
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleCallHospital(post)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                        >
                          <FaPhone className="w-3 h-3 mr-1" />
                          Call
                        </button>
                        {/* Status Update Buttons - Only show for pending posts */}
                        {(post.status === 'pending' || !post.status) && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(post._id, 'approved')}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                              title="Approve Post"
                            >
                              <FaCheck className="w-3 h-3 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(post._id, 'rejected')}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                              title="Reject Post"
                            >
                              <FaTimes className="w-3 h-3 mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                          <FaTrash className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                    src={post.imageUrls?.[0] || 'https://via.placeholder.com/48x48?text=H'}
                    alt={post.departmentName}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{post.departmentName}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaCalendar className="w-3 h-3 mr-1" />
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCircle className={`w-3 h-3 mr-1 ${isOnlineUser(post.userRef) ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status || 'pending')}`}>
                    {post.status || 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FaPhone className="w-3 h-3 mr-2 text-blue-500" />
                  {post.phoneNumber1}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaEnvelope className="w-3 h-3 mr-2 text-green-500" />
                  {post.userMail}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="w-3 h-3 mr-2 text-red-500" />
                  {post.address}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Link to={`/post/${post._id}`} className="flex-1 min-w-0">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                    <FaEye className="w-3 h-3 mr-2" />
                    View
                  </button>
                </Link>
                <button
                  onClick={() => handleCallHospital(post)}
                  className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                >
                  <FaPhone className="w-3 h-3 mr-2" />
                  Call
                </button>
                {/* Status Update Buttons - Only show for pending posts */}
                {(post.status === 'pending' || !post.status) && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(post._id, 'approved')}
                      className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                    >
                      <FaCheck className="w-3 h-3 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(post._id, 'rejected')}
                      className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                    >
                      <FaTimes className="w-3 h-3 mr-2" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  <FaTrash className="w-3 h-3 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHospital className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No hospital posts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Debug Info:</p>
              <p>Total posts in database: {hospitalPosts.length}</p>
              <p>Search term: "{searchTerm}"</p>
              <p>Filter status: "{filterStatus}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
