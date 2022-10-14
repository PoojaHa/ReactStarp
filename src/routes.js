import React from 'react';


const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Tracking = React.lazy(() => import('./views/Pages/Tracking/Tracking'));
//App Setting

const AddEditFaq = React.lazy(() => import('./views/Pages/AppSetting/AddEditFaq'));
const PrivacyPolicy = React.lazy(() => import('./views/Pages/AppSetting/PrivacyPolicy'));
const TermsCondition = React.lazy(() => import('./views/Pages/AppSetting/TermsCondition'));
const UploadBanner = React.lazy(() => import('./views/Pages/AppSetting/UploadEditbanner'));
const EditVideos = React.lazy(() => import('./views/Pages/AppSetting/EditVideos'));
const EditPresentation = React.lazy(() => import('./views/Pages/AppSetting/EditPresentations'));
const AboutUs = React.lazy(() => import('./views/Pages/AppSetting/AboutUs'));
const Offer = React.lazy(() => import('./views/Pages/AppSetting/Offer'));
const Charges = React.lazy(() => import('./views/Pages/AppSetting/Charges'));

// Consumer Page

const UserList = React.lazy(() => import('./views/Pages/Consumer/ListUser'));
const UserCreate = React.lazy(() => import('./views/Pages/Consumer/CreateUser'));
const ConsumerNotification = React.lazy(() => import('./views/Pages/Consumer/Notification'));
const ConsumerDetail = React.lazy(() => import('./views/Pages/Consumer/DetailUser'));
const ConsumerUpdate = React.lazy(() => import('./views/Pages/Consumer/EditUser'));

// Vendor page

const Vendorlist = React.lazy(() => import('./views/Pages/Vendor/ListVendor'));
const VendorCreate = React.lazy(() => import('./views/Pages/Vendor/CreateVendor'));
const MerchantNotification = React.lazy(() => import('./views/Pages/Vendor/Notification'));
const MerchantDetail = React.lazy(() => import('./views/Pages/Vendor/DetailConsumer'));
const MerchantUpdate = React.lazy(() => import('./views/Pages/Vendor/EditConsumer'));
const StoreCreate = React.lazy(() => import('./views/Pages/Vendor/CreateStore'));
const EventCreate = React.lazy(() => import('./views/Pages/Vendor/CreateEvent'));
const MealCreate = React.lazy(() => import('./views/Pages/Vendor/CreateMeal'));
const MealUpdate = React.lazy(() => import('./views/Pages/Vendor/EditMeal'));
const EventUpdate = React.lazy(() => import('./views/Pages/Vendor/EditEvent'));

// Sub Admin Pages

const AdminCreate = React.lazy(() => import('./views/Pages/Admin/CreateAdmin'));
const Adminlist = React.lazy(() => import('./views/Pages/Admin/ListAdmin'));
const AdminUpdate = React.lazy(() => import('./views/Pages/Admin/EditAdmin'));

//Payment

const PaymentList = React.lazy(() => import('./views/Pages/Payment/List'));
const PaymentDetail = React.lazy(() => import('./views/Pages/Payment/Detail'));



// Orders page

const ListOrders = React.lazy(() => import('./views/Pages/Order/OrderList'));
const ViewOrder = React.lazy(() => import('./views/Pages/Order/ViewOrder'));
const CreateOrder = React.lazy(() => import('./views/Pages/Order/CreateOrder'));
const EditOrder =React.lazy(()=>import ('./views/Pages/Order/EditOrder'));
// Support Master

 //expenses
const ListMExpenses = React.lazy(() => import('./views/Pages/MyExpenses/ListMyExpense'));
const ViewMyExpense = React.lazy(() => import('./views/Pages/MyExpenses/ViewMyExpense'));
const CreateMyExpense = React.lazy(() => import('./views/Pages/MyExpenses/CreateMyExpense'));
const EditMyExpense=  React.lazy(()=>import ('./views/Pages/MyExpenses/EditMyExpense'));

const UpdateImpNotes = React.lazy(() => import('./views/Pages/SupportMaster/UpdateNote'));
const ContactUsQueri = React.lazy(() => import('./views/Pages/SupportMaster/ContactQueries'));
const CustomerSupport = React.lazy(() => import('./views/Pages/SupportMaster/CustomerSupport'));
const AddNotification = React.lazy(() => import('./views/Pages/SupportMaster/AddNotification'));

// logout page
const Logout = React.lazy(() => import('./views/Pages/Logout/Logout'));

//  All System Notification

