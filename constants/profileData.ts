// src/constants/profileData.ts

export type Profile = {
    name: string;
    bio: string;
    location: string;
    joinDate: string;
    followers: string;
    following: string;
    achievements: number;
    avatar: string;

    job: string;
    website: string;
    phone: string;
    email: string;
  };
  
  export const defaultProfile: Profile = {
    name: "John Doe",
    bio: "I love building mobile apps 💡 Passionate about creating amazing user experiences",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    followers: "1.2K",
    following: "342",
    achievements: 12,
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",

    job: "Mobile Developer",
  website: "https://johndoe.dev",
  phone: "+1 (555) 123-4567",
  email: "john.doe@example.com",
  };
  