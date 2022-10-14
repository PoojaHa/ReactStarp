export const AdminNavigation= {
  items: [
    {
      name: 'Dashboard',
      url: '/main-admin',
    },
   
    {
      name: 'Users',
      url: '/consumer',
      children: [
        {
          name: 'User List',
          url: '/consumer/list',
        },
        {
          name: 'User Notifications',
          url: '/consumer/consumer-notification',
        },
      ]
    },
    {
      name: 'Vendor',
      url: '/vendor',
      children: [
        {
          name: 'Vendor List',
          url: '/vendor/vendor-list',
        },
        {
          name: 'Vendor Notification',
          url: '/merchant/merchant-notification',
        },
      ]
    },
    {
      name: 'Orders',
      url: '/orders',
      // icon: 'icon-layers',
    },
    {
      name: 'MyExpenses',
      url: '/my-expense',
      // icon: 'icon-layers',
    },
    // {
    //   name: 'Payment',
    //   url: '/payment',
    //   // icon: 'icon-layers',
    // },
    {
      name: 'Logout',
      url: '/logout',
    },
  ],
};
export const EmployeeNavigation= {
  items: [
    {
      name: 'Users',
      url: '/user',
      children: [
        {
          name: 'User List',
          url: '/consumer/list',
        },
        {
          name: 'User Notifications',
          url: '/consumer/consumer-notification',
        },
      ]
    },
    {
      name: 'Vendor',
      url: '/vendor',
      children: [
        {
          name: 'Vendor List',
          url: '/vendor/vendor-list',
        },
        {
          name: 'Vendor Notification',
          url: '/merchant/merchant-notification',
        },
      ]
    },
    {
      name: 'Orders',
      url: '/orders',
      // icon: 'icon-layers',
    },
    {
      name: 'Logout',
      url: '/logout',
    },
  ],
};

export const ManagerNavigation = {
  items: [
    {
      name: 'Users',
      url: '/consumer',
      children: [
        {
          name: 'User List',
          url: '/consumer/list',
        },
        {
          name: 'User Notifications',
          url: '/consumer/consumer-notification',
        },
      ]
    },
    {
      name: 'Vendor',
      url: '/vendor',
      children: [
        {
          name: 'Vendor List',
          url: '/vendor/vendor-list',
        },
        {
          name: 'Vendor Notification',
          url: '/merchant/merchant-notification',
        },
      ]
    },
    {
      name: 'Orders',
      url: '/orders',
      // icon: 'icon-layers',
    },
    {
      name: 'MyExpenses',
      url: '/my-expense',
      // icon: 'icon-layers',
    },
    {
      name: 'Payment',
      url: '/payment',
      // icon: 'icon-layers',
    },
    {
      name: 'Logout',
      url: '/logout',
    },
  ],
};