const AllNotication = React.lazy(() => import('./views/Pages/AllNotification'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path : '/tracking/:orderIdParam', name: 'Tracking', component: Tracking },

  //App Setting

  { path: '/app-setting/addedit-faq', exact: true, name: 'Main Admin / App Setting / Add Edit Faq', component: AddEditFaq },
  { path: '/app-setting/privacy-policy', exact: true, name: 'Main Admin / App Setting / Privacy Policy', component: PrivacyPolicy },
  { path: '/app-setting/term-condition', exact: true, name: 'Main Admin / App Setting / Terms Condition', component: TermsCondition },
  { path: '/app-setting/addedit-banner', exact: true, name: 'Main Admin / App Setting / Upload Banner', component: UploadBanner },
  { path: '/app-setting/edit-videos', exact: true, name: 'Main Admin / App Setting / Edit Videos', component: EditVideos },
  { path: '/app-setting/edit-presentation', exact: true, name: 'Main Admin / App Setting / Edit Presentation', component: EditPresentation },
  { path: '/app-setting/about-us', exact: true, name: 'Main Admin / App Setting / About Us', component: AboutUs },
  { path: '/app-setting/offer', exact: true, name: 'Main Admin / App Setting / Offer', component: Offer },
  { path: '/app-setting/charges', exact: true, name: 'Main Admin / App Setting / Charges', component: Charges },

  // Consumer Page

  { path: '/consumer/list', exact: true, name: 'Main Admin / User / List', component: UserList },
  { path: '/consumer/create', exact: true, name: 'Main Admin / User / Create', component: UserCreate },
  { path: '/consumer/consumer-notification', exact: true, name: 'Main Admin / Consumer / Notification', component: ConsumerNotification },
  { path: '/consumer/consumer-detail/:userId', name: 'Main Admin / Consumer / Detail', component: ConsumerDetail },
  { path: '/consumer/consumer-update', name: 'Main Admin / Consumer / Update', component: ConsumerUpdate },
  // { path: '/order/:orderId', exact:true, name: 'Main Admin / order / Order Detail', component: ViewOrder },
  // Vendor Page

  { path: '/vendor/vendor-list', exact: true, name: 'Main Admin / Merchant / List', component: Vendorlist },
  { path: '/vendor/vendor-create',  name: 'Main Admin / Merchant / Create', component: VendorCreate },
  { path: '/merchant/merchant-notification', exact: true, name: 'Main Admin / Merchant / Notification', component: MerchantNotification },
  { path: '/merchant/merchant-detail', name: 'Main Admin / Merchant / Detail', component: MerchantDetail },
  { path: '/merchant/merchant-update', name: 'Main Admin / Merchant / Update', component: MerchantUpdate },
  { path: '/merchant/store-create', name: 'Main Admin / Merchant / Create', component: StoreCreate },
  { path: '/merchant/event-create', name: 'Main Admin / Merchant / Event', component: EventCreate },
  { path: '/merchant/meal-create', name: 'Main Admin / Merchant / Meal', component:MealCreate },
  { path: '/merchant/meal-update', name: 'Main Admin / Merchant / Update', component: MealUpdate },
  { path: '/merchant/event-update', name: 'Main Admin / Merchant / Update', component: EventUpdate },

// sub Admin

  { path: '/sub-admin', exact: true, name: 'Dashboard / SubAdmin / List', component: Adminlist },
  { path: '/sub-admin/create', name: 'Dashboard / SubAdmin / create', component: AdminCreate },
  { path: '/sub-admin/update', name: 'Dashboard / SubAdmin / update', component: AdminUpdate },

  //Payment

  { path: '/payment', exact: true, name: 'Dashboard / Payment / List', component: PaymentList },
  { path: '/payment/detail', exact: true, name: 'Dashboard / Payment / Detail', component: PaymentDetail },

  // order pages

  { path: '/orders', exact: true, name: 'Main Admin / order / Order List', component: ListOrders },
  { path: '/order/create-order', exact: true, name: 'Main Admin / order / Order Create', component: CreateOrder },
  { path: '/order/edit-order', exact: true, name: 'Main Admin / order / Order Edit', component: EditOrder },
  { path: '/order/:orderId', exact:true, name: 'Main Admin / order / Order Detail', component: ViewOrder },
   
  //Myexpense pgaes
  { path: '/my-expense', exact: true, name: 'Main Admin / myexpense / MyExpenses List', component: ListMExpenses },
  { path: '/my-expense/create', exact: true, name: 'Main Admin / myexpense / MyExpenses Create', component: CreateMyExpense },
  { path: '/my-expense/edit', exact: true, name: 'Main Admin / myexpense / MyExpenses Edit', component: EditMyExpense },
  { path: '/my-expense/:orderId', exact:true, name: 'Main Admin / myexpense / MyExpenses Detail', component: ViewMyExpense },
  // Support Master

  { path: '/support-master/update-notes', exact: true, name: 'Update Important Notes', component: UpdateImpNotes },
  { path: '/support-master/contact-us', exact: true, name: 'Contact Us Queries', component: ContactUsQueri },
  { path: '/support-master/customer-support', exact: true, name: 'Customer Support', component: CustomerSupport },
  { path: '/support-master/add-notification', exact: true, name: 'Add Notification', component: AddNotification },


  //logout
  { path: '/Logout', exact: true, name: 'Logout', component: Logout },
  //configration page

  //
  { path: '/Login', exact: true, name: 'Login', component: Login },

// { path:'/term-condition', exact: true, name: 'Term-Condition', component: TermsCondition},
  //  All Notifications
  { path: '/allnotification', exact: true, name: 'All Notification', component: AllNotication},
];

export default routes;
