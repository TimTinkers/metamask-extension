import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../../../contexts/i18n';
import Box from '../box';
import Typography from '../typography';
import {
  COLORS,
  DISPLAY,
  FONT_WEIGHT,
  TYPOGRAPHY,
} from '../../../helpers/constants/design-system';
import Button from '../button';
import NftCollectionImage from '../nft-collection-image';

export default function NftInfo({ assetName, tokenId, tokenAddress, onView }) {
  const t = useContext(I18nContext);

  return (
    <Box
      display={DISPLAY.FLEX}
      className="nft-info"
      backgroundColor={COLORS.BACKGROUND_ALTERNATIVE}
    >
      <Box display={DISPLAY.FLEX} className="nft-info__content">
        <Box margin={4}>
          <NftCollectionImage
            assetName={assetName}
            tokenAddress={tokenAddress}
          />
        </Box>
        <Box>
          <Typography
            fontWeight={FONT_WEIGHT.BOLD}
            variant={TYPOGRAPHY.H6}
            marginTop={4}
          >
            {assetName}
          </Typography>
          <Typography
            variant={TYPOGRAPHY.H7}
            marginBottom={4}
            color={COLORS.TEXT_ALTERNATIVE}
          >
            {t('tokenId')} #{tokenId}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={4} marginRight={4}>
        <Button className="nft-info__button" type="link" onClick={onView}>
          <Typography
            variant={TYPOGRAPHY.H6}
            marginTop={0}
            color={COLORS.PRIMARY_DEFAULT}
          >
            {t('view')}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

NftInfo.propTypes = {
  assetName: PropTypes.string,
  tokenAddress: PropTypes.string,
  tokenId: PropTypes.string,
  onView: PropTypes.func,
};
