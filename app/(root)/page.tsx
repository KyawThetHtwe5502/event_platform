import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <section className="bg-blue-50 bg-dotted-pattern bg-contain py-5 md:py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0 container mx-auto ">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-4xl font-bold">
            Host, Connect, Celebrate: Your Events, Our Platform!
          </h1>
          <p className="pr-20 md:pr-24">
            Discover, create, and share unforgettable events with Evently. Your
            go-to platform for all things eventful!
          </p>
          <Button size={"lg"} color="blue" asChild className="w-full bg-blue-500 rounded-full  sm:w-fit">
            <Link href={"#events"}>
            Explore Now</Link>
          </Button>
        </div>
                  <Image src={"/assets/images/Hero.png"} alt="hero" width={200} height={200} className="max-w-[70vh] object-contain object-center 2xl:max-w-[50vh]" />

      </div>
    </section>
    <section id="events" className="my-8 flex flex-col gap-8 md:gap-12 container mx-auto">
    <h2 className="text-2xl font-medium">
      Trust by <br/>      Thousands of Events
    </h2>
    <div className="flex w-full flex-col gap-5 md:flex-row">
      Search
      CategoryFilter
    </div>
    </section>
    </>
  );
}
