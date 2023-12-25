"use client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const CreateProducts = () => {
  const router = useRouter();

  async function handleCreateProduct(event) {
    event.preventDefault();
    const formData = new FormData();

    const name = event.target.name.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const featuredImage = event.target.featuredImage.files[0];
    const images = event.target.images.files; // plural
    const category = event.target.category.value;

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("featuredImage", featuredImage);
    formData.append("category", category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      router.push("/dashboard/products");
    }
  }
  return (
    <main>
      <section>
        <div>
          <h3>Create New Product</h3>
          <p>Here you can create Product.</p>
        </div>
      </section>

      <form onSubmit={handleCreateProduct}>
        <section className="space-y-4">
          <Input name="name" label="Name" />
          <Textarea name="description" label="Description" />
          <Input name="price" label="Price" type="number" />
          <Input name="featuredImage" type="file" />
          <Input name="images" type="file" multiple />
          <Select name="category">
            <SelectItem key="fonts">Fonts</SelectItem>
            <SelectItem key="assets">Assets</SelectItem>
            <SelectItem key="3d">3D Artist</SelectItem>
            <SelectItem key="template">Template</SelectItem>
            <SelectItem key="mockups">Mockups</SelectItem>
          </Select>
          <Button type="submit" color="primary" className="w-full">
            Create
          </Button>
        </section>
      </form>
    </main>
  );
};
