import { useState } from 'react';
import { Select } from './Select';
const options = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: 5, label: 'Fifth' },
];
type SelectOption = {
  label: string;
  value: string;
};

function App() {
  const [value, setValue] = useState<SelectOption>(options[2] as SelectOption);
  return (
    <Select
      value={value}
      onChange={(o) => {
        setValue(o);
      }}
      options={options}
    />
  );
}

export default App;
