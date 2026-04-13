import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      id="search"
      name="search"
      className={css.input}
      type="text"
      defaultValue={value}
      onChange={onChange}
      placeholder="Search notes"
    />
  );
}
