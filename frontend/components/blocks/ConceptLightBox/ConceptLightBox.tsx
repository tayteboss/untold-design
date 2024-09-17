import styled from 'styled-components';
import { ProjectType, WorkType } from '../../../shared/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import pxToRem from '../../../utils/pxToRem';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';

const ConceptLightBoxWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: var(--colour-white);
	z-index: 2000;
`;

const ExitTrigger = styled.div`
	cursor: zoom-out;
`;

const Inner = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Embla = styled.div`
	width: 100%;
	cursor: pointer;
`;

const Container = styled.div`
	&.embla__container {
		gap: 0;
	}
`;

const Slide = styled.div<{
	isActive: boolean;
	isPrev: boolean;
	isNext: boolean;
}>`
	margin-right: ${pxToRem(20)};
	opacity: ${({ isActive }) => (isActive ? 1 : 0.2)};
	cursor: ${({ isActive, isPrev, isNext }) =>
		isActive
			? 'zoom-out'
			: isPrev
			? 'w-resize'
			: isNext
			? 'e-resize'
			: 'pointer'};
	padding-bottom: ${pxToRem(20)};

	&.embla__slide {
		flex: 0 0 60vw;
	}

	&:first-child {
		margin-left: ${pxToRem(20)};
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	padding-top: 70%;
	position: relative;
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
	overflow: hidden;
	height: 100%;
	width: 100%;
`;

const DetailsWrapper = styled.div`
	display: flex;
	position: absolute;
	top: calc(100% + 10px);
	left: 0;
	width: 100%;
	position: relative;
	top: 20px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column;
		align-items: center;
	}
`;

const Text = styled.p`
	&:first-child {
		margin-right: ${pxToRem(70)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			margin-right: 0;
		}
	}

	&:last-child {
		margin-left: auto;
		flex: 1;
		text-align: right;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			flex: unset;
			text-align: center;
			margin-left: 0;
		}
	}
`;

type Props = {
	isActive: boolean;
	data: false | ProjectType['concepts'][0]['images'];
	index: number;
	detailsData: {
		title?: string;
		year?: string;
		description?: string;
	};
	setLightBoxData: (value: {
		images: false | ProjectType['concepts'][0]['images'] | WorkType[];
		index: number;
		detailsData: {
			title?: string;
			year?: string;
			description?: string;
		};
	}) => void;
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const ConceptLightBox = (props: Props) => {
	const { isActive, data, index, detailsData, setLightBoxData } = props;

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: 'center',
		startIndex: index,
		skipSnaps: true
	});

	const hasImages = data && data.length > 0;

	// Effect to update slide opacity when the active index changes
	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on('select', () => {
			setLightBoxData({
				images: data,
				index: emblaApi.selectedScrollSnap(),
				detailsData: detailsData
			});
		});
	}, [emblaApi, setLightBoxData, data]);

	// Update the handleClick function to close the lightbox if the active image is clicked
	const handleClick = (i: number) => {
		if (i === index) {
			// If the active image is clicked, close the lightbox
			setLightBoxData({ images: false, index: 0, detailsData: {} });
		} else if (emblaApi) {
			if (i < index) {
				// Clicked on a previous image, go to previous
				emblaApi.scrollPrev();
			} else {
				// Clicked on the next image, go to next
				emblaApi.scrollNext();
			}
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setLightBoxData({ images: false, index: 0, detailsData: {} });
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [setLightBoxData]);

	const ref = useRef<HTMLDivElement>(null!);
	useClickOutside(ref, () => {
		setLightBoxData({ images: false, index: 0, detailsData: {} });
	});

	return (
		<AnimatePresence>
			{isActive && (
				<ConceptLightBoxWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<ExitTrigger>
						<Inner>
							<Embla className="embla" ref={emblaRef}>
								<Container
									className="embla__container"
									ref={ref}
								>
									{hasImages &&
										data.map((item, i) => {
											return (
												<Slide
													className="embla__slide"
													key={i}
													isActive={i === index}
													isPrev={i === index - 1}
													isNext={i === index + 1}
													onClick={() =>
														handleClick(i)
													}
												>
													<ImageWrapper>
														<ImageInner>
															<Image
																src={
																	item?.image
																		?.asset
																		.url ||
																	''
																}
																alt={
																	item?.caption ||
																	''
																}
																priority={
																	i === 0
																}
																fill
																style={{
																	objectFit:
																		'cover'
																}}
																sizes="70vw"
															/>
														</ImageInner>
														<DetailsWrapper>
															{item.title && (
																<Text className="type-small">
																	{
																		item?.title
																	}
																</Text>
															)}
															{item?.description && (
																<Text className="type-small">
																	{
																		item?.description
																	}
																</Text>
															)}
															{item?.year && (
																<Text className="type-small">
																	(
																	{item?.year}
																	)
																</Text>
															)}
														</DetailsWrapper>
													</ImageWrapper>
												</Slide>
											);
										})}
								</Container>
							</Embla>
						</Inner>
					</ExitTrigger>
				</ConceptLightBoxWrapper>
			)}
		</AnimatePresence>
	);
};

export default ConceptLightBox;
