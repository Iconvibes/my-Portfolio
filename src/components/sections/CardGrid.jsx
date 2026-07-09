import Card from '../ui/Card';

const CardGrid = ({ items, columns = 'three', renderItem }) => {
  const columnsClass = {
    two: 'lg:grid-cols-2',
    three: 'md:grid-cols-2 xl:grid-cols-3',
    five: 'md:grid-cols-2 xl:grid-cols-5'
  }[columns];

  return (
    <div className={`mt-12 grid gap-6 ${columnsClass}`}>
      {items.map((item, index) => (
        <Card key={item.title || item.label || index}>{renderItem(item, index)}</Card>
      ))}
    </div>
  );
};

export default CardGrid;
