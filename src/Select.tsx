import { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css';

export type SelectOption = {
  label: string;
  value: string | number;
};

type MutlipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MutlipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, sethighlightedIndex] = useState<number>(0);

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };
  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    if (!isOpen) sethighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.target !== selectContainerRef.current) return;

      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
        case 'ArrowUp': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length)
            sethighlightedIndex(newValue);
          break;
        }
      }
    };
    selectContainerRef.current?.addEventListener('keydown', keyDownHandler);
    return () => {
      selectContainerRef.current?.removeEventListener(
        'keydown',
        keyDownHandler
      );
    };
  }, [isOpen, highlightedIndex, options]);
  return (
    <div
      ref={selectContainerRef}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles['option-badge']}
              >
                {v.label} <span className={styles['remove-btn']}>&times;</span>{' '}
              </button>
            ))
          : value?.label}
      </span>
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
