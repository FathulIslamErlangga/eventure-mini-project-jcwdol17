"use client";
import Image from "next/image";
import "@/css/profilePage/profileHeader.css";
import { useAuth } from "@/components/contexts/AuthContexts";
import { IUpdatedProfile } from "@/utils/interfaces/customInsterface";
import { useRef, useState } from "react";

export function ProfileHeader() {
  const { profilesUser, auth } = useAuth();
  const { message, profile } = profilesUser;
  const [isUpdated, setUpdated] = useState<boolean>(false);
  const [slug, setSlug] = useState("");
  const [formUpdated, setFormUpdated] = useState<IUpdatedProfile>({
    name: auth.user?.data.profile?.name || "",
    address: auth.user?.data.profile?.address?.address || "",
    city: auth.user?.data.profile?.address?.city || "",
    phone: auth.user?.data.profile?.phone || "",
    imageProfile: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    const file = e.target.files;
    if (file && files) {
      const imageUrl = URL.createObjectURL(files);
      setFormUpdated({ ...formUpdated, imageProfile: imageUrl });
    }
  };
  const handleChangeUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormUpdated({ ...formUpdated, [e.target.name]: value });
  };
  const handleUpdated = () => {
    setUpdated(true);
  };
  const handleUpdatedProfile = async (e: React.FormEvent) => {
    setUpdated(false);
    e.preventDefault();
    setSlug(auth.user?.data.slug as string);
    await profile(formUpdated, slug);
    console.log("slug", auth.user?.data.slug);
  };
  return (
    <div className="profile-header">
      <div className="profile-biodata-title">
        <span>Profile</span>
      </div>
      <div className="w-full h-fit flex flex-col md:flex-col lg:flex-row gap-6">
        <div className="profile-header-pic">
          <div className="profile-header-user-pic">
            <Image
              src="/assets/images/icons/userProfile.png"
              alt="user-profile"
              width={100}
              height={100}
            />
            <div className="profile-header-user-edit">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                name="imageProfile"
                className="hidden"
                onChange={handleFileChange}
              />
              <button type="button" onClick={handleButtonClick}>
                <Image
                  src="/assets/images/icons/edit.svg"
                  alt="edit"
                  width={15}
                  height={15}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="profile-header-biodata">
          <div className="profile-biodata-content">
            <label className="input input-bordered border-[#04002D] border-[2.5px] flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Name"
                name="name"
                value={formUpdated.name}
                onChange={handleChangeUpdated}
                disabled={!isUpdated}
              />
            </label>
            <label className="border-[#04002D] border-[2.5px] input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={auth.user?.data.email}
                disabled
              />
            </label>
            <label className="border-[#04002D] border-[2.5px] input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#626973"
                  d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                />
              </svg>
              <input
                type="number"
                className="grow"
                placeholder="Phone"
                name="phone"
                value={formUpdated.phone}
                onChange={handleChangeUpdated}
                disabled={!isUpdated}
              />
            </label>
            <label className="border-[#04002D] border-[2.5px] input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="17.5"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#626973"
                  d="M480 48c0-26.5-21.5-48-48-48L336 0c-26.5 0-48 21.5-48 48l0 48-64 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144l0 96L0 464c0 26.5 21.5 48 48 48l256 0 32 0 96 0 160 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48l-112 0 0-144zm96 320l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 416l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM560 256c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 176l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM112 320l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zm304-48l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16z"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="City"
                name="city"
                value={formUpdated.city}
                onChange={handleChangeUpdated}
                disabled={!isUpdated}
              />
            </label>
            <label className="border-[#04002D] border-[2.5px] input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#626973"
                  d="M384 48c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16L80 64c0-8.8 7.2-16 16-16l288 0zM96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80l-64 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Address"
                name="address"
                value={formUpdated.address}
                onChange={handleChangeUpdated}
                disabled={!isUpdated}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="profile-header-btn">
        <button className="e-btn bg-warning text-[#04002D]">
          Change Password
        </button>
        {isUpdated ? (
          <button
            className="e-btn bg-primary text-neutral"
            onClick={handleUpdatedProfile}
          >
            Save
          </button>
        ) : (
          <button
            className="e-btn bg-primary text-neutral"
            onClick={handleUpdated}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}
