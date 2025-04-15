
import React from 'react';
import { Button } from '@/components/ui/button';

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, icon, onClick, disabled = false }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick} 
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 w-full",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      {icon}
      Continue with {provider}
      {disabled && <span className="text-xs ml-1">(Coming soon)</span>}
    </Button>
  );
};

// Import the cn utility
import { cn } from "@/lib/utils";

export default SocialButton;
