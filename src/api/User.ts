import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function registerUser(
  username: string,
  email: string,
  password: string
): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function login(
  username: string,
  email: string,
  password: string
): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function fetchMe(): Promise<User> {
  return fetch("/api/users/me")
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}
