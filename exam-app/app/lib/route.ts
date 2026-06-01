import {PrismaClient} from "@prisma/client";

const globalPrisma = global as any
let prisma: PrismaClient

if(globalPrisma){
    prisma = globalPrisma.prisma
}
else{
    prisma = new PrismaClient()
}


export async function listPosts(){
    const allPosts = await prisma.post.findMany()
    return allPosts
}

export async function createPost(title: string, content: string){
    const newPost = await prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    })
    return newPost
}

export async function deletePost(id: string){
    const deletedPost = await prisma.post.delete({
        where:{
            id: id,
        }
    })
    return deletedPost
}


