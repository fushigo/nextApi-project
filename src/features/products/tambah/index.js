import { addProduct } from "@/features/query";
import { TextInput, SimpleGrid, Group, Title, Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

const handleValidateForm = (data, field) => {
  return (data === '' || data === null ? `${field} must filled` : null)
}

export function TambahData() {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validate: {
      title: (value) => handleValidateForm(value, "Title"),
      description: (value) => handleValidateForm(value, "Description"),
      category: (value) => handleValidateForm(value, "Category"),
    },
  });

const handleClosedModal = () => {
  form.reset();
}

const { mutate } = useMutation(addProduct, {
  onSuccess: () => {
    handleClosedModal();
      notifications.show({
        title: "Success",
        message: "Success create data",
        color: "green"
      });
  },
  onError: () => {
    notifications.show({
      title: "Failed",
      message: "Failed create data!",
      color: "red"
    });
  }
});

  return (
    <form onSubmit={form.onSubmit((values) => mutate(values))}>
      <Title
        order={2}
        size="h1"
        style={{
          fontFamily: "Greycliff CF, var(--mantine-font-family)",
          marginTop: "20px",
        }}
        fw={900}
        ta="left"
      >
        Tambah Data
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          label="title"
          placeholder="Your Title Product"
          name="title"
          variant="filled"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="description"
          placeholder="Your description"
          name="description"
          variant="filled"
          {...form.getInputProps("description")}
        />
      </SimpleGrid>

      <Select
            label="Category"
            withAsterisk
            style={{marginTop:"10px"}}
            placeholder="Pick one"
            data={[
              { value: 'smartphone', label: 'Smartphone' },
              { value: 'shoes', label: 'Shoes' },
              { value: 'shirt', label: 'Shirt' },
              { value: 'laptop', label: 'Laptop' },
            ]}
            {...form.getInputProps('category')}
          />
      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
  );
}
