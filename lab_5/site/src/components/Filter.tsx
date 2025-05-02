const Filter = (props: {
  filtering: (value: any[]) => void;
  fullData: any[];
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const dist = form["dist"].value.toLowerCase();
    const yearFrom = form["yearFrom"].value;
    const yearTo = form["yearTo"].value;
    const usersFrom = form["usersFrom"].value;
    const usersTo = form["usersTo"].value;
    const downloadsFrom = form["downloadsFrom"].value;
    const downloadsTo = form["downloadsTo"].value;
    const manager = form["manager"].value.toLowerCase();

    let filtered = props.fullData;

    if (dist) {
      filtered = filtered.filter((item) =>
        item["Дистрибутив"].toLowerCase().includes(dist),
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
    if (usersFrom) {
      filtered = filtered.filter(
        (item) => Number(item["Пользователи"]) >= Number(usersFrom),
      );
    }
    if (usersTo) {
      filtered = filtered.filter(
        (item) => Number(item["Пользователи"]) <= Number(usersTo),
      );
    }
    if (downloadsFrom) {
      filtered = filtered.filter(
        (item) => Number(item["Загрузок в день"]) >= Number(downloadsFrom),
      );
    }
    if (downloadsTo) {
      filtered = filtered.filter(
        (item) => Number(item["Загрузок в день"]) <= Number(downloadsTo),
      );
    }
    if (manager) {
      filtered = filtered.filter((item) =>
        item["Пакетный менеджер"].toLowerCase().includes(manager),
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
        <label>Дистрибутив:</label>
        <input name="dist" type="text" />
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
        <label>Пользователи от:</label>
        <input name="usersFrom" type="numbers" />
      </p>
      <p>
        <label>Пользователи до:</label>
        <input name="usersTo" type="numbers" />
      </p>
      <p>
        <label>Загрузки от:</label>
        <input name="downloadsFrom" type="number" />
      </p>
      <p>
        <label>Загрузки до:</label>
        <input name="downloadsTo" type="number" />
      </p>
      <p>
        <label>Пакетный менеджер:</label>
        <input name="manager" type="text" />
      </p>
      <p>
        <button type="submit" style={{ marginRight: "10px" }}>
          Фильтровать
        </button>
        <button type="reset">Очистить фильтр</button>
      </p>
    </form>
  );
};

export default Filter;
