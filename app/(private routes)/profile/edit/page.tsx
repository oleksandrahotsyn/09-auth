"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
// import { updateMe, getMe, uploadImage } from "@/lib/api/clientApi";
const [imageFile, setImageFile] = useState<File | null>(null);
const EditProfilePage = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? "");
      setEmail(user.email ?? "");
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (userName.trim().length === 0) {
  //     toast.error("Please write your username");
  //     return;
  //   }
  //   if (userName.trim().length > 20) {
  //     toast.error("Username cannot exceed 20 characters");
  //     return;
  //   }
  //   const res = await updateUserProfile({ username: userName });
  //   if (res) {
  //     setUser(res);
  //     router.push("/profile");
  //     toast.success("Successfully edit");
  //   }
  // };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : "";
      await updateMe({ userName, photoUrl: newPhotoUrl });
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <AvatarPicker />
        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              className={css.input}
              onChange={handleChange}
            />
          </div>

          <p>Email:{email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={router.back}
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
