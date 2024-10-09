import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import React, { useCallback } from 'react';
import ConceptContentBlock from '../ConceptContentBlock';
import useViewportWidth from '../../../hooks/useViewportWidth';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react/lazy';

const ConceptCarouselWrapper = styled.div`
	position: relative;
	z-index: 2;
`;

const Embla = styled.div`
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const EmblaContainer = styled.div`
	display: flex;
`;

const EmblaSlide = styled.div`
	position: relative;
	min-width: 33vw;
	cursor: pointer;
	margin-right: ${pxToRem(20)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		min-width: 50vw;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		min-width: 90vw;
		cursor: pointer;
	}
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

	img,
	mux-player {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`;

const Caption = styled.p`
	padding-top: ${pxToRem(10)};
`;

const MobileImageWrapper = styled(motion.div)``;

const Mobile = styled.div`
	flex-direction: column;
	gap: ${pxToRem(20)};
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
	}
`;

const ImageOuter = styled.div`
	flex: 0 0 33vw;
	cursor: pointer;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex: 0 0 50vw;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		cursor: pointer;
		flex: 0 0 90vw;
	}
`;

const FinalBlock = styled.div`
	flex: 0 0 ${pxToRem(1)};
`;

const MobileImageInner = styled(motion.div)`
	display: flex;
	gap: ${pxToRem(15)};
	background: var(--colour-white);
	padding-left: ${pxToRem(15)};
	overflow: auto;
`;

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

const innerVariants = {
	hidden: {
		height: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		height: 'auto',
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

type Props = {
	images: ProjectType['concepts'][0]['images'];
	title: ProjectType['concepts'][0]['title'];
	description: ProjectType['concepts'][0]['description'];
	pdf: ProjectType['concepts'][0]['pdf'];
	setAccordionActive: (value: number) => void;
	accordionActive: boolean;
	index: number;
	setLightBoxData: (value: {
		images: false | ProjectType['concepts'][0]['images'];
		index: number;
	}) => void;
};

const ConceptCarousel = (props: Props) => {
	const {
		images,
		title,
		description,
		pdf,
		setAccordionActive,
		setLightBoxData,
		accordionActive,
		index
	} = props;

	const hasImages = images?.length > 0;

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile' || viewport === 'tabletPortrait';

	// Initialize Embla
	const [emblaRef] = useEmblaCarousel({ skipSnaps: true });

	const handleImageClick = useCallback(
		(i: number) => {
			if (isMobile) return;
			setLightBoxData({
				images: images,
				index: i
			});
		},
		[isMobile, images, setLightBoxData]
	);

	return (
		<ConceptCarouselWrapper>
			<Embla ref={emblaRef}>
				<EmblaContainer>
					<ConceptContentBlock
						title={title}
						description={description}
						pdf={pdf}
					/>
					{hasImages &&
						images.map((item, i) => {
							const isImage = !!item?.image?.asset;
							return (
								<EmblaSlide
									key={i}
									onClick={() => handleImageClick(i)}
								>
									<ImageWrapper>
										<ImageInner>
											{isImage && (
												<Image
													src={item?.image?.asset.url}
													alt={item?.caption}
													priority={i <= 2}
													fill
													style={{
														objectFit: 'cover'
													}}
													sizes="33vw"
												/>
											)}
											{!isImage &&
												item?.video?.asset
													?.playbackId && (
													<MuxPlayer
														streamType="on-demand"
														playbackId={
															item?.video?.asset
																?.playbackId
														}
														autoPlay="muted"
														loop={true}
														thumbnailTime={1}
														loading="viewport"
														preload="auto"
														muted
														playsInline={true}
													/>
												)}
										</ImageInner>
									</ImageWrapper>
									{item?.caption && (
										<Caption>{item?.caption}</Caption>
									)}
								</EmblaSlide>
							);
						})}
				</EmblaContainer>
			</Embla>
			<Mobile>
				<ConceptContentBlock
					title={title}
					description={description}
					pdf={pdf}
					setAccordionActive={setAccordionActive}
					accordionActive={accordionActive}
					index={index}
				/>
				<AnimatePresence>
					{accordionActive && (
						<MobileImageWrapper
							variants={wrapperVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
						>
							<MobileImageInner variants={innerVariants}>
								{hasImages &&
									images.map((image, i) => (
										<React.Fragment key={i}>
											<ImageOuter>
												<ImageWrapper>
													<ImageInner>
														<Image
															src={
																image?.image
																	?.asset.url
															}
															alt={image?.caption}
															priority={i <= 2}
															fill
															style={{
																objectFit:
																	'cover'
															}}
															sizes="33vw"
														/>
													</ImageInner>
												</ImageWrapper>
												{image?.caption && (
													<Caption>
														{image?.caption}
													</Caption>
												)}
											</ImageOuter>
											{i === images.length - 1 && (
												<FinalBlock />
											)}
										</React.Fragment>
									))}
							</MobileImageInner>
						</MobileImageWrapper>
					)}
				</AnimatePresence>
			</Mobile>
		</ConceptCarouselWrapper>
	);
};

export default ConceptCarousel;
