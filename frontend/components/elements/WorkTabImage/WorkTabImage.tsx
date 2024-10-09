import styled from 'styled-components';
import { WorkType } from '../../../shared/types/types';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import MuxPlayer from '@mux/mux-player-react/lazy';

const WorkTabImageWrapper = styled.div<{ $isActive: boolean }>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	z-index: ${(props) => (props.$isActive ? 1 : 0)};
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 50vw;
	max-height: 90vh;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		width: calc(100vw - 30px);
	}

	img,
	mux-player {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

const DetailsWrapper = styled.div`
	display: flex;
	position: absolute;
	top: calc(100% + 10px);
	left: 0;
	width: 100%;

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
	title: WorkType['title'];
	description: WorkType['description'];
	year: WorkType['year'];
	image: WorkType['image'];
	isPriority: boolean;
	video?: WorkType['video'];
	useImage?: boolean;
};

const WorkTabImage = (props: Props) => {
	const {
		isActive,
		title,
		description,
		year,
		image,
		isPriority,
		video,
		useImage
	} = props;

	const imageUrl = image?.asset?.url;
	const playbackId = video?.asset?.playbackId;
	const blurDataURL = image?.asset?.metadata?.lqip;

	return (
		<WorkTabImageWrapper $isActive={isActive}>
			<Inner>
				<ImageWrapper>
					{useImage && imageUrl && (
						<Image
							src={imageUrl}
							alt={description || ''}
							priority={isPriority}
							blurDataURL={blurDataURL}
							width={0}
							height={0}
							sizes="50vw"
							style={{
								objectFit: 'contain',
								width: '100%',
								height: 'auto'
							}}
						/>
					)}
					{!useImage && playbackId && (
						<MuxPlayer
							streamType="on-demand"
							playbackId={playbackId}
							autoPlay="muted"
							loop={true}
							thumbnailTime={1}
							loading="viewport"
							preload="auto"
							muted
							playsInline={true}
						/>
					)}
					<DetailsWrapper>
						{title && <Text className="type-small">{title}</Text>}
						{description && (
							<Text className="type-small">{description}</Text>
						)}
						{year && <Text className="type-small">({year})</Text>}
					</DetailsWrapper>
				</ImageWrapper>
			</Inner>
		</WorkTabImageWrapper>
	);
};

export default WorkTabImage;
