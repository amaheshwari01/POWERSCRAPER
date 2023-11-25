import { Button, Grid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { scrape } from '~/lib/components/scrape';
// import CTASection from './components/CTASection';
// import SomeImage from './components/SomeImage';
// import SomeText from './components/SomeText';

const Home = () => {
  const scrapeData = async () => {
    scrape().then((data) => {
      console.log(data);

    });
  }

  return (
    <>
      <Button onClick={scrapeData}>Scrape</Button>

    </>
  );
};

export default Home;
