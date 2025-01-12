'use client'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "./ui/card";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Avatar, AvatarImage, AvatarFallback} from "./ui/avatar";
import { useChat } from "ai/react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat', 
});
console.log("Mensagens no estado inicial:", messages);
  return(
    
    <Card className='w-[400px] h-[700px] grid grid-rows-[min-content_1fr_min-content]'>
    <CardHeader>
      <CardTitle>
        Chat AI
      </CardTitle>
        <CardDescription>
          Using Versel SDK to create a chat bot.
        </CardDescription>
    </CardHeader>
    <CardContent className='space-y-4'>
    {messages.map((message) => (
        <div key={message.id} className="flex gap-3 text-slate-600 text-sm">
         
          {message.role === 'user' && (
              <Avatar>
              <AvatarFallback>SM</AvatarFallback>
              <AvatarImage />
              </Avatar>
          )}
          {message.role === 'assistant' && (
              <Avatar>
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage />
              </Avatar>
          )}
          <p className="leading-relaxed">
            <span className="block font-bold text-slate-700">{message.role === 'user' ? 'Humano' : 'Droid'}</span>
           {message.content}
          </p>
        </div>
      ))}
    </CardContent>
    <CardFooter >
      <form className='w-full flex gap-2' onSubmit={handleSubmit}>
        <Input type="text" className='' placeholder='Como eu posso te ajudar?' onChange={handleInputChange} value={input} />
        <Button type="submit">Enviar</Button>
      </form>
    </CardFooter>
  </Card>
  )
}