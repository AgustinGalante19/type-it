'use client';

import { useState } from 'react';
import CodeTransformer from './components/code-transformer';
import Header from './components/header';

export type TransformMode = 'initialState' | 'interface';

export default function Home() {
  const [transformMode, setTransformMode] =
    useState<TransformMode>('interface');

  const handleChangeMode = (newMode: TransformMode) =>
    setTransformMode(newMode);

  return (
    <div className='lg:container mx-auto max-sm:p-4 lg:my-8 space-y-4'>
      <Header onChangeOption={handleChangeMode} currentMode={transformMode} />
      <CodeTransformer transformMode={transformMode} />
    </div>
  );
}
