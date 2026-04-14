import { User } from "@/types/user";
import nextServer from "./api";
import { Note, NoteTag } from "@/types/note";

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(
  query: string,
  tag: string,
  page: number,
): Promise<NoteHttpResponse> {
  const response = await nextServer.get<NoteHttpResponse>("/notes", {
    params: {
      search: query,
      tag: tag || undefined,
      page,
      perPage: 12,
    },
  });

  return response.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export interface CreateNotePost {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNotePost): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", {
    title,
    content,
    tag,
  });

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export async function register(data: RegisterRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: RegisterRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<User> {
  const response = await nextServer.get<User>("/auth/session");
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}

export interface UpdateMePayload {
  username?: string;
  avatar?: string;
}

export async function updateMe(data: UpdateMePayload): Promise<User> {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
}
