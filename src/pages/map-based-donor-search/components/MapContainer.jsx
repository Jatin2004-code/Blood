import React, { useState, useEffect, useRef, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ 
  donors = [], 
  emergencyRequests = [], 
  hospitals = [], 
  selectedDonor, 
  onDonorSelect,
  mapCenter,
  onMapCenterChange,
  filters,
  showEmergencyRequests = true,
  showHospitals = true,
  showDonors = true
}) => {
  const [mapZoom, setMapZoom] = useState(12);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  // Mock map data with clustering
  const clusteredDonors = React.useMemo(() => {
    if (!showDonors) return [];
    
    // Simple clustering logic for demonstration
    const clusters = [];
    const processed = new Set();
    
    donors?.forEach((donor, index) => {
      if (processed?.has(index)) return;
      
      const nearbyDonors = donors?.filter((d, i) => {
        if (processed?.has(i) || i === index) return false;
        const distance = Math.sqrt(
          Math.pow(d?.lat - donor?.lat, 2) + Math.pow(d?.lng - donor?.lng, 2)
        );
        return distance < 0.01; // Cluster threshold
      });
      
      if (nearbyDonors?.length > 0) {
        clusters?.push({
          id: `cluster-${index}`,
          lat: donor?.lat,
          lng: donor?.lng,
          donors: [donor, ...nearbyDonors],
          count: nearbyDonors?.length + 1,
          bloodTypes: [...new Set([donor.bloodType, ...nearbyDonors.map(d => d.bloodType)])]
        });
        
        processed?.add(index);
        nearbyDonors?.forEach((_, i) => {
          const originalIndex = donors?.findIndex(d => d?.id === nearbyDonors?.[i]?.id);
          processed?.add(originalIndex);
        });
      } else {
        clusters?.push({
          id: `single-${index}`,
          lat: donor?.lat,
          lng: donor?.lng,
          donors: [donor],
          count: 1,
          bloodTypes: [donor?.bloodType]
        });
        processed?.add(index);
      }
    });
    
    return clusters;
  }, [donors, showDonors]);

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const location = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          };
          setUserLocation(location);
          onMapCenterChange(location);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          // Fallback to Mumbai coordinates
          const fallbackLocation = { lat: 19.0760, lng: 72.8777 };
          setUserLocation(fallbackLocation);
          onMapCenterChange(fallbackLocation);
        }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 1));
  };

  const handleMarkerClick = (marker, type) => {
    setSelectedMarker({ ...marker, type });
    if (type === 'donor' && onDonorSelect) {
      onDonorSelect(marker?.donors?.[0]);
    }
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    // Auto-locate user on component mount
    if (!userLocation) {
      handleGetCurrentLocation();
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <div className="absolute inset-0">
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          loading="lazy"
          title="Donor Search Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${mapZoom}&output=embed`}
          className="border-0"
        />
      </div>
      {/* Map Overlay with Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Donor Clusters */}
        {clusteredDonors?.map((cluster) => (
          <div
            key={cluster?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{
              left: `${((cluster?.lng - mapCenter?.lng) * 1000 + 50)}%`,
              top: `${(-(cluster?.lat - mapCenter?.lat) * 1000 + 50)}%`
            }}
            onClick={() => handleMarkerClick(cluster, 'donor')}
          >
            {cluster?.count > 1 ? (
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white heartbeat">
                  {cluster?.count}
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-sm border">
                  {cluster?.bloodTypes?.join(', ')}
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white ${
                  cluster?.donors?.[0]?.available ? 'bg-success heartbeat' : 'bg-gray-400'
                }`}>
                  <Icon name="Heart" size={16} />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-white px-1 py-0.5 rounded shadow-sm border font-mono">
                  {cluster?.donors?.[0]?.bloodType}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Emergency Request Markers */}
        {showEmergencyRequests && emergencyRequests?.map((request) => (
          <div
            key={request?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{
              left: `${((request?.lng - mapCenter?.lng) * 1000 + 50)}%`,
              top: `${(-(request?.lat - mapCenter?.lat) * 1000 + 50)}%`
            }}
            onClick={() => handleMarkerClick(request, 'emergency')}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white emergency-pulse ${
              request?.urgency === 'critical' ? 'bg-error' : 
              request?.urgency === 'high' ? 'bg-warning' : 'bg-secondary'
            }`}>
              <Icon name="AlertTriangle" size={18} />
            </div>
          </div>
        ))}

        {/* Hospital Markers */}
        {showHospitals && hospitals?.map((hospital) => (
          <div
            key={hospital?.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
            style={{
              left: `${((hospital?.lng - mapCenter?.lng) * 1000 + 50)}%`,
              top: `${(-(hospital?.lat - mapCenter?.lat) * 1000 + 50)}%`
            }}
            onClick={() => handleMarkerClick(hospital, 'hospital')}
          >
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
              <Icon name="Cross" size={16} />
            </div>
          </div>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${((userLocation?.lng - mapCenter?.lng) * 1000 + 50)}%`,
              top: `${(-(userLocation?.lat - mapCenter?.lat) * 1000 + 50)}%`
            }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute -top-2 -left-2 animate-ping"></div>
            </div>
          </div>
        )}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 pointer-events-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name={isLocating ? "Loader2" : "MapPin"} size={16} className={isLocating ? "animate-spin" : ""} />
        </Button>
      </div>
      {/* Layer Toggle Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2 pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
          <div className="text-xs font-medium text-gray-700 mb-2">Layers</div>
          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={showDonors}
                onChange={(e) => {/* Handle layer toggle */}}
                className="rounded"
              />
              <span>Donors</span>
            </label>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={showEmergencyRequests}
                onChange={(e) => {/* Handle layer toggle */}}
                className="rounded"
              />
              <span>Emergency</span>
            </label>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={showHospitals}
                onChange={(e) => {/* Handle layer toggle */}}
                className="rounded"
              />
              <span>Hospitals</span>
            </label>
          </div>
        </div>
      </div>
      {/* Marker Popup */}
      {selectedMarker && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-modal border max-w-sm w-full mx-4 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                {selectedMarker?.type === 'donor' && 'Donor Information'}
                {selectedMarker?.type === 'emergency' && 'Emergency Request'}
                {selectedMarker?.type === 'hospital' && 'Hospital Information'}
              </h3>
              <Button variant="ghost" size="icon" onClick={closePopup}>
                <Icon name="X" size={16} />
              </Button>
            </div>

            {selectedMarker?.type === 'donor' && (
              <div className="space-y-3">
                {selectedMarker?.count > 1 ? (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      {selectedMarker?.count} donors in this area
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedMarker?.bloodTypes?.map((type) => (
                        <span key={type} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-mono text-lg text-primary">{selectedMarker?.donors?.[0]?.bloodType}</span>
                      <span className={`w-2 h-2 rounded-full ${selectedMarker?.donors?.[0]?.available ? 'bg-success' : 'bg-gray-400'}`}></span>
                      <span className="text-sm text-gray-600">
                        {selectedMarker?.donors?.[0]?.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Distance: ~{selectedMarker?.donors?.[0]?.distance}km
                    </div>
                  </div>
                )}
                <Button variant="default" fullWidth>
                  {selectedMarker?.count > 1 ? 'View All Donors' : 'Contact Donor'}
                </Button>
              </div>
            )}

            {selectedMarker?.type === 'emergency' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedMarker?.urgency === 'critical' ? 'bg-error text-white' :
                    selectedMarker?.urgency === 'high' ? 'bg-warning text-white' : 'bg-secondary text-white'
                  }`}>
                    {selectedMarker?.urgency?.toUpperCase()}
                  </span>
                  <span className="font-mono text-primary">{selectedMarker?.bloodType}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedMarker?.hospital}
                </div>
                <div className="text-xs text-gray-500">
                  Requested {selectedMarker?.timeAgo}
                </div>
                <Button variant="default" fullWidth>
                  Respond to Request
                </Button>
              </div>
            )}

            {selectedMarker?.type === 'hospital' && (
              <div className="space-y-3">
                <div className="text-sm font-medium">{selectedMarker?.name}</div>
                <div className="text-sm text-gray-600">{selectedMarker?.address}</div>
                <div className="text-xs text-gray-500">
                  Distance: ~{selectedMarker?.distance}km
                </div>
                <Button variant="outline" fullWidth>
                  Get Directions
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;