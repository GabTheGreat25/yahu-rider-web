export default [
  {
    text: "Avatar",
    dataField: "avatar",
    type: "image",
  },
  {
    text: "First Name",
    dataField: "firstName",
    type: "text",
  },
  {
    text: "Last Name",
    dataField: "lastName",
    type: "text",
  },
  {
    text: "Phone Number",
    dataField: "phoneNumber",
    type: "text",
  },
  {
    text: "Status",
    dataField: "status",
    type: "text",
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
