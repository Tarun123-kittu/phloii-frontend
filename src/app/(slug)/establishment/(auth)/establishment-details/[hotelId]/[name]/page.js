import HotelDetailsComponent from '@/Component/hotelDetails/HotelDetails';

export async function generateMetadata({ params }) {
    const { hotelId, name } = params;
    const decodedName = decodeURIComponent(name)

    const metadata = {
        title: `${decodedName}`,
        description: `Find details about hotel ${decodedName}. Discover amenities, reviews, and more.`,
    };

    return {
        title: metadata.title,
        description: metadata.description,
    };
}

const HotelDetails = ({ params }) => {
    const { hotelId } = params;

    return <HotelDetailsComponent hotelId={hotelId} />;
};

export default HotelDetails;
