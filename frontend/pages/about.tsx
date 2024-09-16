import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	AboutPageType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	aboutPageQueryString,
	siteSettingsQueryString
} from '../lib/sanityQueries';
import Link from 'next/link';
import pxToRem from '../utils/pxToRem';
import ContactList from '../components/blocks/ContactList';
import TeamList from '../components/blocks/TeamList';
import Image from 'next/image';
import { useState } from 'react';

const PageWrapper = styled(motion.div)``;

const Inner = styled(motion.div)`
	padding: ${pxToRem(220)} 10vw ${pxToRem(80)};
	min-height: calc(100vh - var(--header-h));
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${pxToRem(60)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding: ${pxToRem(220)} ${pxToRem(20)} ${pxToRem(80)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(116)} ${pxToRem(15)} ${pxToRem(40)};
		gap: ${pxToRem(40)};
	}
`;

const ContactWrapper = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	width: 100%;

	a {
		flex: 1;
	}
`;

const ContactItem = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	&:hover {
		div:last-child {
			text-decoration: underline;
		}
	}
`;

const ContactTitle = styled.h4`
	color: var(--colour-black);
	text-transform: uppercase;
	font-weight: 200;
`;

const ContactLink = styled.div`
	color: var(--colour-black);
`;

const TaglineWrapper = styled(motion.div)``;

const Tagline = styled.h1`
	color: var(--colour-black);
	text-align: center;
	text-transform: unset;
	font-family: var(--font-bold);
	font-weight: 400;
`;

const ListWrapper = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	width: 100%;
	position: relative;
	z-index: 10;
	mix-blend-mode: difference;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column;
		gap: ${pxToRem(40)};
	}
`;

const Aoc = styled(motion.p)`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		text-align: center;
		padding: 0 ${pxToRem(12)};
	}
`;

const ImageWrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30vw;
	max-height: 90vh;
	z-index: 5;
	pointer-events: none;
	background: var(--colour-black);
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			ease: 'easeInOut',
			staggerChildren: 0.1,
			when: 'beforeChildren'
		}
	}
};

const itemVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	}
};

type Props = {
	data: AboutPageType;
	siteSettings: SiteSettingsType;
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, siteSettings, pageTransitionVariants } = props;

	const [isHovered, setIsHovered] = useState<{
		isHovered: boolean;
		headshot: number;
	}>({ isHovered: false, headshot: 0 });

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.seoTitle || ''}
				description={data?.seoDescription || ''}
			/>
			<Inner
				variants={wrapperVariants}
				initial="hidden"
				animate="visible"
			>
				<ContactWrapper variants={itemVariants}>
					{siteSettings?.email && (
						<Link href={`mailto:${siteSettings?.email}`}>
							<ContactItem>
								<ContactTitle className="type-p">
									Email
								</ContactTitle>
								<ContactLink className="type-p">
									{siteSettings?.email}
								</ContactLink>
							</ContactItem>
						</Link>
					)}
					{siteSettings?.phone && (
						<Link href={`tel:${siteSettings?.phone}`}>
							<ContactItem>
								<ContactTitle className="type-p">
									Phone
								</ContactTitle>
								<ContactLink className="type-p">
									{siteSettings?.phone}
								</ContactLink>
							</ContactItem>
						</Link>
					)}
				</ContactWrapper>
				<TaglineWrapper variants={itemVariants}>
					<Tagline>{data?.tagline}</Tagline>
				</TaglineWrapper>
				<ListWrapper variants={itemVariants}>
					<ContactList title="Clients" data={data?.clients} />
					<TeamList
						data={data?.team}
						setIsHovered={setIsHovered}
						isHovered={isHovered}
					/>
					<ContactList title="Services" data={data?.services} />
				</ListWrapper>
				{siteSettings?.acknowledgementOfCountry && (
					<Aoc variants={itemVariants}>
						{siteSettings?.acknowledgementOfCountry}
					</Aoc>
				)}
				{isHovered.isHovered &&
					data?.team[isHovered.headshot]?.headshot?.asset && (
						<ImageWrapper>
							<Image
								src={
									data?.team[isHovered.headshot]?.headshot
										?.asset?.url || ''
								}
								alt={`${
									data?.team[isHovered.headshot]?.name
								}'s headshot`}
								width={0}
								height={0}
								sizes="33vw"
								style={{
									objectFit: 'contain',
									width: '100%',
									height: 'auto'
								}}
							/>
						</ImageWrapper>
					)}
			</Inner>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	const data = await client.fetch(aboutPageQueryString);

	return {
		props: {
			data,
			siteSettings
		}
	};
}

export default Page;
