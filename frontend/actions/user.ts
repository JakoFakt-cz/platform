'use server';

export interface UserModel {
  username: string;
  displayName: string;
  profilePictureUrl: string;
}

export async function RetrieveUserByIdFromBackend({ id }: { id: string }) {
  const res = await fetch(`${process.env.BACKEND_URL}/users/id?id=${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error(`Failed to find user with id ${id}. ${res.statusText}`);
  }

  return res.json();
}
