import { prisma } from '@/services/database';
import { compareSync } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password} = await req.json();
    const user = await prisma.user.findFirst({where: {email: email}})
    if(!user){
        return NextResponse.json(user, { status: 400 });
    }
        if(user.password && !compareSync(password, user.password)){
            return NextResponse.json("Usuario ou senha incorretos", { status: 401 });
        }
        else{
            return NextResponse.json(user, { status: 200 });
        }
    }
   catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Erro ao entrar" }, { status: 500 });
  }
}