export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
      initialValue: 'Site Settings',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
    },
    {
      title: 'Established',
      name: 'established',
      type: 'number',
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string',
    },
    {
      title: 'Acknowledgement of Country',
      name: 'acknowledgementOfCountry',
      type: 'string',
    },
  ],
}
