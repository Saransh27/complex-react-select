import { useEffect, useState } from 'react';
import styles from './Select.module.css';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, sethighlightedIndex] = useState<number>(0);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (option !== value) onChange(option);
  };
  const isOptionSelected = (option: SelectOption) => {
    return option === value;
  };

  useEffect(() => {
    if (!isOpen) sethighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles['clear-btn']}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            key={option.label}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ''
            } ${highlightedIndex === index ? styles.highlighted : ''}`}
            onMouseEnter={(e) => {
              e.stopPropagation();
              sethighlightedIndex(index);
            }}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
