// Props: values passed from a parent component to its child.
// readonly: TypeScript rejects assigning a new value to this property.
type CountDisplayProps = { readonly count: number };

export default function CountDisplay({ count }: CountDisplayProps) {
  // This child reads the prop. The parent owns and updates the number.
  return <p>Child receives count: {count}</p>;
}
