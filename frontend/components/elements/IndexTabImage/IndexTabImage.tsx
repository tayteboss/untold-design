import Image from 'next/image';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { ProjectType, WorkType } from '../../../shared/types/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useViewportWidth from '../../../hooks/useViewportWidth';

const IndexTabImageWrapper = styled(motion.div)`
	grid-column: span 3;
	filter: grayscale(100%);

	&:hover {
		filter: grayscale(0);
		cursor: zoom-in;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			cursor: pointer;
		}
	}

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

const Text = styled.p`
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
	setLightBoxData: (value: {
		images: false | ProjectType['concepts'][0]['images'] | WorkType[];
		index: number;
	}) => void;
	work: WorkType[];
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
	const {
		index,
		image,
		title,
		description,
		year,
		isPriority,
		setLightBoxData,
		work
	} = props;

	const imageUrl = image?.asset?.url;
	const blurDataURL = image?.asset?.metadata?.lqip;

	const handleIndex = (index: number) => {
		return index < 10 ? `0${index}` : `${index}`;
	};

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile' || viewport === 'tabletPortrait';

	return (
		<IndexTabImageWrapper
			variants={wrapperVariants}
			onClick={() => {
				if (isMobile) return;
				setLightBoxData({ images: work, index: index - 1 });
			}}
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
				<Text className="type-small">{handleIndex(index)}</Text>
				<Text className="type-small">
					{title || ''}, {description || ''} ({year || ''})
				</Text>
			</DetailsWrapper>
		</IndexTabImageWrapper>
	);
};

export default IndexTabImage;
