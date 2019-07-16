// UI/ui/routes/TestForm/index.tsx
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useTitle } from 'ui/Components/HeadProvider';
import { BoxStyle, FieldStyle } from 'ui/lib/styles';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import useForm from 'react-hook-form';
import './TestForm.css';

type TestFormRouteType = FunctionComponent<RouteComponentProps>;

interface FormData {
  username: string;
  password: string;
}

const TestFormRoute: TestFormRouteType = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  useTitle('Example Login Form Page');

  const onSubmit = (data: FormData) => {
    console.log(`Username: ${data.username}\nPassword: ${data.password}`);
  };

  return (
    <form style={BoxStyle} onSubmit={handleSubmit(onSubmit)}>
      <Typography use='headline4'>Example Login Form</Typography>

      <TextField style={FieldStyle} label='Username' name='username' autoComplete='username' outlined inputRef={register} />

      <TextField
        style={FieldStyle}
        label='Password'
        type='password'
        name='password'
        autoComplete='current-password'
        outlined
        inputRef={register}
      />

      <Button style={FieldStyle} label='Login' raised type='submit' />
    </form>
  );
};

export default TestFormRoute;
