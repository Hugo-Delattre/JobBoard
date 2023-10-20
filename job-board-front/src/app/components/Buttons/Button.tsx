import React from 'react'
import Link from 'next/link';

// import { ButtonProps } from '@chakra-ui/react';

interface ButtonProps {
  text: string;
  url: string;
}

const Button = ({ text, url }: ButtonProps) => {
  return (
    <Link
      href={url}
      className="text-white bg-gradient-to-br from-green-400 to-blue-600 leading-3 hover:bg-gradient-to-bl transition-all focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {text}
    </Link>
  );
}

export default Button