export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Individual',
      route: '/individual',
    },
    {
      label: 'Organization',
      route: '/organization',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }