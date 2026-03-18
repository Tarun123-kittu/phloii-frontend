'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, StandaloneSearchBox, Marker } from '@react-google-maps/api'

const libraries = ['places']

const CommonMapSelector = ({
    onLocationSelect,
    initialLat,
    initialLng,
    value = "", // Current address string for prefilling
    label = "Street Address / Search on Map",
    placeholder = "Search for your establishment address...",
    containerStyle = { width: '100%', height: '400px' },
    defaultShowMap = false
}) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const [map, setMap] = useState(null)
    const [markerPosition, setMarkerPosition] = useState(null)
    const [inputText, setInputText] = useState(value)
    const [showMap, setShowMap] = useState(defaultShowMap)
    const searchBoxRef = useRef(null)

    // Sync internal input text with external value prop (for prefilling from API)
    useEffect(() => {
        if (value !== undefined && value !== inputText) {
            setInputText(value)
        }
    }, [value])

    // Initialize marker position from props
    useEffect(() => {
        if (initialLat && initialLng) {
            const pos = { lat: parseFloat(initialLat), lng: parseFloat(initialLng) }
            setMarkerPosition(pos)
            if (map) {
                map.panTo(pos)
            }
        }
    }, [initialLat, initialLng, map])

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance)
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const onSearchBoxLoad = (ref) => {
        searchBoxRef.current = ref
    }

    const handlePlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces()
        if (places && places.length > 0) {
            const place = places[0]
            const newLat = place.geometry.location.lat()
            const newLng = place.geometry.location.lng()
            const newPos = { lat: newLat, lng: newLng }
            const formattedAddress = place.formatted_address || ''

            setMarkerPosition(newPos)
            setInputText(formattedAddress)
            if (map) map.panTo(newPos)

            // Extract address components robustly
            const components = place.address_components || []
            const getComp = (types) => components.find(c => types.some(t => c.types.includes(t)))?.long_name || ''

            const country = getComp(['country'])
            const loc = getComp(['locality'])
            const admin2 = getComp(['administrative_area_level_2'])

            let city = loc
            if (country === 'India' && admin2) {
                // Heuristic: If locality is very specific (short, has digits, or neighborhood-like), prefer admin2 (District)
                if (!loc || loc.length < 3 || /\d/.test(loc) || components.some(c => c.long_name === loc && c.types.includes('neighborhood'))) {
                    city = admin2
                }
            }
            if (!city) city = admin2 || getComp(['sublocality_level_1', 'neighborhood'])

            const locationData = {
                lat: newLat,
                lng: newLng,
                streetAddress: formattedAddress,
                city: city,
                state: getComp(['administrative_area_level_1']),
                country: country,
                pinCode: getComp(['postal_code']),
            }

            onLocationSelect(locationData)
        }
    }

    const handleMapClick = async (e) => {
        const newLat = e.latLng.lat()
        const newLng = e.latLng.lng()
        const newPos = { lat: newLat, lng: newLng }

        setMarkerPosition(newPos)

        // Reverse geocode via internal API
        try {
            const response = await fetch('/api/maps/reverse-geocode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lat: newLat, lng: newLng }),
            })
            const data = await response.json()
            if (data.address) {
                setInputText(data.address.streetAddress || '')
                onLocationSelect({
                    lat: newLat,
                    lng: newLng,
                    ...data.address
                })
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error)
        }
    }

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading Maps...</div>

    return (
        <div className="common-map-selector">
            <div className="form-group mb-2">
                <label className="form-label cmn_label">{label}</label>
                <StandaloneSearchBox
                    onLoad={onSearchBoxLoad}
                    onPlacesChanged={handlePlacesChanged}
                >
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="form-control cmn_input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onBlur={() => onLocationSelect({ streetAddress: inputText })}
                    />
                </StandaloneSearchBox>
            </div>

            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                        color: '#FBC42E',
                        padding: '0',
                        fontSize: '14px',
                        textDecoration: 'underline',
                        background: 'none',
                        border: 'none'
                    }}
                    onClick={() => setShowMap(!showMap)}
                >
                    {showMap ? 'Hide Map' : 'Select on Map'}
                </button>
            </div>

            {showMap && (
                <div className="map-container-wrapper" style={{ position: 'relative' }}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={markerPosition || { lat: 20.5937, lng: 78.9629 }}
                        zoom={markerPosition ? 15 : 5}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={handleMapClick}
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: true,
                        }}
                    >
                        {markerPosition && <Marker position={markerPosition} draggable={true} onDragEnd={handleMapClick} />}
                    </GoogleMap>
                    <p className="mt-2 text-muted" style={{ fontSize: '11px' }}>
                        <i className="fas fa-info-circle me-1"></i>
                        Tip: Search above, drag the marker, or click on the map to pick a location
                    </p>
                </div>
            )}
        </div>
    )
}

export default CommonMapSelector
