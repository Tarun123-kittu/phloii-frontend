import Establishment  from '@/Component/allestablishments/Establishment';

export async function generateMetadata() {

  const metadata = {
    title: `Establishment Details`,
    description: `Phloii Find the best hotels near you`,
  };

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

const Hotels = () => {
  
  return (
    <Establishment />
  );
};

export default Hotels;



