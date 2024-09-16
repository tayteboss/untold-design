import styled from 'styled-components';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import LoadingScreen from '../blocks/LoadingScreen';
import MenuTrigger from '../elements/MenuTrigger';
import Menu from '../blocks/Menu';
import { usePathname } from 'next/navigation';

const siteSettings = require('../../json/siteSettings.json');

const Main = styled.main``;

type Props = {
	children: ReactNode;
	setLoadingAnimationComplete: (completed: boolean) => void;
	setHomePageTab: (tab: 'work' | 'index') => void;
	homePageTab: 'work' | 'index';
};

const Layout = (props: Props) => {
	const {
		children,
		setLoadingAnimationComplete,
		setHomePageTab,
		homePageTab
	} = props;

	const [menuIsActive, setMenuIsActive] = useState(false);
	const [isHomePage, setIsHomePage] = useState(true);

	const pathname = usePathname();
	const lenis = useLenis(({ scroll }) => {});

	useEffect(() => {
		if (pathname === '/') {
			setIsHomePage(true);
		} else {
			setIsHomePage(false);
		}
	}, []);

	return (
		<>
			{isHomePage && (
				<LoadingScreen
					line1="© UNTOLD DESIGN"
					line2={siteSettings?.email}
					line3={`${siteSettings?.tagline}`}
					line4={`EST.${siteSettings?.established}`}
					setLoadingAnimationComplete={setLoadingAnimationComplete}
				/>
			)}
			<Header setHomePageTab={setHomePageTab} homePageTab={homePageTab} />
			<MenuTrigger
				setMenuIsActive={setMenuIsActive}
				menuIsActive={menuIsActive}
			/>
			<Menu
				isActive={menuIsActive}
				setMenuIsActive={setMenuIsActive}
				setHomePageTab={setHomePageTab}
				homePageTab={homePageTab}
				email={siteSettings.email}
				phone={siteSettings.phone}
			/>
			<ReactLenis root>
				<Main>{children}</Main>
			</ReactLenis>
			<Footer
				email={siteSettings.email}
				phone={siteSettings.phone}
				acknowledgementOfCountry={siteSettings.acknowledgementOfCountry}
			/>
		</>
	);
};

export default Layout;
