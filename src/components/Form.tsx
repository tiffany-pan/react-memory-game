import { useEffect, useRef } from 'react';
import RegularButton from './RegularButton';
import Select from './Select';

interface FormProps {
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isFirstRender?: boolean;
}

export default function Form({ handleSubmit, handleChange, isFirstRender }: FormProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstRender) {
      divRef.current?.focus();
    }}, [isFirstRender]);

  return (
    <form className="wrapper">
      <Select handleChange={handleChange} />
      <RegularButton handleClick={handleSubmit}>
        Start Game
      </RegularButton>
    </form>
  );
}