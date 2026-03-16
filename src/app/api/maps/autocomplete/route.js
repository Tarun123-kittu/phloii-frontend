export async function POST(req) {
  try {
    const { input } = await req.json();

    if (!input) {
      return Response.json(
        { error: 'Input is required' },
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

    // Include sessionToken for better billing aggregation (optional but recommended)
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=geocode&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.predictions && data.predictions.length > 0) {
      // Transform predictions to include main_text and secondary_text
      const transformedPredictions = data.predictions.map(pred => ({
        place_id: pred.place_id,
        description: pred.description,
        main_text: pred.main_text || pred.description.split(',')[0],
        secondary_text: pred.secondary_text || pred.description.substring(pred.description.indexOf(',') + 1).trim() || '',
      }));
      return Response.json({ predictions: transformedPredictions });
    }

    return Response.json({ predictions: [] });
  } catch (error) {
    console.error('Autocomplete error:', error);
    return Response.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}
