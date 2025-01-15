'use client'
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "./ui/card";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Avatar, AvatarImage, AvatarFallback} from "./ui/avatar";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area"
import { useRef, useEffect,  } from "react";
import {X} from "lucide-react";


export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat', 
});
 // Ref para o contêiner de mensagens
 const messagesEndRef = useRef(null);

 // Rola automaticamente para o final sempre que as mensagens mudarem
 useEffect(() => {
   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 }, [messages]);
console.log("Mensagens no estado inicial:", messages);
  return(
    <Card className='w-[440px] shadow-md'>
    <CardHeader className='shadow-md mb-2'>
      <CardTitle>
        Chat AI
      </CardTitle>
      <div>
        <Button className='bg-transparent text-slate-600'>
          <X size={60} />
        </Button>
      </div>
        <CardDescription>
          Using Versel SDK to create a chat bot.
        </CardDescription>
    </CardHeader>
    <CardContent className='space-y-4'>
      <ScrollArea className="h-[600px] w-full pr-4">
      {messages.map((message) => (
          <div key={message.id}   className={`flex gap-3 text-slate-600 mb-4  ${message.role === 'user' ? 'flex-row-reverse text-right' : 'justify-start'}`}>
          
            {message.role === 'user' && (
                <Avatar >
                <AvatarFallback>SM</AvatarFallback>
                <AvatarImage src='https://github.com/shadcn.png' />
                </Avatar>
            )}
            {message.role === 'assistant' && (
                <Avatar className='flex-row-reverse' >
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src='images/droid.jpg' />
                </Avatar>
            )}
            <p className="leading-relaxed ">
              <span className="block font-bold text-slate-700">{message.role === 'user' ? 'Humano' : 'Droid'}</span>
            {message.content}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
        </ScrollArea>
    </CardContent>
    <CardFooter >
      <form className='w-full flex gap-2' onSubmit={handleSubmit}>
        <Input type="text" className='' placeholder='Como eu posso te ajudar?' onChange={handleInputChange} value={input} />
        <Button type="submit"><svg className="h-16 w-16 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="22" y1="2" x2="11" y2="13" />  <polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></Button>
      </form>
    </CardFooter>
  </Card>
  )
}