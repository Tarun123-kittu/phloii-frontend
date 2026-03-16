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
      const details = {
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        pinCode: '',
      };

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes('street_number')) {
          details.streetAddress = component.long_name + ' ' + (details.streetAddress || '');
        }
        if (types.includes('route')) {
          details.streetAddress += component.long_name;
        }
        if (types.includes('locality')) {
          details.city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          details.state = component.long_name;
        }
        if (types.includes('country')) {
          details.country = component.long_name;
        }
        if (types.includes('postal_code')) {
          details.pinCode = component.long_name;
        }
      });

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
