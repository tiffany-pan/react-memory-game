import { Category, CardCount } from '../../public/data/data';

export default function Option({ valueArray } : { valueArray: Category[] | CardCount[] }) {
  const optionEl = valueArray.map((datum) => (
    <option key={datum.value} value={datum.value}>
      {Object.hasOwn(datum, 'name') ? datum.name : datum.value}
    </option>
  ));

  return <>{optionEl}</>
};