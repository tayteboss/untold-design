import styled from 'styled-components';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { ReactNode } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import LoadingScreen from '../blocks/LoadingScreen';

const siteSettings = require('../../json/siteSettings.json');

const Main = styled.main``;

type Props = {
	children: ReactNode;
	setLoadingAnimationComplete: (completed: boolean) => void;
};

const Layout = (props: Props) => {
	const { children, setLoadingAnimationComplete } = props;

	const lenis = useLenis(({ scroll }) => {});

	console.log('siteSettings layout', siteSettings);

	return (
		<>
			<LoadingScreen
				email={siteSettings.email}
				established={siteSettings.established}
				tagline={siteSettings.tagline}
				setLoadingAnimationComplete={setLoadingAnimationComplete}
			/>
			<Header />
			<ReactLenis root>
				<Main>{children}</Main>
			</ReactLenis>
			<Footer />
		</>
	);
};

export default Layout;
