import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-10 lg:p-24 gap-8 flex-1">
      <Image
        src="logo.svg"
        alt="Logo image"
        width={150}
        height={150}
        className="animate-slideDown"
        priority={true}
      />
      <h1 className="font-bold text-5xl animate-slideUp">Code Snippets</h1>
      <p className="animate-slideUp text-lg">
        A place created to help developers store and retrieve their reusable codes
      </p>
    </main>
  );
}
