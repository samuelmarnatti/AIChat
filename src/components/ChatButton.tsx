'use client'
import {Button} from "./ui/button";
import { Chat } from "@/components/Chat";
import {  useState  } from "react";
import { MessageCircleMore} from "lucide-react";

export function ChatButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
         {!isToggled && (
           
           <Button
             onClick={handleToggle}
             variant={isToggled ? "default" : "outline"} // Alterna estilos
             className={`w-14 h-14 rounded-full shadow-lg ${isToggled ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
           >
<MessageCircleMore size={40} />
    </Button>
        )}
      {isToggled && (
       <Chat/>
      )}
    </div>
  );
}