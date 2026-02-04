"use server";

export interface UserModel {
  username: string;
  displayName: string,
  email: string;
  profilePictureUrl: string;
  _id: string;
}

export interface UnsecureUserModel extends UserModel {
  emailVerified: boolean;
  passwordHash: string;
}

export async function RetrieveUserByIdFromBackend({
  id,
}: {
  id: string,
}) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/exact?id=${id}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to find article with id ${id}. ${res.statusText}`);
  }

  return res.json();
}