import { useParams } from "react-router-dom";

export default function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const { category } = params;

  return (
    <div>
      <h1>
        {category}
        {slug}
      </h1>
    </div>
  );
}
