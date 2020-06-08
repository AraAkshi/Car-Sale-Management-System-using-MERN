const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminBroExpress = require('admin-bro-expressjs');
const Vehicle = require('./models/Vehicle');
const OnlineCustomer = require('./models/Customer');
const DirectCustomer = require('./models/DirectCustomer');
const Employee = require('./models/Employee');
const Payment = require('./models/Payment');
const Inquiry = require('./models/Inquiry');
const Appointment = require('./models/Appointment');

AdminBro.registerAdapter(AdminBroMongoose);

const inventoryParent = {
  name: 'Inventory',
  icon: 'ListDropdown',
};

const userParent = {
  name: 'Users',
  icon: 'Events',
};

const notificationParent = {
  name: 'Notifications',
  icon: 'Notification',
};

const paymentParent = {
  name: 'Payments',
  icon: 'Money',
};

const dashboardOptions = new AdminBro({
  resources: [
    {
      resource: Vehicle,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          sold: {
            isVisible: { list: true, filter: false, show: true, edit: true },
          },
          isInInventory: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
        listProperties: [
          'status',
          'make',
          'model',
          'manufactureYear',
          'specialNotes',
        ],
        filterProperties: [
          'status',
          'make',
          'model',
          'manufactureYear',
          'specialNotes',
        ],
        parent: inventoryParent,
      },
    },
    {
      resource: Employee,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          regDate: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          nic: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
        },
        listProperties: ['name', 'designation', 'contact', 'email'],
        parent: userParent,
      },
    },
    {
      resource: OnlineCustomer,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          regDate: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
        listProperties: ['name', 'contact', 'email', 'address{city}'],
        parent: userParent,
      },
    },
    {
      resource: DirectCustomer,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          regDate: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          nic: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
        },
        listProperties: ['name', 'contact', 'email', 'address{city}', 'role'],
        parent: userParent,
      },
    },
    {
      resource: Appointment,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          enteredDate: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
        },
        listProperties: [
          'customer',
          'scheduleDate',
          'scheduleTime',
          'vehicle',
          'isAttended',
        ],
        parent: notificationParent,
      },
    },
    {
      resource: Inquiry,
      options: {
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          enteredDate: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
        },
        listProperties: [
          'customerName',
          'customerContact',
          'inquiredAbout',
          'isAttended',
          'enteredDate',
        ],
        parent: notificationParent,
      },
    },
    {
      resource: Payment,
      options: {
        parent: inventoryParent,
      },
    },
  ],
  branding: {
    companyName: 'NADEESHANS',
    logo: null,
    softwareBrothers: false,
  },
  locale: {
    translations: {
      labels: {
        vehicles: 'Vehicle Inventory',
        employees: 'Staff Details',
        customers: 'Online Customer Details',
        directCustomers: 'Direct Customer Details',
      },
    },
  },
});

const router = AdminBroExpress.buildRouter(dashboardOptions);

module.exports = router;
