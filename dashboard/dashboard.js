const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const AdminBroExpress = require('admin-bro-expressjs');
const Vehicle = require('../models/Vehicle');
const OnlineCustomer = require('../models/Customer');
const DirectCustomer = require('../models/DirectCustomer');
const Employee = require('../models/Employee');
const Payment = require('../models/Payment');
const Inquiry = require('../models/Inquiry');
const Appointment = require('../models/Appointment');
const Report = require('../models/Report');

AdminBro.registerAdapter(AdminBroMongoose);

//const theme = require('admin-bro-theme-dark');

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

const reportParent = {
  name: 'Reports',
  icon: 'Account',
};

const dashboardOptions = new AdminBro({
  dashboard: {
    component: AdminBro.bundle('./dashboard-component'),
  },
  resources: [
    {
      resource: Vehicle,
      options: {
        parent: inventoryParent,
        properties: {
          _id: {
            isVisible: false,
          },
          sold: {
            isVisible: { list: false, filter: false, show: false, edit: true },
          },
          soldDate: {
            isVisible: { list: false, filter: true, show: true, edit: false },
          },
          isInInventory: {
            isVisible: { list: false, filter: true, show: false, edit: true },
          },
          owner: {
            customer: {
              isVisible: { list: true, filter: true, show: true, edit: false },
            },
          },
          condition: {
            availableValues: [
              { value: 'unregBrandNew', label: 'UNREGISTERED BRAND NEW' },
              { value: 'regBrandNew', label: 'REGISTERED BRAND NEW' },
              { value: 'reconditioned', label: 'RECONDITIONED' },
            ],
          },
          gear: {
            label: 'Transmission Gear',
            availableValues: [
              { value: 'auto', label: 'AUTO' },
              { value: 'manual', label: 'MANUAL' },
              { value: 'tiptronic', label: 'TIPTRONIC' },
            ],
          },
          fuelType: {
            label: 'Fuel Type',
            availableValues: [
              { value: 'diesel', label: 'DIESEL' },
              { value: 'electric', label: 'ELECTRIC' },
              { value: 'petrol', label: 'PETROL' },
              { value: 'dieselHybrid', label: 'DIESEL-HYBRID' },
              { value: 'petrolHybrid', label: 'PETROL-HYBRID' },
              { value: 'pluginHybrid', label: 'PLUGIN-HYBRID' },
            ],
          },
          images: {
            components: AdminBro.bundle('./fileUpload'),
          },
        },
        listProperties: [
          'condition',
          'make',
          'model',
          'manufactureYear',
          'specialNotes',
        ],
        filterProperties: [
          'condition',
          'make',
          'model',
          'manufactureYear',
          'specialNotes',
        ],
        actions: {
          sold: {
            actionType: 'record',
            icon: 'SubtractAlt',
            handler: (req, res, context) => {
              req.record.isInInventory = false;
              context.record.sold = true;
              return context;
            },
          },
          search: {},
        },
      },
    },
    {
      resource: Employee,
      options: {
        properties: {
          _id: {
            isVisible: false,
          },
          password: {
            isVisible: false,
          },
          regDate: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          nic: {
            isVisible: { list: false, filter: true, show: true, edit: true },
          },
        },
        listProperties: ['name', 'designation', 'contact', 'email'],
        parent: userParent,
      },
    },
    {
      resource: OnlineCustomer,
      options: {
        actions: {
          new: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
        properties: {
          _id: {
            isVisible: false,
          },
          password: {
            isVisible: false,
          },
          regDate: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
        },
        listProperties: ['name', 'contact', 'email'],
        parent: userParent,
      },
    },
    {
      resource: DirectCustomer,
      options: {
        properties: {
          _id: {
            isVisible: false,
          },
          regDate: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          nic: {
            isVisible: { list: false, filter: true, show: true, edit: true },
          },
        },
        listProperties: ['name', 'contact', 'email', 'role'],
        parent: userParent,
      },
    },
    {
      resource: Appointment,
      options: {
        properties: {
          _id: {
            isVisible: false,
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
            isVisible: false,
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
        paymentBreakdown: {
          paymentMethod: {
            label: 'Payment Method',
            availableValues: [
              { value: 'cash', label: 'CASH' },
              { value: 'lease', label: 'LEASE' },
              { value: 'trade', label: 'TRADE' },
            ],
          },
        },
      },
    },
    {
      resource: Report,
      options: {
        parent: reportParent,
        properties: {
          _id: {
            isVisible: false,
          },
          report: {
            isVisible: { list: false, filter: false, show: true, edit: false },
          },
          reportType: {
            availableValues: [
              { value: 'soldVehicles', label: 'MOST SOLD VEHICLES' },
              { value: 'sales', label: 'SALES REPORT' },
              { value: 'inquiredVehicles', label: 'MOST INQUIRED VEHICLES' },
            ],
          },
        },
        actions: {
          new: {
            handler: async () => {},
          },
        },
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
      resources: {
        vehicles: {
          actions: {
            new: 'Add New Vehicle',
          },
        },
        reports: {
          actions: {
            new: 'Create New Report',
          },
        },
      },
    },
  },
});

const router = AdminBroExpress.buildRouter(dashboardOptions);

module.exports = router;
