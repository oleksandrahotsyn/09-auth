"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import css from "./EditProfilePage.module.css";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { getMe, updateMe, uploadImage } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfilePage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(
    "https://ac.goit.global/fullstack/react/default-avatar.jpg",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const user = await getMe();
        setUserName(user.username ?? "");
        setEmail(user.email ?? "");
        setAvatar(
          user.avatar ??
            "https://ac.goit.global/fullstack/react/default-avatar.jpg",
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      }
    };

    void fetchUser();
  }, []);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUserName(event.target.value);
  };

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  const handleSaveUser = async (formData: FormData): Promise<void> => {
    try {
      const username = String(formData.get("username") ?? "").trim();

      if (username.length === 0) {
        toast.error("Please write your username");
        return;
      }

      if (username.length > 20) {
        toast.error("Username cannot exceed 20 characters");
        return;
      }

      let avatarUrl: string | undefined;

      if (imageFile) {
        avatarUrl = await uploadImage(imageFile);
      }

      const updatedUser = await updateMe({
        username,
        avatar: avatarUrl,
      });

      setUser(updatedUser);
      toast.success("Successfully edited profile");
      router.push("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Oops... some error");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <AvatarPicker onChange={handleAvatarChange} />

        <form className={css.profileInfo} action={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userName}
              className={css.input}
              onChange={handleNameChange}
            />
          </div>

          <div className={css.usernameWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              className={css.input}
              readOnly
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <Toaster />
    </main>
  );
};

export default EditProfilePage;
