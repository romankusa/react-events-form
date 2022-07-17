import { cloneElement, FC, isValidElement, ReactElement, ReactNode, useMemo } from 'react';
import { RegisterPropsTypes } from '../../hooks/useForm/types';
import { useField } from '../../hooks/useField';

export const Field: FC<{ children: ReactNode; type?: RegisterPropsTypes }> = ({
  children,
  type,
}) => {
  const child = children as ReactElement;
  const fieldProps = useField({
    childProps: child.props,
    type,
  });
  const { value, ...finalFieldProps } = fieldProps;

  const actualValue = type
    ? { defaultChecked: fieldProps.value }
    : { defaultValue: fieldProps.value };
  const { errors, ...childProps } = child.props;

  return useMemo(
    () =>
      isValidElement(child)
        ? cloneElement(child, {
            ...childProps,
            ...actualValue,
            ...finalFieldProps,
          })
        : child,
    [fieldProps, child],
  );
};
