// src/pages/Dashboard.tsx
import { FC } from 'react';

interface StatCardProps {
  title: string;
  count: number;
  actionLabel: string;
}

const StatCard: FC<StatCardProps> = ({ title, count, actionLabel }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="mb-4">
        <p className="text-3xl font-bold text-gray-800">{count}</p>
      </div>
      <button className="px-4 py-2 bg-indigo-200 text-gray-800 rounded-lg hover:bg-indigo-100">
        {actionLabel}
      </button>
    </div>
  );
};

interface StrategyCardProps {
  name: string;
  index: string;
  type: string;
  entryTime: string;
}

const StrategyCard: FC<StrategyCardProps> = ({ name, index, type, entryTime }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
        <button className="px-4 py-2 bg-cyan-100 text-cyan-400 rounded-lg hover:bg-indigo-200">
          View Strategy
        </button>
      </div>
      <div className="mt-4 flex space-x-8">
        <div>
          <p className="text-sm text-gray-200">Index</p>
          <p className="text-gray-800">{index}</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">Type</p>
          <p className="text-gray-800">{type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">Entry Time</p>
          <p className="text-gray-800">{entryTime}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardSection: FC<{ title: string; buckets: number; strategies: number }> = ({ 
  title, 
  buckets, 
  strategies 
}) => {
  return (
    <div className="flex items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="ml-4 flex space-x-2">
        <span className="px-3 py-1 bg-emerald-200 rounded-full text-sm">
          {buckets} Buckets
        </span>
        <span className="px-3 py-1 bg-cyan-100 rounded-full text-sm">
          {strategies} Strategies
        </span>
      </div>
    </div>
  );
};

const Dashboard: FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Welcome Abhishek!</h1>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <StatCard title="My Buckets" count={14} actionLabel="View Buckets" />
        <StatCard title="My Strategies" count={14} actionLabel="View Buckets" />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recents</h2>
        <StrategyCard
          name="Strategy Name Here"
          index="IndexName"
          type="TypeName"
          entryTime="9:00 AM"
        />
      </section>

      <section className="mb-8">
        <DashboardSection title="Best Performance" buckets={4} strategies={15} />
        <StrategyCard
          name="Strategy Name Here"
          index="IndexName"
          type="TypeName"
          entryTime="9:00 AM"
        />
      </section>

      <section>
        <DashboardSection title="Least Performance" buckets={4} strategies={15} />
        <StrategyCard
          name="Strategy Name Here"
          index="IndexName"
          type="TypeName"
          entryTime="9:00 AM"
        />
      </section>
    </div>
  );
};

export default Dashboard;