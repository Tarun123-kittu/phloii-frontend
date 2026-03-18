export async function POST(req) {
  try {
    const { placeId } = await req.json();

    if (!placeId) {
      return Response.json(
        { error: 'Place ID is required' },
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

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,address_components&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.result) {
      const addressComponents = data.result.address_components || [];
      const getComp = (types) => addressComponents.find(c => types.some(t => c.types.includes(t)))?.long_name || '';

      const country = getComp(['country']);
      const loc = getComp(['locality']);
      const admin2 = getComp(['administrative_area_level_2']);

      let city = loc;
      if (country === 'India' && admin2) {
        // Heuristic: If locality is very specific (short, has digits, or neighborhood-like), prefer admin2 (District)
        if (!loc || loc.length < 3 || /\d/.test(loc)) {
          city = admin2;
        }
      }
      if (!city) city = admin2 || getComp(['sublocality_level_1', 'neighborhood']);

      const details = {
        streetAddress: data.result.formatted_address || '',
        city: city,
        state: getComp(['administrative_area_level_1']),
        country: country,
        pinCode: getComp(['postal_code']) || '',
        lat: data.result.geometry.location.lat,
        lng: data.result.geometry.location.lng,
      };

      return Response.json({ details });
    }

    return Response.json({ details: null });
  } catch (error) {
    console.error('Place details error:', error);
    return Response.json(
      { error: 'Failed to fetch place details' },
      { status: 500 }
    );
  }
}
