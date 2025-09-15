export const headerLinks = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Create Event',
        href: '/events/create'
    },
    {
        label: 'My Profile',
        href: '/profile'
    }
];

export const eventDefaultValues = {
 title: '',
 description: '',
 location: '',
 imageUrl: '',
 startDateTime: new Date(),
 endDateTime: new Date(),
 categoryId: '',
 price:'',
 isFree: false,
  url: ''
}