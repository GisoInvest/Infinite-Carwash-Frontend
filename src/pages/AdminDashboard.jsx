import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Car, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Driver management state
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [driverForm, setDriverForm] = useState({
    name: '',
    email: '',
    phone: '',
    license_number: '',
    vehicle_registration: '',
    vehicle_model: '',
    specializations: '',
    emergency_contact: '',
    notes: ''
  });

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
    } else if (activeTab === 'drivers') {
      loadDrivers();
    } else if (activeTab === 'bookings') {
      loadBookings();
    } else if (activeTab === 'customers') {
      loadCustomers();
    }
  }, [activeTab]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check-auth', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (!result.authenticated) {
        navigate('/admin-login');
        return;
      }
      
      setLoading(false);
      loadDashboardData();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin-login');
    }
  };

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setDashboardStats(result.stats);
        setRecentBookings(result.recent_bookings);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    }
  };

  const loadDrivers = async () => {
    try {
      const response = await fetch('/api/drivers', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setDrivers(result.drivers);
      }
    } catch (error) {
      console.error('Error loading drivers:', error);
      setError('Failed to load drivers');
    }
  };

  const loadBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setBookings(result.bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setError('Failed to load bookings');
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setCustomers(result.customers);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
      setError('Failed to load customers');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_email');
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = editingDriver ? `/api/drivers/${editingDriver.id}` : '/api/drivers';
      const method = editingDriver ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(driverForm)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(editingDriver ? 'Driver updated successfully!' : 'Driver added successfully!');
        setShowDriverForm(false);
        setEditingDriver(null);
        setDriverForm({
          name: '',
          email: '',
          phone: '',
          license_number: '',
          vehicle_registration: '',
          vehicle_model: '',
          specializations: '',
          emergency_contact: '',
          notes: ''
        });
        loadDrivers();
      } else {
        setError(result.message || 'Failed to save driver');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Driver save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setDriverForm({
      name: driver.name || '',
      email: driver.email || '',
      phone: driver.phone || '',
      license_number: driver.license_number || '',
      vehicle_registration: driver.vehicle_registration || '',
      vehicle_model: driver.vehicle_model || '',
      specializations: driver.specializations || '',
      emergency_contact: driver.emergency_contact || '',
      notes: driver.notes || ''
    });
    setShowDriverForm(true);
  };

  const handleDeleteDriver = async (driverId) => {
    if (!confirm('Are you sure you want to delete this driver?')) return;

    try {
      const response = await fetch(`/api/drivers/${driverId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Driver deleted successfully!');
        loadDrivers();
      } else {
        setError(result.message || 'Failed to delete driver');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Driver delete error:', error);
    }
  };

  const assignDriverToBooking = async (bookingId, driverId) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/assign-driver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ driver_id: driverId })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Driver assigned successfully!');
        loadBookings();
      } else {
        setError(result.message || 'Failed to assign driver');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Driver assignment error:', error);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Booking status updated successfully!');
        loadBookings();
        if (activeTab === 'dashboard') {
          loadDashboardData();
        }
      } else {
        setError(result.message || 'Failed to update booking status');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Status update error:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500', text: 'Pending' },
      confirmed: { color: 'bg-blue-500', text: 'Confirmed' },
      in_progress: { color: 'bg-purple-500', text: 'In Progress' },
      completed: { color: 'bg-green-500', text: 'Completed' },
      cancelled: { color: 'bg-red-500', text: 'Cancelled' }
    };

    const config = statusConfig[status] || { color: 'bg-gray-500', text: status };
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-primary/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Infinite Mobile Carwash & Detailing</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-primary/20 text-gray-300 hover:bg-primary/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-primary/20 min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-primary text-black' 
                  : 'text-gray-300 hover:bg-primary/10'
              }`}
            >
              <TrendingUp className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'bookings' 
                  ? 'bg-primary text-black' 
                  : 'text-gray-300 hover:bg-primary/10'
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'drivers' 
                  ? 'bg-primary text-black' 
                  : 'text-gray-300 hover:bg-primary/10'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Drivers
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'customers' 
                  ? 'bg-primary text-black' 
                  : 'text-gray-300 hover:bg-primary/10'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Customers
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Alerts */}
          {error && (
            <Alert className="mb-6 border-red-500 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-6 border-green-500 bg-green-500/10">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-400">{success}</AlertDescription>
            </Alert>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-card border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{dashboardStats.total_bookings || 0}</div>
                    <p className="text-xs text-gray-400">All time bookings</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Today's Bookings</CardTitle>
                    <Clock className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{dashboardStats.todays_bookings || 0}</div>
                    <p className="text-xs text-gray-400">Scheduled for today</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Active Drivers</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{dashboardStats.active_drivers || 0}</div>
                    <p className="text-xs text-gray-400">Available drivers</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-primary/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">£{dashboardStats.total_revenue?.toFixed(2) || '0.00'}</div>
                    <p className="text-xs text-gray-400">Completed bookings</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-primary/10">
                          <div>
                            <p className="font-medium text-white">{booking.customer.name}</p>
                            <p className="text-sm text-gray-400">{booking.service.service_type} - {booking.service.vehicle_type}</p>
                            <p className="text-xs text-gray-500">{booking.service.date} at {booking.service.time}</p>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(booking.status)}
                            <p className="text-sm text-gray-400 mt-1">£{booking.pricing.total_price}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-8">No recent bookings</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Driver Management</h2>
                <Button
                  onClick={() => {
                    setShowDriverForm(true);
                    setEditingDriver(null);
                    setDriverForm({
                      name: '',
                      email: '',
                      phone: '',
                      license_number: '',
                      vehicle_registration: '',
                      vehicle_model: '',
                      specializations: '',
                      emergency_contact: '',
                      notes: ''
                    });
                  }}
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Driver
                </Button>
              </div>

              {/* Driver Form Modal */}
              {showDriverForm && (
                <Card className="bg-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {editingDriver ? 'Edit Driver' : 'Add New Driver'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDriverSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                          <Input
                            id="name"
                            value={driverForm.name}
                            onChange={(e) => setDriverForm({...driverForm, name: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-300">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={driverForm.email}
                            onChange={(e) => setDriverForm({...driverForm, email: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                          <Input
                            id="phone"
                            value={driverForm.phone}
                            onChange={(e) => setDriverForm({...driverForm, phone: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="license_number" className="text-gray-300">License Number</Label>
                          <Input
                            id="license_number"
                            value={driverForm.license_number}
                            onChange={(e) => setDriverForm({...driverForm, license_number: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="vehicle_registration" className="text-gray-300">Vehicle Registration</Label>
                          <Input
                            id="vehicle_registration"
                            value={driverForm.vehicle_registration}
                            onChange={(e) => setDriverForm({...driverForm, vehicle_registration: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="vehicle_model" className="text-gray-300">Vehicle Model</Label>
                          <Input
                            id="vehicle_model"
                            value={driverForm.vehicle_model}
                            onChange={(e) => setDriverForm({...driverForm, vehicle_model: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="specializations" className="text-gray-300">Specializations</Label>
                          <Input
                            id="specializations"
                            value={driverForm.specializations}
                            onChange={(e) => setDriverForm({...driverForm, specializations: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                            placeholder="e.g., Interior Detailing, Polishing"
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergency_contact" className="text-gray-300">Emergency Contact</Label>
                          <Input
                            id="emergency_contact"
                            value={driverForm.emergency_contact}
                            onChange={(e) => setDriverForm({...driverForm, emergency_contact: e.target.value})}
                            className="bg-input border-primary/20 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="notes" className="text-gray-300">Notes</Label>
                        <textarea
                          id="notes"
                          value={driverForm.notes}
                          onChange={(e) => setDriverForm({...driverForm, notes: e.target.value})}
                          className="w-full px-3 py-2 bg-input border border-primary/20 rounded-md text-white"
                          rows="3"
                          placeholder="Additional notes about the driver"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <Button
                          type="submit"
                          className="bg-primary text-black hover:bg-primary/90"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : (editingDriver ? 'Update Driver' : 'Add Driver')}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowDriverForm(false);
                            setEditingDriver(null);
                          }}
                          className="border-primary/20 text-gray-300 hover:bg-primary/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Drivers List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                  <Card key={driver.id} className="bg-card border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{driver.name}</CardTitle>
                        <Badge className={`${driver.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                          {driver.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.email}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Car className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.vehicle_model} ({driver.vehicle_registration})</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 mr-2" />
                        <span className="text-sm">Rating: {driver.rating}/5.0</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm">{driver.total_services} services completed</span>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditDriver(driver)}
                          className="border-primary/20 text-gray-300 hover:bg-primary/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteDriver(driver.id)}
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {drivers.length === 0 && (
                <Card className="bg-card border-primary/20">
                  <CardContent className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No drivers found</p>
                    <p className="text-gray-500 text-sm">Add your first driver to get started</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Booking Management</h2>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="bg-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{booking.booking_id}</h3>
                          <p className="text-gray-400">{booking.customer.name} - {booking.customer.email}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-400">Service</p>
                          <p className="text-white">{booking.service.service_type}</p>
                          <p className="text-gray-300">{booking.service.vehicle_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Date & Time</p>
                          <p className="text-white">{booking.service.date}</p>
                          <p className="text-gray-300">{booking.service.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Price</p>
                          <p className="text-white">£{booking.pricing.total_price}</p>
                          <p className="text-gray-300">Balance: £{booking.pricing.remaining_balance}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {booking.assigned_driver ? (
                            <div className="flex items-center text-green-400">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              <span>Assigned to {booking.assigned_driver.name}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    assignDriverToBooking(booking.booking_id, e.target.value);
                                  }
                                }}
                                className="bg-input border border-primary/20 rounded px-3 py-1 text-white text-sm"
                                defaultValue=""
                              >
                                <option value="">Assign Driver</option>
                                {drivers.filter(d => d.status === 'active').map(driver => (
                                  <option key={driver.id} value={driver.id}>
                                    {driver.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.booking_id, e.target.value)}
                            className="bg-input border border-primary/20 rounded px-3 py-1 text-white text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {bookings.length === 0 && (
                <Card className="bg-card border-primary/20">
                  <CardContent className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No bookings found</p>
                    <p className="text-gray-500 text-sm">Bookings will appear here when customers make reservations</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Customer Management</h2>
              
              <div className="space-y-4">
                {customers.map((customer) => (
                  <Card key={customer.id} className="bg-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{customer.personal_info.name}</h3>
                          <p className="text-gray-400">{customer.personal_info.email}</p>
                          <p className="text-gray-400">{customer.personal_info.phone}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-primary text-black">
                            {customer.customer_id}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Total Bookings</p>
                          <p className="text-white text-lg font-semibold">{customer.loyalty_stats.total_bookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Completed</p>
                          <p className="text-white text-lg font-semibold">{customer.loyalty_stats.completed_bookings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Loyalty Points</p>
                          <p className="text-white text-lg font-semibold">{customer.loyalty_stats.loyalty_points}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Available Rewards</p>
                          <div className="space-y-1">
                            {customer.rewards.free_washes_available > 0 && (
                              <Badge className="bg-green-500 text-white text-xs">
                                {customer.rewards.free_washes_available} Free Wash{customer.rewards.free_washes_available > 1 ? 'es' : ''}
                              </Badge>
                            )}
                            {customer.rewards.discount_15_available > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs">
                                {customer.rewards.discount_15_available} 15% Discount{customer.rewards.discount_15_available > 1 ? 's' : ''}
                              </Badge>
                            )}
                            {customer.rewards.free_washes_available === 0 && customer.rewards.discount_15_available === 0 && (
                              <span className="text-gray-400 text-sm">None</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {customers.length === 0 && (
                <Card className="bg-card border-primary/20">
                  <CardContent className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No customers found</p>
                    <p className="text-gray-500 text-sm">Customer data will appear here after bookings are made</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

