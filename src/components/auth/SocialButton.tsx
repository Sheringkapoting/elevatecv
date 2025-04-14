
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, icon, onClick }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onClick} 
      className="flex items-center justify-center gap-2"
    >
      {icon}
      Continue with {provider}
    </Button>
  );
};

export default SocialButton;
