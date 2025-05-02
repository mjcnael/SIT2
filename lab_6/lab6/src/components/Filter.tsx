const Filter = (props: {
  filtering: (value: any[]) => void;
  fullData: any[];
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const structure = form["structure"].value.toLowerCase();
    const type = form["type"].value.toLowerCase();
    const country = form["country"].value.toLowerCase();
    const city = form["city"].value.toLowerCase();
    const yearFrom = form["yearFrom"].value;
    const yearTo = form["yearTo"].value;
    const heightFrom = form["heightFrom"].value;
    const heightTo = form["heightTo"].value;

    let filtered = props.fullData;

    if (structure) {
      filtered = filtered.filter((item) =>
        item["Название"].toLowerCase().includes(structure),
      );
    }
    if (type) {
      filtered = filtered.filter((item) =>
        item["Тип"].toLowerCase().includes(type),
      );
    }
    if (country) {
      filtered = filtered.filter((item) =>
        item["Страна"].toLowerCase().includes(country),
      );
    }
    if (city) {
      filtered = filtered.filter((item) =>
        item["Город"].toLowerCase().includes(city),
      );
    }
    if (yearFrom) {
      filtered = filtered.filter(
        (item) => Number(item["Год"]) >= Number(yearFrom),
      );
    }
    if (yearTo) {
      filtered = filtered.filter(
        (item) => Number(item["Год"]) <= Number(yearTo),
      );
    }
    if (heightFrom) {
      filtered = filtered.filter(
        (item) => Number(item["Высота"]) >= Number(heightFrom),
      );
    }
    if (heightTo) {
      filtered = filtered.filter(
        (item) => Number(item["Высота"]) <= Number(heightTo),
      );
    }

    props.filtering(filtered);
  };

  const handleReset = () => {
    props.filtering(props.fullData);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <p>
        <label>Название:</label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип:</label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна:</label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город:</label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от:</label>
        <input name="yearFrom" type="number" />
      </p>
      <p>
        <label>Год до:</label>
        <input name="yearTo" type="number" />
      </p>
      <p>
        <label>Высота от:</label>
        <input name="heightFrom" type="number" />
      </p>
      <p>
        <label>Высота до:</label>
        <input name="heightTo" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset">Очистить фильтр</button>
      </p>
    </form>
  );
};

export default Filter;
