import Image from 'next/image';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { WorkType } from '../../../shared/types/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

const IndexTabImageWrapper = styled(motion.div)<{ $isActive: boolean }>`
	grid-column: span 3;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 4;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 6;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		grid-column: 1 / -1;
	}

	img {
		filter: ${(props) =>
			props.$isActive ? 'greyscale(0)' : 'grayscale(100%)'};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			filter: grayscale(0) !important;
		}
	}
`;

const Inner = styled.div`
	width: 100%;
	padding-top: 74%;
	position: relative;
`;

const ImageWrapper = styled.div`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const DetailsWrapper = styled.div`
	display: flex;
	padding-top: ${pxToRem(10)};
`;

const Text = styled.p<{ $isActive: boolean }>`
	&:first-child {
		margin-right: ${pxToRem(20)};
	}

	&.type-small {
		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(10)};
			line-height: ${pxToRem(10)};
		}
	}
`;

type Props = {
	index: number;
	image?: WorkType['image'];
	title?: WorkType['title'];
	description?: WorkType['description'];
	year?: WorkType['year'];
	isPriority?: boolean;
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.01
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.01
		}
	}
};

const IndexTabImage = (props: Props) => {
	const { index, image, title, description, year, isPriority } = props;

	const [isActive, setIsActive] = useState(false);

	const imageUrl = image?.asset?.url;
	const blurDataURL = image?.asset?.metadata?.lqip;

	const handleIndex = (index: number) => {
		return index < 10 ? `0${index}` : `${index}`;
	};

	return (
		<IndexTabImageWrapper
			variants={wrapperVariants}
			onMouseEnter={() => setIsActive(!isActive)}
			$isActive={isActive}
		>
			<Inner>
				{imageUrl && (
					<ImageWrapper>
						<Image
							src={imageUrl}
							alt={description || ''}
							priority={isPriority}
							blurDataURL={blurDataURL}
							fill
							style={{
								objectFit: 'cover'
							}}
							sizes="33vw"
						/>
					</ImageWrapper>
				)}
			</Inner>
			<DetailsWrapper>
				<Text $isActive={isActive} className="type-small">
					{handleIndex(index)}
				</Text>
				<Text $isActive={isActive} className="type-small">
					{title || ''}, {description || ''} ({year || ''})
				</Text>
			</DetailsWrapper>
		</IndexTabImageWrapper>
	);
};

export default IndexTabImage;
