export type MediaType = {
	mediaType: 'video' | 'image';
	video: { asset: { playbackId: string } };
	image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
	mobileImage?: { asset: { url: string; metadata: { lqip: string } } };
	mobileVideo?: { asset: { playbackId: string } };
	caption?: string;
};

export type TransitionsType = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		};
	};
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number;
		};
	};
};

export type ButtonType = {
	url: string;
	pageReference: {
		_ref: string;
	};
	title: string;
};

export type SlugType = {
	current: string;
};

export type SiteSettingsType = {
	acknowledgementOfCountry: string;
	email: string;
	established: number;
	phone: string;
	tagline: string;
};

export type HomePageType = {
	seoTitle: string;
	seoDescription: string;
};

export type AboutPageType = {
	seoTitle: string;
	seoDescription: string;
	tagline: string;
	clients: { name: string; link: string }[];
	team: {
		name: string;
		role: string;
		year: string;
		headshot: { asset: { url: string } };
	}[];
	services: { name: string }[];
};

export type WorkType = {
	title: string;
	description: string;
	year: number;
	image: {
		asset: { url: string; metadata: { lqip: string } };
	};
};

export type ProjectType = {
	slug: SlugType;
	propertyName: string;
	clientName: string;
	date: string;
	concepts: {
		title: string;
		description: string;
		pdf: { asset: { url: string } };
		images: {
			caption: string;
			image: {
				asset: { url: string };
			};
		}[];
	}[];
};
