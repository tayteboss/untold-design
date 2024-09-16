import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';

const MenuWrapper = styled(motion.div)`
	padding: ${pxToRem(20)};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	z-index: 400;
	background: var(--colour-black);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const Blank = styled(motion.div)``;

const MenuList = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(20)};
`;

const NavItem = styled(motion.ul)``;

const Button = styled.button<{ $isActive: boolean }>`
	font-size: ${pxToRem(32)};
	color: var(--colour-white);
	position: relative;
	text-transform: uppercase;

	&::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--colour-white);
		opacity: ${(props) => (props.$isActive ? 1 : 0)};
	}
`;

const LinkTag = styled.div<{ $isActive: boolean }>`
	font-size: ${pxToRem(32)};
	color: var(--colour-white);
	text-decoration: ${(props) => props.$isActive && 'underline'};
	text-transform: uppercase;
`;

const ContactList = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(15)};
	align-items: center;
`;

const ContactItem = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ContactTitle = styled.h4`
	color: var(--colour-white);
	text-transform: uppercase;
	font-weight: 400;
`;

const ContactLink = styled.div`
	color: var(--colour-white);
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
			staggerChildren: 0.1
		}
	}
};

const listVariants = {
	hidden: {
		opacity: 1,
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
			staggerChildren: 0.05,
			delayChildren: 0.1
		}
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.1,
			ease: 'easeInOut',
			when: 'afterChildren',
			staggerChildren: 0.1,
			staggerDirection: 1
		},
		transitionEnd: {
			display: 'none'
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
	},
	exit: {
		y: -15,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		},
		transitionEnd: {
			delay: 1,
			opacity: 0
		}
	}
};

type Props = {
	isActive: boolean;
	setMenuIsActive: (isActive: boolean) => void;
	setHomePageTab: (tab: 'work' | 'index') => void;
	homePageTab: 'work' | 'index';
	email: string;
	phone: string;
};

const Menu = (props: Props) => {
	const {
		isActive,
		setMenuIsActive,
		setHomePageTab,
		homePageTab,
		email,
		phone
	} = props;

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
		<AnimatePresence>
			{isActive && (
				<MenuWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<Blank />
					<MenuList
						variants={listVariants}
						onClick={() => setMenuIsActive(false)}
					>
						<NavItem variants={itemVariants}>
							<Button
								onClick={() => handleTabSwitch('work')}
								$isActive={
									homePageTab === 'work' && pathname === '/'
								}
							>
								Work
							</Button>
						</NavItem>
						<NavItem variants={itemVariants}>
							<Button
								onClick={() => handleTabSwitch('index')}
								$isActive={
									homePageTab === 'index' && pathname === '/'
								}
							>
								Index
							</Button>
						</NavItem>
						<NavItem variants={itemVariants}>
							<Link href="/about">
								<LinkTag $isActive={pathname === '/about'}>
									About
								</LinkTag>
							</Link>
						</NavItem>
					</MenuList>
					<ContactList variants={listVariants}>
						{email && (
							<Link href={`mailto:${email}`}>
								<ContactItem variants={itemVariants}>
									<ContactTitle className="type-small">
										Email
									</ContactTitle>
									<ContactLink className="type-small">
										{email}
									</ContactLink>
								</ContactItem>
							</Link>
						)}
						{phone && (
							<Link href={`tel:${phone}`}>
								<ContactItem variants={itemVariants}>
									<ContactTitle className="type-small">
										Phone
									</ContactTitle>
									<ContactLink className="type-small">
										{phone}
									</ContactLink>
								</ContactItem>
							</Link>
						)}
					</ContactList>
				</MenuWrapper>
			)}
		</AnimatePresence>
	);
};

export default Menu;
