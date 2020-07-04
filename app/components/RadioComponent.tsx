import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  FormControlLabelProps
} from '@material-ui/core';
import styles from '@componentsTSStyles/radioComponentStyles';

interface IRadioComponentProps<T> {
  className?: string;
  initialValue: T;
  ariaLabel: string;
  groupName: string;
  radioProps: Omit<FormControlLabelProps, 'control'>[];
}

const useStyles = makeStyles(styles);

const RadioComponent = <T extends unknown>({
  // className,
  initialValue,
  ariaLabel,
  groupName,
  radioProps
}: IRadioComponentProps<T>) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as T);
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label={ariaLabel}
          name={groupName}
          value={value}
          onChange={handleChange}
        >
          {radioProps.map((radio) => (
            <FormControlLabel key={radio.id} control={<Radio />} {...radio} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioComponent;
