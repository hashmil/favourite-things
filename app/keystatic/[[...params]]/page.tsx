import React from 'react';
import { notFound } from 'next/navigation';
import KeystaticApp from '@/components/keystatic-app';

export default function KeystaticPage() {
  if (process.env.NODE_ENV !== 'development') return notFound();
  return <KeystaticApp />;
}

// Satisfy Next static export requirement for catch-all route during build
// Include all Keystatic paths that might be accessed
export function generateStaticParams() { 
  return [
    { params: [] }, // /keystatic
    { params: ['collection'] }, // /keystatic/collection
    { params: ['collection', 'items'] }, // /keystatic/collection/items
    { params: ['collection', 'items', 'create'] }, // /keystatic/collection/items/create
  ]; 
}
