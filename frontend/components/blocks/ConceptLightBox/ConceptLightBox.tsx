import styled from 'styled-components';
import { ProjectType, WorkType } from '../../../shared/types/types';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import pxToRem from '../../../utils/pxToRem';
import { useEffect } from 'react';

const ConceptLightBoxWrapper = styled.div`
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

type Props = {
	isActive: boolean;
	data: false | ProjectType['concepts'][0]['images'];
	index: number;
	setLightBoxData: (value: {
		images: false | ProjectType['concepts'][0]['images'] | WorkType[];
		index: number;
	}) => void;
};

const ConceptLightBox = (props: Props) => {
	const { isActive, data, index, setLightBoxData } = props;

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
				index: emblaApi.selectedScrollSnap()
			});
		});
	}, [emblaApi, setLightBoxData, data]);

	// Update the handleClick function to close the lightbox if the active image is clicked
	const handleClick = (i: number) => {
		if (i === index) {
			// If the active image is clicked, close the lightbox
			setLightBoxData({ images: false, index: 0 });
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

	return (
		<AnimatePresence>
			{isActive && (
				<ConceptLightBoxWrapper>
					<ExitTrigger>
						<Inner>
							<Embla className="embla" ref={emblaRef}>
								<Container className="embla__container">
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
