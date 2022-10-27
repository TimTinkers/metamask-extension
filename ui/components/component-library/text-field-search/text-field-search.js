import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SIZES } from '../../../helpers/constants/design-system';

import { Icon, ICON_NAMES } from '../icon';

import { TextField } from '../text-field';

export const TextFieldSearch = ({ className, searchIconProps, ...props }) => {
  return (
    <TextField
      className={classnames('mm-text-field-search', className)}
      leftAccessory={
        <Icon
          name={ICON_NAMES.SEARCH_FILLED}
          size={SIZES.SM}
          {...searchIconProps}
        />
      }
      showClear
      {...props}
    />
  );
};

TextFieldSearch.propTypes = {
  /**
   * An additional className to apply to the text-field-search
   */
  className: PropTypes.string,
  /**
   * Props to pass to the search icon
   */
  searchIconProps: PropTypes.shape(Icon.PropTypes),
};

TextFieldSearch.displayName = 'TextFieldSearch';
