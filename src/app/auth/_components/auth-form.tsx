'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa"

export default function AuthForm() {
  const form = useForm()
  const handleSubmit = form.handleSubmit(async() => {
    console.log('submit')
    
  })
  return (
    <form onSubmit={handleSubmit}>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex-col items-center space-y-1.5 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Realize o Login</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Insira seu email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Insira sua senha" required />
              </div>
            </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        
        </CardFooter>  
        
        <CardFooter>
        <Separator className=""/>
        </CardFooter>
        <CardFooter>
        <Button className="w-auto" onClick={() => signIn('google',{callbackUrl: '/'})}><FaGoogle /></Button>  
        </CardFooter>
        
      </Card>
    </div>
    </form>

  )
}

