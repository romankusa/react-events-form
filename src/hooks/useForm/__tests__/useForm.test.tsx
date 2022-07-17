import '@testing-library/jest-dom';
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  addInputValue,
  submit,
  expectText,
  expectFnToHaveBeenCalledWith,
  sa,
  s,
} from '../../../__mocks__/utils';
import { BasicForm } from '../__mocks__/BasicForm';
import { FormWithDefaultValue } from '../__mocks__/FormWithDefaultValue';
import { RadioForm } from '../__mocks__/RadioForm';
import { CheckboxForm } from '../__mocks__/CheckboxForm';
import { FormMethods } from '../__mocks__/FormMethods';
import { ValidateOnBlurForm } from '../__mocks__/ValidateOnBlurForm';

describe('useForm hook', () => {
  it('displays error messages', async () => {
    render(<BasicForm />);

    submit('form');
    await expectText('This field is required');
  });

  it('calls on success correctly', async () => {
    const onSuccess = jest.fn();
    render(<BasicForm onSuccess={onSuccess} />);

    await addInputValue('input', 'New value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'New value' });
  });

  it('displays default value correctly', async () => {
    const onSuccess = jest.fn();
    render(<FormWithDefaultValue onSuccess={onSuccess} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'This is a default value' });

    await addInputValue('input', 'New value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'New value' });
  });

  it('works with radio inputs', async () => {
    const onSuccess = jest.fn();
    render(<RadioForm onSuccess={onSuccess} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { radioName: 'Value 1' });

    fireEvent.click(sa('input')[1]);
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { radioName: 'Value 2' });
  });

  it('works with checkbox inputs', async () => {
    const onSuccess = jest.fn();
    render(<CheckboxForm onSuccess={onSuccess} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { checkboxName: undefined });

    fireEvent.click(s('input'));
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { checkboxName: true });

    fireEvent.click(s('input'));
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { checkboxName: false });
  });

  it('resets the form', async () => {
    const onSuccess = jest.fn();
    const errorChangeCb = jest.fn();
    render(<FormMethods onSuccess={onSuccess} errorChangeCb={errorChangeCb} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');

    fireEvent.click(screen.getByText('resetForm'));
    await expectFnToHaveBeenCalledWith(errorChangeCb, undefined);
    submit('form');
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');

    await addInputValue('input', 'New value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'New value' });
    await expectFnToHaveBeenCalledWith(errorChangeCb, undefined);

    fireEvent.click(screen.getByText('resetForm'));
    submit('form');
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');
  });

  it('gets form state', async () => {
    const getStateCb = jest.fn();
    render(<FormMethods getStateCb={getStateCb} />);

    fireEvent.click(screen.getByText('getState'));
    await expectFnToHaveBeenCalledWith(getStateCb, { name: undefined });

    await addInputValue('input', 'New value');
    fireEvent.click(screen.getByText('getState'));
    await expectFnToHaveBeenCalledWith(getStateCb, { name: 'New value' });
  });

  it('validates form on demand', async () => {
    const errorChangeCb = jest.fn();
    render(<FormMethods errorChangeCb={errorChangeCb} />);

    fireEvent.click(screen.getByText('validateForm'));
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');
  });

  it('sets input value', async () => {
    const valueSetCb = jest.fn();
    const onSuccess = jest.fn();
    render(<FormMethods valueSetCb={valueSetCb} onSuccess={onSuccess} />);

    await addInputValue('input', 'Some value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'Some value' });

    fireEvent.click(screen.getByText('setValue'));
    await expectFnToHaveBeenCalledWith(valueSetCb, 'new value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'new value' });
  });

  it('sets input error', async () => {
    const errorChangeCb = jest.fn();
    render(<FormMethods errorChangeCb={errorChangeCb} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');

    fireEvent.click(screen.getByText('setError'));
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'new error');
  });

  it('gets input error', async () => {
    const getErrorCb = jest.fn();
    render(<FormMethods getErrorCb={getErrorCb} />);

    fireEvent.click(screen.getByText('getError'));
    await expectFnToHaveBeenCalledWith(getErrorCb, undefined);

    submit('form');
    fireEvent.click(screen.getByText('getError'));
    await expectFnToHaveBeenCalledWith(getErrorCb, 'This field is required');
  });

  it('validates input onBlur', async () => {
    render(<ValidateOnBlurForm />);

    fireEvent.blur(s('input'));
    await expectText('This field is required');
  });
});
