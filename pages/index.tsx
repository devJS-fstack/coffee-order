import CarouselBanner from "../components/Carousel/Carousel";
import CategoryProduct from "../components/CategoryProduct/CategoryProduct";

export default function Main() {
  return (
      <div className="home_grid bg-custom dark-custom">
        <div className="font-sans">
            <section style={{ maxHeight: "520px" }}>
                <CarouselBanner/>
            </section>
            <section className="tch-box">
                <CategoryProduct/>
            </section>
        </div>
      </div>
  )
}