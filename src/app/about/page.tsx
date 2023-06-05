import PageTitle from "../components/PageTitle";
import Image from "next/image";

export const metadata = {
  title: "Code Snippets | About",
};

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center animate-fadeIn">
      <PageTitle title={"About"} />
      <section className="lg:w-1/2 p-6 text-lg">
        <h2 className="font-bold underline">Welcome to Code Snippets!</h2>
        <p className="indent-8">
          A corner of the internet designed for developers like you, seeking a helping hand in
          storing and retrieving your cherished snippets of code. We're here to make your coding
          journey smoother and more efficient. With Code Snippets, you can build your own personal
          treasure trove of reusable code, effortlessly incorporating tried and tested solutions
          into your projects. Say goodbye to time-consuming searches and hello to seamless
          integration. Join our dynamic community of developers and discover the joy of coding with
          Code Snippets.
        </p>
        <br />
        <h2 className="font-bold underline">Here's how it works:</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quisquam. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Suscipit enim facilis autem, ullam nihil, sit
          minima excepturi optio aliquam maiores, iusto magni sed at ad incidunt labore perferendis
          quas nesciunt.
        </p>
        <Image src={"logo.svg"} alt="Filler Image" height={200} width={200} className="m-auto" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quisquam. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Suscipit enim facilis autem, ullam nihil, sit
          minima excepturi optio aliquam maiores, iusto magni sed at ad incidunt labore perferendis
          quas nesciunt.
        </p>
        <Image src={"logo.svg"} alt="Filler Image" height={200} width={200} className="m-auto" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quisquam. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Suscipit enim facilis autem, ullam nihil, sit
          minima excepturi optio aliquam maiores, iusto magni sed at ad incidunt labore perferendis
          quas nesciunt.
        </p>
        <Image src={"logo.svg"} alt="Filler Image" height={200} width={200} className="m-auto" />
      </section>
    </main>
  );
}
