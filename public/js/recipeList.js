/* when document is ready */ $(function() {
  /* initiate the plugin */
  $("div.holder").jPages({
    containerID: "itemContainer",
    perPage: 6,
    startPage: 1,
    startRange: 1,
    midRange: 5,
    endRange: 1
  });
});
