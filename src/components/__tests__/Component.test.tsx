import '@testing-library/jest-dom';
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  addInputValue,
  expectFnToHaveBeenCalledWith,
  expectText,
  s,
  sa,
  submit,
} from '../../__mocks__/utils';
import { CBasicForm } from '../__mocks__/CBasicForm';
import { CFormWithDefaultValue } from '../__mocks__/CFormWithDefaultValue';
import { CRadioForm } from '../__mocks__/CRadioForm';
import { CCheckboxForm } from '../__mocks__/CCheckboxForm';
import { CFormMethods } from '../__mocks__/CFormMethods';
import { CValidateOnBlurForm } from '../__mocks__/CValidateOnBlurForm';
import { FormProvider } from '../../context';
import { DefaulValueChange } from '../__mocks__/DefaulValueChange';

describe('Components', () => {
  it('displays error messages', async () => {
    render(<CBasicForm />);

    submit('form');
    await expectText('This field is required');
  });

  it('calls on success correctly', async () => {
    const onSuccess = jest.fn();
    render(<CBasicForm onSuccess={onSuccess} />);

    await addInputValue('input', 'New value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'New value' });
  });

  it('displays default value correctly', async () => {
    const onSuccess = jest.fn();
    render(<CFormWithDefaultValue onSuccess={onSuccess} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'This is a default value' });

    await addInputValue('input', 'New value');
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'New value' });
  });

  it('works with radio inputs', async () => {
    const onSuccess = jest.fn();
    render(<CRadioForm onSuccess={onSuccess} />);

    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { radioName: 'Value 1' });

    fireEvent.click(sa('input')[1]);

    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { radioName: 'Value 2' });
  });

  it('works with checkbox inputs', async () => {
    const onSuccess = jest.fn();
    render(<CCheckboxForm onSuccess={onSuccess} />);

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
    render(
      <FormProvider>
        <CFormMethods onSuccess={onSuccess} errorChangeCb={errorChangeCb} />
      </FormProvider>,
    );

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
    render(
      <FormProvider>
        <CFormMethods getStateCb={getStateCb} />
      </FormProvider>,
    );

    fireEvent.click(screen.getByText('getState'));
    await expectFnToHaveBeenCalledWith(getStateCb, { name: undefined });

    await addInputValue('input', 'New value');
    fireEvent.click(screen.getByText('getState'));
    await expectFnToHaveBeenCalledWith(getStateCb, { name: 'New value' });
  });

  it('validates form on demand', async () => {
    const errorChangeCb = jest.fn();
    render(
      <FormProvider>
        <CFormMethods errorChangeCb={errorChangeCb} />
      </FormProvider>,
    );

    fireEvent.click(screen.getByText('validateForm'));
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');
  });

  it('sets input value', async () => {
    const valueSetCb = jest.fn();
    const onSuccess = jest.fn();
    render(
      <FormProvider>
        <CFormMethods valueSetCb={valueSetCb} onSuccess={onSuccess} />
      </FormProvider>,
    );

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
    render(
      <FormProvider>
        <CFormMethods errorChangeCb={errorChangeCb} />
      </FormProvider>,
    );

    submit('form');
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'This field is required');

    fireEvent.click(screen.getByText('setError'));
    await expectFnToHaveBeenCalledWith(errorChangeCb, 'new error');
  });

  it('gets input error', async () => {
    const getErrorCb = jest.fn();
    render(
      <FormProvider>
        <CFormMethods getErrorCb={getErrorCb} />
      </FormProvider>,
    );

    fireEvent.click(screen.getByText('getError'));
    await expectFnToHaveBeenCalledWith(getErrorCb, undefined);

    submit('form');
    fireEvent.click(screen.getByText('getError'));
    await expectFnToHaveBeenCalledWith(getErrorCb, 'This field is required');
  });

  it('validates input onBlur', async () => {
    render(
      <FormProvider validateOnBlur>
        <CValidateOnBlurForm />
      </FormProvider>,
    );

    fireEvent.blur(s('input'));
    await expectText('This field is required');
  });

  it('updates defaultValue when it changes', async () => {
    const onSuccess = jest.fn();
    render(
      <FormProvider>
        <DefaulValueChange onSuccess={onSuccess} />
      </FormProvider>,
    );

    fireEvent.click(screen.getByText('update'));
    submit('form');
    await expectFnToHaveBeenCalledWith(onSuccess, { name: 'value' });
  });
});
