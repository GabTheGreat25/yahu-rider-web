export default [
  {
    text: "Avatar",
    dataField: "avatar",
    type: "image",
    image: {
      class: "avatar",
      alt: "avatar",
    },
  },
  {
    text: "Name",
    dataField: "name",
    type: "name",
  },
  {
    text: "Email Address",
    dataField: "email",
    type: "text",
  },
  {
    text: "Phone Number",
    dataField: "phoneNumber",
    type: "text",
  },
  {
    text: "Roles",
    dataField: "roles",
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
