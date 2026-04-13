import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import NoteDetailsClient from "./Notes.client";
import { fetchNotesServer } from "@/lib/api/serverApi";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  return {
    title: tag ? `Notes: ${tag}` : "All Notes",
    description: tag ? `Notes filtered by tag: ${tag}` : "All notes",
    openGraph: {
      title: tag ? `Notes: ${tag}` : "All Notes",
      description: tag ? `Notes filtered by tag: ${tag}` : "All notes",
      url: `https://09-auth-seven-nu.vercel.app/notes/filter/${slug[0]}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag ? `Notes: ${tag}` : "All notes",
        },
      ],
    },
  };
}

const Notes = async ({ params }: NotesProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const searchWord = "";
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["myNoteHubKey", searchWord, page, tag],
    queryFn: () => fetchNotesServer(searchWord, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Notes;
