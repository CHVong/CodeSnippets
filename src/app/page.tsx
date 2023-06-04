import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <Image
        src="logo.svg"
        alt="Logo image"
        width={150}
        height={150}
        className="animate-fadeIn animate-slideDown"
      />
      <h1 className="font-bold text-5xl animate-slideUp">Code Snippets</h1>
      <p className="animate-slideUp delay-1000">
        Created to help developers store and retrieve their reusable codes
      </p>
    </main>
  );
}
