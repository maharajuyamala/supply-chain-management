export const filteredItems = (data: any, searchQuery: string) => {
  return searchQuery?.length !== 0 && searchQuery
    ? data.filter((item: string) =>
        Object.values(item).some((value) => {
          return JSON.stringify(value)?.toLowerCase()?.includes(searchQuery?.toLowerCase());
        }),
      )
    : data;
};
