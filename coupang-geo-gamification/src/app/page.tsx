import Image from "next/image";
import screenshot from "@/assets/coffee-product-screenshot.png";
import Link from "next/link";
import { populateDongTable } from "@/scripts/populate-dong-table";

export default function Home() {
  return (
    <section className="flex flex-row h-full">
      <Link
        href="/product"
        className=" absolute top-[21vh] left-[58vw] text-blue-500"
      >
        Look on the map
      </Link>
      <Image src={screenshot} />
    </section>
  );
}
