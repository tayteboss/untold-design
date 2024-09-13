export const mediaString = `
	...,
	mediaType,
	image {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	video {
		asset-> {
			playbackId,
		},
	},
	mobileImage {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	mobileVideo {
		asset-> {
			playbackId,
		},
	},
`;

export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		...,
	}
`;

export const aboutPageQueryString = `
	*[_type == 'aboutPage'][0] {
		...,
		team[] {
			...,
			headshot {
				asset-> {
					url
				}
			}
		}
	}
`;

export const workQueryString = `
	*[_type == 'work'] | order(orderRank) [0...100] {
		...,
		image {
			asset-> {
				url,
				metadata {
					lqip
				}
			}
		}
	}
`;
