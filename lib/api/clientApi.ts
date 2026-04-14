import { User } from "@/types/user";
import nextServer from "./api";
import { Note, NoteTag } from "@/types/note";

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
): Promise<NoteHttpResponse> {
  const response = await nextServer.get<NoteHttpResponse>("/notes", {
    params: {
      search: query,
      page,
      tag: tag || undefined,
      perPage: 12,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const responseById = await nextServer.get<Note>(`/notes/${id}`);
  return responseById.data;
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
  const postResponse = await nextServer.post<Note>("/notes", {
    title,
    content,
    tag,
  });

  return postResponse.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteResponse = await nextServer.delete<Note>(`/notes/${id}`);
  return deleteResponse.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export async function register(data: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession(): Promise<boolean> {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export interface UpdateUserRequest {
  username: string;
}

export const updateUserProfile = async (
  payload: UpdateUserRequest,
): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
export interface UpdateUserPayload {
  username: string;
  avatar?: string;
}

export async function updateMe(payload: UpdateUserPayload): Promise<User> {
  const response = await nextServer.patch<User>("/users/me", payload);
  return response.data;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await nextServer.post<{ url: string }>(
    "/users/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.url;
}
