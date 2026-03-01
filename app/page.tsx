import { prisma } from '@/lib/prisma';
import AutoRefresh from './AutoRefresh';
import MapWrapper from './MapWrapper';

export const revalidate = 0;

// 1. Define the structure of your data
interface TelemetryReading {
  id: number;
  sensor_id: string;
  lat: number;
  lng: number;
  value: number;
  created_at: Date;
}

export default async function Dashboard() {
  // 2. Cast the prisma result to your interface
  const readings = await prisma.telemetry.findMany({
    orderBy: { created_at: 'desc' },
    take: 15, 
  }) as TelemetryReading[];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <AutoRefresh interval={3000} />
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Urban Telemetry Dashboard
        </h1>
        <p className="text-slate-400 mb-8">Live sensor map & data from South Tangerang.</p>

        <MapWrapper readings={readings} />

        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-sm uppercase tracking-wider text-slate-400">
                <th className="p-4">Sensor ID</th>
                <th className="p-4">Latitude</th>
                <th className="p-4">Longitude</th>
                <th className="p-4 text-emerald-400">PM2.5 Value</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {readings.slice(0, 10).map((reading: TelemetryReading) => (
                <tr key={reading.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-sm text-blue-400">{reading.sensor_id}</td>
                  <td className="p-4 text-sm">{reading.lat.toFixed(4)}</td>
                  <td className="p-4 text-sm">{reading.lng.toFixed(4)}</td>
                  <td className="p-4 text-sm font-bold text-emerald-400">
                    {reading.value.toFixed(2)}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {new Date(reading.created_at).toLocaleTimeString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}