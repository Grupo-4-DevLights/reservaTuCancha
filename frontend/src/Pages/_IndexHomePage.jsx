import { Contacto } from "../Components/HomePage/Contacto";
import { Footer } from "../Components/HomePage/Footer";
import { Hero } from "../Components/HomePage/Hero";
import { Pasos } from "../Components/HomePage/Pasos";
import { NavBar } from "../Components/NavBar";

export function HomePage() {
  return (
  <>
    <NavBar />
    <Hero />
    <Pasos />
    <Contacto />
    <Footer />
  </>
  );
}
