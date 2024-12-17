import HotelDetailsComponent from '@/Component/hotelDetails/HotelDetails';

export async function generateMetadata({ params }) {
    const { hotelId } = params;

    const metadata = {
        title: `Hotel Details - ${hotelId}`,
        description: `Find details about hotel ${hotelId}. Discover amenities, reviews, and more.`,
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
