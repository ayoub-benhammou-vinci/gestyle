import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RowRadioButtonsGroupProps {
  name: string;
  option1: string;
  option2: string;
  option3: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function RowRadioButtonsGroup({
  name,
  option1,
  option2,
  option3,
  value,
  onChange,
}: RowRadioButtonsGroupProps) {
  return (
    <FormControl>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{ color: '#9c684e' }}
      >
        {name}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel value={option1} control={<Radio />} label={option1} />
        <FormControlLabel value={option2} control={<Radio />} label={option2} />
        <FormControlLabel value={option3} control={<Radio />} label={option3} />
      </RadioGroup>
    </FormControl>
  );
}
