import { useState } from 'react';

import { Select } from './Select';
import { SelectOption } from './Select';

const options = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: 5, label: 'Fifth' },
];

function App() {
  const [multivalue, setMultiValue] = useState<SelectOption[]>([options[1]]);
  const [value, setValue] = useState<SelectOption | undefined>(options[2]);

  return (
    <>
      <Select
        multiple
        value={multivalue}
        onChange={(o) => {
          setMultiValue(o);
        }}
        options={options}
      />

      <Select
        value={value}
        onChange={(o) => {
          setValue(o);
        }}
        options={options}
      />
    </>
  );
}

export default App;
