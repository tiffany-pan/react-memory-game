import RegularButton from './RegularButton';

interface FormProps {
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Form({ handleSubmit }: FormProps) {
  return (
    <form className="wrapper">
      <RegularButton handleClick={handleSubmit}>
        Start Game
      </RegularButton>
    </form>
  )
}