import styled from 'styled-components';
import client from '../client';
import {
	ProjectType,
	SiteSettingsType,
	TransitionsType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import LoadingScreen from '../components/blocks/LoadingScreen';
import ConceptSlide from '../components/blocks/ConceptSlide';
import pxToRem from '../utils/pxToRem';
import { siteSettingsQueryString } from '../lib/sanityQueries';
import Thankyou from '../components/blocks/Thankyou';
import { useState } from 'react';
import Link from 'next/link';

const PageWrapper = styled(motion.div)`
	min-height: 50vh;
`;

const ConceptsWrapper = styled.div`
	padding-top: ${pxToRem(220)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: ${pxToRem(110)};
	}
`;

const MobileContact = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
		justify-content: space-between;
		padding: ${pxToRem(15)} ${pxToRem(15)} ${pxToRem(20)};

		a {
			flex: 1;
		}
	}
`;

const ContactItem = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ContactTitle = styled.h4`
	color: var(--colour-black);
	text-transform: uppercase;
`;

const ContactLink = styled.div`
	color: var(--colour-black);
`;

type Props = {
	data: ProjectType;
	pageTransitionVariants: TransitionsType;
	siteSettings: SiteSettingsType;
};

const Page = (props: Props) => {
	const { data, siteSettings, pageTransitionVariants } = props;

	const [accordionActive, setAccordionActive] = useState<number>(0);

	const hasConcepts = data?.concepts?.length > 0;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={`${data?.clientName} - ${data?.propertyName}`}
				noindex={true}
				nofollow={true}
			/>
			<LoadingScreen
				line1="© UNTOLD DESIGN"
				line2={`{${data?.propertyName}}`}
				line3={`{${data?.clientName}}`}
				line4={`{${data?.date}}`}
			/>
			<ConceptsWrapper>
				{hasConcepts &&
					data?.concepts.map((concept, i) => (
						<ConceptSlide
							key={i}
							title={concept?.title}
							description={concept?.description}
							pdf={concept?.pdf}
							images={concept?.images}
							setAccordionActive={setAccordionActive}
							accordionActive={accordionActive === i}
							index={i}
						/>
					))}
			</ConceptsWrapper>
			<Thankyou
				email={siteSettings?.email}
				tagline={siteSettings?.tagline}
				established={siteSettings?.established}
			/>
			<MobileContact>
				{siteSettings?.email && (
					<Link href={`mailto:${siteSettings?.email}`}>
						<ContactItem>
							<ContactTitle className="type-small">
								Email
							</ContactTitle>
							<ContactLink className="type-small">
								{siteSettings?.email}
							</ContactLink>
						</ContactItem>
					</Link>
				)}
				{siteSettings?.phone && (
					<Link href={`tel:${siteSettings?.phone}`}>
						<ContactItem>
							<ContactTitle className="type-small">
								Phone
							</ContactTitle>
							<ContactLink className="type-small">
								{siteSettings?.phone}
							</ContactLink>
						</ContactItem>
					</Link>
				)}
			</MobileContact>
		</PageWrapper>
	);
};

export async function getStaticPaths() {
	const projectsQuery = `
		*[_type == 'project'] [0...100] {
			slug
		}
	`;

	const allProjects = await client.fetch(projectsQuery);

	return {
		paths: allProjects.map((item: any) => {
			return `/${item?.slug?.current}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }: any) {
	const projectQuery = `
		*[_type == 'project' && slug.current == "${params.slug[0]}"][0] {
			...,
			concepts[] {
				...,
				images[] {
					...,
					image {
						asset-> {
							url,
							metadata {
								lqip
							}
						}
					},
				},
				pdf {
					asset-> {
						url
					}
				}
			}
		}
	`;

	const data = await client.fetch(projectQuery);
	const siteSettings = await client.fetch(siteSettingsQueryString);

	return {
		props: {
			data,
			siteSettings
		}
	};
}

export default Page;
