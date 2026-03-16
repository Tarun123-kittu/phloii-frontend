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
      const result = data.results[0];
      const addressComponents = result.address_components || [];
      const address = {
        streetAddress: result.formatted_address || '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
      };

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes('locality')) {
          address.city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          address.state = component.long_name;
        }
        if (types.includes('country')) {
          address.country = component.long_name;
        }
        if (types.includes('postal_code')) {
          address.pinCode = component.long_name;
        }
      });

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
