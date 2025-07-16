import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Car,
  Users,
  UserCheck,
  UserX,
  Star,
  Clock,
  LogOut
} from 'lucide-react';
import DriverForm from '../components/DriverForm';
import DriverStats from '../components/DriverStats';

const Admin = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [alert, setAlert] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchDrivers();
    }
  }, [authenticated]);

  useEffect(() => {
    filterDrivers();
  }, [drivers, searchTerm, statusFilter]);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/check-auth', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success && result.authenticated) {
        setAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_email', result.user.email);
      } else {
        // Check localStorage as fallback
        const localAuth = localStorage.getItem('admin_authenticated');
        if (localAuth === 'true') {
          // Try to verify with server
          setAuthenticated(true);
        } else {
          navigate('/admin-login');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Check localStorage as fallback
      const localAuth = localStorage.getItem('admin_authenticated');
      if (localAuth === 'true') {
        setAuthenticated(true);
      } else {
        navigate('/admin-login');
      }
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_email');
      navigate('/admin-login');
    }
  };

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/drivers', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setDrivers(result.drivers);
      } else {
        showAlert('error', 'Failed to fetch drivers');
      }
    } catch (error) {
      showAlert('error', 'Network error while fetching drivers');
    } finally {
      setLoading(false);
    }
  };

  const filterDrivers = () => {
    let filtered = drivers;

    if (searchTerm) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.driver_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(driver => driver.status === statusFilter);
    }

    setFilteredDrivers(filtered);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleAddDriver = () => {
    setEditingDriver(null);
    setShowDriverForm(true);
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setShowDriverForm(true);
  };

  const handleDeleteDriver = async (driverId) => {
    if (!confirm('Are you sure you want to deactivate this driver?')) return;

    try {
      const response = await fetch(`/api/drivers/${driverId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const result = await response.json();

      if (result.success) {
        showAlert('success', 'Driver deactivated successfully');
        fetchDrivers();
      } else {
        showAlert('error', result.message);
      }
    } catch (error) {
      showAlert('error', 'Network error while deleting driver');
    }
  };

  const handleDriverFormSubmit = async (driverData) => {
    try {
      const url = editingDriver ? `/api/drivers/${editingDriver.id}` : '/api/drivers';
      const method = editingDriver ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(driverData)
      });

      const result = await response.json();

      if (result.success) {
        showAlert('success', editingDriver ? 'Driver updated successfully' : 'Driver created successfully');
        setShowDriverForm(false);
        setEditingDriver(null);
        fetchDrivers();
      } else {
        showAlert('error', result.message);
      }
    } catch (error) {
      showAlert('error', 'Network error while saving driver');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-500', text: 'Active' },
      inactive: { color: 'bg-gray-500', text: 'Inactive' },
      busy: { color: 'bg-yellow-500', text: 'Busy' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Checking authentication...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Loading drivers...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Driver Management</h1>
            <p className="text-gray-400">Manage your fleet of professional drivers</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/20 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Alert */}
        {alert && (
          <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-green-500/10'}`}>
            <AlertDescription className={alert.type === 'error' ? 'text-red-400' : 'text-green-400'}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <DriverStats />

        {/* Controls */}
        <Card className="bg-card border-primary/20 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search drivers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-primary/20 text-white"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-input border border-primary/20 rounded-md text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="busy">Busy</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button
                onClick={handleAddDriver}
                className="bg-primary text-black hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Driver
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className="bg-card border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{driver.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{driver.driver_id}</p>
                  </div>
                  {getStatusBadge(driver.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-300 text-sm">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  <span className="break-all">{driver.email}</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Car className="w-4 h-4 mr-2 text-primary" />
                  <span>{driver.vehicle_model} ({driver.vehicle_registration})</span>
                </div>
                {driver.current_location && driver.current_location.address && (
                  <div className="flex items-center text-gray-300 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span className="truncate">{driver.current_location.address}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-300 text-sm">
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  <span>{driver.rating}/5.0 ({driver.total_services} services)</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span>{driver.availability.start} - {driver.availability.end}</span>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDriver(driver)}
                    className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteDriver(driver.id)}
                    className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Deactivate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrivers.length === 0 && !loading && (
          <Card className="bg-card border-primary/20">
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No drivers found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first driver'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  onClick={handleAddDriver}
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Driver
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Driver Form Modal */}
        {showDriverForm && (
          <DriverForm
            driver={editingDriver}
            onSubmit={handleDriverFormSubmit}
            onClose={() => {
              setShowDriverForm(false);
              setEditingDriver(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;

