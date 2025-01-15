export const categoryTree = async <inputType, outputType>(
  getData: () => Promise<{ data: inputType[] }>,
  mapper: (data: inputType[], handler?: unknown) => outputType[],
  sorter?: (categories: outputType[], showOnHome: number[]) => outputType[]
): Promise<outputType[]> => {
  const res = await getData();
  if (!res.data) {
    return [];
  }

  const toShowOnHome: number[] = [];
  const setShowOnHome = (id: number) => {
    toShowOnHome.push(id);
  };

  const result = mapper(res.data, setShowOnHome);
  return sorter(result, toShowOnHome);
};
