import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <ul>
      {headerLinks.map((link) => {
        return ( 
          <li>
            <Link href={link.route}>{link.lable}</Link>
          </li>
        )
      })}
    </ul>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid gris-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-centergap-8">
            <h1 className="h1-bold">
              Crafting Authentic Personas with Data-Driven Precision
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Unveil True Identities with Insights from Every Social Corner with
              our global community.
            </p>
            <Button
              size="lg"
              asChild
              className="button w-full sm:w-fit my-8 bg-slate-500 hover:bg-slate-600"
            >
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/hero.jpg"
            alt="analysis vector"
            width={1000}
            height={1000}
          ></Image>
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <marquee behavior="scroll" direction="left">
          <h3 className="h3-bold text-orange-300 text-pretty">
            Trusted by thousands of organizations!
          </h3>
        </marquee>
        <div className="flex flex-row justify-between">
          <div>
            <Card className="h-auto p-4 mx-6 rounded-lg">
              <CardHeader>
                <CardTitle>Individual</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et velit ac nisi ultricies euismod. Aenean nisl ipsum, porttitor quis dui ut, auctor ullamcorper justo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/individual" className="hover:underline">make a persona</Link>
              </CardContent>
            </Card>
          </div>
          <div><Card className="h-auto p-4 mx-6 rounded-lg">
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et velit ac nisi ultricies euismod. Aenean nisl ipsum, porttitor quis dui ut, auctor ullamcorper justo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/organization" className="hover:underline">make a persona</Link>
              </CardContent>
            </Card></div>
            <div><Card className="h-auto p-4 mx-6 rounded-lg">
              <CardHeader>
                <CardTitle>User's POV</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et velit ac nisi ultricies euismod. Aenean nisl ipsum, porttitor quis dui ut, auctor ullamcorper justo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pov" className="hover:underline" >Get Insights</Link>
              </CardContent>
            </Card></div>
        </div>
      </section>
    </>
  );
}
