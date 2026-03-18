export async function POST(req) {
  try {
    const { lat, lng } = await req.json();

    if (lat === undefined || lng === undefined) {
      return Response.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_MAPS_API_KEY) {
      return Response.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.results && data.results.length > 0) {
      const results = data.results;
      const primary = results[0];
      const addressComponents = primary.address_components || [];
      const getComp = (types) => addressComponents.find(c => types.some(t => c.types.includes(t)))?.long_name || '';

      // Scan all results for a postal code if the primary one doesn't have it
      let pinCode = getComp(['postal_code']);
      if (!pinCode) {
        for (const res of results) {
          const pc = res.address_components.find(c => c.types.includes('postal_code'))?.long_name;
          if (pc) {
            pinCode = pc;
            break;
          }
        }
      }

      const country = getComp(['country']);
      const loc = getComp(['locality']);
      const admin2 = getComp(['administrative_area_level_2']);

      let city = loc;
      if (country === 'India' && admin2) {
        if (!loc || loc.length < 3 || /\d/.test(loc)) {
          city = admin2;
        }
      }
      if (!city) city = admin2 || getComp(['sublocality_level_1', 'neighborhood']);

      const address = {
        streetAddress: primary.formatted_address || '',
        city: city,
        state: getComp(['administrative_area_level_1']),
        country: country,
        pinCode: pinCode || '',
      };

      return Response.json({ address });
    }

    return Response.json(
      { error: 'Address not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Reverse geocode error:', error);
    return Response.json(
      { error: 'Failed to reverse geocode' },
      { status: 500 }
    );
  }
}
