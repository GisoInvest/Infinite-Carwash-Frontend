import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Save, User, Mail, Phone, Car, MapPin, Clock } from 'lucide-react';

const DriverForm = ({ driver, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license_number: '',
    vehicle_registration: '',
    vehicle_model: '',
    specializations: [],
    status: 'active',
    current_location_address: '',
    availability_start: '08:00',
    availability_end: '18:00',
    working_days: '1,2,3,4,5,6,7',
    emergency_contact: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const serviceOptions = [
    'Car Wash',
    'Mini Valet',
    'Full Valet',
    'Interior Detailing',
    'Exterior Detailing',
    'Full Detailing',
    'Stage 1 Polishing',
    'Stage 2 Polishing'
  ];

  const dayOptions = [
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' }
  ];

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || '',
        email: driver.email || '',
        phone: driver.phone || '',
        license_number: driver.license_number || '',
        vehicle_registration: driver.vehicle_registration || '',
        vehicle_model: driver.vehicle_model || '',
        specializations: driver.specializations ? JSON.parse(driver.specializations) : [],
        status: driver.status || 'active',
        current_location_address: driver.current_location?.address || '',
        availability_start: driver.availability?.start || '08:00',
        availability_end: driver.availability?.end || '18:00',
        working_days: driver.availability?.working_days || '1,2,3,4,5,6,7',
        emergency_contact: driver.emergency_contact || '',
        notes: driver.notes || ''
      });
    }
  }, [driver]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSpecializationToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(service)
        ? prev.specializations.filter(s => s !== service)
        : [...prev.specializations, service]
    }));
  };

  const handleWorkingDayToggle = (day) => {
    const currentDays = formData.working_days.split(',').filter(d => d);
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    setFormData(prev => ({
      ...prev,
      working_days: newDays.join(',')
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.license_number.trim()) newErrors.license_number = 'License number is required';
    if (!formData.vehicle_registration.trim()) newErrors.vehicle_registration = 'Vehicle registration is required';
    if (!formData.vehicle_model.trim()) newErrors.vehicle_model = 'Vehicle model is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-card border-primary/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-xl">
            {driver ? 'Edit Driver' : 'Add New Driver'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`bg-input border-primary/20 text-white ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`bg-input border-primary/20 text-white ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`bg-input border-primary/20 text-white ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="emergency_contact" className="text-gray-300">Emergency Contact</Label>
                  <Input
                    id="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                    className="bg-input border-primary/20 text-white"
                    placeholder="Emergency contact number"
                  />
                </div>

                <div>
                  <Label htmlFor="license_number" className="text-gray-300">License Number *</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => handleInputChange('license_number', e.target.value)}
                    className={`bg-input border-primary/20 text-white ${errors.license_number ? 'border-red-500' : ''}`}
                    placeholder="Enter license number"
                  />
                  {errors.license_number && <p className="text-red-400 text-sm mt-1">{errors.license_number}</p>}
                </div>

                <div>
                  <Label htmlFor="status" className="text-gray-300">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-primary/20 rounded-md text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Car className="w-5 h-5 mr-2 text-primary" />
                Vehicle Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicle_registration" className="text-gray-300">Vehicle Registration *</Label>
                  <Input
                    id="vehicle_registration"
                    value={formData.vehicle_registration}
                    onChange={(e) => handleInputChange('vehicle_registration', e.target.value)}
                    className={`bg-input border-primary/20 text-white ${errors.vehicle_registration ? 'border-red-500' : ''}`}
                    placeholder="e.g., IMC 2024"
                  />
                  {errors.vehicle_registration && <p className="text-red-400 text-sm mt-1">{errors.vehicle_registration}</p>}
                </div>

                <div>
                  <Label htmlFor="vehicle_model" className="text-gray-300">Vehicle Model *</Label>
                  <Input
                    id="vehicle_model"
                    value={formData.vehicle_model}
                    onChange={(e) => handleInputChange('vehicle_model', e.target.value)}
                    className={`bg-input border-primary/20 text-white ${errors.vehicle_model ? 'border-red-500' : ''}`}
                    placeholder="e.g., Ford Transit"
                  />
                  {errors.vehicle_model && <p className="text-red-400 text-sm mt-1">{errors.vehicle_model}</p>}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Current Location
              </h3>
              
              <div>
                <Label htmlFor="current_location_address" className="text-gray-300">Address</Label>
                <Input
                  id="current_location_address"
                  value={formData.current_location_address}
                  onChange={(e) => handleInputChange('current_location_address', e.target.value)}
                  className="bg-input border-primary/20 text-white"
                  placeholder="Current location address"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Availability
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability_start" className="text-gray-300">Start Time</Label>
                  <Input
                    id="availability_start"
                    type="time"
                    value={formData.availability_start}
                    onChange={(e) => handleInputChange('availability_start', e.target.value)}
                    className="bg-input border-primary/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="availability_end" className="text-gray-300">End Time</Label>
                  <Input
                    id="availability_end"
                    type="time"
                    value={formData.availability_end}
                    onChange={(e) => handleInputChange('availability_end', e.target.value)}
                    className="bg-input border-primary/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Working Days</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dayOptions.map((day) => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => handleWorkingDayToggle(day.value)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        formData.working_days.split(',').includes(day.value)
                          ? 'bg-primary text-black'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Service Specializations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleSpecializationToggle(service)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      formData.specializations.includes(service)
                        ? 'bg-primary text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes" className="text-gray-300">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-primary/20 rounded-md text-white resize-none"
                  rows="3"
                  placeholder="Additional notes about the driver..."
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : (driver ? 'Update Driver' : 'Add Driver')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverForm;

