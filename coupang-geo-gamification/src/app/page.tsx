import NavBar from "@/components/NavBar";
import SeoulMap from "@/components/SeoulMap";
import dongData from "@/assets/seoulDongNow.json";
import ProductsList from "@/components/ProductsList";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white">
      <NavBar />
      <div className="flex flex-row">
        <ProductsList dongList={dongData} />
        <SeoulMap dongList={dongData} />
      </div>
    </main>
  );
}
