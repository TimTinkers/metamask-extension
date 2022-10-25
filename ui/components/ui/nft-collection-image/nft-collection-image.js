import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Box from '../box';
import { COLORS, TEXT_ALIGN } from '../../../helpers/constants/design-system';
import Identicon from '../identicon';
import { getTokenList } from '../../../selectors';

export default function NftCollectionImage({
  assetName,
  tokenAddress,
  collections = {},
}) {
  const tokenList = useSelector(getTokenList);
  const nftTokenListImage = tokenList[tokenAddress.toLowerCase()]?.iconUrl;

  const renderCollectionImageOrName = (collectionImage, collectionName) => {
    if (collections.collectionName === assetName) {
      return collectionName && collectionImage;
    }
    if (collectionImage) {
      return <Identicon diameter={24} image={collectionImage} />;
    }
    return (
      <Box
        color={COLORS.OVERLAY_INVERSE}
        textAlign={TEXT_ALIGN.CENTER}
        className="collection-image-alt"
      >
        {collectionName?.[0]?.toUpperCase() ?? null}
      </Box>
    );
  };

  return <Box>{renderCollectionImageOrName(nftTokenListImage, assetName)}</Box>;
}

NftCollectionImage.propTypes = {
  collections: PropTypes.shape({
    collectibles: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string.isRequired,
        tokenId: PropTypes.string.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        standard: PropTypes.string,
        imageThumbnail: PropTypes.string,
        imagePreview: PropTypes.string,
        creator: PropTypes.shape({
          address: PropTypes.string,
          config: PropTypes.string,
          profile_img_url: PropTypes.string,
        }),
      }),
    ),
    collectionImage: PropTypes.string,
    collectionName: PropTypes.string,
  }),
  assetName: PropTypes.string,
  tokenAddress: PropTypes.string,
};
