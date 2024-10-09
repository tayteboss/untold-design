import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {CaseIcon} from '@sanity/icons'

export default {
  title: 'Work',
  name: 'work',
  type: 'document',
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
  fields: [
    orderRankField({type: 'work'}),
    {
      title: 'Client',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Year',
      name: 'year',
      type: 'number',
    },
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
  ],
}
