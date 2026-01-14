import { Card, CardContent } from "src/components/ui/card";

// ------------------------------------------------------------

export function HomeView() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <h1 className="text-xl font-semibold mb-6">
        Selamat datang, Reinaldi Djamil
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <Card className="border-0 rounded-2xl shadow-none">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Total Booking</h2>
            <p className="text-gray-500">10</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
