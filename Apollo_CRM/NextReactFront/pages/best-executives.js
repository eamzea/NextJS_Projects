import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GET_BEST_EXECUTIVES } from '../api/queries';
import { useQuery } from '@apollo/client';
import Loading from '../components/common/Loading';

const BestExecutives = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(GET_BEST_EXECUTIVES);

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling;
  }, [startPolling, stopPolling]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    router.push('/login');
    return null;
  }

  const { getBestExecutives } = data;

  const executivesGraphic = [];

  getBestExecutives.map((exe, ind) => {
    executivesGraphic[ind] = {
      ...exe.executive[0],
      total: exe.total,
    };
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Best Executives</h1>
      <div style={{ height: '75vh', width: '80vw' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              className="mt-10"
              width={600}
              height={500}
              data={executivesGraphic}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3182CE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default BestExecutives;
