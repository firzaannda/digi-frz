import { Card, CardBody } from "@nextui-org/react";

export const Dashboard = () => {
  return (
    <main>
      <section className="grid grid-cols-3 gap-6">
        <Card>
          <CardBody className="p-8 space-y-4">
            <h6>Total Income</h6>
            <h1>USD 0</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-8 space-y-4">
            <h6>Total Products</h6>
            <h1> 0</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-8 space-y-4">
            <h6>Total Orders</h6>
            <h1>USD 0</h1>
          </CardBody>
        </Card>
      </section>
    </main>
  );
};
