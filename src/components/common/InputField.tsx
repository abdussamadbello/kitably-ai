import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import React from 'react';

type InputFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  handleFetchBook: () => void;
};

const InputField: React.FC<InputFieldProps> = ({ value, onChange, isLoading, handleFetchBook }) => {
  return (
    <div className="flex gap-4">
      <Input type="text" placeholder="Enter Book ID" value={value} onChange={onChange} />
      <Button onClick={handleFetchBook} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Book'}
      </Button>
    </div>
  );
};

export default InputField;
