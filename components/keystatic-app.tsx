"use client";
import React from 'react';
import { makePage } from '@keystatic/next/ui/app';
import keystaticConfig from '@/keystatic.config';

const KeystaticAppInner = makePage(keystaticConfig);

export default function KeystaticApp() {
  // Render the client-only Keystatic UI
  return <KeystaticAppInner />;
}

