'use server'

import { prisma } from '@/services/database'; // Certifique-se de ter o Prisma configurado corretamente
import { hashSync } from 'bcrypt';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const { name, email, password, docIdentifier, userType } = await req.json()
    const user = await prisma.user.findFirst({ where: { email: email } })
    if (user) {
      return NextResponse.json(
        { error: 'Usuário Ja Cadastrado' },
        { status: 400 }
      )
    }
    const senhaEncriptada = hashSync(password, 10)
    const addUser = await prisma.user.create({
      data: {
        name,
        email,
        password: senhaEncriptada,
        docIdentifier,
        userType

      }
    })
    return NextResponse.json(addUser, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Erro ao cadastrar empresa' },
      { status: 500 }
    )
  }
}
