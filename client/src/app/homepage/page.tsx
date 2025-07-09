import { FeaturedProducts } from "@/components/featureProducts/featureProducts";
import { HeroSlider } from "@/components/hero-slider";
import { Layout } from "@/components/home-layout/Layout";


export default function Home() {
  return (
    <Layout>
      <HeroSlider />
      <FeaturedProducts />
      {/* <AboutSection /> */}
      {/* <ShowroomCTA /> */}
    </Layout>
  );
}