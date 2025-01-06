export interface NavItem {
  label: string;
  route?: string; // Route for direct links
  icon?: string; // Icon name for individual items (Material icon names)
  children?: NavItem[]; // Sub-menu items
  location?: 'top' | 'bottom';
}

export const NAVIGATION_ROUTES: NavItem[] = [
  {
    label: 'Home',
    icon: 'house',
    route: '',
  },
  {
    label: 'Admin',
    icon: 'admin_panel_settings',
    children: [
      {
        label: 'Manage Flights',
        route: '/admin/manage/flights',
        icon: 'flight',
      },
      {
        label: 'Manage Destination',
        route: '/admin/manage/destinations',
        icon: 'map',
      },
    ],
  },
  {
    label: 'User',
    icon: 'person',
    children: [
      {
        label: 'Book a Flight',
        route: '/user/book-a-flight',
        icon: 'flight',
      },
      {
        label: 'My Bookings',
        route: '/user/my-bookings',
        icon: 'event_note',
      },
    ],
  },
  {
    label: 'Help',
    route: '/help',
    icon: 'help_outline',
    location: 'bottom',
  },
];
