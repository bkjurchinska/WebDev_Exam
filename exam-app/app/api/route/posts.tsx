import { listPosts, createPost, deletePost } from "@/lib/route";

export async function GET() {
  const posts = await listPosts();
  return Response.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const post = await createPost(body.title, body.content);
  return Response.json(post, { status: 201 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  await deletePost(body.id); //use id to delete
  return Response.json({ successful: true });
}
