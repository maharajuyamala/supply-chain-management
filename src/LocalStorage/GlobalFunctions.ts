export const filteredItems = (data: any, searchQuery: any) => {
  return searchQuery?.length !== 0 && searchQuery
    ? data.filter((item: any) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
        ),
      )
    : data;
};
