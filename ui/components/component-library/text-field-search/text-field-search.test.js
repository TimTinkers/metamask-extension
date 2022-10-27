/* eslint-disable jest/require-top-level-describe */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { TextFieldSearch } from './text-field-search';

describe('TextFieldSearch', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<TextFieldSearch />);
    expect(getByRole('textbox')).toBeDefined();
  });
  it('should render and be able to input text', () => {
    const { getByTestId } = render(
      <TextFieldSearch
        inputProps={{ 'data-testid': 'text-field-search-input' }}
      />,
    );
    const TextFieldSearchInput = getByTestId('text-field-search-input');

    expect(TextFieldSearchInput.value).toBe(''); // initial value is empty string
    fireEvent.change(TextFieldSearchInput, { target: { value: 'text value' } });
    expect(TextFieldSearchInput.value).toBe('text value');
    fireEvent.change(TextFieldSearchInput, { target: { value: '' } }); // reset value
    expect(TextFieldSearchInput.value).toBe(''); // value is empty string after reset
  });
  it('should render showClear button', () => {
    const { getByRole, getByTestId } = render(
      <TextFieldSearch
        clearButtonProps={{ 'data-testid': 'clear-button' }}
        clearIconProps={{ 'data-testid': 'clear-button-icon' }}
      />,
    );
    const TextFieldSearchInput = getByRole('textbox');
    expect(TextFieldSearchInput.value).toBe(''); // initial value is empty string
    fireEvent.change(TextFieldSearchInput, { target: { value: 'text value' } });
    expect(TextFieldSearchInput.value).toBe('text value');
    expect(getByTestId('clear-button')).toBeDefined();
    expect(getByTestId('clear-button-icon')).toBeDefined();
  });
  it('should render with the search icon', () => {
    const { getByTestId } = render(
      <TextFieldSearch searchIconProps={{ 'data-testid': 'search-icon' }} />,
    );
    expect(getByTestId('search-icon')).toBeDefined();
  });
});
