'use client';

import { Card, CardHeader, CardDescription } from './ui/card';
import Image from 'next/image';

// ERC721 Token Picture Section Custom Component
export default function ERC721TokenPictureSection(props: {
  name: string;
  url: string;
}) {
  const { name, url } = props;

  // Render ERC721 Token Picture Section Custom Component
  return (
    <>
      <Card
        style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        className="mb-10 mt-10 w-full border-gray-800 bg-gray-900 shadow-xl"
      >
        <CardHeader className="border-b border-gray-800 pb-6">
          <Image
            className="mx-auto"
            alt="ERC20_Token_Image.png"
            src={url}
            width={50}
            height={50}
          />
          <CardDescription className="mx-auto text-lg font-light text-gray-400">
            <i>{name}</i>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
