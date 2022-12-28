import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut } from "next-auth/react";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { Button, Card, ResponsiveAppBar } from "@acme/ui";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return <Card title={post.title} body={post.content} />;
};

const Home: NextPage = () => {
  const postQuery = trpc.post.all.useQuery();
  return (
    <>
      <Head>
        <title>Byte Reading</title>
        <meta name="description" content="Byte Learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[white] to-[#eeeeee] text-white">
        <ResponsiveAppBar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[#F1A637]">Byte Reading</span>
          </h1>
          <AuthShowcase />
          <div className="flex h-[60vh] justify-center overflow-y-scroll px-4 text-2xl">
            {postQuery.data ? (
              <div className="flex flex-col gap-4">
                {postQuery.data?.map((p) => {
                  return <PostCard key={p.id} post={p} />;
                })}
              </div>
            ) : (
              <p>Loading..</p>
            )}
          </div>
          <Button />
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: session } = trpc.auth.getSession.useQuery();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: !!session?.user },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session?.user && (
        <p className="text-center text-2xl text-white">
          {session && <span>Logged in as {session?.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={session ? () => signOut() : () => signIn()}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
