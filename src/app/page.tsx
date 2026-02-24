import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="text-xl">Welcome to PH HealthCare Management System</p>
      <Button>Hello World</Button>
    </div>
  );
}
