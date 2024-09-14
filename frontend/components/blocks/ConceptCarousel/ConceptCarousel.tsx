import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';

import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';

const ConceptCarouselWrapper = styled.div`
	background: var(--colour-white);

	display: flex;
	gap: ${pxToRem(20)};
	padding-left: 33vw;
	padding-right: ${pxToRem(20)};
	overflow: auto;

	&::-webkit-scrollbar {
		width: 0px;
		background: transparent;
		height: 0;
	}
`;

const ImageOuter = styled.div`
	flex: 0 0 33vw;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	padding-top: 75%;
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

type Props = {
	images: ProjectType['concepts'][0]['images'];
};

const ConceptCarousel = (props: Props) => {
	const { images } = props;

	const hasImages = images?.length > 0;

	return (
		<ConceptCarouselWrapper>
			{hasImages &&
				images.map((image, i) => (
					<ImageOuter key={i}>
						<ImageWrapper>
							<ImageInner>
								<Image
									src={image?.image?.asset.url}
									alt={image?.caption}
									priority={i <= 2}
									fill
									style={{
										objectFit: 'cover'
									}}
									sizes="33vw"
								/>
							</ImageInner>
						</ImageWrapper>
					</ImageOuter>
				))}
		</ConceptCarouselWrapper>
	);
};

export default ConceptCarousel;
