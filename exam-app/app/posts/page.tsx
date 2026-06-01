"use client";

import { useQuery } from "@tanstack/react-query";

export async function fetchQuery() {
  const res = await fetch("/api/posts");
  return res.json();
}

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function PostPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchQuery,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {data?.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
