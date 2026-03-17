'use client'

import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api'
import { useJsApiLoader } from '@react-google-maps/api'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

const libraries = ['places']

const MapSelector = ({ onLocationSelect, initialLat, initialLng, streetAddress }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: initialLat || 28.7041,
    lng: initialLng || 77.1025,
  })
  const [searchBox, setSearchBox] = useState(null)
  const mapRef = useRef(null)
  const searchBoxRef = useRef(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  useEffect(() => {
    if (initialLat && initialLng) {
      setMarkerPosition({ lat: initialLat, lng: initialLng })
    }
  }, [initialLat, initialLng])

  const handleMarkerDragEnd = (e) => {
    const newLat = e.latLng.lat()
    const newLng = e.latLng.lng()
    setMarkerPosition({ lat: newLat, lng: newLng })
    geocodeLocation(newLat, newLng)
  }

  const handleMapClick = (e) => {
    const newLat = e.latLng.lat()
    const newLng = e.latLng.lng()
    setMarkerPosition({ lat: newLat, lng: newLng })
    geocodeLocation(newLat, newLng)
  }

  const geocodeLocation = async (lat, lng) => {
    try {
      const response = await fetch('/api/maps/reverse-geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng }),
      })
      const data = await response.json()
      if (data?.address) {
        onLocationSelect({
          lat,
          lng,
          ...data.address,
        })
      }
    } catch (error) {
      console.error('Reverse geocode error:', error)
      onLocationSelect({ lat, lng })
    }
  }

  const handleSearchBoxLoad = (ref) => {
    setSearchBox(ref)
  }

  const handlePlacesChanged = () => {
    if (searchBox && searchBox.getPlaces()) {
      const places = searchBox.getPlaces()
      if (places.length === 0) return

      const place = places[0]
      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry')
        return
      }

      const newLat = place.geometry.location.lat()
      const newLng = place.geometry.location.lng()
      setMarkerPosition({ lat: newLat, lng: newLng })

      // Pan map to new location
      if (mapRef.current) {
        mapRef.current.panTo({ lat: newLat, lng: newLng })
      }

      // Extract address components
      const addressComponents = place.address_components || []
      const details = {
        streetAddress: place.formatted_address || '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
      }

      addressComponents.forEach((component) => {
        const types = component.types
        if (types.includes('locality')) {
          details.city = component.long_name
        }
        if (types.includes('administrative_area_level_1')) {
          details.state = component.long_name
        }
        if (types.includes('country')) {
          details.country = component.long_name
        }
        if (types.includes('postal_code')) {
          details.pinCode = component.long_name
        }
      })

      onLocationSelect({
        lat: newLat,
        lng: newLng,
        ...details,
      })
    }
  }

  if (loadError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error loading Google Maps
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div style={{ padding: '20px', color: '#666' }}>
        Loading map...
      </div>
    )
  }

  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block' }}>
          Search Location on Map
        </label>
        <StandaloneSearchBox
          onLoad={handleSearchBoxLoad}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a location..."
            style={{
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: 'relative',
              width: '100%',
              padding: '10px 12px',
            }}
          />
        </StandaloneSearchBox>
      </div>

      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '400px',
          borderRadius: '4px',
        }}
        center={markerPosition}
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map
        }}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
          title="Drag to select location or click on map"
        />
      </GoogleMap>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <p>💡 Tip: Search, drag the marker, or click on the map to select a location</p>
        <p>
          Current: {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
        </p>
      </div>
    </div>
  )
}

export default MapSelector
