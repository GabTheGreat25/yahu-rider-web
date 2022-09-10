export default [
  {
    text: "Tracking No",
    dataField: "trackingNo",
    type: "text",
  },
  {
    text: "Code",
    dataField: "code",
    type: "text",
  },
  {
    text: "Description",
    dataField: "description",
    type: "text",
  },
  {
    text: "Value",
    dataField: "value",
    type: "text",
  },
  {
    text: "Weight",
    dataField: "weight",
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
