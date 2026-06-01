"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createPost(title: string, content: string) {
  const res = await fetch("api/posts", {
    method: "POST",
    headers: { "Content-Type": "/application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (res.ok) {
    return { status: "success" };
  }
}

export default function FormPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createPost(title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setContent("");
      setTitle("");
    },
  });

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <button onClick={() => mutation.mutate}>Create New Post</button>
    </div>
  );
}
