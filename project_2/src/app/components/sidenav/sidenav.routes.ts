export interface NavItem {
  label: string;
  route?: string; // Route for direct links
  icon?: string; // Icon name for individual items (Material icon names)
  children?: NavItem[]; // Sub-menu items
}

export const NAVIGATION_ROUTES: NavItem[] = [
  {
    label: 'Admin',
    icon: 'admin_panel_settings',
    children: [
      {
        label: 'Search a Flight',
        route: '/admin/search-flight',
        icon: 'search',
      },
      { label: 'My Bookings', route: '/admin/my-bookings', icon: 'event_note' },
    ],
  },
  {
    label: 'User',
    icon: 'person',
    children: [
      {
        label: 'Search a Flight',
        route: '/user/search-flight',
        icon: 'search',
      },
      { label: 'My Bookings', route: '/user/my-bookings', icon: 'event_note' },
    ],
  },
  {
    label: 'Help',
    route: '/help',
    icon: 'help_outline',
  },
];
