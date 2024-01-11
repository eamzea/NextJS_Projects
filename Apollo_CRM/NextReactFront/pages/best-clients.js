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
import { useQuery } from '@apollo/client';
import { GET_BEST_CLIENTS } from '../api/queries';
import Loading from '../components/common/Loading';

const BestClients = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(GET_BEST_CLIENTS);

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

  const { getBestClients } = data;

  const clientsGraphic = [];

  getBestClients.map((exe, ind) => {
    clientsGraphic[ind] = {
      ...exe.client[0],
      total: exe.total,
    };
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Best Clients</h1>
      <div style={{ height: '75vh', width: '80vw' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              className="mt-10"
              width={600}
              height={500}
              data={clientsGraphic}
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

export default BestClients;
