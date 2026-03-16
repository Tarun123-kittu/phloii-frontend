export async function POST(req) {
  try {
    const { address } = await req.json();

    if (!address) {
      return Response.json(
        { error: 'Address is required' },
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

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.results && data.results.length > 0) {
      const result = data.results[0];
      const lat = result.geometry.location.lat;
      const lng = result.geometry.location.lng;

      return Response.json({ lat, lng });
    }

    return Response.json(
      { error: 'Address not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Geocode error:', error);
    return Response.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
