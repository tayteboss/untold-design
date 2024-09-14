import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { usePathname, useRouter } from 'next/navigation';

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 500;
	mix-blend-mode: difference;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${pxToRem(20)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Logo = styled.div`
	color: var(--colour-white);
`;

const NavBar = styled.ul`
	display: flex;
	gap: ${pxToRem(40)};
`;

const NavItem = styled.li``;

const Button = styled.button<{ $isActive: boolean }>`
	opacity: ${(props) => props.$isActive && 0.2};
	color: var(--colour-white);

	&:hover {
		opacity: 0.2;
	}
`;

const LinkTag = styled.div<{ $isActive: boolean }>`
	opacity: ${(props) => props.$isActive && 0.2};
	color: var(--colour-white);
`;

type Props = {
	setHomePageTab: (tab: 'work' | 'index') => void;
	homePageTab: 'work' | 'index';
};

const Header = (props: Props) => {
	const { setHomePageTab, homePageTab } = props;

	const pathname = usePathname();
	const router = useRouter();

	const handleTabSwitch = (tab: 'work' | 'index') => {
		if (pathname === '/') {
			setHomePageTab(tab);
		} else {
			router.push('/');
			setHomePageTab(tab);
		}
	};

	return (
		<HeaderWrapper className="header">
			<Link href="/">
				<Logo className="type-h2">© UNTOLD DESIGN</Logo>
			</Link>
			<NavBar>
				<NavItem>
					<Button
						onClick={() => handleTabSwitch('work')}
						$isActive={homePageTab === 'work' && pathname === '/'}
						className="type-h2"
					>
						Work
					</Button>
				</NavItem>
				<NavItem>
					<Button
						onClick={() => handleTabSwitch('index')}
						$isActive={homePageTab === 'index' && pathname === '/'}
						className="type-h2"
					>
						Index
					</Button>
				</NavItem>
				<NavItem className="type-h2">
					<Link href="/about">
						<LinkTag
							$isActive={pathname === '/about'}
							className="type-h2"
						>
							About
						</LinkTag>
					</Link>
				</NavItem>
			</NavBar>
		</HeaderWrapper>
	);
};

export default Header;
