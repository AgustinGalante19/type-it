'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from './button';

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({
  textToCopy = 'Texto copiado',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={handleCopy}
      className='relative'
    >
      <AnimatePresence mode='wait' initial={false}>
        {copied ? (
          <motion.div
            key='check'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <Check className='text-green-500' />
          </motion.div>
        ) : (
          <motion.div
            key='copy'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <Copy className='text-primary' />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
