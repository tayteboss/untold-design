import {UserIcon} from '@sanity/icons'

export default {
  title: 'About Page',
  name: 'aboutPage',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO Title',
      name: 'seoTitle',
      type: 'string',
      description: 'This is the SEO title that appears in search engines.',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
      description: 'This is the SEO description that appears in search engines.',
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
    },
    {
      title: 'Clients',
      name: 'clients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              options: {
                isOptional: true,
              },
              description: 'Optional link to client website',
            },
          ],
          preview: {
            select: {
              title: 'name',
            },
          },
        },
      ],
    },
    {
      title: 'Team',
      name: 'team',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Role',
              name: 'role',
              type: 'string',
            },
            {
              title: 'Year',
              name: 'year',
              type: 'number',
            },
            {
              title: 'Headshot',
              name: 'headshot',
              type: 'image',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
            },
          },
        },
      ],
    },
    {
      title: 'Services',
      name: 'services',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
  ],
}
