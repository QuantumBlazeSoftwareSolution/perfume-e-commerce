import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetail from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    return { title: "Not Found" };
  }

  return {
    title: `${product.name} | Scentara Ceylon Haute Parfumerie`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
