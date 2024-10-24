import { NextRequest } from "next/server";

import { mongoDbClient } from "@/config/db";

export async function GET({ nextUrl: { searchParams } }: NextRequest) {
  const params = {
    username: searchParams.get("username"),
    email: searchParams.get("email"),
  };

  if (!params.username && !params.email) {
    return new Response("Either 'username' or 'email' must be provided", {
      status: 400,
    });
  }

  try {
    await mongoDbClient.connect();
    const usersCollection = mongoDbClient.db("repommender").collection("users");

    const query = params.username
      ? { username: params.username }
      : { email: params.email };
    const user = await usersCollection.findOne(query);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Remove password from user object before returning it:
    delete user.password;

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(`Internal error: ${error}`, { status: 500 });
  } finally {
    await mongoDbClient.close();
  }
}

export async function POST(request: NextRequest) {
  const params = await request.json();

  if (!params.username || !params.email || !params.password) {
    return new Response(
      "Parameters 'username', 'email' and 'password' must be provided",
      {
        status: 400,
      }
    );
  }

  try {
    await mongoDbClient.connect();
    const usersCollection = mongoDbClient.db("repommender").collection("users");

    // Check if user already exists:
    const user = await usersCollection.findOne({
      $or: [{ username: params.username }, { email: params.email }],
    });

    if (user) {
      return new Response("User already exists", { status: 400 });
    }

    const newUser = {
      username: params.username,
      email: params.email,
      password: params.password,
    };

    await usersCollection.insertOne(newUser);

    return new Response("User created successfully", { status: 201 });
  } catch (error) {
    return new Response(`Internal error: ${error}`, { status: 500 });
  } finally {
    await mongoDbClient.close();
  }
}
