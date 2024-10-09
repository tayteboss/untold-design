import {CaseIcon} from '@sanity/icons'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: CaseIcon,
  preview: {
    select: {
      title: 'propertyName',
    },
  },
  fields: [
    {
      title: 'Property Name',
      name: 'propertyName',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Client Name',
      name: 'clientName',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: any) => `${doc.propertyName} - ${doc.clientName}`,
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Date',
      name: 'date',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Concepts',
      name: 'concepts',
      type: 'array',
      of: [
        {
          title: 'Concept',
          name: 'concept',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              title: 'Description',
              name: 'description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              title: 'PDF',
              name: 'pdf',
              type: 'file',
            },
            {
              title: 'Media',
              name: 'images',
              type: 'array',
              of: [
                {
                  title: 'Media Block',
                  name: 'imageBlock',
                  type: 'object',
                  fields: [
                    {
                      title: 'Image',
                      name: 'image',
                      type: 'image',
                      description: 'Please only use a video or image',
                    },
                    {
                      title: 'Video',
                      name: 'video',
                      type: 'mux.video',
                      description: 'Please only use a video or image',
                    },
                    {
                      title: 'Caption',
                      name: 'caption',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
