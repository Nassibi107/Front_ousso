import { Header, Hero, Product, Stats, Contact, 
    Testimonials, Cta, Benefits, Features, Gallery, FAQ, Footer } from './';


const Home = ( { colors }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header colors={colors} />
      <Hero colors={colors} />
      <Features colors={colors} />
      <Gallery colors={colors} />
      <Product colors={colors} />
      <Testimonials colors={colors} />
      <Stats colors={colors} />
      <Benefits colors={colors} />
      <FAQ colors={colors} />
      <Cta colors={colors} />
      <Footer colors={colors} />
    </div>
  );
};

export default Home;
