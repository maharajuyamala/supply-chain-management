interface Item {
  [key: string]: string | number | boolean | null | undefined; // Define the types for item properties
}

export const filteredItems = (data: any, searchQuery: string) => {
  console.log(data);
  return searchQuery?.length !== 0 && searchQuery
    ? data.filter((item: string) =>
        Object.values(item).some(
          (value) => typeof value === "string" && value?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
        ),
      )
    : data;
};
