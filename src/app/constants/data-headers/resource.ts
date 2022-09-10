export default [
  {
    text: "Name",
    dataField: "name",
    type: "text",
  },
  {
    text: "Path",
    dataField: "path",
    type: "text",
  },
  {
    text: "Method",
    dataField: "method",
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
