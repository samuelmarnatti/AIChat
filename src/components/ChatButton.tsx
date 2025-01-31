'use client'
import {Button} from "./ui/button";
import { Chat } from "@/components/Chat";
import {  useState  } from "react";
import { MessageCircleMore} from "lucide-react";
import { motion } from 'framer-motion';

export function ChatButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className=''>
         {!isToggled && (
           
           <Button
             onClick={handleToggle}
             variant={isToggled ? "default" : "outline"} // Alterna estilos
             className={`fixed w-14 h-14 rounded-full shadow-lg ${isToggled ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
           >
<MessageCircleMore size={40} />

    </Button>
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