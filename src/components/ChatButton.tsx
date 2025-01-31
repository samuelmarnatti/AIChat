'use client'
import {Button} from "./ui/button";
import { Chat } from "@/components/Chat";
import {  useState  } from "react";
import { MessageCircleMore,Send} from "lucide-react";
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export function ChatButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className=''>
         {!isToggled && (
           
           <div
             onClick={handleToggle}
             variant={isToggled ? "default" : "outline"} // Alterna estilos
             className={`fixed w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 cursor-pointer`}
           >
<MessageCircleMore className='text-white weight-300 relative top-2 left-2' size={40} />
      
    </div>
        )}
      {isToggled && (
       <motion.div className='absolute bottom-[82%] right-4'
       initial={{ opacity: 0, y: 50 }} // Início fora da tela abaixo
       animate={{ opacity: 1, y: 0 }} // Animação para posição original
       exit={{ opacity: 0, y: 50 }} // Animação ao sair
       transition={{ duration: 0.5 }} // Duração da animação
     >
       <Chat closeToggle={() => setIsToggled(false)}/>
       </motion.div>
      )}
    </div>
  );
}