'use client';
import ErrorMessage from '@/components/moviestmdb/ErrorMessage';
import React from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const error = ({ error, reset }: Props) => {
  return <ErrorMessage message={error.message} reset={reset} />;
};

export default error;
