'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";
import { useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Chat({ closeToggle }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  // Ref para o contêiner de mensagens
  const messagesEndRef = useRef(null);

  // Rola automaticamente para o final sempre que as mensagens mudarem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("Mensagens no estado inicial:", messages);

  return (
    <Card className="2xl:w-[440px] md:w-[340px] shadow-md">
      <CardHeader className="shadow-md mb-2 grid grid-cols-2 items-center">
        <CardTitle>Chat AI</CardTitle>
        <div className="flex justify-end">
          <a
            href="#"
            className="bg-transparent hover:text-slate-300 text-slate-600"
            onClick={closeToggle}
            variant="default"
          >
            <X />
          </a>
        </div>
        {/* <CardDescription>
          Using Versel SDK to create a chat bot.
        </CardDescription> */}
      </CardHeader>

      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px]  2xl:h-[600px] w-[250px] md:w-full pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 text-slate-600 mb-4 ${message.role === "user"
                ? "flex-row-reverse text-right"
                : "justify-start"
                }`}
            >
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>SM</AvatarFallback>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              )}

              {message.role === "assistant" && (
                <Avatar className="flex-row-reverse">
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="images/droid.jpg" />
                </Avatar>
              )}

              <ReactMarkdown
                className="leading-relaxed"
                components={{
                  p: ({ children }) => (
                    <span className="block font-bold text-slate-700">
                      {children}
                    </span>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            className=""
            placeholder="Como eu posso te ajudar?"
            onChange={handleInputChange}
            value={input}
          />
          <Button type="submit">
            <Send size={28} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
