import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { BaseAvatar } from '../base-avatar';
import Box from '../../ui/box';
import { Icon, ICON_NAMES } from '../icon';
import { Text } from '../text';

import {
  ALIGN_ITEMS,
  COLORS,
  DISPLAY,
  JUSTIFY_CONTENT,
  SIZES,
  TEXT,
} from '../../../helpers/constants/design-system';
import { BANNER_TYPES } from './banner.constants';

export const BannerBase = ({ children, className, ...props }) => {
  return (
    <Box
      className={classnames('mm-banner', className)}
      display={DISPLAY.INLINE_FLEX}
      justifyContent={JUSTIFY_CONTENT.CENTER}
      alignItems={ALIGN_ITEMS.CENTER}
      borderRadius={SIZES.SM}
      paddingLeft={2}
      paddingRight={3}
      {...props}
    >
      <div className="mm-banner__icon-wrapper">
        <BaseAvatar
          size={SIZES.SM}
          color={COLORS.INFO_DEFAULT}
          backgroundColor={COLORS.PRIMARY_MUTED}
          borderColor={COLORS.TRANSPARENT}
          display={DISPLAY.FLEX}
          alignItems={ALIGN_ITEMS.CENTER}
          justifyContent={JUSTIFY_CONTENT.CENTER}
        >
          <Icon name={ICON_NAMES.ADD_SQUARE_FILLED} size={SIZES.AUTO} />
        </BaseAvatar>
      </div>

      <div className="mm-banner__content">
        <Text className="mm-banner__content-title" variant={TEXT.BODY_LG}>
          Title
        </Text>
        <Text className="mm-banner__content-description">
          Description {children}
        </Text>
      </div>
      <div className="mm-banner__close">Close</div>
    </Box>
  );
};

BannerBase.propTypes = {
  /**
   * The children to be rendered inside the BannerBase
   */
  children: PropTypes.node,
  /**
   * An additional className to apply to the BannerBase.
   */
  className: PropTypes.string,
  /**
   * Addition style properties to apply to the button.
   */
  style: PropTypes.object,
  /**
   * BannerBase accepts all the props from Box
   */
  ...Box.propTypes,
};
