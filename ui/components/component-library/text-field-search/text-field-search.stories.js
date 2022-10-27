import React, { useState, useRef } from 'react';

import {
  SIZES,
  DISPLAY,
  COLORS,
  FLEX_DIRECTION,
  ALIGN_ITEMS,
  TEXT,
} from '../../../helpers/constants/design-system';

import { TEXT_FIELD_SIZES, TEXT_FIELD_TYPES } from '../text-field';

import { TextFieldSearch } from './text-field-search';
import README from './README.mdx';

const marginSizeControlOptions = [
  undefined,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  'auto',
];

export default {
  title: 'Components/ComponentLibrary/TextFieldSearch',
  id: __filename,
  component: TextFieldSearch,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    showClear: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
    onChange: {
      action: 'onChange',
      table: { category: 'text field props' },
    },
    onClear: {
      action: 'onClear',
    },
    clearIconProps: {
      control: 'object',
    },
    clearButtonProps: {
      control: 'object',
    },
    autoComplete: {
      control: 'boolean',
      table: { category: 'text field props' },
    },
    autoFocus: {
      control: 'boolean',
      table: { category: 'text field props' },
    },
    className: {
      control: 'text',
      table: { category: 'text field props' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'text field props' },
    },
    error: {
      control: 'boolean',
      table: { category: 'text field props' },
    },
    id: {
      control: 'text',
      table: { category: 'text field props' },
    },
    inputProps: {
      control: 'object',
      table: { category: 'text field props' },
    },
    leftAccessory: {
      control: 'text',
      table: { category: 'text field props' },
    },
    maxLength: {
      control: 'number',
      table: { category: 'text field props' },
    },
    name: {
      control: 'text',
      table: { category: 'text field props' },
    },
    onBlur: {
      action: 'onBlur',
      table: { category: 'text field props' },
    },
    onClick: {
      action: 'onClick',
      table: { category: 'text field props' },
    },
    onFocus: {
      action: 'onFocus',
      table: { category: 'text field props' },
    },
    onKeyDown: {
      action: 'onKeyDown',
      table: { category: 'text field props' },
    },
    onKeyUp: {
      action: 'onKeyUp',
      table: { category: 'text field props' },
    },
    placeholder: {
      control: 'text',
      table: { category: 'text field props' },
    },
    readOnly: {
      control: 'boolean',
      table: { category: 'text field props' },
    },
    required: {
      control: 'boolean',
      table: { category: 'text field props' },
    },
    rightAccessory: {
      control: 'text',
      table: { category: 'text field props' },
    },
    size: {
      control: 'select',
      options: Object.values(TEXT_FIELD_SIZES),
      table: { category: 'text field props' },
    },
    type: {
      control: 'select',
      options: Object.values(TEXT_FIELD_TYPES),
      table: { category: 'text field props' },
    },
    marginTop: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginRight: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginBottom: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
    marginLeft: {
      options: marginSizeControlOptions,
      control: 'select',
      table: { category: 'box props' },
    },
  },
  args: {
    showClear: true,
    placeholder: 'Search',
  },
};

const Template = (args) => <TextFieldSearch {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Default';

export const SearchIconProps = Template.bind({});
SearchIconProps.args = {
  searchIconProps: {
    size: SIZES.MD,
    'data-testid': 'search-icon',
  },
};
