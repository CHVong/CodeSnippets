import Link from "next/link";
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
        <h2 className="text-xl font-bold underline">Welcome to Code Snippets!</h2>
        <br />
        <p className="indent-8">
          A corner of the internet designed for developers like you, seeking a helping hand in
          storing and retrieving your cherished snippets of code. We&apos;re here to make your
          coding journey smoother and more efficient. With Code Snippets, you can build your own
          personal treasure trove of reusable code, effortlessly incorporating tried and tested
          solutions into your projects. Say goodbye to time-consuming searches and hello to seamless
          integration. Join our dynamic community of developers and discover the joy of coding with
          Code Snippets.
        </p>

        <br />

        <h2 className="text-xl font-bold underline">Here&apos;s how it works:</h2>
        <br />
        <section className="flex flex-col gap-2">
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">1. Sign In or Register</div>
            <div className="collapse-content">
              <p>
                Sign in or register as a new user using Discord, Github or Google{" "}
                <Link href={"/signin"} className="text-blue-500 underline">
                  HERE
                </Link>
                <Image
                  src={
                    "https://res.cloudinary.com/dq9umvpmv/image/upload/f_auto,q_auto/v1/CodeSnippets/SignInPage"
                  }
                  alt="Sign In Page"
                  height={500}
                  width={500}
                  className="m-auto mt-6 border-2 border-primary rounded-lg"
                ></Image>
              </p>
            </div>
          </div>
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">2. Create A New Code Snippet</div>
            <div className="collapse-content">
              <p>
                To begin creating a new code snippet, you can go{" "}
                <Link href={"/create"} className="text-blue-500 underline">
                  HERE
                </Link>
                <br />
                <span className="text-sm">
                  <span className="font-bold">Note:</span> Checking "Public" will enable your code
                  to be viewable by everyone in the explore page.
                </span>
                <Image
                  src={
                    "https://res.cloudinary.com/dq9umvpmv/image/upload/f_auto,q_auto/v1/CodeSnippets/CreatePage"
                  }
                  alt="Create Page"
                  height={500}
                  width={500}
                  className="m-auto mt-6 border-2 border-primary rounded-lg"
                ></Image>
              </p>
            </div>
          </div>
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">3. View or Edit Snippets</div>
            <div className="collapse-content">
              <p>
                You can view or edit your snippets at anytime{" "}
                <Link href={"/snippets"} className="text-blue-500 underline">
                  HERE
                </Link>
                <br />
                <span className="text-sm">
                  <span className="font-bold">Note:</span> Searches will be filtered by your tabs
                  accordingly.
                </span>
                <Image
                  src={
                    "https://res.cloudinary.com/dq9umvpmv/image/upload/f_auto,q_auto/v1/CodeSnippets/MySnippets"
                  }
                  alt="My Snippets Page"
                  height={500}
                  width={500}
                  className="m-auto mt-6 border-2 border-primary rounded-lg"
                ></Image>
              </p>
            </div>
          </div>
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              4. Explore, Favorite, and Comment!
            </div>
            <div className="collapse-content">
              <p>
                Discover our community's code snippets and add them to your own treasure trove{" "}
                <Link href={"/explore"} className="text-blue-500 underline">
                  HERE
                </Link>
                <br />
                <span className="text-sm">
                  <span className="font-bold">Note:</span> Check out your personal stats in the{" "}
                  <Link href={"/profile"} className="text-blue-500 underline">
                    profile page!
                  </Link>
                </span>
                <Image
                  src={
                    "https://res.cloudinary.com/dq9umvpmv/image/upload/f_auto,q_auto/v1/CodeSnippets/CommentsModal"
                  }
                  alt="Comments Modal"
                  height={500}
                  width={500}
                  className="m-auto mt-6 border-2 border-primary rounded-lg"
                ></Image>
              </p>
            </div>
          </div>
        </section>
        <br />

        <h2 className="text-xl font-bold underline">FAQ:</h2>
        <br />
        <section className="flex flex-col gap-2">
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Can I Delete My Account?</div>
            <div className="collapse-content">
              <p>
                Yes, you can delete your account under settings in your{" "}
                <Link href={"/profile"} className="text-blue-500 underline">
                  profile page
                </Link>
                <br />
                <span className="text-sm">
                  <span className="font-bold">Note:</span> All of your code snippets, whether public
                  or private, will also be deleted.
                </span>
              </p>
            </div>
          </div>
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              What Was Used To Build This Website?
            </div>
            <div className="collapse-content">
              <p>
                This site was built using React-NextJS, styled with Tailwind-DaisyUI, and managed
                with a PostgreSQL database.
              </p>
            </div>
          </div>
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Is this an Open Sourced Project?
            </div>
            <div className="collapse-content">
              <p>
                Yes! You can find the Github link{" "}
                <Link href={"/#"} className="text-blue-500 underline">
                  HERE
                </Link>
              </p>
            </div>
          </div>
          <div className="collapse bg-base-200/50 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              How Do I Report Bugs or Contribute to this Project?
            </div>
            <div className="collapse-content">
              <p>
                Bugs, suggestions, and contributions of any kind are welcomed. You can create a
                Github issue{" "}
                <Link href={"/#"} className="text-blue-500 underline">
                  HERE
                </Link>
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
