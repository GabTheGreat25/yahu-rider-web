export default [
  {
    text: "Account Number",
    dataField: "accNum",
    type: "text",
  },
  {
    text: "Name",
    dataField: "name",
    type: "name",
  },
  {
    text: "Delivery",
    dataField: "delivery",
    type: "text",
  },
  {
    text: "Email",
    dataField: "email",
    type: "text",
  },
  {
    text: "Mobile Number",
    dataField: "mobileNumber",
    type: "text",
  },
  {
    text: "Address",
    dataField: "address",
    type: "address",
  },
  {
    text: "Actions",
    dataField: "action",
    type: "action",
    actions: [
      { class: "las la-pen", name: "edit" },
      { class: "las la-trash", name: "delete" },
    ],
  },
];
