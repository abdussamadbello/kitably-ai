"use client";

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-6">Sign Out</h1>
      <Button
        className="bg-red-500 text-white px-6 py-2 rounded-lg"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </div>
  );
}