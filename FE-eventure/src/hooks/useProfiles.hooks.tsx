import { useAuth } from "@/components/contexts/AuthContexts";
import {
  IUpdatedPassword,
  IUpdatedProfile,
} from "@/utils/interfaces/customInsterface";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export const useProfiles = () => {
  const { profilesUser, auth } = useAuth();
  const { message, profile, changePassword } = profilesUser;
  const [isUpdated, setUpdated] = useState<boolean>(false);
  const [isOpen, setModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formUpdated, setFormUpdated] = useState<IUpdatedProfile>({
    name: "",
    address: "",
    city: "",
    phone: "",
    imageProfile: "",
  });
  const [passwordChange, setChange] = useState<IUpdatedPassword>({
    oldPassword: "",
    newPassword: "",
  });
  const { slug } = useParams();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (auth.user?.data?.profile) {
      setFormUpdated({
        name: auth.user.data.profile.name ?? "",
        address: auth.user.data.profile.address?.address ?? "",
        city: auth.user.data.profile.address?.city ?? "",
        phone: auth.user.data.profile.phone ?? "",
        imageProfile: "",
      });
    }
  }, [auth.user]);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  // upload preview image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      const imageUrl = URL.createObjectURL(files);

      setFormUpdated({
        ...formUpdated,
        imageProfile: imageUrl,
      });
    }
  };
  const handleChangeUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormUpdated({ ...formUpdated, [e.target.name]: value });
    setChange({ ...passwordChange, [e.target.name]: value });
  };
  // disable form  or active for update field
  const handleUpdated = () => {
    setUpdated(true);
  };

  // update profile
  const handleUpdatedProfile = async (e: React.FormEvent) => {
    setUpdated(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formUpdated.name);
    formData.append("address", formUpdated.address);
    formData.append("city", formUpdated.city);
    formData.append("phone", formUpdated.phone);
    if (fileInputRef.current?.files?.[0]) {
      formData.append("imageProfile", fileInputRef.current.files[0]);
    }

    await profile(formData, slug as string);
  };

  // handle change password
  const handleModal = () => {
    setModal((prev) => !prev);
  };
  const change = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword(passwordChange, slug as string);
    console.log("Change Password", passwordChange);
  };

  // show and hide password

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return {
    auth,
    isUpdated,
    formUpdated,
    message,
    fileInputRef,
    isOpen,
    passwordChange,
    showPassword,
    togglePasswordVisibility,
    handleFileChange,
    handleButtonClick,
    handleChangeUpdated,
    handleUpdated,
    handleUpdatedProfile,
    change,
    handleModal,
  };
};
